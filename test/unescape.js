import assert from 'assert';
import lodashStable from 'lodash';
import unescape from '../unescape.js';
import escape from '../escape.js';

describe('unescape', () => {
  let escaped = '&amp;&lt;&gt;&quot;&#39;/',
    unescaped = '&<>"\'/';

  escaped += escaped;
  unescaped += unescaped;

  it('should unescape entities in order', () => {
    assert.strictEqual(unescape('&amp;lt;'), '&lt;');
  });

  it('should unescape the proper entities', () => {
    assert.strictEqual(unescape(escaped), unescaped);
  });

  it('should handle strings with nothing to unescape', () => {
    assert.strictEqual(unescape('abc'), 'abc');
  });

  it('should unescape the same characters escaped by `_.escape`', () => {
    assert.strictEqual(unescape(escape(unescaped)), unescaped);
  });

  lodashStable.each(['&#96;', '&#x2F;'], (entity) => {
    it(`should not unescape the "${entity}" entity`, () => {
      assert.strictEqual(unescape(entity), entity);
    });
  });
});
