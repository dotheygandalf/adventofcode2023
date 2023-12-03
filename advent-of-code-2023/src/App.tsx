import { Link } from "react-router-dom";
import "./App.css";

const days = [1, 2];

const App = () => {
  return (
    <>
      <h1>Advent of Code 2023</h1>
      {days.map((day) => {
        return (
          <h2>
            <Link to={`day${day}`}>Day {day}</Link>
          </h2>
        );
      })}
    </>
  );
};

export default App;
