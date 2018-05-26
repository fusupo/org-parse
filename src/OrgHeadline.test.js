const OrgHeadline = require('./OrgHeadline');
const testData = require('./OrgHeadlineTestData.js');

describe('has static method "parse"', () => {
  test('static attribute parse exists', () => {
    expect(OrgHeadline.parse).toBeDefined();
  });
  test('static attribute parse is a function', () => {
    expect(OrgHeadline.parse).toBeInstanceOf(Function);
  });

  describe('parses headlines', () => {
    test('parses simple headlines', () => {
      expect(OrgHeadline.parse(testData.simpleHL1_str)).toEqual(
        testData.simpleHL1_obj
      );
    });

    test('parses headlines with default keywords', () => {
      expect(OrgHeadline.parse(testData.keywordHL1_str)).toEqual(
        testData.keywordHL1_obj
      );
    });

    test('parses headlines using "additional_keywords" input param', () => {
      expect(OrgHeadline.parse(testData.additionalKeywordHL1_str)).toEqual(
        testData.additionalKeywordHL1a_obj
      );
      expect(
        OrgHeadline.parse(testData.additionalKeywordHL1_str, ['FILE'])
      ).toEqual(testData.additionalKeywordHL1b_obj);
    });

    test('parses headlines with piority', () => {
      expect(OrgHeadline.parse(testData.priorityHL1_str)).toEqual(
        testData.priorityHL1_obj
      );
    });

    test('parses headlines with comment', () => {
      expect(OrgHeadline.parse(testData.commentHL1_str)).toEqual(
        testData.commentHL1_obj
      );
    });

    test('parses headlines with tags', () => {
      expect(OrgHeadline.parse(testData.tagHL1_str)).toEqual(
        testData.tagHL1_obj
      );
    });

    test('parses headlines with children', () => {
      expect(OrgHeadline.parse(testData.childrenHL1_str)).toEqual(
        testData.childrenHL1_obj
      );
    });

    test('parses composite headlines', () => {
      expect(OrgHeadline.parse(testData.compositeHL1_str)).toEqual(
        testData.compositeHL1_obj
      );
    });
  });
});

describe('has static method "serialize"', () => {
  test('static attribute serialize exists', () => {
    expect(OrgHeadline.serialize).toBeDefined();
  });
  test('static attribute parse is a function', () => {
    expect(OrgHeadline.serialize).toBeInstanceOf(Function);
  });

  describe('serializes headlines', () => {
    test('serializes simple headlines', () => {
      expect(OrgHeadline.serialize(testData.simpleHL1_obj)).toEqual(
        testData.simpleHL1_str
      );
    });

    test('serializes headlines with default keyword', () => {
      expect(OrgHeadline.serialize(testData.keywordHL1_obj)).toEqual(
        testData.keywordHL1_str
      );
    });

    test('serializes headlines with arbitrary keyword', () => {
      expect(OrgHeadline.serialize(testData.additionalKeywordHL1a_obj)).toEqual(
        testData.additionalKeywordHL1_str
      );
      expect(OrgHeadline.serialize(testData.additionalKeywordHL1b_obj)).toEqual(
        testData.additionalKeywordHL1_str
      );
    });

    test('serializes headlines with priority', () => {
      expect(OrgHeadline.serialize(testData.priorityHL1_obj)).toEqual(
        testData.priorityHL1_str
      );
    });

    test('serializes headlines with comment', () => {
      expect(OrgHeadline.serialize(testData.commentHL1_obj)).toEqual(
        testData.commentHL1_str
      );
    });

    test('serializes headlines with tags', () => {
      expect(OrgHeadline.serialize(testData.tagHL1_obj)).toEqual(
        testData.tagHL1_str
      );
    });

    test('serializes headlines with children', () => {
      expect(OrgHeadline.serialize(testData.childrenHL1_obj)).toEqual(
        testData.childrenHL1_str
      );
    });

    test('serializes composite headlines', () => {
      expect(OrgHeadline.serialize(testData.compositeHL1_obj)).toEqual(
        testData.compositeHL1_str
      );
    });
  });
});
