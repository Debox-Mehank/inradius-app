import { TailSpin } from '@agney/react-loading'
import React, {useEffect, useState} from 'react'
import DashboardButton from '../components/reusables/DashboardButton'
import Logo from '../components/reusables/Logo'
import LogoWhite from '../components/reusables/LogoWhite'
import ProfileDisplay from '../components/reusables/ProfileDisplay'
import { api } from '../utils/AxiosClient'

function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [current, setCurrent] = useState<string>("explore")
  const [loading, setLoading] = useState<boolean>(true)
  const [myInterest, setMyInterest] = useState<any>([])
  useEffect(() => {
    const getData = async () => {
    setLoading(true)
    const id = localStorage.getItem("id")
    const response = await api.post("get-interest", {id})
    console.log(response.data)
    setData(response.data)
    setLoading(false)
    }
    getData()
  }, [])
  const clickHandler = async (index: any, companyName : any, jobTitl : string, jobDesc: string, fromPay:any, toPay:any) => {
    setMyInterest([...myInterest, {companyName, jobTitl, jobDesc, fromPay, toPay}])
    setData(data.filter((ind:any, i:any) => i !== index))
    console.log("key is", index)
  }
  return (
    <>
    <header className='h-[20%] fixed inset-0 bg-white'>
    <div className='z-50 py-4 sm:py-4 fixed sm:px-4 px-4 top-0 left-0 right-0 hidden lg:block'>
                    <div className='z-50 flex justify-center items-center w-24 h-24 lg:w-28 lg:h-28'>
                        <Logo />
                    </div>
                </div>
                {/* Logo White */}
                <div className='z-50 py-4 sm:py-4 sm:px-4 px-4 fixed top-0 left-0 right-0 lg:hidden'>
                    <div className='z-50 flex justify-center items-center w-24 h-24 lg:w-28 lg:h-28'>
                        <LogoWhite />
                    </div>
                </div>
    </header>
    <div className='flex mt-[9rem] flex-row'>
      <div className='basis-[20%] flex flex-col items-center'>
        <div className='bg-primary fixed w-[18rem] rounded-t-3xl flex flex-col items-center pt-8 h-full'>
        <DashboardButton width='md:w-4/5 w-4/5' title="Explore" clicked={false} onClick={() => setCurrent("explore")}/>
        <DashboardButton width='md:w-4/5 w-4/5' title="My Interests" clicked={false} onClick={() => setCurrent("my interest")}/>
        <DashboardButton width='md:w-4/5 w-4/5' title="Interested In Me" clicked={false} onClick={() => setCurrent("interested in me")}/>
        <DashboardButton width='md:w-4/5 w-4/5' title="Saved For Later" clicked={false} onClick={() => setCurrent("save for later")}/>
        </div>
      </div>
      <div className='basis-[80%] flex flex-col'>
        <div className='px-8'>
        {loading === true ? <TailSpin width={20} loading={loading} currentColor="#000000"/> :
        current === "explore" ?? (data !== null && data !== undefined) ? data!.map((ind : any, i : any) => <ProfileDisplay key={i} index={i} companyName={ind.companyName} jobDesc={ind.jobDesc} jobTitle={ind.jobTitle} fromPay={ind.fromPay} toPay={ind.toPay} onClick={clickHandler} noInt={false}/>) : null}
        {current === "my interest" ? myInterest === [] ? <div>No Interest shown</div> : myInterest.map((ind : any, i : any) => <ProfileDisplay key={i} companyName={ind.companyName} jobDesc={ind.jobDesc} jobTitle={ind.jobTitle} fromPay={ind.fromPay} toPay={ind.toPay} noInt={true}/>):null}
        {current === "interested in me" ?? "hey interest"}
        {current === "save for later" ?? "hey i am yash"}
    </div>
    </div>
    </div>
    </>
  )
}

export default Dashboard