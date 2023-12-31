import { splitAndExtractInitials } from "../utils/functions/getInitials";

export enum Size {
    Small = 3,
    Medium = 9,
    Large = 10,
}

type Props = {
    content: string;
    size: Size;
    className?: string;
};

const isImage = (url: string): boolean => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"]; // Add more extensions if needed
    const extension = url.split(".").pop()?.toLowerCase();
    return extension ? imageExtensions.includes(extension) : false;
};

const NameToPic = ({ content, size, className }: Props) => {
    return (
        <>
            {isImage(content) ? (
                <img
                    src={content}
                    alt="User avatar"
                    className={`w-${size} h-${size} rounded-full ${className}`}
                />
            ) : (
                <div
                    className={`flex justify-center items-center font-semibold w-${size} h-${size} bg-orange-main text-gray-100 rounded-full ${
                        size === Size.Small ? "text-xs" : "text-md"
                    } ${className}`}
                >
                    {splitAndExtractInitials(content)}
                </div>
            )}
        </>
    );
};

export default NameToPic;
