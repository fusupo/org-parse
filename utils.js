const padStart = (is, tl, ps = ' ') => {
  let os = '';
  for (let i = 0; i < tl; i++) {
    os += ps;
  }
  os += is;
  return os;
};

const nodeHasActiveTimeStamp_p = n => {
  return n.scheduled !== null;
};

const activeTimeStampFromNode = n => {
  return n.scheduled;
};

module.exports.padStart = padStart;
module.exports.nodeHasActiveTimeStamp_p = nodeHasActiveTimeStamp_p;
module.exports.activeTimeStampFromNode = activeTimeStampFromNode;
