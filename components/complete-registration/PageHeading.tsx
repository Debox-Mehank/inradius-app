interface PageHeadingProps {
    text: string
    desc?: string
}

const PageHeading = ({ text, desc }: PageHeadingProps) => {
    return (
        <>
            <p className={`text-2xl w-full text-center font-bold ${desc ? 'mt-4' : 'my-4'}`}>{text}</p>
            {desc && (
                <p className="text-xs w-full text-center text-gray-500 font-medium mb-4">{desc}</p>
            )}
        </>
    )
}

export default PageHeading