import Nav from "./page/Nav";
import Music from "./comps/Music";
import "./css/App.css";
import NavRouter from "./page/NavRouter";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Music />
        <NavRouter />
        <Nav />
      </BrowserRouter>
    </div>
  );
};

export default App;
