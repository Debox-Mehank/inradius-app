import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import { FieldValues, FormState, UseFormHandleSubmit, UseFormRegister, UseFormWatch } from "react-hook-form"
import { FormTemplateType } from "../../utils/custom_types"
import ReusableButton from "./ReusableButton"

interface ResuableFormProps {
  template: FormTemplateType
  onSubmit: (values: any) => void
  register: UseFormRegister<FieldValues>
  handleSubmit: UseFormHandleSubmit<FieldValues>
  formState: FormState<FieldValues>
  watch: UseFormWatch<FieldValues>
  setCounter: React.Dispatch<React.SetStateAction<number>>
  loading: string
}

const ReusableForm = ({ loading, template, onSubmit, register, handleSubmit, formState: { errors }, watch, setCounter }: ResuableFormProps) => {

  const [showPass, setShowPass] = useState<any[string]>([])

  useEffect(() => {
    const passFields = template.fields.filter((el) => el.type === "password")
    const arr: any[string] = []
    passFields.map((el) => {
      arr[el.name] = { name: el.name, show: false }
    })
    setShowPass(arr)
  }, [])


  const renderFields = () => {
    return (
      <>
        <div className={`w-full grid grid-cols-none gap-4 py-4 lg:py-5`}>
          {template.fields.map((field, idx) => {
            if (field.type === "password") {
              return (
                <div key={idx} className={`flex flex-col w-full justify-end ${field.cols}`}>
                  {watch(field.name) !== "" && watch(field.name) !== undefined && (
                    <p className="text-xs text-white px-1 font-medium py-1">{field.title}</p>
                  )}
                  <div className="flex w-full relative">
                    <input type={showPass[field.name] && showPass[field.name].show ? "text" : "password"} className={`bg-white px-2 py-3 lg:px-4 lg:pr-8 rounded-md focus-visible:outline-none text-xs w-full`} placeholder={field.title} {...register(field.name, field.validation)} />
                    <FontAwesomeIcon icon={showPass[field.name] && showPass[field.name].show ? faEyeSlash : faEye} className="text-gray-500 right-2 absolute cursor-pointer" style={{
                      top: "50%",
                      transform: "translateY(-50%)"
                    }} size={"xs"} onClick={() => {
                      setShowPass((prevArr: any[string]) => {
                        if (prevArr[field.name]) {
                          prevArr[field.name].show = !prevArr[field.name].show
                        }
                        return prevArr
                      })
                      setCounter((prev) => prev + 1)
                    }} />
                  </div>
                  {errors[field.name] && (
                    <p className="text-xs text-red-500 px-1 font-medium py-1">{errors[field.name]['message']}</p>
                  )}
                  {field.desc && (
                    field.desc
                  )}
                </div>
              )
            } else {
              return (
                <div key={idx} className={`flex flex-col w-full justify-end ${field.cols}`}>
                  {watch(field.name) !== "" && watch(field.name) !== undefined && (
                    <p className="text-xs text-white px-1 font-medium py-1">{field.title}</p>
                  )}
                  <input type={field.type.toString()} className={`bg-white px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-xs w-full`} placeholder={field.title} {...register(field.name, field.validation)} />
                  {errors[field.name] && (
                    <p className="text-xs text-red-500 px-1 font-medium py-1">{errors[field.name]['message']}</p>
                  )}
                  {field.desc && (
                    field.desc
                  )}
                </div>
              )
            }
          })}
        </div>
      </>
    )
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <h4 className={`text-2xl lg:text-3xl font-bold text-white text-center py-2`}>{template.title}</h4>
      {renderFields()}
      <div className="w-full text-center">
        <ReusableButton loading={loading} bg="bg-primary" title={template.buttonText} text="text-white" type="submit" />
      </div>
    </form>
  )
}

export default ReusableForm