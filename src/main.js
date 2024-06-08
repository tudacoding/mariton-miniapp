"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("react-dom/client");
var App_1 = require("./App");
require("./index.css");
var ui_react_1 = require("@tonconnect/ui-react");
// this manifest is used temporarily for development purposes
var manifestUrl = "https://mariton.xyz/tonconnect-manifest.json";
client_1.default.createRoot(document.getElementById("root")).render(<ui_react_1.TonConnectUIProvider manifestUrl={manifestUrl}>
    <App_1.default />
  </ui_react_1.TonConnectUIProvider>);
