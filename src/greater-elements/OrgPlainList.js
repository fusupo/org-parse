let result = null;
let space_maybe_re = / ?/;
let value_maybe_re = /([\S\s]+)?/;
let tag_text_maybe_re = /(?:([\S\s]+) \:\:)?/;
let checkbox_maybe_re = /(?:\[([ \-X])\])?/;
let counter_set_maybe_re = /(?:\[\@([0-9]+)\])?/;
let counter_re = /([0-9]+)(\)|\.)/;
let bullet_re = /(\-|\+)/;
let indentation_re = /^( *)/;

let unorderedList_re = new RegExp(
  indentation_re.source +
    bullet_re.source +
    space_maybe_re.source +
    checkbox_maybe_re.source +
    space_maybe_re.source +
    tag_text_maybe_re.source +
    space_maybe_re.source +
    value_maybe_re.source
);

let orderedList_re = new RegExp(
  indentation_re.source +
    counter_re.source +
    space_maybe_re.source +
    counter_set_maybe_re.source +
    space_maybe_re.source +
    checkbox_maybe_re.source +
    space_maybe_re.source +
    tag_text_maybe_re.source +
    space_maybe_re.source +
    value_maybe_re.source
);

class OrgListItem {
  static get name() {
    return 'org.plainList.item';
  }
  static parse(listItemData) {
    let firstLine = listItemData[0];

    let match = null;
    let indentation = null;
    let subIndentation = null;
    let counter = null;
    let bullet = null;
    let counterSet = null;
    let checkbox = null;
    let tag = null;
    let value = null;

    let list = null;
    let unorderedListMatch = unorderedList_re.exec(firstLine);
    let orderedListMatch = orderedList_re.exec(firstLine);

    let baseIndentLength = indentation_re.exec(firstLine)[1].length;

    if (
      unorderedListMatch !== null
      // Note: it seems this all may be less than necessary, i.e. why check if we've
      // improperly recognized a logbook entry as the start of a plainlist when
      // OrgLogbook.parse only deals with content between the ':LOGBOOK:' and ':END:'
      // delimeters...otherwise, despite the fact that it may have a similar format to
      // a logbook entry, it may be the case that it is still just sub heading
      // underneath plainlist
      //&&
      // unorderedListMatch[5] === undefined
      //  ||
      // (!unorderedListMatch[5].startsWith('Note taken on [') &&
      //  !unorderedListMatch[5].startsWith('State "'))
    ) {
      // console.log(unorderedListMatch);
      //value = firstLine;
      match = unorderedListMatch;
      indentation = match[1].length;
      bullet = match[2];
      checkbox = match[3] || null;
      tag = match[4] || null;
      value = match[5] || null;

      if (listItemData.length > 1) {
        let idx = 1;
        let foundList = false;
        do {
          let res = OrgPlainList.parse(listItemData.slice(idx));
          if (res.result === null) {
            if (list === null) list = [];
            console.log(listItemData);
            list.push(OrgListItem.parse([listItemData[idx]]));
          } else {
            if (list === null) list = [];
            list = list.concat(res.result.items);
            foundList = true;
          }
          idx++;
        } while (idx < listItemData.length && !foundList);
      }
    } else if (orderedListMatch !== null) {
      //console.log('ORDERED: ', firstLine);
      //value = firstLine;
      //console.log(orderedListMatch);
      //console.log(res);
      match = orderedListMatch;
      indentation = match[1].length;
      counter = parseInt(match[2]);
      bullet = match[3];

      counterSet = parseInt(match[4]) || null;
      checkbox = match[5] || null;
      tag = match[6] || null;
      value = match[7] || null;

      if (listItemData.length > 1) {
        let idx = 1;
        let foundList = false;
        do {
          let res = OrgPlainList.parse(listItemData.slice(idx));
          if (res.result === null) {
            if (list === null) list = [];
            list.push(OrgListItem.parse([listItemData[idx]]));
          } else {
            if (list === null) list = [];
            list = list.concat(res.result.items);
            foundList = true;
          }
          idx++;
        } while (idx < listItemData.length && !foundList);
      }
    } else {
      // neither ordered nor unoredered
      if (baseIndentLength > 0) {
        value = firstLine.substr(baseIndentLength);
        value = value === '' ? firstLine : value;
      }
    }

    let result = {
      type: OrgListItem.name,
      counter,
      bullet,
      counterSet,
      checkbox,
      tag,
      value,
      list
    };

    return result;
  }

