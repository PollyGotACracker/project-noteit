import Main from "./comps/Main";
import VocaNote from "./comps/Voca/VocaNote";
import VocaDetail from "./comps/Voca/VocaDetail";
import Nav from "./comps/Nav";
import "./css/App.css";

const App = () => {
  return (
    <div className="App">
      <Main />
      <Nav />
    </div>
  );
};

export default App;
