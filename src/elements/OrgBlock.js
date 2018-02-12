class OrgBlock {
  static get name() {
    return 'org.block';
  }
  static parse(blockData) {
    let result = null;
    let delta = 0;

    let firstLine = blockData[0];
    let match = /\#\+(?:(?:BEGIN)||(?:begin)){1}_([^\s]+)(?: ([^\n\r]+)){0,}/.exec(
      firstLine
    );
    if (match !== null) {
      result = {
        type: OrgBlock.name,
        name: null,
        data: null,
        contents: null
      };
      result.name = match[1];
      result.data = match[2] !== '' ? match[2] : null;
      let idx = blockData.indexOf('#+END_' + result.name);
      if (idx < 0) idx = blockData.indexOf('#+end_' + result.name);
      if (idx > -1) {
        delta = idx + 1;
        result.contents = blockData.slice(1, idx);
      }
    }

    return { result, delta };
  }
  static serialize(orgBlock) {
    const { name, data, contents } = orgBlock;
    let ret = '';

    if (name.toLowerCase() === name) {
      ret = `#+begin_${name} ${data}\n`;
      ret += contents.join('\n');
      ret += `\n#+end_${name}`;
    } else if (name.toUpperCase() === name) {
      ret = `#+BEGIN_${name} ${data}\n`;
      ret += contents.join('\n');
      ret += `\n#+END_${name}`;
    }

    return ret;
  }
}

module.exports = OrgBlock;
