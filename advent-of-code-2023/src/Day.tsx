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
      <div className="pl-20 pt-10">
        <h1>Day {number}</h1>
        <Link to="/">Home</Link>
      </div>
      <p className="text-xl font-mono pl-20 pr-20 pt-10 pb-10">
        Prompt: {prompt}
      </p>
      {children}
    </>
  );
};
