import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../../app/store";
import { toggleLoading } from "../../../features/common.slice";
import { updateEmployeeData } from "../../../features/employee.slice";
import { User, useUpdateEmployeeMutation } from "../../../generated/graphql";
import { PageHeading, PageSubHeading } from "../common/heading.component";
import EmployeeNextButton from "./employee.nextbutton.component";
import EmployeePrevButton from "./employee.prevbutton.component";

const EmployeeLinkedInResume = () => {
  const [updateEmployeeMutation] = useUpdateEmployeeMutation();

  const dispatch = useDispatch();

  const [file, setFile] = useState<File>();
  const [fileName, setFileName] = useState<string>();

  const linkedIn = useSelector(
    (state: RootState) => state.employee.employee.linkedIn
  );

  const resume = useSelector(
    (state: RootState) => state.employee.employee.resume
  );

  const prevHandler = async (movePrev: () => void) => {
    movePrev();
  };

  const nextHandler = async (moveNext: () => void) => {
    var uploadData;
    if (!linkedIn) {
      toast.info("Please provide your LinkedIn Profile", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    if ((!file || !fileName) && !resume) {
      toast.info("Please upload your resume", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    // Handle Resume Upload
    if (file && fileName) {
      const formData: FormData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "employee-resume-uploads");
      formData.append(
        "public_id",
        fileName + "_" + Math.round(Date.now() / 1000)
      );

      dispatch(toggleLoading());
      uploadData = await fetch(
        "https://api.cloudinary.com/v1_1/inradiuscloud/image/upload",
        { method: "POST", body: formData }
      ).then((r) => r.json());
      dispatch(toggleLoading());
    }

    // Update Employee Data
    dispatch(toggleLoading());
    const { data, errors } = await updateEmployeeMutation({
      variables: {
        input: {
          linkedIn: linkedIn,
          resume: file ? uploadData.secure_url : resume,
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
        <PageHeading text={"LinkedIn & Resume"} />
        <div className="flex justify-start flex-col">
          <PageSubHeading text={"LinkedIn Profile"} />
          <div className="flex flex-col justify-start w-full">
            <input
              type={"text"}
              className={`bg-lightGray px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
              placeholder={"Linkedin profile url"}
              autoComplete="off"
              value={linkedIn ?? ""}
              onChange={(e) => {
                dispatch(
                  updateEmployeeData({
                    linkedIn: e.target.value,
                  })
                );
              }}
            />
          </div>
          <PageSubHeading
            text={"Resume"}
            desc={"Upload resume in pdf or word file format (Maximum 5 MB)"}
          />
          <div className="flex flex-col justify-start w-full">
            <input
              name="resumeFile"
              type={"file"}
              className={`bg-lightGray px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-sm font-semibold w-full`}
              onChange={(e) => {
                if (e.target.files) {
                  const acceptedTypes = /(\.doc|\.docx|\.pdf)$/i;
                  const myFile = e.target.files[0];
                  const myFileSize = parseFloat(
                    (myFile.size / (1024 * 1024)).toFixed(3)
                  );
                  if (myFileSize > 5) {
                    toast.info("File size should be less than 5 Mb.", {
                      autoClose: 2000,
                      hideProgressBar: true,
                    });
                    return;
                  }

                  if (!acceptedTypes.exec(myFile.name)) {
                    toast.info("File should be a word document or pdf only.", {
                      autoClose: 2000,
                      hideProgressBar: true,
                    });
                    return;
                  }

                  const { _id }: User = JSON.parse(
                    localStorage.getItem("user")!
                  );

                  setFileName(`resume_${_id}`);

                  setFile(e.target.files[0]);
                }
              }}
              accept={".pdf, .docx"}
            />
            {resume && (
              <p className="text-xs w-full text-justify text-gray-500 font-medium mt-1">
                {
                  "Resume already uploaded, if you want to change it then upload again."
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

export default EmployeeLinkedInResume;
