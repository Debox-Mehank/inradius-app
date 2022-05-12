import { GoogleMap, MarkerF, CircleF, useJsApiLoader } from '@react-google-maps/api';
import React, { useCallback } from 'react';
import InputRange from 'react-input-range';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setRadius } from '../../features/companyRegistrationSlice';
import { api } from '../../utils/AxiosClient';
import RangeSlider from './RangeSlider';


const CompanyMap = () => {
    const radius = useSelector((state: RootState) => state.companyRegistration.radius)
    const userLocation = useSelector((state: RootState) => state.userLocation)

    const center = {
        lat: userLocation.latitude!,
        lng: userLocation.longitude!,
    }
    const dispatch = useDispatch()

    const { isLoaded } = useJsApiLoader({
        id: "google-maps-script",
        googleMapsApiKey: "AIzaSyCj2UxICHi4wVE3U0mgMh9HteU1X-94hDQ"
    })

    const handleSliderChange = useCallback((e: any) => {
        dispatch(setRadius(e))
    }, [])

    if (!isLoaded) {
        return null;
    }

    return (
        <>
            <GoogleMap onLoad={(map: google.maps.Map) => {
                dispatch(setRadius(5))
            }} zoom={12} onUnmount={async() =>{
                const id = localStorage.getItem("id")
                const response = await api.post("update", { id, latitude: String(center.lat), longitude: String(center.lng), radius})
                console.log(response)

                console.log("unmount map")
            }} center={center} mapContainerClassName="w-full h-3/5 rounded-md" options={{ disableDefaultUI: true }}>
                <MarkerF
                    position={center}
                />
                <CircleF center={center} radius={radius ? radius * 1000 : 0}
                    options={{
                        strokeColor: "#ff6666",
                        fillColor: "#ffb3b3",
                        fillOpacity: 0.15,
                        strokeOpacity: 0.7,
                    }} />
            </GoogleMap>
            <div className='w-full mt-8 mb-4'>
                <InputRange maxValue={15} minValue={5} step={1} onChange={handleSliderChange} value={radius ? radius : 5} formatLabel={(value, _) => `${value} km`} />
            </div>
            {/* <RangeSlider start={5} end={15} value={radius ? radius : 5} onChange={handleSliderChange} /> */}
        </>
    )
}

export default React.memo(CompanyMap)