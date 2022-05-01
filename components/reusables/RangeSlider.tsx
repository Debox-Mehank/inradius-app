import { ChangeEventHandler } from "react"

interface RangeSliderProps {
    start: number
    end: number
    value: number
    onChange: ChangeEventHandler<HTMLElement>
}
const RangeSlider = ({ start, end, value, onChange }: RangeSliderProps) => {
    return (
        <div className="w-full flex flex-col mt-4">
            <div className="relative">
                <input id="map-slider" type="range" min={start} max={end} value={value} className="appearance-none w-full h-2 bg-lightGray rounded-md" onChange={onChange} />
            </div>
            <div className="flex justify-between">
                <p className="text-xs text-gray-500 font-medium mb-4">{start}km</p>
                <p className="text-xs text-gray-500 font-medium mb-4">{end}km</p>
            </div>
            {/* <p className="ml-4">{value}</p> */}
        </div>
    )
}

export default RangeSlider