// Time:        40     81     77     72
// Distance:   219   1012   1365   1089

export const parseInput = (input: string[]) => {
  const totalTimes = input[0]
    .split(":")[1]
    .split(" ")
    .filter((input) => input !== "")
    .map((input) => parseInt(input));

  const targetDistances = input[1]
    .split(":")[1]
    .split(" ")
    .filter((input) => input !== "")
    .map((input) => parseInt(input));

  return totalTimes.map((totalTime, index) => {
    return {
      totalTime,
      targetDistance: targetDistances[index],
    };
  });
};

export const run_1 = (
  games: {
    totalTime: number;
    targetDistance: number;
  }[]
) => {
  return games.map((game) => {
    const { totalTime, targetDistance } = game;
    let amountOfTimeNeededToWin: number[] = [];
    // const totalTime = 40;
    // const targetDistance = 219;
    for (let timeHeld = 0; timeHeld <= totalTime; timeHeld++) {
      const raceTime = totalTime - timeHeld;
      if (raceTime * timeHeld > targetDistance) {
        amountOfTimeNeededToWin.push(timeHeld);
      }
    }
    return amountOfTimeNeededToWin;
  });
};
