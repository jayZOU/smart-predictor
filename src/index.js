const predictor = require('./predictor')

const getPredictArr = (templateArr, steps) => {
  const predictedArr = predictor(templateArr, steps)

  let tempArr = []
  Object.keys(predictedArr).forEach((key) => {
    tempArr = tempArr.concat(predictedArr[key])
  })

  const len = tempArr.length
  const finalArr = new Array(len)
  for (let i = 0; i < len; i++) {
    const val = tempArr[i].originValue
    const index = tempArr[i].index
    finalArr[index] = val
  }

  return finalArr
}
