import Sidebar from "./Sidebar"

interface LayoutProps {
    children?: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='w-full h-full grid grid-cols-10'>
            <Sidebar />
            <div className='w-full h-full col-span-8 relative'>
                {children}
                {/* Bg */}
                <div className="w-full h-full bg-cover bg-center absolute top-0 left-0 right-0 bottom-0 reg-bg opacity-10 -z-10"></div>
            </div>
        </div>
    )
}

export default Layout