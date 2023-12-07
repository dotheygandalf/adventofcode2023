interface game {
  cards: {
    [index: string]: number;
  };
  hand: string;
  bet: number;
}

const cardValues = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];

export const parseInput = (input: string[]): game[] => {
  return input.map((hand) => {
    const game = hand.split(" ");

    const cards: {
      [index: string]: number;
    } = {};
    game[0].split("").forEach((card) => {
      if (cards[card]) {
        cards[card] += 1;
      } else {
        cards[card] = 1;
      }
    });
    return {
      cards,
      hand,
      bet: parseInt(game[1]),
    };
  });
};

const getPoints = (game: game) => {
  const cards = game.cards;
  if (Object.values(cards).length === 1) {
    //five of a kind
    return 7;
  } else if (
    Object.values(cards).indexOf(4) > -1 &&
    Object.values(cards).filter((value) => {
      return value === 1;
    }).length === 1
  ) {
    // four of a kind
    return 6;
  } else if (
    (Object.values(cards)[0] === 2 && Object.values(cards)[1] === 3) ||
    (Object.values(cards)[1] === 2 && Object.values(cards)[0] === 3)
  ) {
    // full house
    return 5;
  } else if (
    Object.values(cards).indexOf(3) > -1 &&
    Object.values(cards).filter((value) => {
      return value === 1;
    }).length === 2
  ) {
    // three of a kind
    return 4;
  } else if (
    // two pairs
    Object.values(cards).filter((value) => {
      return value === 2;
    }).length === 2
  ) {
    return 3;
  } else if (
    Object.values(cards).filter((value) => {
      return value === 2;
    }).length === 1
  ) {
    return 2;
  }
  return 1;
};

const tieBreaker = (a: game, b: game) => {
  const aHand = a.hand.split("");
  const bHand = b.hand.split("");

  let tieBreaker = 0;

  for (let i = 0; i < a.hand.length; i++) {
    const aValue = cardValues.indexOf(aHand[i]);
    const bValue = cardValues.indexOf(bHand[i]);

    if (aValue === bValue) {
      // do nothing
    } else if (aValue > bValue) {
      tieBreaker = 1;
      break;
    } else {
      tieBreaker = -1;
      break;
    }
  }
  return tieBreaker;
};

export const run_1 = (games: game[]) => {
  return games.sort((a, b) => {
    const aPoints = getPoints(a);
    const bPoints = getPoints(b);

    console.log(a.hand, aPoints, b.hand, bPoints);

    if (aPoints === bPoints) {
      return tieBreaker(a, b);
    } else if (aPoints > bPoints) {
      return 1;
    } else {
      return -1;
    }
  });
};
