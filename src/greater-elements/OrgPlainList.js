const { randomId } = require('../../utils');

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
    return 'OrgListItem';
  }
  static parse(listItemData, store) {
    if (store[OrgListItem.name] === undefined) {
      store[OrgListItem.name] = {};
    }

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

    let baseIndent = indentation_re.exec(firstLine)[1].length;
    // console.log(listItemData[0]);
    // console.log(unorderedListMatch);
    // console.log(orderedListMatch);

    if (
      unorderedListMatch !== null &&
      (unorderedListMatch[5] === undefined ||
        (!unorderedListMatch[5].startsWith('Note taken on [') &&
          !unorderedListMatch[5].startsWith('State "')))
    ) {
      console.log('UNORDERED: ', firstLine);
      console.log(unorderedListMatch);
      //value = firstLine;
      if (listItemData.length > 1) {
        let res = OrgPlainList.parse(listItemData.slice(1), store);
        list = res.result.id;
      }
      match = unorderedListMatch;
      indentation = match[1].length;
      bullet = match[2];
      checkbox = match[3] || null;
      tag = match[4] || null;
      value = match[5] || null;
    } else if (orderedListMatch !== null) {
      console.log('ORDERED: ', firstLine);
      //value = firstLine;
      if (listItemData.length > 1) {
        let res = OrgPlainList.parse(listItemData.slice(1), store);
        list = res.result.id;
      }
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
    } else {
      // neither ordered nor unoredered
      if (baseIndent > 0) {
        value = firstLine;
      }
    }

    let result = {
      id: randomId(),
      counter,
      bullet,
      counterSet,
      checkbox,
      tag,
      value,
      list
    };

    store[OrgListItem.name][result.id] = result;
    return result;
  }

  static serialize() {}
}

// let unorderedList_re = /^( *)(\-|\+) (?!Note taken on \[|State \")/;
// let orderedList_re = /^( *)([0-9]+)(\)|\.) /;

class OrgPlainList {
  static get name() {
    return 'OrgPlainList';
  }
  static parse(plainlistData, store) {
    if (store[OrgPlainList.name] === undefined) {
      store[OrgPlainList.name] = {};
    }

    // data coming in as an array of strings, each representing a line of text
    // from the original document

    let result = {
      id: randomId(),
      items: null
    };
    let delta = -1;

    //console.log(plainlistData);

    //find break
    let idx = 0;
    let emptyLineCount = 0;
    let zeroIndentText = false;
    do {
      let foo = plainlistData.slice(idx)[0];
      let isListItem =
        orderedList_re.exec(foo) !== null ||
        unorderedList_re.exec(foo) !== null;

      if (!isListItem) {
        let indentation = indentation_re.exec(foo);
        if (indentation[1].length === 0) {
          if (foo === '') {
            emptyLineCount++;
          } else {
            emptyLineCount = 0;
            zeroIndentText = true;
          }
        } else {
          emptyLineCount = 0;
        }
      }

      //console.log(emptyLineCount, foo, isListItem);
      idx++;
    } while (
      idx < plainlistData.length &&
      emptyLineCount < 2 &&
      !zeroIndentText
    );

    if (emptyLineCount === 2) {
      delta = idx - 2;
    } else if (zeroIndentText) {
      delta = idx - 1;
    } else if (idx === plainlistData.length) {
      delta = idx;
    }

    let workingSet = plainlistData.slice(0, delta);
    let baseIndent = indentation_re.exec(workingSet[0])[1].length;
    let groups = [];
    idx = 0;
    do {
      let currLine = workingSet.slice(idx)[0];
      let currIndent = indentation_re.exec(currLine)[1].length;
      if (currIndent === baseIndent && currLine !== '') {
        groups.push([currLine]);
      } else if (currIndent > baseIndent || currLine === '') {
        if (groups.length === 0) groups.push([]);
        groups[groups.length - 1].push(currLine);
      } else {
        // this shouldn't happen, but I think its the end of the list somehow
      }
      idx++;
    } while (idx < workingSet.length);

    // console.log(workingSet, baseIndent);
    // console.log(groups);

    result.items = groups.map(g => {
      return OrgListItem.parse(g, store).id;
    });

    store[OrgPlainList.name][result.id] = result;
    return { result, delta };
  }
  static serialize(orgPlainlist) {}
}

module.exports = OrgPlainList;
