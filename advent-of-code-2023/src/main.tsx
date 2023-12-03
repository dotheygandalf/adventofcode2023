import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Day } from "./Day.tsx";
import { Day1 } from "./advent/day1/Day1.tsx";
import { Day2 } from "./advent/Day2.tsx";

console.log(import.meta.env.MODE);

const router = createHashRouter([
  {
    path: "/adventofcode2023",
    element: <App />,
  },
  {
    path: "/adventofcode2023/day1",
    element: (
      <>
        <Day
          number={1}
          prompt="Find the first and last number. Then combine them to make a two
digit number."
        >
          <Day1 />
        </Day>
      </>
    ),
  },
  {
    path: "/adventofcode2023/day2",
    element: (
      <>
        <Day
          number={2}
          prompt="Find the min number of each colored cubes needed for the draws to be possible."
        >
          <Day2 />
        </Day>
      </>
    ),
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <footer className="text-right pt-10 pb-10 pr-10">
      © <a href="https://hellojonathanchang.com">Jonathan Chang</a> 2023
    </footer>
  </React.StrictMode>
);
