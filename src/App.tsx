import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CounterApp from "./modules/Counter";
import "@twa-dev/sdk";

function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-3xl font-bold underline">Hello Mariton!</h1>
      <div>Mario on TON blockchain</div>
      <CounterApp />
    </>
  );
}

export default App;
