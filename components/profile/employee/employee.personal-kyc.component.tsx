import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { RootState } from "../../../app/store";
import { toggleLoading } from "../../../features/common.slice";
import { updateEmployeeData } from "../../../features/employee.slice";
import {
  EmployeeGenderEnum,
  User,
  useUpdateEmployeeMutation,
  useUpdateProfileStatusLazyQuery,
  useUpdateUserImageLazyQuery,
} from "../../../generated/graphql";
import { PageHeading, PageSubHeading } from "../common/heading.component";
import EmployeeNextButton from "./employee.nextbutton.component";
import EmployeePrevButton from "./employee.prevbutton.component";

const EmployeePersonalKyc = () => {
  const router = useRouter();

  const [updateEmployeeMutation] = useUpdateEmployeeMutation();
  const [updateProfileStatusQuery] = useUpdateProfileStatusLazyQuery();
  const [updateUserImageQuery] = useUpdateUserImageLazyQuery();

  const dispatch = useDispatch();

  const gender = useSelector(
    (state: RootState) => state.employee.employee.gender
  );
  const dob = useSelector((state: RootState) => state.employee.employee.dob);
  const currentAddress = useSelector(
    (state: RootState) => state.employee.employee.currentAddress
  );

  const panCard = useSelector(
    (state: RootState) => state.employee.employee.panCard
  );
  const aadharCard = useSelector(
    (state: RootState) => state.employee.employee.aadharCard
  );
  const userImage = useSelector(
    (state: RootState) => state.employee.employee.user?.image
  );

  const [fileU, setFileU] = useState<File>();
  const [fileA, setFileA] = useState<File>();
  const [fileP, setFileP] = useState<File>();

  const prevHandler = async (movePrev: () => void) => {
    movePrev();
  };

  const nextHandler = async (moveNext: () => void) => {
    const { _id }: User = JSON.parse(localStorage.getItem("user")!);

    var uploadDataU;
    var uploadDataA;
    var uploadDataP;

    // Check dob
    if (!dob) {
      toast.info("Please provide your date of birth", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    // Check Current Address
    if (!currentAddress) {
      toast.info("Please provide your current address", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    // Check Gender
    if (!gender) {
      toast.info("Please provide your current address.", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    // Check Aadhar Upload
    if (!aadharCard && !fileA) {
      toast.info("Please upload your aadhar card.", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    // Check Pan Upload
    if (!panCard && !fileP) {
      toast.info("Please upload your pan card.", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    // Uploading Part
    dispatch(toggleLoading());

    if (fileU) {
      // Upload Profile Card
      const fileName = `profile_${_id}_${Math.round(Date.now() / 1000)}`;
      const formDataU: FormData = new FormData();
      formDataU.append("file", fileU);
      formDataU.append("upload_preset", "user-image-uploads");
      formDataU.append("public_id", fileName);

      uploadDataU = await fetch(
        "https://api.cloudinary.com/v1_1/inradiuscloud/image/upload",
        { method: "POST", body: formDataU }
      ).then((r) => r.json());

      const { data: imageUpload, error: imageUploadError } =
        await updateUserImageQuery({
          variables: { image: uploadDataU.secure_url },
        });

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
    }

    if (fileA) {
      // Upload Aadhar Card
      const fileName = `aadhar_${_id}_${Math.round(Date.now() / 1000)}`;
      const formDataA: FormData = new FormData();
      formDataA.append("file", fileA);
      formDataA.append("upload_preset", "employee-kyc-uploads");
      formDataA.append("public_id", fileName);

      uploadDataA = await fetch(
        "https://api.cloudinary.com/v1_1/inradiuscloud/image/upload",
        { method: "POST", body: formDataA }
      ).then((r) => r.json());
    }

    if (fileP) {
      // Upload Aadhar Card
      const fileName = `pan_${_id}_${Math.round(Date.now() / 1000)}`;
      const formDataP: FormData = new FormData();
      formDataP.append("file", fileP);
      formDataP.append("upload_preset", "employee-kyc-uploads");
      formDataP.append("public_id", fileName);

      uploadDataP = await fetch(
        "https://api.cloudinary.com/v1_1/inradiuscloud/image/upload",
        { method: "POST", body: formDataP }
      ).then((r) => r.json());
    }

    // Update Employee Data
    const { data, errors } = await updateEmployeeMutation({
      variables: {
        input: {
          dob: new Date(dob),
          currentAddress: currentAddress,
          gender: gender,
          aadharCard: fileA ? uploadDataA.secure_url : aadharCard,
          panCard: fileP ? uploadDataP.secure_url : panCard,
        },
      },
    });
    const { data: updateData, error: updateError } =
      await updateProfileStatusQuery();

    dispatch(toggleLoading());

    if (updateError !== undefined) {
      toast.error(updateError.message, {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return null;
    }

    if (updateData === undefined || updateData.updateProfileStatus === false) {
      toast.error("Something went wrong", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return null;
    }

    if (errors !== undefined) {
      toast.error(errors[0].message, {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return null;
    }

    if (data === undefined) {
      toast.error("Something went wrong!", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return null;
    }

    toast.success("Congragulations on completing profile!", {
      autoClose: 2000,
      hideProgressBar: true,
    });

    moveNext();

    dispatch(toggleLoading());

    setTimeout(() => {
      router.replace("/dashboard?page=explore");
      dispatch(toggleLoading());
    }, 2000);
  };

  return (
    <div
      data-aos="slide-left"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      className="w-full h-full grid place-items-center"
    >
      <div className="flex flex-col max-w-xl w-full">
        <PageHeading text={"Personal Details"} />
        <div className="flex justify-start flex-col gap-5 scrollable-div">
          <div className="flex flex-col justify-start w-full">
            <p className="text-xs w-full text-justify text-gray-500 font-medium mb-1">
              {`Date of birth`}
            </p>
            <input
              type={"date"}
              className={`bg-lightGray px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
              placeholder={"Date of birth"}
              autoComplete="off"
              value={dob ?? ""}
              onChange={(e) => {
                dispatch(
                  updateEmployeeData({
                    dob: e.target.value,
                  })
                );
              }}
            />
          </div>
          <div className="flex flex-col justify-start w-full">
            {currentAddress && (
              <p className="text-xs w-full text-justify text-gray-500 font-medium mb-1">
                {`Current Address`}
              </p>
            )}
            <input
              type={"text"}
              className={`bg-lightGray px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
              placeholder={"Current Address"}
              autoComplete="off"
              value={currentAddress ?? ""}
              onChange={(e) => {
                dispatch(
                  updateEmployeeData({
                    currentAddress: e.target.value,
                  })
                );
              }}
            />
          </div>
          <div className="flex flex-col justify-start w-full">
            <p className="text-xs w-full text-justify text-gray-500 font-medium mb-1">
              {`Gender`}
            </p>
            <div className="flex justify-start items-center gap-4">
              <div className="flex justify-center items-center gap-2">
                <input
                  id="male"
                  type={"radio"}
                  radioGroup={"genderGroup"}
                  className={`px-2 py-3 lg:px-4`}
                  checked={gender === EmployeeGenderEnum.Male}
                  value={EmployeeGenderEnum.Male}
                  onChange={(e) => {
                    dispatch(
                      updateEmployeeData({
                        gender: EmployeeGenderEnum.Male,
                      })
                    );
                  }}
                />
                <label
                  htmlFor="male"
                  className="text-sm w-full text-justify text-darkGray font-medium"
                >
                  {`Male`}
                </label>
              </div>
              <div className="flex justify-center items-center gap-2">
                <input
                  id="female"
                  type={"radio"}
                  radioGroup={"genderGroup"}
                  className={`px-2 py-3 lg:px-4`}
                  checked={gender === EmployeeGenderEnum.Female}
                  value={EmployeeGenderEnum.Female}
                  onChange={(e) => {
                    dispatch(
                      updateEmployeeData({
                        gender: EmployeeGenderEnum.Female,
                      })
                    );
                  }}
                />
                <label
                  htmlFor="female"
                  className="text-sm w-full text-justify text-darkGray font-medium"
                >
                  {`Female`}
                </label>
              </div>
              <div className="flex justify-center items-center gap-2">
                <input
                  id="other"
                  type={"radio"}
                  radioGroup={"genderGroup"}
                  className={`px-2 py-3 lg:px-4`}
                  checked={gender === EmployeeGenderEnum.Other}
                  value={EmployeeGenderEnum.Other}
                  onChange={(e) => {
                    dispatch(
                      updateEmployeeData({
                        gender: EmployeeGenderEnum.Other,
                      })
                    );
                  }}
                />
                <label
                  htmlFor="other"
                  className="text-sm w-full text-justify text-darkGray font-medium"
                >
                  {`Other`}
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start w-full">
            <PageSubHeading
              text={"Profile Photo"}
              desc={"Upload profile photo in image format (Maximum 2 MB)"}
            />
            <input
              name="profileImage"
              type={"file"}
              className={`bg-lightGray px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
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
          <div className="flex flex-col justify-start w-full">
            <PageSubHeading
              text={"Aadhar Card"}
              desc={"Upload aadhar card in image format (Maximum 2 MB)"}
            />
            <input
              name="aadharFile"
              type={"file"}
              className={`bg-lightGray px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
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
                  setFileA(e.target.files[0]);
                }
              }}
            />
            {aadharCard && (
              <p className="text-xs w-full text-justify text-gray-500 font-medium mt-1">
                {
                  "Aadhar Card already uploaded, if you want to change it then upload again."
                }
              </p>
            )}
          </div>
          <div className="flex flex-col justify-start w-full">
            <PageSubHeading
              text={"Pan Card"}
              desc={"Upload pan card in image format (Maximum 2 MB)"}
            />
            <input
              name="panFile"
              type={"file"}
              className={`bg-lightGray px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
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
                  setFileP(e.target.files[0]);
                }
              }}
            />
            {panCard && (
              <p className="text-xs w-full text-justify text-gray-500 font-medium mt-1">
                {
                  "Pan Card already uploaded, if you want to change it then upload again."
                }
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-end select-none my-6">
          <EmployeePrevButton handlerFunction={prevHandler} />
          <EmployeeNextButton handlerFunction={nextHandler} />
        </div>
      </div>
    </div>
  );
};

export default EmployeePersonalKyc;
