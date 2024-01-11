import { splitAndExtractInitials } from "../utils/functions/getInitials";

export enum Size {
    Small = "w-3 h-3",
    Medium = "w-9 h-9",
    Large = "w-10 h-10",
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

const Avatar = ({ content, size, className }: Props) => {
    return (
        <>
            {isImage(content) ? (
                <img
                    src={content}
                    alt="User avatar"
                    className={`rounded-full ${size} ${className}`}
                />
            ) : (
                <div
                    className={`flex justify-center items-center font-semibold bg-orange-main text-gray-100 rounded-full ${
                        size === Size.Small ? "text-xs" : "text-md"
                    } ${className} ${size}`}
                >
                    {splitAndExtractInitials(content)}
                </div>
            )}
        </>
    );
};

export default Avatar;
