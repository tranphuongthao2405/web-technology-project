import "./App.css";
import Feed from "./Component/Feed/Feed";
import Header from "./Component/Header/Header";
import Sidebar from "./Component/Sidebar/Sidebar";
import Widget from "./Component/Widget/Widget";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="app__body">
        <Sidebar />
        <Feed />
        <Widget />
      </div>
    </div>
  );
}

export default App;
