import predictor from '../../src/predictor'

test('Test for predictor()', () => {
  expect(predictor([1], 2)).toEqual([1, 2, 3])
  expect(predictor([1], 3)).toEqual([1, 2, 3, 4])
  expect(predictor([1], 3)).toEqual([1, 2, 3, 4])

  expect(predictor([1, 3], 2)).toEqual([1, 3, 5, 7, 9, 11])
  expect(predictor([1, '3'], 2)).toEqual([1, '3', 5, '7', 9, '11'])

  expect(predictor([1, '3', 'aaa1', 'bbb2'], 2)).toEqual([1, '3', 'aaa1', 'bbb2', 5, '7', 'aaa2', 'bbb3', 9, '11', 'aaa3', 'bbb4'])
  expect(predictor([1, '3', 'a1aa', 'b2bb'], 2)).toEqual([1, '3', 'a1aa', 'b2bb', 5, '7', 'a2aa', 'b3bb', 9, '11', 'a3aa', 'b4bb'])
  expect(predictor([1, '3', 'a4a1a', 'b5b1b'], 2)).toEqual([1, "3", "a4a1a", "b5b1b", 5, "7", "a4a2a", "b5b2b", 9, "11", "a4a3a", "b5b3b"])

  expect(predictor([1, 2, 'x', 3], 2)).toEqual([1, 2, 'x', 3, 3, 4, 'x', 4, 5, 6, 'x', 5])
})