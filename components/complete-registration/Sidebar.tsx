import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import ProgressBar from "./ProgressBar"
import SidebarItem from "./SidebarItem"

interface SidebarProps {
}

const Sidebar = ({ }: SidebarProps) => {
    const registration = useSelector((state: RootState) => state.registration)
    const firstName = useSelector((state: RootState) => state.user.firstName)
    const lastName = useSelector((state: RootState) => state.user.lastName)
    return (
        <div className='w-full h-full col-span-2 bg-darkGray text-white flex flex-col justify-between items-center'>
            <div className="pt-8 pb-4 px-8">
                <ProgressBar />
            </div>
            <div className="w-full h-full flex flex-col gap-4 justify-start items-start pb-6 pt-4 px-6">
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
                <div className="w-12 h-12 rounded-full bg-white text-black font-bold grid place-items-center">{`${firstName![0]}${lastName![0]}`}</div>
            </div>
        </div>
    )
}

export default Sidebar