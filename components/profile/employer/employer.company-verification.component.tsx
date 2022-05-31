import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../../app/store";
import { toggleLoading } from "../../../features/common.slice";
import { updateEmployerData } from "../../../features/employer.slice";
import {
  EmployerVerifyStatusEnum,
  User,
  useUpdateEmployerMutation,
} from "../../../generated/graphql";
import { PageHeading, PageSubHeading } from "../common/heading.component";
import EmployerNextButton from "./employer.nextbutton.component";
import EmployeePrevButton from "./employer.prevbutton.component";

const EmployerCompanyVerification = () => {
  const [updateEmployerMutation] = useUpdateEmployerMutation();

  const dispatch = useDispatch();

  const employerVerifyStatus = useSelector(
    (state: RootState) => state.employer.employer.employerVerifyStatus
  );
  const employerVerified = useSelector(
    (state: RootState) => state.employer.employer.employerVerified
  );

  const companyName = useSelector(
    (state: RootState) => state.employer.employer.companyName
  );
  const companyImage = useSelector(
    (state: RootState) => state.employer.employer.companyImage
  );
  const companyLetterHead = useSelector(
    (state: RootState) => state.employer.employer.companyLetterHead
  );
  const gst = useSelector((state: RootState) => state.employer.employer.gstNo);
  const pan = useSelector((state: RootState) => state.employer.employer.panNo);

  const [fileL, setFileL] = useState<File>();
  const [fileC, setFileC] = useState<File>();

  const nextHandler = async (moveNext: () => void) => {
    const { _id }: User = JSON.parse(localStorage.getItem("user")!);

    var uploadDataL;
    var uploadDataC;

    // Check Company Name
    if (!companyName) {
      toast.info("Please provide your company name!", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    // Check GST
    if (!gst) {
      toast.info("Please provide your GST number!", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    // Check PAN
    if (!pan) {
      toast.info("Please provide your business pan number.", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    // Check Letter Head
    if (!companyLetterHead && !fileL) {
      toast.info("Please upload your company's letter head!", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    // Check Company Logo
    if (!companyImage && !fileC) {
      toast.info("Please upload your company's logo!", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    // Uploading Part
    dispatch(toggleLoading());

    if (fileL) {
      // Upload Letter Head
      const fileName = `letterhead_${_id}_${Math.round(Date.now() / 1000)}`;
      const formDataL: FormData = new FormData();
      formDataL.append("file", fileL);
      formDataL.append("upload_preset", "employer-letterhead-uploads");
      formDataL.append("public_id", fileName);

      uploadDataL = await fetch(
        "https://api.cloudinary.com/v1_1/inradiuscloud/image/upload",
        { method: "POST", body: formDataL }
      ).then((r) => r.json());
    }

    if (fileC) {
      // Upload Company Logo
      const fileName = `logo_${companyName}_${_id}_${Math.round(
        Date.now() / 1000
      )}`;
      const formDataC: FormData = new FormData();
      formDataC.append("file", fileC);
      formDataC.append("upload_preset", "employer-logo-uploads");
      formDataC.append("public_id", fileName);

      uploadDataC = await fetch(
        "https://api.cloudinary.com/v1_1/inradiuscloud/image/upload",
        { method: "POST", body: formDataC }
      ).then((r) => r.json());
    }

    // Update Employee Data
    const { data, errors } = await updateEmployerMutation({
      variables: {
        input: {
          companyName: companyName,
          gstNo: gst,
          panNo: pan,
          companyLetterHead: fileL ? uploadDataL.secure_url : companyLetterHead,
          employerVerifyStatus: EmployerVerifyStatusEnum.DocumentsUploaded,
          companyImage: fileC ? uploadDataC.secure_url : companyImage,
        },
      },
    });

    dispatch(toggleLoading());

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

    toast.success("Details Submitted Successfully!", {
      autoClose: 2000,
      hideProgressBar: true,
    });

    dispatch(
      updateEmployerData({
        employerVerifyStatus: EmployerVerifyStatusEnum.DocumentsUploaded,
      })
    );

    localStorage.removeItem("companyName");

    // moveNext();
  };

  const nextNewHandler = (moveNext: () => void) => {
    localStorage.setItem("showVerification", "no");
    moveNext();
  };

  return (
    <div
      data-aos="slide-left"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      className="w-full h-full grid place-items-center"
    >
      <div className="flex flex-col max-w-sm w-full">
        <PageHeading text={"Company Verification"} />
        {employerVerifyStatus === EmployerVerifyStatusEnum.DocumentsPending ? (
          <div className="flex justify-start flex-col gap-5">
            <div className="flex flex-col justify-start w-full">
              {companyName && (
                <p className="text-xs w-full text-justify text-gray-500 font-medium mb-1">
                  {`Company Name`}
                </p>
              )}
              <input
                type={"text"}
                className={`bg-lightGray px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
                placeholder={"Company Name"}
                autoComplete="off"
                value={companyName ?? ""}
                onChange={(e) => {
                  dispatch(
                    updateEmployerData({
                      companyName: e.target.value,
                    })
                  );
                }}
              />
            </div>
            <div className="flex flex-col justify-start w-full">
              {gst && (
                <p className="text-xs w-full text-justify text-gray-500 font-medium mb-1">
                  {`GST Number`}
                </p>
              )}
              <input
                type={"text"}
                className={`bg-lightGray px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
                placeholder={"GST Number"}
                autoComplete="off"
                value={gst ?? ""}
                onChange={(e) => {
                  dispatch(
                    updateEmployerData({
                      gstNo: e.target.value,
                    })
                  );
                }}
              />
            </div>
            <div className="flex flex-col justify-start w-full">
              {pan && (
                <p className="text-xs w-full text-justify text-gray-500 font-medium mb-1">
                  {`Business Pan Number`}
                </p>
              )}
              <input
                type={"text"}
                className={`bg-lightGray px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
                placeholder={"Business Pan Number"}
                autoComplete="off"
                value={pan ?? ""}
                onChange={(e) => {
                  dispatch(
                    updateEmployerData({
                      panNo: e.target.value,
                    })
                  );
                }}
              />
            </div>
            <div className="flex flex-col justify-start w-full">
              <PageSubHeading
                text={"Company's letter head"}
                desc={
                  "Upload company's letter head in image or pdf format (Maximum 2 MB)"
                }
              />
              <input
                name="letterHeadFile"
                type={"file"}
                className={`bg-lightGray px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
                onChange={(e) => {
                  if (e.target.files) {
                    const acceptedTypes = /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
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
                      toast.info("File should be image or pdf only.", {
                        autoClose: 2000,
                        hideProgressBar: true,
                      });
                      return;
                    }
                    setFileL(e.target.files[0]);
                  }
                }}
              />
              {companyLetterHead && (
                <p className="text-xs w-full text-justify text-gray-500 font-medium mt-1">
                  {
                    "Letter Head already uploaded, if you want to change it then upload again."
                  }
                </p>
              )}
            </div>
            <div className="flex flex-col justify-start w-full">
              <PageSubHeading
                text={"Company's Logo"}
                desc={"Upload company's logo in image format (Maximum 2 MB)"}
              />
              <input
                name="logoFile"
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
                    setFileC(e.target.files[0]);
                  }
                }}
              />
              {companyImage && (
                <p className="text-xs w-full text-justify text-gray-500 font-medium mt-1">
                  {
                    "Pan Card already uploaded, if you want to change it then upload again."
                  }
                </p>
              )}
            </div>
          </div>
        ) : (
          <>
            {employerVerifyStatus ===
              EmployerVerifyStatusEnum.DocumentsUploaded && employerVerified ? (
              <div className="text-justify" style={{ textAlignLast: "center" }}>
                Your details have been verified successfully!. Continue with
                your process by clicking the button below
              </div>
            ) : (
              <div className="text-justify" style={{ textAlignLast: "center" }}>
                {
                  "Thank's for submitting your details, we will review them and connect with you soon!"
                }
              </div>
            )}
          </>
        )}
        <div className="flex flex-row gap-2 justify-end select-none my-6">
          {employerVerifyStatus ===
          EmployerVerifyStatusEnum.DocumentsPending ? (
            <EmployerNextButton handlerFunction={nextHandler} />
          ) : (
            <>
              {employerVerifyStatus ===
                EmployerVerifyStatusEnum.DocumentsUploaded &&
              employerVerified ? (
                <EmployerNextButton handlerFunction={nextNewHandler} />
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerCompanyVerification;
