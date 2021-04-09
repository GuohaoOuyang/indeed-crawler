import "./App.css";
import Main from "./components/Main";
import { GlobalState } from "./context/GlobalState";

function App() {
  return (
    <>
      <div>
        <h1>SavvyPro Demo</h1>
        <GlobalState>
          <Main />
        </GlobalState>
      </div>
    </>
  );
}

export default App;
