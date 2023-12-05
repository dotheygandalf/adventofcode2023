const overlappingNumbers = (winningNumbers: number[], myNumbers: number[]) => {
  const matchingNumbers: number[] = [];
  winningNumbers.forEach((winningNumber) => {
    if (myNumbers.includes(winningNumber)) {
      matchingNumbers.push(winningNumber);
    }
  });
  return matchingNumbers;
};

const findMatchingNumbers = (input: string[]) => {
  return input.map((gameLine) => {
    const game = gameLine.split(":");
    const gameNumbers = game[1].split("|");
    const winningNumbers = gameNumbers[0]
      .trim()
      .split(" ")
      .map((number) => parseInt(number))
      .filter((number) => !Number.isNaN(number));
    const myNumbers = gameNumbers[1]
      .trim()
      .split(" ")
      .map((number) => parseInt(number))
      .filter((number) => !Number.isNaN(number));
    return overlappingNumbers(winningNumbers, myNumbers);
  });
};

export const run = (input: string[]) => {
  const matchingNumbers = findMatchingNumbers(input);
  return matchingNumbers.reduce((prev, curr) => {
    if (curr.length > 0) {
      console.log(curr);
      return prev + Math.pow(2, curr.length - 1);
    }
    return prev;
  }, 0);
};

const accumulatedGames: {
  [index: number]: number;
} = {};

const accumulate = (game: number, wins: number, lookupTable: number[]) => {
  if (accumulatedGames[game] === undefined) {
    accumulatedGames[game] = 1;
  } else {
    accumulatedGames[game] += 1;
  }

  for (let i = game + 1; i < game + wins + 1; i++) {
    accumulate(i, lookupTable[i], lookupTable);
  }
};

export const run_2 = (input: string[]) => {
  const matchingNumbers = findMatchingNumbers(input);

  const winningGamesLookup = matchingNumbers.map((winningNumbers, game) => {
    // console.log(winningNumbers);
    return winningNumbers.length;
  });

  console.table(winningGamesLookup);

  winningGamesLookup.forEach((game, index) => {
    accumulate(index, game, winningGamesLookup);
  });

  console.table(accumulatedGames);

  console.log(
    Object.values(accumulatedGames).reduce((prev, curr) => {
      return prev + curr;
    })
  );
};
