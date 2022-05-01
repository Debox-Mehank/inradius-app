import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import SidebarItem from "./SidebarItem"

interface SidebarCompanyProps {
}

const SidebarCompany = ({ }: SidebarCompanyProps) => {
    const registration = useSelector((state: RootState) => state.registration)

    return (
        <div className='w-full h-full col-span-2 bg-darkGray text-white flex flex-col justify-between items-center'>
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
                <div className="w-12 h-12 rounded-full bg-white text-black font-bold grid place-items-center">MJ</div>
                <p className="text-md font-medium text-white">Mehank Jain</p>
            </div>
        </div>
    )
}

export default SidebarCompany