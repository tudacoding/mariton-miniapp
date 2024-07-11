import { ClaimMRT } from "@/contract/claim";
import { useGetFirstRegister } from "@/hooks/useGetFirstRegister";
import { useMaritonToken } from "@/hooks/useMaritonToken";
import { address, beginCell, toNano } from "@ton/core";
import { mnemonicToWalletKey, sign } from '@ton/crypto';
const TestScreen = () => {
    const { account } = useGetFirstRegister();
    const { wallet, tonBalance, mrtBalance, mintMRT, MintClose, claimMRT, withdrawTon, loaded } = useMaritonToken()
    const handleClaim = async () => {
        const mnemonics: string[] = 'left foam sniff safe current crop prison dutch manage pole recall survey spoon swamp garbage rabbit perfect tilt eager topic crew police raw leopard'.split(' ');
        const token: bigint = toNano("1000");
        const nonce: bigint = 125n;
        console.log(account)
        const signatureData = beginCell().storeInt(nonce, 32).storeAddress(wallet).storeCoins(token).endCell();
        const keyPair = await mnemonicToWalletKey(mnemonics);
        const signature = sign(signatureData.hash(), keyPair.secretKey);
        const signatureCell = beginCell().storeBuffer(signature).endCell();
        const buildMessage: ClaimMRT = {
            $$type: "ClaimMRT",
            nonce,
            amount: token,
            signature: signatureCell
        }
        return await claimMRT(buildMessage)
    }
    return (
        <div className="h-screen">
            <ol className="mt-2 list-decimal list-inside space-y-2 text-lg">
                <li>publicKey: {account.publicKey}</li>
                <li>Wallet: {wallet.toString()}</li>
                <li>Ton Balance: {Number(tonBalance).toFixed(2)}</li>
                <li>MRT Balance: {Number(mrtBalance)}</li>
            </ol>
            <div className="mt-2 flex space-x-1">
                <button className="h-10 bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-6 rounded-md" onClick={mintMRT}>Mint MRT</button>
                <button className="h-10 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-6 rounded-md" onClick={handleClaim}>Claim MRT</button>
            </div>
            <div className="mt-2 flex space-x-1">
                <button className="h-10 bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-6 rounded-md" onClick={MintClose}>Mint Close</button>
                <button className="h-10 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-6 rounded-md">Withdraw MRT</button>
                <button className="h-10 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-6 rounded-md" onClick={withdrawTon}>Withdraw TON</button>
            </div>
        </div>
    );
};

export default TestScreen;
