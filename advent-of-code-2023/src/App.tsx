import { Link } from "react-router-dom";
import "./App.css";

const days = [1, 2];

const App = () => {
  return (
    <>
      {days.map((day) => {
        return (
          <h1>
            <Link to={`day${day}`}>Day {day}</Link>
          </h1>
        );
      })}
    </>
  );
};

export default App;
