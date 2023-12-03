import "./App.css";
import { Day } from "./Day";
import { Day1 } from "./advent/day1/Day1";

const App = () => {
  return (
    <Day
      number={1}
      prompt="Find the first and last number. Then combine them to make a two
  digit number."
    >
      <Day1 />
    </Day>
  );
};

export default App;
