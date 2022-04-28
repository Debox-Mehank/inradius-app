import { useSelector } from 'react-redux'
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { RootState } from '../../app/store'

const ProgressBar = () => {
    const progress = useSelector((state: RootState) => state.registration.progress)
    return (
        <div className="w-36 h-36 rounded-full">
            <CircularProgressbarWithChildren value={progress} strokeWidth={5} minValue={0} maxValue={100} background={true} styles={buildStyles({
                backgroundColor: `${progress.toFixed(1) === "100.0" ? '#e55d29' : 'transparent'}`,
                textColor: "white",
                pathColor: "#e55d29",
                trailColor: "#e7e7e7",
                textSize: "14px",
                strokeLinecap: "rounded",
            })}>
                {progress.toFixed(1) === "100.0" ? <FontAwesomeIcon icon={faCheckCircle} size="4x" /> :
                    <div className='flex flex-col justify-center items-center'>
                        <p className="text-2xl font-bold text-white">{`${progress.toFixed(1)}%`}</p>
                        <p className="text-md font-medium text-white">Progress</p>
                    </div>
                }
            </CircularProgressbarWithChildren>
        </div>
    )
}

export default ProgressBar