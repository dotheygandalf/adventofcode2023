const parseSection = (section: string[]) => {
  const name = section[0];
  const mappings = section.slice(1, section.length);
  const source = section[0].split(" ")[0].split("-to-")[0];
  const destination = section[0].split(" ")[0].split("-to-")[1];

  return mappings.map((mapping) => {
    const temp = mapping.split(" ").map((input) => parseInt(input, 10));
    return [
      [temp[1], temp[1] + temp[2]],
      [temp[0], temp[0] + temp[2]],
    ];
  });
};

const followSeed = (seed: number, sections: number[][][][]) => {
  let start = seed;
  sections.forEach((section) => {
    let next;
    section.forEach((source) => {
      if (start >= source[0][0] && start <= source[0][1]) {
        next = source[1][1] - (source[0][1] - start);
      }
    });
    if (next) {
      start = next;
    }
  });
  return start;
};

export const run_1 = (input: string[]) => {
  const seeds_1 = [79, 14, 55, 13];
  const seeds_2 = [
    [1132132257, 323430997],
    [2043754183, 4501055],
    [2539071613, 1059028389],
    [1695770806, 60470169],
    [2220296232, 251415938],
    [1673679740, 6063698],
    [962820135, 133182317],
    [262615889, 327780505],
    [3602765034, 194858721],
    [2147281339, 37466509],
  ];

  const sections = input
    .join("\n")
    .split("\n\n")
    .map((section) => section.split("\n"))
    .map((section) => {
      return parseSection(section);
    });

  // console.log(sections);
  sections.forEach((section, sectionIndex) => {
    // console.log(section);
  });
  const results = seeds_2.map((seed) => {
    return followSeed(seed, sections);
  });
  console.log(results);
  console.log(Math.min(...results));
};
