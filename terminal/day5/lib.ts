const parseSection = (
  section: string[]
): {
  [index: string]: number[];
} => {
  const name = section[0];
  const mappings = section.slice(1, section.length);
  const source = section[0].split(" ")[0].split("-to-")[0];
  const destination = section[0].split(" ")[0].split("-to-")[1];
  const output = {} as {
    [index: string]: number[];
  };
  output["source"] = [];
  output["destination"] = [];

  mappings.forEach((mapping) => {
    // console.log(mapping);
    const temp = mapping.split(" ").map((input) => parseInt(input, 10));
    for (let i = temp[0]; i < temp[0] + temp[2]; i++) {
      output["destination"].push(i);
    }
    for (let j = temp[1]; j < temp[1] + temp[2]; j++) {
      output["source"].push(j);
    }
  });

  return output;
};

export const run_1 = (input: string[]) => {
  const seeds_1 = [79, 14, 55, 13];
  const seeds_2 = [
    1132132257, 323430997, 2043754183, 4501055, 2539071613, 1059028389,
    1695770806, 60470169, 2220296232, 251415938, 1673679740, 6063698, 962820135,
    133182317, 262615889, 327780505, 3602765034, 194858721, 2147281339,
    37466509,
  ];

  const tableArray: number[][] = [];
  const table: {
    [index: number]: number[];
  } = {};

  for (let i = Math.min(...seeds_2); i < Math.max(...seeds_2); i++) {
    // table[i] = [];
    tableArray[i] = [];
  }

  // seeds_2.map((seed) => {
  //   table[seed] = [];
  // });

  // const sections = input
  //   .join("\n")
  //   .split("\n\n")
  //   .map((section) => section.split("\n"))
  //   .map((section) => {
  //     return parseSection(section);
  //   })
  //   .forEach((mapping, index) => {
  //     if (index === 0) {
  //       mapping.source.forEach((item, sourceIndex) => {
  //         if (table[item]) {
  //           table[item].push(mapping.destination[sourceIndex]);
  //         } else {
  //           table[item] = [mapping.destination[sourceIndex]];
  //         }
  //       });
  //       Object.keys(table).forEach((key) => {
  //         if (table[parseInt(key)].length < index + 1) {
  //           table[parseInt(key)].push(parseInt(key));
  //         }
  //       });
  //     } else {
  //       // console.log(mapping);
  //       mapping.source.forEach((source, sourceIndex) => {
  //         Object.keys(table).forEach((key) => {
  //           if (table[parseInt(key)][index - 1] === source) {
  //             // console.log(key, source, mapping.destination[sourceIndex]);
  //             table[parseInt(key)].push(mapping.destination[sourceIndex]);
  //           }
  //         });
  //       });
  //       mapping.source.forEach((source, sourceIndex) => {
  //         Object.keys(table).forEach((key) => {
  //           // console.log(source);
  //           if (table[parseInt(key)].length < index + 1) {
  //             table[parseInt(key)].push(
  //               table[parseInt(key)][table[parseInt(key)].length - 1]
  //             );
  //           }
  //         });
  //       });
  //     }
  //   });
  // console.table(table);

  // console.log(
  //   Math.min(
  //     ...seeds_2.map((seed) => {
  //       return table[seed][table[seed].length - 1];
  //     })
  //   )
  // );
};
