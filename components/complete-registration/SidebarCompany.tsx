import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import ProgressBar from "./ProgressBar"
import ProgressBarCompany from "./ProgressBarCompany"
import SidebarItem from "./SidebarItem"

interface SidebarCompanyProps {
}

const SidebarCompany = ({ }: SidebarCompanyProps) => {
    const registration = useSelector((state: RootState) => state.companyRegistration)
    const companyname = useSelector((state: RootState) => state.user.companyName)
    return (
        <div className='w-full h-full col-span-2 bg-darkGray text-white flex flex-col justify-between items-center'>
            <div className="pt-8 pb-4 px-8">
                <ProgressBarCompany />
            </div>
            <div className="w-full h-full flex flex-col gap-4 justify-start items-start p-6">
                {registration.location && (
                    <SidebarItem text={registration.location.value} />
                )}
                {registration.radius && (
                    <SidebarItem text={registration.radius + " km"} />
                )}
                {registration.industry && (
                    <SidebarItem text={registration.industry.value} />
                )}
                {registration.domain && (
                    <SidebarItem text={registration.domain.value} />
                )}
                {registration.qualification && (
                    <SidebarItem text={registration.qualification.value} />
                )}
                {registration.skill1 && (
                    <SidebarItem text={registration.skill1.value} />
                )}
                {registration.skill2 && (
                    <SidebarItem text={registration.skill2.value} />
                )}
                {registration.skill3 && (
                    <SidebarItem text={registration.skill3.value} />
                )}
                {registration.skill4 && (
                    <SidebarItem text={registration.skill4.value} />
                )}
            </div>
            <div className="bg-primary p-6 w-full justify-self-end flex justify-center items-center gap-4 rounded-t-md">
                <p className="text-md font-medium text-white">{companyname !== undefined && companyname !== null ? companyname : ""}</p>
            </div>
        </div>
    )
}

export default SidebarCompany