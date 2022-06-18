import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { RootState } from "../../../../app/store";
import { toggleLoading } from "../../../../features/common.slice";
import { updateDashboardUserImage } from "../../../../features/dashboard.sice";
import { useUpdateUserImageLazyQuery } from "../../../../generated/graphql";
import { reactSelectColorStyles } from "../../../../utils/common";
import { PageSubHeading } from "../../../profile/common/heading.component";
import { editModalsEnum } from "../../employee/employee.dashboard-profile.component";

interface EmployeeProfileEditProps {
  setEditModals: Dispatch<SetStateAction<editModalsEnum | undefined>>;
}

const EmployeeProfileEdit = ({ setEditModals }: EmployeeProfileEditProps) => {
  const [updateUserImageQuery] = useUpdateUserImageLazyQuery();

  const dispatch = useDispatch();

  const userImage = useSelector(
    (state: RootState) => state.dashboard.dashboardUser?.image
  );
  const userId = useSelector(
    (state: RootState) => state.dashboard.dashboardUser?._id
  );
  const [fileU, setFileU] = useState<File>();

  const submitHandler = async () => {
    var uploadDataU;

    if (fileU) {
      // Upload Profile Card
      const fileName = `profile_${userId}_${Math.round(Date.now() / 1000)}`;
      const formDataU: FormData = new FormData();
      formDataU.append("file", fileU);
      formDataU.append("upload_preset", "user-image-uploads");
      formDataU.append("public_id", fileName);

      dispatch(toggleLoading());
      uploadDataU = await fetch(
        "https://api.cloudinary.com/v1_1/inradiuscloud/image/upload",
        { method: "POST", body: formDataU }
      ).then((r) => r.json());

      const { data: imageUpload, error: imageUploadError } =
        await updateUserImageQuery({
          variables: { image: uploadDataU.secure_url },
        });
      dispatch(toggleLoading());

      if (imageUploadError !== undefined) {
        toast.error(imageUploadError.message, {
          autoClose: 2000,
          hideProgressBar: true,
        });
        return null;
      }

      if (imageUpload?.updateUserImage === false) {
        toast.error("Something went wrong", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        return null;
      }

      dispatch(updateDashboardUserImage(uploadDataU.secure_url));

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
            text={"Profile Photo"}
            desc={"Upload profile photo in image format (Maximum 2 MB)"}
          />
          <input
            name="profileImage"
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
          {userImage && (
            <p className="text-xs w-full text-justify text-gray-500 font-medium mt-1">
              {
                "Profile Photo already uploaded, if you want to change it then upload again."
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

export default EmployeeProfileEdit;
