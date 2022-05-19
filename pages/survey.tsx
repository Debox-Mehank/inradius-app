import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import SurveyButton from '../components/reusables/SurveyButton'
import type { NextPage } from "next"
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import type { SurveyType } from '../utils/custom_types'
import { api } from '../utils/AxiosClient'
import { UserType } from '../features/userSlice'

function Survey() {
  const router = useRouter()
  const [questions, setQuestions] = useState<SurveyType[]>([{ question: "Would it improve your health if your job is within 10 kms of your house?", options: ["Yes", "No"] }, { question: "How much time do you spend on travelling?", options: ["30 mins", "50 mins"] }, { question: "How much time do you lose with your family due to travelling?", options: ["30 mins", "50 mins"] }])
  const [progress, setProgress] = useState(1)
  const answers: string[] = []
  const user = useSelector((state: RootState) => state.user)
  const clickHandler = async (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLButtonElement;
    if ((progress - 1) < questions.length - 1) {
      setProgress(prev => ++prev)
      answers.push(target.outerText)
    }
    else {
      const id = localStorage.getItem("id")
      await api.post("update", { id, isSurveyComplete: true })
      const userDetails = await api.post("user", { id })
      if (userDetails.data.user !== null) {
        if (userDetails.data.user.type === UserType.employee) {
          router.push("/complete-registration?page=location")
        }
        else {
          router.push("/complete-verification?page=upload-documents")
        }
      }
    }
  }
  return (
    <React.Fragment>
      <div className='flex flex-col items-center m-8'>
        <div className='inline text-gray-400 tracking-widest text-md'>
          {`${progress}`} &nbsp;&nbsp; / &nbsp;&nbsp; {`${questions?.length}`}
        </div>
        <div className='font-medium text-xl tracking-wide mx-8 mt-8'>{questions![progress - 1].question}</div>
        <div className='font-lightbold text-md text-gray-400 tracking-widest m-8'>Select one option</div>
        {questions && questions![progress - 1].options.map(option => <SurveyButton onClick={clickHandler} key={option} title={option} />)}
      </div>
    </React.Fragment>
  )
}

export default Survey
