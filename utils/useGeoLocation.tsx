import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserLocation, UserLocationType } from "../features/locationSlice";

const useGeoLocation = () => {
    const dispatch = useDispatch()

    const onSuccess = (location: GeolocationPosition) => {
        const data: UserLocationType = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        }
        dispatch(setUserLocation(data))
    };

    const onError = (error: GeolocationPositionError) => {
        console.log(error.message);
    };

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            // onError({
            //     code: 0,
            //     message: "Geolocation not supported",
            // });
            console.log("Geo Location Not Supported");
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    return location;
};

export default useGeoLocation;
