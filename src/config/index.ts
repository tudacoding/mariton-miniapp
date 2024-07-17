const isTestnet = true;

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
};
