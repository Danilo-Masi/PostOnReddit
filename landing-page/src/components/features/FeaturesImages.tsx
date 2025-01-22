interface FeaturesImagesProps {
    imagePath: string;
    imageStyle: string
}

export default function FeaturesImages({ imagePath, imageStyle }: FeaturesImagesProps) {
    return (
        <img
            src={imagePath}
            alt="postonreddit features images"
            className={`w-[90%] absolute ${imageStyle}`} />
    );
}
