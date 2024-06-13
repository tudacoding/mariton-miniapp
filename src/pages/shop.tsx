/* eslint-disable @typescript-eslint/ban-types */
import ActionBar from "@/modules/home/ActionBar";
// import headerBgShop from "@/assets/game/header-bg-shop.png";
// import bodyBgShop from "@/assets/game/body-bg-shop.png";
import bgShopComingSoon from "@/assets/game/background-shop-coming-soon.png";
// import eggFire from "@/assets/game/egg-fire.png";
// import eggWater from "@/assets/game/egg-water.png";
// import eggForest from "@/assets/game/egg-forest.png";
// import { useCollectionContract } from "@/hooks/useCollectionContract";

// interface IProps {
//   type: string;
//   sendMintNft: Function;
//   loaded: boolean;
// }

// interface IEggCard {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   egg: any;
//   name: string;
//   type: string;
//   sendMintNft: Function;
//   price: number;
//   loaded: boolean;
// }

// const ButtonBuy = (props: IProps) => {
//   return (
//     <button
//       className={`rounded-full px-4 py-1 text-white font-bold  ${
//         props.loaded ? "hover:bg-green-700" : ""
//       } ${props.loaded ? "bg-green-500" : "bg-gray-500"}`}
//       onClick={() => {
//         if (props.loaded) props.sendMintNft(props.type);
//       }}
//     >
//       Buy
//     </button>
//   );
// };

// const EggCard = (props: IEggCard) => {
//   return (
//     <div className="bg-lime-100 flex flex-col items-center font-bold rounded-lg p-4">
//       <div className="bg-white flex justify-center rounded-lg p-4 w-full border border-orange-800">
//         <img src={props.egg}></img>
//       </div>
//       <div className="text-amber-900 text-center mt-2">{props.name}</div>
//       <div className="w-full flex justify-between items-center mt-2">
//         <div className="flex text-orange-400">
//           {props.price} <span className="ml-1 md:block hidden">TON</span>
//         </div>
//         <ButtonBuy
//           loaded={props.loaded}
//           type={props.type}
//           sendMintNft={props.sendMintNft}
//         />
//       </div>
//     </div>
//   );
// };

const ShopScreen = () => {
  // const { loaded, mintPrice, maxQuantity, curentIndex, sendMintNft } =
  //   useCollectionContract();
  return (
    <div className="h-screen">
      <ActionBar />
      <div className="flex flex-col justify-center pt-[60px] overflow-auto">
      <img src={bgShopComingSoon} alt="bg-shop" className=" p-4" />
        {/* <img src={headerBgShop} alt="bg-shop" />
        <div className="relative flex justify-center">
          <img src={bodyBgShop} alt="body-bg-shop" />
          <div className="absolute top-8 font-lalezar text-amber-600 text-2xl">
            Coming Soon!
          </div>
        </div> */}
        {/* <div className="w-9/12 absolute top-1/5">
          <div className="font-bold text-orange-800 flex justify-between p-2 mb-8">
            <div>Max Quantity: {maxQuantity || 0}</div>
            <div>Minted Eggs: {curentIndex}</div>
          </div>
          <div className="w-full grid grid-rows-2 grid-flow-col gap-4">
            <EggCard
              loaded={loaded}
              price={mintPrice || 0}
              sendMintNft={sendMintNft}
              egg={eggFire}
              name="Fire Dragon"
              type="fire"
            />
            <EggCard
              loaded={loaded}
              price={mintPrice || 0}
              sendMintNft={sendMintNft}
              egg={eggWater}
              name="Water Turtle"
              type="water"
            />
            <EggCard
              loaded={loaded}
              price={mintPrice || 0}
              sendMintNft={sendMintNft}
              egg={eggForest}
              name="Tree Beetle"
              type="forest"
            />
            <EggCard
              loaded={loaded}
              price={mintPrice || 0}
              sendMintNft={sendMintNft}
              egg={eggFire}
              name="Fire Dragon"
              type="fire"
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ShopScreen;
