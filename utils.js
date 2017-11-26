const shortid = require('shortid');

const randomId = () => {
  return shortid.generate();
};

const padStart = (inStr, targLen, padStr = ' ') => {
  // pads targLen padStrs
  let outStr = '';
  for (let i = 0; i < targLen; i++) {
    outStr += padStr;
  }
  outStr += inStr;
  return outStr;
};

const padEnd = (inStr, targLen, padStr = ' ') => {
  // pads targLen padStrs
  let outStr = '';
  for (let i = 0; i < targLen; i++) {
    outStr += padStr;
  }
  outStr = inStr + outStr;
  return outStr;
};

const padStartMaybe = (inStr, targLen, padStr = ' ') => {
  // pads padStr to make outStr length equal to targLen
  const diffLen = targLen - inStr.length;
  return diffLen > 0 ? padStart(inStr, diffLen, padStr) : inStr;
};

const nodeHasActiveTimeStamp_p = n => {
  return n.scheduled !== null;
};

const activeTimeStampFromNode = n => {
  return n.scheduled;
};

module.exports.randomId = randomId;
module.exports.padStart = padStart;
module.exports.padEnd = padEnd;
module.exports.padStartMaybe = padStartMaybe;
module.exports.nodeHasActiveTimeStamp_p = nodeHasActiveTimeStamp_p;
module.exports.activeTimeStampFromNode = activeTimeStampFromNode;
