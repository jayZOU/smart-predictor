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
    const currentType = types[key]
    for (let i = 1, len = currentType.length; i < len; i++) {
      if (currentType[i].index - currentType[i - 1].index !== 1) {
        const newType = currentType[i]
        currentType.splice(i, 1)
        if (!types[key + i]) {
          types[key + i] = []
        }
        types[key + i].push(newType)
      }
    }
  })

  return types
}

export default classifier
