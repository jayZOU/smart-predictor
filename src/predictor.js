const linearRegression = require('./linearRegression')
const separator = require('./separator')
const classifier = require('./classifier')

const predictor = (rawArr, predictSteps) => {
  const classifiedArr = classifier(separator(rawArr))

  Object.keys(classifiedArr).forEach((key) => {
    if (key !== 'String') {
      const typeArr = classifiedArr[key]
      const pureNumArr = typeArr.map(({ numericValue }) => Number(numericValue))
      const { a, b } = linearRegression(pureNumArr)
      const originLen = typeArr.length
      const totalLen = originLen + predictSteps * typeArr.length

      let j = 0
      let times = 1

      for (let i = originLen; i < totalLen; i++) {
        const newValue = a * i + b

        typeArr.push({
          originValue: typeArr[0].splitParts instanceof Array
            ? typeArr[0].splitParts[0] + newValue + typeArr[0].splitParts[1]
            : newValue,
          numericValue: newValue,
          splitParts: typeArr[0].splitParts,
          index: typeArr[j].index + times * rawArr.length
        })

        if (j < originLen - 1) {
          j++
        } else {
          j = 0
          times++
        }
      }
    } else {
      const typeArr = classifiedArr[key]
      const originLen = typeArr.length
      const totalLen = originLen + predictSteps * typeArr.length

      let j = 0
      let times = 1

      for (let i = originLen; i < totalLen; i++) {
        typeArr.push({
          originValue: typeArr[j].originValue,
          numericValue: null,
          splitParts: typeArr[0].splitParts,
          index: typeArr[j].index + times * rawArr.length
        })

        if (j < originLen - 1) {
          j++
        } else {
          j = 0
          times++
        }
      }
    }
  })

  return classifiedArr
}

module.exports = predictor
