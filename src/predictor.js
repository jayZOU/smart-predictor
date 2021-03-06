import linearRegression from './linearRegression'
import separator from './separator'
import classifier from './classifier'

/**
 * Predictor is the core of smart-predictor.
 * It takes groups from classifier,
 * then uses `linear regression` to predict new values of one group,
 * and combines all the groups into a new array as result.
 *
 * @param {Array} rawArr a simple array like [1, 2, 3]
 * @param {Number} predictTime a number of predict time
 * @return {Array}
 */

const predictor = (rawArr, predictTime) => {
  const groups = classifier(separator(rawArr))

  Object.keys(groups).forEach((key) => {
    if (key !== 'String') {
      const typeArr = groups[key]
      const pureNumArr = typeArr.map(({ numericValue }) => Number(numericValue))
      const { a, b } = linearRegression(pureNumArr)
      const originLen = typeArr.length
      const totalLen = originLen + predictTime * typeArr.length

      let j = 0
      let times = 1

      for (let i = originLen; i < totalLen; i++) {
        const newValue = a * i + b
        let realValue
        if (typeArr[0].splitParts instanceof Array) {
          realValue = typeArr[0].splitParts.join(newValue)
        } else {
          realValue = typeof typeArr[j].realValue === 'string' ? `${newValue}` : newValue
        }

        typeArr.push({
          realValue,
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
      const typeArr = groups[key]
      const originLen = typeArr.length
      const totalLen = originLen + predictTime * typeArr.length

      let j = 0
      let times = 1

      for (let i = originLen; i < totalLen; i++) {
        typeArr.push({
          realValue: typeArr[j].realValue,
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

  return groups
}

/**
 * This method takes items from groups,
 * set the items to the correct position by its `index` property,
 * then return the predicted array.
 * @param {Array} rawArr a simple array like [1, 2, 3]
 * @param {Number} predictTime a number of predict time
 * @return {Array}
 */

const getPredictedArr = (rawArr, predictTime) => {
  const predictedArr = predictor(rawArr, predictTime)

  let tempArr = []
  Object.keys(predictedArr).forEach((key) => {
    tempArr = tempArr.concat(predictedArr[key])
  })

  const len = tempArr.length
  const finalArr = new Array(len)
  for (let i = 0; i < len; i++) {
    const val = tempArr[i].realValue
    const index = tempArr[i].index
    finalArr[index] = val
  }

  return finalArr
}

export default getPredictedArr
