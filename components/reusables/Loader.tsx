import { useSelector } from "react-redux"
import { RootState } from "../../app/store"

const Loader = () => {
    const loading = useSelector((state: RootState) => state.common.loading)
    return (
        <div className={`w-screen h-screen z-50 bg-black bg-opacity-50 backdrop-blur-sm absolute grid place-items-center transition-all ${loading ? 'visible opacity-100' : 'hidden opacity-0'}`}>
            <div className='w-40 bg-white py-8 grid place-items-center rounded-lg'>
                <svg className="animate-spin h-12 w-12 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <br />
                <h4 className='font-bold text-xl animate-bounce'>Loading<span className='animate-pulse'>...</span> </h4>
            </div>
        </div >
    )
}

export default Loader