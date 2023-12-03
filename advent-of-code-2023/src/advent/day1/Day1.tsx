import { plainText as input } from "../../../../data/day1/input_1.text";
import { processLine } from "../../../../terminal/day1/util";
import { renderLine } from "../../utils/LineRendering";

export const Day1 = () => {
  const lines = input.split("\n");

  const output = lines.map((line) => {
    return processLine(line);
  });
  return (
    <>
      <div className="m-auto font-mono text-3xl pl-20 pt-10">
        <div className="grid grid-cols-2">
          {output.map((line) => {
            return (
              <>
                <div>
                  {renderLine(line.line.toUpperCase().split(""), [
                    {
                      length: line.firstNumber.length,
                      start: line.firstNumber.start,
                    },
                    {
                      length: line.secondNumber.length,
                      start: line.secondNumber.start,
                    },
                  ])}
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
