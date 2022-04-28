interface PageHeadingProps {
    text: string
}

const PageHeading = ({ text }: PageHeadingProps) => {
    return (
        <p className="text-2xl w-full text-center font-bold my-4">{text}</p>
    )
}

export default PageHeading