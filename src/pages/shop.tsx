import ActionBar from "@/modules/home/ActionBar";
import backgroundShop from "@/assets/game/background-shop.png";
import eggOne from "@/assets/game/egg-1.png";
import { useCollectionContract } from "@/hooks/useCollectionContract";
const ShopScreen = () => {
  const { address, sendMintNft } = useCollectionContract();
  return (
    <div className="relative h-screen">
      <ActionBar />
      <div>Collection Contract: {address}</div>
      <button className="rounded-lg bg-red-400 px-4 py-2 mt-2" onClick={() => sendMintNft()}>Mint nft</button>
      <div className="relative flex justify-center items-center w-full">
        <div className="w-9/12 absolute top-1/4 text-lg text-rose-700 text-3xl">
          <div className="grid grid-rows-2 grid-flow-col gap-4">
            <div className="bg-lime-100 h-40 rounded-lg">
              <img src={eggOne}></img>
            </div>
            <div className="bg-lime-100 rounded-lg">
              <img src={eggOne}></img>
            </div>
            <div className="bg-lime-100 rounded-lg">
              <img src={eggOne}></img>
            </div>
            <div className="bg-lime-100 rounded-lg">
              <img src={eggOne}></img>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-11/12">
          <img src={backgroundShop} alt="bg-shop" />
        </div>
      </div>
    </div>
  );
};

export default ShopScreen;
