import walletButton from "@/assets/game/wallet-button.png";
import addButton from "@/assets/game/add-button.png";
import BaseImage from "@/components/BaseImage";

interface IProps {
    isUseAbsolute?: boolean;
}

const AirdropActionBar = (props: IProps) => {
    return (
        <div
            className={`w-full font-bold text-center items-end p-4 flex justify-between ${props.isUseAbsolute
                ? "absolute top-0 left-1/2 transform -translate-x-1/2"
                : ""
                }`}
        >
            <div className="flex justify-start">
                <BaseImage width={"80%"} src={addButton} alt="add-button" />
            </div>

            <div className="flex justify-end">
                <BaseImage width={"80%"} src={walletButton} alt="wallet-button" />
            </div>
        </div>
    );
};

export default AirdropActionBar;
