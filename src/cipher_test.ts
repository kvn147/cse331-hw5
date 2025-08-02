import * as assert from 'assert';
import { koopaLatin, lakituEncode, lakituCipher, peachCipher, peachEncode } from './cipher';
import { compact, explode } from './cipher_ops';
import { cons, nil } from './list';

// TODO (Task 7):
// - Write tests according to our class requirements for each cipher.ts function
// - Include comments describing which requirements each test fulfills
// - See this last week's section slides for an explanation on how to organize
//   tests and write assert() statements


describe('cipher', function () {

  it('koopaLatin', function () {
    // statement coverage: executes all branches: nil, mario, vowel start, no vowels, consonent start
    assert.deepStrictEqual(koopaLatin(nil), nil);
    assert.deepStrictEqual(koopaLatin(explode('mario')), nil);
    assert.deepStrictEqual(koopaLatin(explode('MARIO')), nil);
   
    // Branch coverage: vowel start case
    assert.deepStrictEqual(compact(koopaLatin(explode('apple'))), 'kakoopaple');
    assert.deepStrictEqual(compact(koopaLatin(explode('egg'))), 'kekoopagg');
    
    // Branch coverage: no vowels case (consonants only)
    assert.deepStrictEqual(compact(koopaLatin(explode('xyz'))), 'xyz');
    
    // Branch coverage: consonant start case
    assert.deepStrictEqual(compact(koopaLatin(explode('hello'))), 'ellohkoopa');
    assert.deepStrictEqual(compact(koopaLatin(explode('street'))), 'eetstrkoopa');
  });

  it('lakituEncode', function () {
    // statement coverage: executes all cases
    // branch coverage: all 3 cases covered: 0<=j<=12, 13<=j<=25, and out of bounds cases
    assert.strictEqual(lakituEncode(0n), 13n); // 0<=j<=12 case
    assert.strictEqual(lakituEncode(12n), 25n);
    assert.strictEqual(lakituEncode(13n), 0n); // 13<=j<=25 case
    assert.strictEqual(lakituEncode(25n), 12n);
    assert.strictEqual(lakituEncode(-1n), -1n); // j < 0 case
    assert.strictEqual(lakituEncode(26n), 26n); // j > 25 case
  });

  it('lakituCipher', function () {
    // statement coverage: executes all statements for nil and con cases
    // branch coverage: nil, cons cases
    assert.deepStrictEqual(lakituCipher(nil), nil);
    assert.deepStrictEqual(lakituCipher(cons(0n, nil)), cons(13n, nil)); // 0 case
    assert.deepStrictEqual(lakituCipher(cons(12n, nil)), cons(25n, nil)); // 12 case
  });

  it('peachCipher', function () {
    // statement coverage: executes all statements
    // recursion coverage: 0, 1, many elements
    assert.deepStrictEqual(peachCipher(nil), nil);
    assert.deepStrictEqual(peachCipher(cons(0n, nil)), cons(0n, nil)); // single element case
    assert.deepStrictEqual(peachCipher(cons(1n, nil)), cons(1n, nil)); // single element case
    assert.deepStrictEqual(peachCipher(cons(0n, cons(1n, nil))), cons(0n, cons(1n, nil))); // two elements case
  });

  it('peachEncode', function () {
    // statement coverage: executes all 3 branches
    // branch coverage: L is nil, L has one element, L has two elements
    // recursion coverage: 0 elements, 1 element, 2 elements, >2 elements
    assert.deepStrictEqual(peachEncode(nil, nil, nil), nil);
    assert.deepStrictEqual(peachEncode(cons(0n, nil), nil, nil), cons(0n, nil)); // single element case
    assert.deepStrictEqual(peachEncode(cons(1n, nil), nil, nil), cons(1n, nil)); // single element case
    assert.deepStrictEqual(peachEncode(cons(0n, cons(1n, nil)), nil, nil), cons(0n, cons(1n, nil))); // two elements case
    assert.deepStrictEqual(peachEncode(cons(0n, cons(1n, cons(2n, nil))), nil, nil), 
      cons(0n, cons(2n, cons(1n, nil)))); // multiple elements case
  });

});
