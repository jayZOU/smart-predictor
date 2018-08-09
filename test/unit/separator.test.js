import separator from '../../src/separator'

test('Test for separator()', () => {
  expect(separator([1])).toEqual([{"index": 0, "numericValue": 1, "realValue": 1, "splitParts": "Number"}])
  expect(separator([1, '2', 'a', 'bbb3', 'bbb4aaa'])).toEqual([{
    "index": 0,
    "numericValue": 1,
    "realValue": 1,
    "splitParts": "Number"
  },{
    "index": 1,
    "numericValue": 2,
    "realValue": "2",
    "splitParts": "Number"
  }, {
    "index": 2,
    "numericValue": null,
    "realValue": "a",
    "splitParts": "String"
  }, {
    "index": 3,
    "numericValue": "3",
    "realValue": "bbb3",
    "splitParts": ["bbb", ""]
  }, {
    "index": 4,
    "numericValue": "4",
    "realValue": "bbb4aaa",
    "splitParts": ["bbb", "aaa"]
  }])
})
