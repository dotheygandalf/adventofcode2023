import { ReactNode } from "react";

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
      <p className="text-xl font-mono pl-20 pr-20 pt-10">Prompt: {prompt}</p>
      {children}
    </>
  );
};
