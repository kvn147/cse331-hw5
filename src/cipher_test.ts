import * as assert from 'assert';
import { koopaLatin, lakituEncode, lakituCipher, peachCipher, peachEncode } from './cipher';
import { explode } from './cipher_ops';
import { nil } from './list';

// TODO (Task 7):
// - Write tests according to our class requirements for each cipher.ts function
// - Include comments describing which requirements each test fulfills
// - See this last week's section slides for an explanation on how to organize
//   tests and write assert() statements


describe('cipher', function () {

  it('koopaLatin', function () {
    // statement coverage:
    assert.deepStrictEqual(koopaLatin(nil), nil);
    assert.deepStrictEqual(koopaLatin(explode('mario')), nil);
    assert.deepStrictEqual(koopaLatin(explode('marioo')), nil);
    assert.deepStrictEqual(koopaLatin(explode('MARIO')), nil);
    assert.deepStrictEqual(koopaLatin(explode('Koopa')), explode('Koopa'));
  });

  it('lakituEncode', function () {
    // statement coverage:
    // loop coverage:
    assert.strictEqual(lakituEncode(0n), 13n);
    assert.strictEqual(lakituEncode(12n), 25n);
    assert.strictEqual(lakituEncode(13n), 0n);
  });

  it('lakituCipher', function () {
    // statement coverage:
    // branch coverage:
    assert.deepStrictEqual(lakituCipher(nil), nil);
  });

  it('peachCipher', function () {
    // recursion coverage:
    assert.deepStrictEqual(peachCipher(nil), nil);
  });

  it('peachEncode', function () {
    // recursion coverage:
    assert.deepStrictEqual(peachEncode(nil, nil, nil), nil);
  });

});
