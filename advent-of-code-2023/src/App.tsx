import "./App.css";
import { plainText as input } from "../../data/day1/input_1.text";
import { IProcessed, processLine } from "../../terminal/day1/util";
import { useState } from "react";
import { useInterval } from "./hooks/useInterval";
import classNames from "classnames";

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
  }, 200);

  // console.log(output);

  return (
    <div className="m-auto w-max max-h-[500px] overflow-auto">
      <div className="grid grid-cols-2 gap-3">
        {output.reverse().map((line) => {
          return (
            <>
              <div className="w-96">
                {line.line.split("").map((char, index) => {
                  return (
                    <span
                      className={classNames({
                        "text-green-600":
                          (index >= line.firstNumber.start &&
                            index <=
                              line.firstNumber.start +
                                line.firstNumber.length) ||
                          (index >= line.secondNumber.start &&
                            index <=
                              line.secondNumber.start +
                                line.secondNumber.length),
                        "text-gray-400":
                          !(
                            index >= line.firstNumber.start &&
                            index <=
                              line.firstNumber.start + line.firstNumber.length
                          ) &&
                          !(
                            index >= line.secondNumber.start &&
                            index <=
                              line.secondNumber.start + line.secondNumber.length
                          ),
                      })}
                    >
                      {char}
                    </span>
                  );
                })}
              </div>
              <div>{line.output}</div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default App;
