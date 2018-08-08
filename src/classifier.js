const classifier = (separatedArr) => {
  const types = Object.create(null)

  separatedArr.forEach((item) => {
    if (item.splitParts instanceof Array) {
      if (!types[item.splitParts.join('')]) {
        types[item.splitParts.join('')] = []
      }
      types[item.splitParts.join('')].push(item)
    } else {
      if (!types[item.splitParts]) {
        types[item.splitParts] = []
      }
      types[item.splitParts].push(item)
    }
  })

  Object.keys(types).forEach((key) => {
    for (let i = 0; i < types[key].length; i++) {
      if (i - 1 === 1) {
        if (types[key][i].index - types[key][i - 1].index !== 1) {
          const newType = types[key][i]
          types[key].splice(i, 1)
          if (!types[key + i]) {
            types[key + i] = []
          }
          types[key + i].push(newType)
        }
      }
    }
  })

  return types
}

module.exports = classifier
