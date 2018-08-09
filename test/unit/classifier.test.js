import classifier from '../../src/classifier'
import separator from '../../src/separator'

const separatedArr = separator([1, 'a', '2', 'bbb3', 'bbb4aaa'])

test('Test for classifier()', () => {
  expect(classifier(separatedArr)).toEqual({
    "Number": [{"index": 0, "numericValue": 1, "realValue": 1, "splitParts": "Number"}],
    "Number1": [{"index": 2, "numericValue": 2, "realValue": "2", "splitParts": "Number"}],
    "String": [{"index": 1, "numericValue": null, "realValue": "a", "splitParts": "String"}],
    "bbb": [{"index": 3, "numericValue": "3", "realValue": "bbb3", "splitParts": ["bbb", ""]}],
    "bbbaaa": [{"index": 4, "numericValue": "4", "realValue": "bbb4aaa", "splitParts": ["bbb", "aaa"]}]
    })
})