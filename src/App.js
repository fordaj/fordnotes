import "./App.css"
import NavBar from "./components/NavBar/NavBar"
import {Pages} from "./components/NavBar/Pages"

export default function App() {
  return (
    <div className="App">
      <NavBar Pages={Pages}/>
    </div>
  );
}