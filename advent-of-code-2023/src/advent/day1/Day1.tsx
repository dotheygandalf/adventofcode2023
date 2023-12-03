import { plainText as input } from "../../../../data/day1/input_1.text";
import { processLine } from "../../../../terminal/day1/util";
import classNames from "classnames";

export const Day1 = () => {
  const lines = input.split("\n");

  const output = lines.map((line) => {
    return processLine(line);
  });
  return (
    <>
      <h1>Day 1</h1>
      <p className="text-xl font-mono pl-20 pr-20 pt-10">
        Prompt: Find the first and last number. Then combine them to make a two
        digit number.
      </p>
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
