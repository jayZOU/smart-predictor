const separator = (arr) => {
  const typesArr = []
  const regx = /\d{1,}/g

  for (let i = 0, len = arr.length; i < len; i++) {
    const matchedNums = String(arr[i]).match(regx)

    if (!isNaN(arr[i])) {
      typesArr.push({
        realValue: arr[i],
        numericValue: Number(arr[i]),
        splitParts: 'Number',
        index: i
      })
    }

    else if (!matchedNums) {
      typesArr.push({
        realValue: arr[i],
        numericValue: null,
        splitParts: 'String',
        index: i
      })
    }

    else if (matchedNums) {
      const numericValue = matchedNums[matchedNums.length - 1]
      const splitParts = arr[i].split(numericValue)
      typesArr.push({
        realValue: arr[i],
        numericValue,
        splitParts,
        index: i
      })
    }
  }

  return typesArr
}

module.exports = separator
