import "./App.css";
import reactLogo from "../public/react.svg?inline";
import rsPackLogo from "../public/rspack.png";

const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <div>
        <img src={reactLogo} alt="React Logo" width={50} />
      </div>
      <div>
        <img src={rsPackLogo} alt="React Logo" height={100} />
      </div>
    </div>
  );
};

export default App;
