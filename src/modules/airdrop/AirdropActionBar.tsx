import walletButton from "@/assets/game/wallet-button.png";
import addButton from "@/assets/game/add-button.png";
import BaseImage from "@/components/BaseImage";

const AirdropActionBar = () => {
    return (
        <div className={`w-full font-bold p-4 flex justify-between absolute top-0`}>
            <div className="flex justify-start">
                <BaseImage width={"80%"} src={addButton} alt="add-button" />
            </div>
            <div className="flex items-center">
                <BaseImage width={"80%"} src={walletButton} alt="wallet-button" />
            </div>
        </div>
    );
};

export default AirdropActionBar;
