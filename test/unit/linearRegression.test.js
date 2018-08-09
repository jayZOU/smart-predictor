import linearRegression from '../../src/linearRegression'

test('Test for linearRegression()', () => {
  expect(linearRegression([1])).toEqual({ a: 1, b: 1 })
  expect(linearRegression([1, 2])).toEqual({ a: 1, b: 1 })
  expect(linearRegression([1, 3])).toEqual({ a: 2, b: 1 })

  const t1 = linearRegression([0.1, 0.2])
  expect(t1.a).toBeCloseTo(0.1)
  expect(t1.b).toBeCloseTo(0.1)

  const t2 = linearRegression([0.1, 0.3])
  expect(t2.a).toBeCloseTo(0.2)
  expect(t2.b).toBeCloseTo(0.1)
})
