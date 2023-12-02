import "./App.css";
import { plainText as input } from "../../data/day1/input_1.text";
import { run } from "../../terminal/day1/util";

const App = () => {
  console.log(input);
  run(input.split("\n"));
  return <></>;
};

export default App;
