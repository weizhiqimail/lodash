import assert from 'assert';
import lodashStable from 'lodash';
import { _, whitespace } from './utils.js';

describe('trim methods', () => {
  lodashStable.each(['trim', 'trimStart', 'trimEnd'], (methodName, index) => {
    let func = _[methodName],
      parts = [];

    if (index != 2) {
      parts.push('leading');
    }
    if (index != 1) {
      parts.push('trailing');
    }
    parts = parts.join(' and ');

    it(`\`_.${methodName}\` should remove ${parts} whitespace`, () => {
      let string = `${whitespace}a b c${whitespace}`,
        expected = `${index == 2 ? whitespace : ''}a b c${index == 1 ? whitespace : ''}`;

      assert.strictEqual(func(string), expected);
    });

    it(`\`_.${methodName}\` should coerce \`string\` to a string`, () => {
      let object = { 'toString': lodashStable.constant(`${whitespace}a b c${whitespace}`) },
        expected = `${index == 2 ? whitespace : ''}a b c${index == 1 ? whitespace : ''}`;

      assert.strictEqual(func(object), expected);
    });

    it(`\`_.${methodName}\` should remove ${parts} \`chars\``, () => {
      let string = '-_-a-b-c-_-',
        expected = `${index == 2 ? '-_-' : ''}a-b-c${index == 1 ? '-_-' : ''}`;

      assert.strictEqual(func(string, '_-'), expected);
    });

    it(`\`_.${methodName}\` should coerce \`chars\` to a string`, () => {
      let object = { 'toString': lodashStable.constant('_-') },
        string = '-_-a-b-c-_-',
        expected = `${index == 2 ? '-_-' : ''}a-b-c${index == 1 ? '-_-' : ''}`;

      assert.strictEqual(func(string, object), expected);
    });

    it(`\`_.${methodName}\` should return an empty string for empty values and \`chars\``, () => {
      lodashStable.each([null, '_-'], (chars) => {
        assert.strictEqual(func(null, chars), '');
        assert.strictEqual(func(undefined, chars), '');
        assert.strictEqual(func('', chars), '');
      });
    });

    it(`\`_.${methodName}\` should work with \`undefined\` or empty string values for \`chars\``, () => {
      let string = `${whitespace}a b c${whitespace}`,
        expected = `${index == 2 ? whitespace : ''}a b c${index == 1 ? whitespace : ''}`;

      assert.strictEqual(func(string, undefined), expected);
      assert.strictEqual(func(string, ''), string);
    });

    it(`\`_.${methodName}\` should work as an iteratee for methods like \`_.map\``, () => {
      let string = Object(`${whitespace}a b c${whitespace}`),
        trimmed = `${index == 2 ? whitespace : ''}a b c${index == 1 ? whitespace : ''}`,
        actual = lodashStable.map([string, string, string], func);

      assert.deepStrictEqual(actual, [trimmed, trimmed, trimmed]);
    });

    it(`\`_.${methodName}\` should return an unwrapped value when implicitly chaining`, () => {
      let string = `${whitespace}a b c${whitespace}`,
        expected = `${index == 2 ? whitespace : ''}a b c${index == 1 ? whitespace : ''}`;

      assert.strictEqual(_(string)[methodName](), expected);
    });

    it(`\`_.${methodName}\` should return a wrapped value when explicitly chaining`, () => {
      const string = `${whitespace}a b c${whitespace}`;
      assert.ok(_(string).chain()[methodName]() instanceof _);
    });
  });
});
