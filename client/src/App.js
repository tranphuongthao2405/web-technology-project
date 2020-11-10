import "./App.css";
import Feed from "./Component/Feed/Feed";
import Header from "./Component/Header/Header";
import Login from "./Component/Login/Login";
import Sidebar from "./Component/Sidebar/Sidebar";
import Widget from "./Component/Widget/Widget";
import { useStateValue } from "./Hoc/StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />
          <div className="app__body">
            <Sidebar />
            <Feed />
            <Widget />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
