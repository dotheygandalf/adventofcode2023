import { ReactNode } from "react";
import { Link } from "react-router-dom";

export const Day = ({
  number,
  prompt,
  children,
}: {
  number: number;
  prompt: string;
  children: ReactNode;
}) => {
  return (
    <>
      <h1>Day {number}</h1>
      <Link to="/adventofcode2023">Home</Link>
      <p className="text-xl font-mono pl-20 pr-20 pt-10">Prompt: {prompt}</p>
      {children}
    </>
  );
};
