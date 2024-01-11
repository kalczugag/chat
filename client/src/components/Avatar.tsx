export enum Size {
    Small = "w-3 h-3",
    Medium = "w-9 h-9",
    Large = "w-10 h-10",
}

type Props = {
    children: React.ReactNode;
    size: Size;
    className?: string;
};

const Avatar = ({ children, size, className }: Props) => {
    return (
        <div
            className={`flex justify-center items-center font-semibold bg-orange-main text-gray-100 rounded-full ${
                size === Size.Small ? "text-xs" : "text-md"
            } ${className} ${size}`}
        >
            {children}
        </div>
    );
};

export default Avatar;
