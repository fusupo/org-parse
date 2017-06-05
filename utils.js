const padStart = (is, tl, ps) => {
  let os = '';
  for (let i = 0; i < tl; i++) {
    os += ps;
  }
  os += is;
  return os;
};

module.exports.padStart = padStart;
