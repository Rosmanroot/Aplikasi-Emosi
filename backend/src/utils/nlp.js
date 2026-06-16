// Simple NLP utility for text emotion detection
exports.analyzeEmotion = function (text) {
  text = text.toLowerCase();
  if (text.includes("senang") || text.includes("happy")) return "senang";
  if (text.includes("sedih") || text.includes("sad")) return "sedih";
  if (text.includes("marah") || text.includes("angry")) return "marah";
  return "netral";
};
