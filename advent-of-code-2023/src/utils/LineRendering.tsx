export interface IHighlight {
  start: number;
  length: number;
  color?: string;
}

export const explodeHighlight = (highlight: IHighlight) => {
  const highlightedIndexes: { index: number; color?: string }[] = [];
  for (let i = highlight.start; i < highlight.length + highlight.start; i++) {
    highlightedIndexes.push({
      index: i,
      color: highlight.color,
    });
  }
  return highlightedIndexes;
};

export const explodeHighlights = (highlights: IHighlight[]) => {
  let highlightedIndexes: { index: number; color?: string }[] = [];
  highlights.map((highlight) => {
    highlightedIndexes = highlightedIndexes.concat(explodeHighlight(highlight));
  });
  return highlightedIndexes;
};

export const renderLine = (chars: string[], highlights: IHighlight[]) => {
  const explodedHighlights = explodeHighlights(highlights);
  return chars.map((char, index) => {
    const highlight = explodedHighlights.find((highlight) => {
      return highlight.index === index;
    });
    return (
      <span
        className={`${
          highlight && highlight.color ? highlight.color : undefined
        } ${highlight && !highlight.color ? "text-green-600" : undefined} ${
          !highlight ? "text-gray-800" : undefined
        }`}
      >
        {char}
      </span>
    );
  });
};
