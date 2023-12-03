import classNames from "classnames";

interface IHighlight {
  start: number;
  length: number;
}

export const explodeHighlight = (highlight: IHighlight) => {
  const highlightedIndexes = [];
  for (let i = highlight.start; i <= highlight.length + highlight.start; i++) {
    highlightedIndexes.push(i);
  }
  return highlightedIndexes;
};

export const explodeHighlights = (highlights: IHighlight[]) => {
  let highlightedIndexes: number[] = [];
  highlights.map((highlight) => {
    highlightedIndexes = [
      ...highlightedIndexes,
      ...explodeHighlight(highlight),
    ];
  });
  return highlightedIndexes;
};

export const renderLine = (
  chars: string[],
  highlights: {
    start: number;
    length: number;
  }[]
) => {
  const explodedHighlights = explodeHighlights(highlights);
  return chars.map((char, index) => {
    const isHighlighted = explodedHighlights.includes(index);
    return (
      <span
        className={classNames({
          "text-green-600": isHighlighted,
          "text-gray-800": !isHighlighted,
        })}
      >
        {char}
      </span>
    );
  });
};
