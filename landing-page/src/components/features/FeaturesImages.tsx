interface FeaturesImagesProps {
    text: string;
    imagePath: string;
    imageStyle: string
}

export default function FeaturesImages({ text, imagePath, imageStyle }: FeaturesImagesProps) {
    return (
        <>
            <h1 className='text-4xl max-w-[90%] md:max-w-[75%] font-bold text-background mt-5'>
                {text}
            </h1>
            <img
                src={imagePath}
                className={`w-[90%] h-auto rounded-xl absolute ${imageStyle}`} />
        </>
    );
}