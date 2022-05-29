import { useEffect, useState } from "react";
import { User, UserRole } from "../../../generated/graphql";
import EmployeeSidebar from "../employee/employee.sidebar.component";
import EmployerSidebar from "../employer/employer.sidebar.component";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const myFunc = () => {
      const user: User = JSON.parse(localStorage.getItem("user")!);
      setUser(user);
    };
    myFunc();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="w-full h-full grid grid-cols-10 overflow-hidden">
      {user.type === UserRole.Employee && (
        <EmployeeSidebar
          firstName={user.firstName}
          lastName={user.lastName}
          image={user.image}
        />
      )}
      {user.type === UserRole.Employer && (
        <EmployerSidebar
          firstName={user.firstName}
          lastName={user.lastName}
          image={user.image}
        />
      )}
      <div className="w-full h-full col-span-8 relative">
        {children}
        {/* Bg */}
        <div className="w-full h-full bg-cover bg-center absolute top-0 left-0 right-0 bottom-0 reg-bg opacity-10 -z-10"></div>
      </div>
    </div>
  );
};

export default Layout;
