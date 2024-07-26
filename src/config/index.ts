const isTestnet = true;
export const KEY_MARITON_AMBASSADOR = '💎 $MRT'
export const DEPOSIT_WALLET = "0QAszBVzU37ZyRzA0I5Dn-RZoY6qg2FtGWN4Q356vsR_3jX_";
export const ADDRESS_MRT = "EQBAK2GFaOix6p9rRP2URa2Uf8Th8XvzuymnFPPycyUAGvCp";
export const MRT_ADDRESS = "EQBAK2GFaOix6p9rRP2URa2Uf8Th8XvzuymnFPPycyUAGvCp";
export const CLAIM_ADDRESS = "EQAM3Wpq1IgEEffxq-riW0JU_mee_rIslQb3AWpmimV3aHj5"
export default {
  apiUrl: "https://mariton-backend.onrender.com/api",
  // apiUrl: "http://localhost:1337/api",
  docs: "https://docs.mariton.xyz",
  faq: "https://docs.mariton.xyz",
  twitter: "https://x.com/Mariton_game",
  telegram: "https://t.me/Mariton_Chat",
  likePost: 'https://x.com/Mariton_game/status/1790663138108723575',
  retweet: 'https://x.com/Mariton_game/status/1790663138108723575',
  annoucementTelegram: 'https://t.me/MaritonAnn',
  botTele: isTestnet ? 'https://t.me/testnet_mariton_bot?start=' : 'https://t.me/mariton_bot?start=',
  tonViewer: isTestnet ? 'https://testnet.tonviewer.com/transaction/' : 'https://tonviewer.com/transaction/',
  tonApi: isTestnet ? 'https://testnet.toncenter.com/api/v3/' : 'https://toncenter.com/api/v3/',
};
