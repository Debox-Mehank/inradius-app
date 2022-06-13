import {
  Autocomplete,
  CircleF,
  GoogleMap,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useState } from "react";
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
import Modal from "../reusables/Modal.component";
import JobDetailsNextButton from "./common/jobs.nextbutton.component";
import JobDetailsPrevButton from "./common/jobs.prevbutton.component";

const JobDetailsRadius = () => {
  const [updateEmployerJobMutation] = useUpdateEmployerJobMutation();

  const [showRadiusConfirmModal, setShowRadiusConfirmModal] =
    useState<boolean>(false);
  const [moveNextFunc, setMoveNextFunc] = useState<{ moveFunc?: () => void }>({
    moveFunc: undefined,
  });

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

  const modalHandler = (moveNext: () => void) => {
    setShowRadiusConfirmModal(true);
    // nextHandler(moveNext);
    setMoveNextFunc({ moveFunc: moveNext });
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-maps-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!, // process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? "AIzaSyCj2UxICHi4wVE3U0mgMh9HteU1X-94hDQ"
  });

  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete>();

  return (
    <div
      data-aos="slide-left"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      className="w-full h-full grid place-items-center"
    >
      <Modal show={showRadiusConfirmModal}>
        <>
          <h4 className="p-4 font-medium text-justify">
            Please make sure you have selected proper location!
          </h4>
          <p className="text-xs w-full text-justify text-gray-500 font-normal px-4">
            You can also change your location by dragging the pointer to your
            preferred point.
          </p>
          <div className="flex flex-row justify-end gap-2 w-full p-4">
            <button
              type="submit"
              className={`w-max text-xs bg-white p-2 text-primary border border-primary grid place-items-center rounded-md cursor-pointer`}
              onClick={() => {
                setShowRadiusConfirmModal(false);
              }}
            >
              Change
            </button>
            <button
              type="submit"
              className={`w-max text-xs bg-primary p-2 text-white grid place-items-center rounded-md cursor-pointer`}
              onClick={() => {
                setShowRadiusConfirmModal(false);
                // modalHandler();
                if (moveNextFunc.moveFunc !== undefined) {
                  nextHandler(moveNextFunc.moveFunc);
                }
              }}
            >
              Yes, Proceed
            </button>
          </div>
        </>
      </Modal>
      <div className="flex flex-col max-w-2xl w-full h-full justify-center">
        <PageHeading
          text="Job Radius"
          desc="Your current location is autofilled, you can change the location by dragging the pointer where you are looking for the job."
        />
        {isLoaded && (
          <GoogleMap
            zoom={12}
            center={{ lat: latitude ?? 0, lng: longitude ?? 0 }}
            mapContainerClassName="w-full h-3/5 rounded-md"
            options={{
              disableDefaultUI: false,
              streetViewControl: false,
              panControl: false,
              mapTypeControl: false,
            }}
            onLoad={() => {
              if (radius === null) {
                dispatch(updateJobData({ radius: 5 }));
              }
            }}
            onClick={(e: google.maps.MapMouseEvent) => {
              const newLat = e.latLng?.lat();
              const newLng = e.latLng?.lng();
              dispatch(
                updateJobData({
                  latitude: newLat,
                  longitude: newLng,
                })
              );
            }}
          >
            <Autocomplete
              onLoad={(a) => setAutocomplete(a)}
              onPlaceChanged={() => {
                if (autocomplete) {
                  const result = autocomplete.getPlace();
                  const newLat = result.geometry?.location?.lat();
                  const newLng = result.geometry?.location?.lng();
                  dispatch(
                    updateJobData({
                      latitude: newLat,
                      longitude: newLng,
                    })
                  );
                }
              }}
            >
              <div className="absolute top-2 left-4 right-16">
                <input
                  type={"text"}
                  className={`bg-white px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-xs font-normal w-full`}
                  placeholder={"Search Places..."}
                  autoComplete="off"
                />
              </div>
            </Autocomplete>
            <MarkerF
              position={{ lat: latitude ?? 0, lng: longitude ?? 0 }}
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
              center={{ lat: latitude ?? 0, lng: longitude ?? 0 }}
              radius={radius ? radius * 1000 : 0}
              options={{
                strokeColor: "#ff6666",
                fillColor: "#ffb3b3",
                fillOpacity: 0.15,
                strokeOpacity: 0.7,
              }}
              onClick={(e: google.maps.MapMouseEvent) => {
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
          <JobDetailsNextButton handlerFunction={modalHandler} />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsRadius;
