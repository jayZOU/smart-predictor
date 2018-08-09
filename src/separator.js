/**
 * Separator receives an array like [1, 'a', 2],
 * and then converts every of its item into informationed object
 * eg. [{
 *  "index": 0,
    "numericValue": 1,
    "realValue": 1,
    "splitParts": "Number" }, {
 *  "index": 1,
    "numericValue": null,
    "realValue": "a",
    "splitParts": "string" }, {
 *  "index": 2,
    "numericValue": 2,
    "realValue": 2,
    "splitParts": "Number"
  }]
 * @param {Array} arr
 * @return {Array}
 */

const separator = (arr) => {
  const separatedArr = []
  const regx = /\d{1,}/g

  for (let i = 0, len = arr.length; i < len; i++) {
    const matchedNums = String(arr[i]).match(regx)

    if (!isNaN(arr[i])) {
      separatedArr.push({
        realValue: arr[i],
        numericValue: Number(arr[i]),
        splitParts: 'Number',
        index: i
      })
    } else if (!matchedNums) {
      separatedArr.push({
        realValue: arr[i],
        numericValue: null,
        splitParts: 'String',
        index: i
      })
    } else if (matchedNums) {
      // 'hello666world' -> 666 and ['hello', 'world']
      const numericValue = matchedNums[matchedNums.length - 1]
      const splitParts = arr[i].split(numericValue)

      separatedArr.push({
        realValue: arr[i],
        numericValue,
        splitParts,
        index: i
      })
    }
  }

  return separatedArr
}

export default separator
