import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, all, average }) => {
  const avgscore = average.reduce((total, num) => total + num, 0) / all;
  const positive = (good / all) * 100 + " %";
  if (all === 0) {
    return (
      <div>
        <div>No feedback given</div>
      </div>
    );
  }

  return (
    <div>
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={avgscore} />
        <StatisticLine text="positive" value={positive} />
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState([]);

  const handleGoodClick = () => {
    setAll(all + 1);
    setGood(good + 1);
    setAverage(average.concat(1));
  };

  const handleNeutralClick = () => {
    setAll(all + 1);
    setNeutral(neutral + 1);
    setAverage(average.concat(0));
  };

  const handleBadClick = () => {
    setAll(all + 1);
    setBad(bad + 1);
    setAverage(average.concat(-1));
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good"></Button>
      <Button handleClick={handleNeutralClick} text="neutral"></Button>
      <Button handleClick={handleBadClick} text="bad"></Button>
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
      ></Statistics>
    </div>
  );
};

export default App;
