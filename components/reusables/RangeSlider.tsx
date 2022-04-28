import { ChangeEventHandler } from "react"

interface RangeSliderProps {
    start: number
    end: number
    value: number
    onChange: ChangeEventHandler<HTMLElement>
}
const RangeSlider = ({ start, end, value, onChange }: RangeSliderProps) => {
    return (
        <div className="w-full flex flex-row mt-4">
            <p>{start}</p>
            <input type="range" min={start} max={end} value={value} className="appearance-none w-full px-2" onChange={onChange} />
            <p>{end}</p>
            <p className="ml-4">{value}</p>
        </div>
    )
}

export default RangeSlider