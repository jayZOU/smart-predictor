/**
 * 
 * @param {Array}} arr 
 * 
 * y = ax + b
 * a = ∑(x−x')(y−y') / ∑(x−x')(x−x')
 */

const linearRegression = (arr) => {
  if (!arr.length) {
    throw new Error('linearRegression should not receive an empty array!')
  }

  if (arr.length === 1) {
    return {
      a: 1,
      b: arr[0]
    }
  }

  let xsum = 0
  let ysum = 0

  for (let i = 0; i < arr.length; i++) {
    xsum += i
    ysum += arr[i]
  }

  const xmean = xsum / arr.length
  const ymean = ysum / arr.length

  let num = 0
  let den = 0

  for (let i = 0; i < arr.length; i++) {
    let x = i
    let y = arr[i]
    num += (x - xmean) * (y - ymean)
    den += (x-xmean)**2
  }

  const a = num / den
  const b = ymean - a * xmean

  return { a, b }
}

module.exports = linearRegression
