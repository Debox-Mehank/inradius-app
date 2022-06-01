import {
  CircleF,
  GoogleMap,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import InputRange from "react-input-range";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { RootState } from "../../app/store";
import { toggleLoading } from "../../features/common.slice";
import { updateJobData } from "../../features/job.slice";
import {
  EmployerJobTypeEnum,
  useUpdateEmployerJobMutation,
} from "../../generated/graphql";
import { reactSelectColorStyles } from "../../utils/common";
import { PageHeading } from "../profile/common/heading.component";
import JobDetailsNextButton from "./common/jobs.nextbutton.component";
import JobDetailsPrevButton from "./common/jobs.prevbutton.component";

const JobDetailsRadius = () => {
  const [updateEmployerJobMutation] = useUpdateEmployerJobMutation();

  const dispatch = useDispatch();

  const radius = useSelector((state: RootState) => state.job.job.radius);
  const latitude = useSelector((state: RootState) => state.job.job.latitude);
  const longitude = useSelector((state: RootState) => state.job.job.longitude);

  const jobId = useSelector((state: RootState) => state.job.job._id);

  const prevHandler = async (movePrev: () => void) => {
    movePrev();
  };

  const nextHandler = async (moveNext: () => void) => {
    if (!radius) {
      toast.info("Select job location to continue", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    // Update Employer Job Data
    dispatch(toggleLoading());
    const { data, errors } = await updateEmployerJobMutation({
      variables: {
        input: {
          _id: jobId,
          radius: radius,
          latitude: latitude,
          longitude: longitude,
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

  const { isLoaded } = useJsApiLoader({
    id: "google-maps-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!, // process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? "AIzaSyCj2UxICHi4wVE3U0mgMh9HteU1X-94hDQ"
  });

  return (
    <div
      data-aos="slide-left"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      className="w-full h-full grid place-items-center"
    >
      <div className="flex flex-col max-w-2xl w-full h-full justify-center">
        <PageHeading
          text="Job Radius"
          desc="Your current location is autofilled, you can change the location by dragging the pointer where you are looking for the job."
        />
        {isLoaded && (
          <GoogleMap
            zoom={12}
            center={{ lat: latitude!, lng: longitude! }}
            mapContainerClassName="w-full h-3/5 rounded-md"
            options={{ disableDefaultUI: true }}
            onLoad={() => {
              if (radius === null) {
                dispatch(updateJobData({ radius: 5 }));
              }
            }}
          >
            <MarkerF
              position={{ lat: latitude!, lng: longitude! }}
              draggable={true}
              onDragEnd={(e: google.maps.MapMouseEvent) => {
                const newLat = e.latLng?.lat();
                const newLng = e.latLng?.lng();
                dispatch(
                  updateJobData({
                    latitude: newLat,
                    longitude: newLng,
                  })
                );
              }}
            />
            <CircleF
              center={{ lat: latitude!, lng: longitude! }}
              radius={radius ? radius * 1000 : 0}
              options={{
                strokeColor: "#ff6666",
                fillColor: "#ffb3b3",
                fillOpacity: 0.15,
                strokeOpacity: 0.7,
              }}
            />
          </GoogleMap>
        )}
        <div className="w-full mt-8 mb-4">
          <InputRange
            maxValue={15}
            minValue={5}
            step={1}
            onChange={(val) => {
              if (typeof val === "number") {
                dispatch(updateJobData({ radius: val }));
              }
            }}
            value={radius ? radius : 5}
            formatLabel={(value, _) => `${value} km`}
          />
        </div>
        <div className="flex flex-row gap-2 justify-end select-none my-6">
          <JobDetailsPrevButton handlerFunction={prevHandler} />
          <JobDetailsNextButton handlerFunction={nextHandler} />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsRadius;
