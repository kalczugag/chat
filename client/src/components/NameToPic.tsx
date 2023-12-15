import { splitAndExtractInitials } from "../utils/functions/getInitials";

type TNameToPicProps = {
    username: string;
};

const NameToPic = ({ username }: TNameToPicProps) => {
    return (
        <div className="flex justify-center items-center font-semibold w-10 h-10 bg-blue-main rounded-full">
            {splitAndExtractInitials(username)}
        </div>
    );
};

export default NameToPic;
