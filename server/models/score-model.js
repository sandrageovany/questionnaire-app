let scores = [];

export default {
  create: async (scoreObj) => {
    scores.push(scoreObj);
    return scoreObj;
  },
  findHighest: async () => {
    if (!scores.length) return null;
    return scores.reduce((acc, s) => s.score > acc.score ? s : acc, scores[0]);
  }
};
