import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../../../app/store";
import { toggleLoading } from "../../../../features/common.slice";
import { updateDashboardEmployerData } from "../../../../features/dashboard.sice";
import { useUpdateEmployerMutation } from "../../../../generated/graphql";
import { PageSubHeading } from "../../../profile/common/heading.component";
import { editEmployerModalsEnum } from "../../employer/employer.dashboard-profile.component";

interface EmployerCompanyImageEditProps {
  setEditModals: Dispatch<SetStateAction<editEmployerModalsEnum | undefined>>;
}

const EmployerCompanyImageEdit = ({
  setEditModals,
}: EmployerCompanyImageEditProps) => {
  const [updateEmployerMutation] = useUpdateEmployerMutation();

  const dispatch = useDispatch();

  const companyLogo = useSelector(
    (state: RootState) => state.dashboard.dashboardEmployer?.companyImage
  );
  const companyName = useSelector(
    (state: RootState) => state.dashboard.dashboardEmployer?.companyName
  );
  const [fileU, setFileU] = useState<File>();

  const submitHandler = async () => {
    var uploadDataU;

    if (fileU) {
      // Upload Profile Card
      const fileName = `profile_${companyName}_${Math.round(
        Date.now() / 1000
      )}`;
      const formDataU: FormData = new FormData();
      formDataU.append("file", fileU);
      formDataU.append("upload_preset", "user-image-uploads");
      formDataU.append("public_id", fileName);

      dispatch(toggleLoading());
      uploadDataU = await fetch(
        "https://api.cloudinary.com/v1_1/inradiuscloud/image/upload",
        { method: "POST", body: formDataU }
      ).then((r) => r.json());

      const { data: imageUpload, errors: imageUploadError } =
        await updateEmployerMutation({
          variables: { input: { companyImage: uploadDataU.secure_url } },
        });
      dispatch(toggleLoading());

      if (imageUploadError !== undefined) {
        toast.error(imageUploadError[0].message, {
          autoClose: 2000,
          hideProgressBar: true,
        });
        return null;
      }

      if (!imageUpload?.updateEmployer) {
        toast.error("Something went wrong", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        return null;
      }

      dispatch(
        updateDashboardEmployerData({
          companyImage: uploadDataU.secure_url,
        })
      );

      toast.success("Image Updated Successfully!", {
        hideProgressBar: true,
        autoClose: 1500,
      });
    }

    setEditModals(undefined);
  };

  return (
    <div
      data-aos="fade-in"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      className="w-full h-full grid place-items-center px-8 py-4"
    >
      <div className="flex flex-col max-w-2xl w-full h-full justify-center">
        <div className="flex flex-col justify-start w-full">
          <PageSubHeading
            text={"Company Image"}
            desc={"Upload profile photo in image format (Maximum 2 MB)"}
          />
          <input
            name="companyImage"
            type={"file"}
            className={`bg-lightGray px-2 py-3 mt-2 mb-2 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
            onChange={(e) => {
              if (e.target.files) {
                const acceptedTypes = /(\.jpg|\.jpeg|\.png)$/i;
                const myFile = e.target.files[0];
                const myFileSize = parseFloat(
                  (myFile.size / (1024 * 1024)).toFixed(3)
                );
                if (myFileSize > 2) {
                  toast.info("File size should be less than 2 Mb.", {
                    autoClose: 2000,
                    hideProgressBar: true,
                  });
                  return;
                }
                if (!acceptedTypes.exec(myFile.name)) {
                  toast.info("File should be image only.", {
                    autoClose: 2000,
                    hideProgressBar: true,
                  });
                  return;
                }
                setFileU(e.target.files[0]);
              }
            }}
          />
          {companyLogo && (
            <p className="text-xs w-full text-justify text-gray-500 font-medium mt-1">
              {
                "Compnay Logo already uploaded, if you want to change it then upload again."
              }
            </p>
          )}
        </div>
        <div className="flex flex-row justify-center gap-2 w-full p-4">
          <button
            type="submit"
            className={`w-max text-xs bg-white p-2 text-primary border border-primary grid place-items-center rounded-md cursor-pointer`}
            onClick={() => {
              //   setShowRadiusConfirmModal(false);
              setEditModals(undefined);
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`w-max text-xs bg-primary p-2 text-white grid place-items-center rounded-md cursor-pointer`}
            onClick={() => {
              submitHandler();
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployerCompanyImageEdit;
