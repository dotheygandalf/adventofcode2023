import "./App.css";
import { Day } from "./Day";
import { Day1 } from "./advent/day1/Day1";

const App = () => {
  return (
    <>
      <Day
        number={1}
        prompt="Find the first and last number. Then combine them to make a two
  digit number."
      >
        <Day1 />
      </Day>
      <footer className="text-right pt-10 pb-10 pr-10">
        © <a href="https://hellojonathanchang.com">Jonathan Chang</a> 2023
      </footer>
    </>
  );
};

export default App;
