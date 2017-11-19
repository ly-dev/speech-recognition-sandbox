export class MyStringUtil {
  static shallowStringify(obj: any, depth: number = 0, onlyProps: boolean = false, skipTypes: Array<string> = ['function']) {
    let objType = typeof (obj);

    if (['function', 'undefined'].indexOf(objType) >= 0) {
      return '<' + objType + '>';
    } else if (['string'].indexOf(objType) >= 0) {
      let l = obj.length;
      if (l > 200) { // avoid long string, only show an abbreviation
        return '"' + obj.substr(0, 50) + ' ...' + l + ' ...' + obj.substr(l - 50) + '"';
      } else {
        return '"' + obj + '"';
      }
    } else if (['number', 'boolean'].indexOf(objType) >= 0) {
      return obj;
    } else if (obj === null) { // null object
      return '<null>';
    } else if (typeof obj.eventPhase !== 'undefined') { // event object
      return '<event>';
    }

    // objType == 'object'
    let res = (Array.isArray(obj) ? '[' : '{');
    // iterate property in object
    for (let p in obj) {
      // Only show property names
      if (onlyProps) {
        res = res + p + ', ';
      } else {
        var valType = typeof (obj[p]);
        if (skipTypes.indexOf(valType) >= 0) {
          res = res + p + ': <' + valType + '>, ';
        } else {
          res = res + p + ': ';

          // max allow 7 levels
          if (depth < 7) {
            res = res + MyStringUtil.shallowStringify(obj[p], depth);
          } else {
            res = res + (typeof obj[p] === 'object' ? '[object]' : (typeof obj[p] === 'function' ? '[function]' : obj[p]));
          }

          res = res + ', ';
        }
      }
    }
    res = res + (Array.isArray(obj) ? ']' : '}');
    return res;
  };
}