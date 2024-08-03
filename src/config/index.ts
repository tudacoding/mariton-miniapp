

export const KEY_MARITON_AMBASSADOR = '💎 $MRT'
export const maritonChannelLink = 'https://t.me/MaritonAnn';
export const maritonChatLink = 'https://t.me/Mariton_Chat';
export const XLink = 'https://x.com/mariton_game';
export const XLink_2 = 'https://x.com/Mariton_game/status/1818542419107102893';

export const isTestnet = false;

export const DEPOSIT_WALLET = isTestnet ? "0QAszBVzU37ZyRzA0I5Dn-RZoY6qg2FtGWN4Q356vsR_3jX_" : "UQBJcYyhJcJDBN39BHd5V-2un3Dkgi7ExK1S9q3eIhHqPB_y";
export const MRT_ADDRESS = isTestnet ? "EQBAK2GFaOix6p9rRP2URa2Uf8Th8XvzuymnFPPycyUAGvCp" : "EQBnyp_7TXUXld965YwLnJB7p1jqZ72HCoJRzgdFinOpCVtR";
export const CLAIM_ADDRESS = isTestnet ? "EQAM3Wpq1IgEEffxq-riW0JU_mee_rIslQb3AWpmimV3aHj5" : "EQAZ_nYe8VsmWXmPuUdrnSN1Mv0ur88hNNpySNaZluN3Pt9M";

export default {
  apiUrl: isTestnet ? "https://api.vaffsiam.com/api" : "https://api.mariton.xyz/api",
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
