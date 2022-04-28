import { SubmitHandler, useForm } from "react-hook-form"
import { FormTemplateType } from "../../utils/custom_types"
import ReusableButton from "./ReusableButton"

interface ResuableFormProps {
  template: FormTemplateType
  onSubmit: (values: any) => void
}

const ReusableForm = ({ template, onSubmit }: ResuableFormProps) => {

  const { register, handleSubmit, formState: { errors } } = useForm()

  const renderFields = () => {
    return (
      <>
        <div className={`w-full grid grid-cols-none gap-4 py-4 lg:py-5`}>
          {template.fields.map((field, idx) => {
            return (
              <div key={idx} className={`flex flex-col w-full justify-start ${field.cols}`}>
                <input type={field.type.toString()} className={`bg-white px-2 py-3 lg:px-4 rounded-md focus-visible:outline-none text-xs w-full`} placeholder={field.title} {...register(field.name, field.validation)} />
                {errors[field.name] && (
                  <p className="text-xs text-red-500 px-1 font-medium py-1">{errors[field.name]['message']}</p>
                )}
                {field.desc && (
                  field.desc
                )}
              </div>
            )
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
        <ReusableButton bg="bg-primary" title={template.buttonText} text="text-white" type="submit" />
      </div>
    </form>
  )
}

export default ReusableForm