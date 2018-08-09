import linearRegression from './linearRegression'
import separator from './separator'
import classifier from './classifier'

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
      const typeArr = classifiedArr[key]
      const originLen = typeArr.length
      const totalLen = originLen + predictSteps * typeArr.length

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

  return classifiedArr
}

const getPredictArr = (templateArr, steps) => {
  const predictedArr = predictor(templateArr, steps)

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

export default getPredictArr
