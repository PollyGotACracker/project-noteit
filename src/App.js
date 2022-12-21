import Home from "./comps/Home";
import VocaNote from "./comps/Voca/VocaNote";
import VocaDetail from "./comps/Voca/VocaDetail";
import Nav from "./page/Nav";
import "./css/App.css";
import NavRouter from "./page/NavRouter";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <NavRouter />
        <Nav />
      </BrowserRouter>
    </div>
  );
};

export default App;
