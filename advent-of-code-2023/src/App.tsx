import "./App.css";
import { plainText as input } from "../../data/day1/input_1.text";
import { processLine } from "../../terminal/day1/util";
import classNames from "classnames";

const App = () => {
  const lines = input.split("\n");

  const output = lines.map((line) => {
    return processLine(line);
  });

  return (
    <>
      <h1>Day 1</h1>
      <div className="m-auto font-mono text-3xl pl-20 pt-10">
        <div className="grid grid-cols-2">
          {output.map((line) => {
            return (
              <>
                <div>
                  {line.line
                    .toUpperCase()
                    .split("")
                    .map((char, index) => {
                      console.log(
                        index,
                        !(
                          index >= line.firstNumber.start &&
                          index <=
                            line.firstNumber.start + line.firstNumber.length
                        ) &&
                          !(
                            index >= line.secondNumber.start &&
                            index <=
                              line.secondNumber.start + line.secondNumber.length
                          )
                      );
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
                            "text-gray-800":
                              !(
                                index >= line.firstNumber.start &&
                                index <=
                                  line.firstNumber.start +
                                    line.firstNumber.length
                              ) &&
                              !(
                                index >= line.secondNumber.start &&
                                index <=
                                  line.secondNumber.start +
                                    line.secondNumber.length
                              ),
                          })}
                        >
                          {char}
                        </span>
                      );
                    })}
                </div>
                <div className="text-right pr-20">{line.output}</div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;
