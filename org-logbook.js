class OrgLogbook {
  static new(name) {
    let ret = {
      name: name || 'logbook',
      log: []
    };
    return ret;
  }

  // static parse(srcStr){
  //   if(srcStr.length > 0){
  //     let keyval = {};
  //     let idx = 0;
  //     let colonCount = 0;
  //     do{
  //       let token = srcStr[idx];
  //       colonCount = token === ':' ? colonCount + 1:colonCount;
  //       idx++;
  //     }while(idx < srcStr.length && colonCount < 2);
  //     let key = srcStr.slice(1, idx - 1);
  //     let val = srcStr.slice(idx).trim();
  //     // maybe parse val into OrgTimestamp/Number/etc..
  //     keyval[key] = val;
  //     return keyval;
  //   }else{
  //     throw(new Error('empty drawer property string'));
  //   }
  // }

  static insert(logBook, logItem) {
    logBook.log.push(logItem);
    return logBook;
  }
}

module.exports = OrgLogbook;