  static serialize() {}
}

// let unorderedList_re = /^( *)(\-|\+) (?!Note taken on \[|State \")/;
// let orderedList_re = /^( *)([0-9]+)(\)|\.) /;

class OrgPlainList {
  static get name() {
    return 'org.plainList';
  }

  static parse(plainlistData) {
    let firstLine = plainlistData[0];
    let isListItem =
      orderedList_re.exec(firstLine) !== null ||
      unorderedList_re.exec(firstLine) !== null;
    if (!isListItem) return { result: null, delta: 0 };

    // data coming in as an array of strings, each representing a line of text
    // from the original document

    let result = {
      type: OrgPlainList.name,
      items: null
    };
    let delta = -1;

    //find break
    let idx = 0;
    let emptyLineCount = 0;
    let zeroIndentText = false;
    do {
      let line = plainlistData.slice(idx)[0];
      let isListItem =
        orderedList_re.exec(line) !== null ||
        unorderedList_re.exec(line) !== null;

      if (!isListItem) {
        let indent = indentation_re.exec(line);
        let indentLength = indent[1].length;
        if (indentLength === 0) {
          if (line.length > 0) {
            zeroIndentText = true;
            emptyLineCount = 0;
          } else {
            emptyLineCount++;
          }
        } else {
          let lineMinusIndent = line.substr(indentLength);
          if (lineMinusIndent.length === 0) {
            emptyLineCount++;
          } else {
            emptyLineCount = 0;
          }
        }
      } else {
        emptyLineCount = 0;
      }
      idx++;
    } while (
      idx < plainlistData.length &&
      emptyLineCount < 2 &&
      !zeroIndentText
    );

    if (emptyLineCount === 2) {
      delta = idx - 1;
    } else if (zeroIndentText) {
      delta = idx - 1;
    } else if (idx === plainlistData.length) {
      delta = idx;
    }

    let workingSet = plainlistData.slice(0, delta);
    let baseIndentLength = indentation_re.exec(workingSet[0])[1].length;
    let groups = [];

    for (let i = 0; i < workingSet.length; i++) {
      let currLine = workingSet.slice(i)[0];
      let currIndentLength = indentation_re.exec(currLine)[1].length;
      let currLineMinusIndent = currLine.substr(currIndentLength);

      // console.log(currLine.length, currIndentLength);

      if (currIndentLength === baseIndentLength && currLineMinusIndent !== '') {
        groups.push([currLine]);
      } else if (
        currIndentLength > baseIndentLength ||
        currLineMinusIndent === ''
      ) {
        if (groups.length === 0) groups.push([]);
        groups[groups.length - 1].push(currLine);
      } else {
        // this shouldn't happen, but I think its the end of the list somehow
      }
    }

    // console.log(groups);

    result.items = groups.map(g => {
      return OrgListItem.parse(g);
    });

    return { result, delta };
  }
  static serialize(orgPlainlist) {
    let ret = '';
    if (orgPlainlist.items) {
      orgPlainlist.items.forEach((i, idx) => {
        ret += `${idx > 0 ? '\n' : ''}${i.bullet} ${i.value}`;
        if (i.list) {
          let sublist = OrgPlainList.serialize(
            Object.assign({}, { items: i.list })
          );
          sublist = sublist
            .split('\n')
            .map(s => '  ' + s)
            .join('\n');
          ret += '\n' + sublist;
        }
      });
    }
    return ret;
  }
}

module.exports = OrgPlainList;
