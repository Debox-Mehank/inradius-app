import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import SidebarCompany from "./SidebarCompany"

interface LayoutCompanyProps {
    children?: React.ReactNode
}

const LayoutCompany = ({ children }: LayoutCompanyProps) => {
    const status = useSelector((state: RootState) => state.companyRegistration.status)
    return (
        <div className='w-full h-full grid grid-cols-10 overflow-hidden'>
            {status !== "verification pending" && status !== "verification in-progress" && (
                <SidebarCompany />
            )}
            <div className={`w-full h-full ${status !== "verification pending" && status !== "verification in-progress" ? 'col-span-8' : 'col-span-10'} relative`}>
                {children}
                {/* Bg */}
                <div className="w-full h-full bg-cover bg-center absolute top-0 left-0 right-0 bottom-0 reg-bg opacity-10 -z-10"></div>
            </div>
        </div>
    )
}

export default LayoutCompany