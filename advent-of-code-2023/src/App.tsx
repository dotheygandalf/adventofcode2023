import "./App.css";
import { plainText as input } from "../../data/day1/input_1.text";
import { IProcessed, processLine } from "../../terminal/day1/util";
import { useState } from "react";
import { useInterval } from "./hooks/useInterval";

const App = () => {
  const [count, setCount] = useState(0);
  const [output, setOutput] = useState<Array<IProcessed>>([]);
  const lines = input.split("\n");

  useInterval(() => {
    if (count < lines.length) {
      setOutput((prev) => {
        return [...prev, processLine(lines[count])];
      });
      setCount(count + 1);
    }
  }, 1000);

  return (
    <>
      <div>
        {output.map((line) => {
          return (
            <>
              <div>{line.line}</div>
              <div>{line.output}</div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default App;
