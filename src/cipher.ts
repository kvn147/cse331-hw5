import { concat, compact, explode, count_consonants, suffix, prefix, first} from "./cipher_ops";
import { cons, List, nil } from "./list";
// Tests for these functions belong in cipher_test.ts

/**
 * Encodes the English word into Koopa latin
 * @param L Character list to encode and represents the input word
 *          Note: while the function takes in a list of numbers to satisfy
 *          the type constraints on the library functions they're functionally
 *          a list of integers.
 * @returns koopa-latin(L) where  koopa-latin is defined as follows
 *  TODO: Replace this with your math definition for koopa latin
 */
export const koopaLatin = (_L: List<number>): List<number> => {
  // Translate Task 1 here
  const V = new Set([65, 69, 73, 79, 85, 97, 101, 105, 111, 117]);
  const firstChar = first(_L);
  if (_L === nil) {
    return nil;
  }
  else if (compact(_L) === 'mario') {
    return nil;
  }
  else if (V.has(firstChar)) {
    return concat(concat(explode('k'), cons(firstChar, nil)), concat(explode('oopa'), suffix(1n, _L)));
  }
  else if (count_consonants(_L) === -1n) {
    return _L;
  }
  return concat(concat(suffix(count_consonants(_L), _L), prefix(count_consonants(_L), _L)), explode('koopa'));
}

/**
 * Encodes an individual character by darting up or down it by 13 characters
 * in the alphabet depending on if the character is in the first or last 13
 * characters in the alphabet
 * @param j int to encode, represents j-th latin letter if in range [0,25]
 * @returns lakitu-encode(j), where ns is defined as follows:
 *      lakitu-encode: Z -> Z
 *      lakitu-encode(j) := j + 13   if 0 <= j <= 12
 *      lakitu-encode(j) := j - 13   if 13 <= j <= 25
 *      lakitu-encode(j) := j        if j < 0 or 25 < j
 */
export const lakituEncode = (_j: bigint): bigint => {
  // Translate Task 3 here
  if (_j <= 0n && _j <= 12n) {
    return _j + 13n;
  } else if (_j >= 13n && _j <= 25n) { 
    return _j - 13n;
  }
  return _j;
};

/**
 * Applies a lakitu-encode to a list of characters encoded as bigints
 * @param L list of ints to encode. int, j, in range [0, 25] represents jth
 *          character latin alphabet
 * @returns lakitu-cipher(L), where lakitu-cipher is defined as follows:
 *          lakitu-cipher: List<Z> -> List<Z>
 *          lakitu-cipher(nil)  := nil
 *          lakitu-cipher(j::L) := lakitu(j) :: lakitu-cipher(L)
 */
export const lakituCipher = (_L: List<bigint>): List<bigint> => {
  // Translate according to math defn above
  if (_L.kind === "nil") {
    return nil;
  } 
  return cons(lakituEncode(_L.hd), lakituCipher(_L.tl));
};

/**
 * Encodes a list of characters by putting all odd indexed characters in front
 * of all even indexed characters
 * @param L list of ints to encode. int, j, in range [0, 25] represents jth
 *          character latin alphabet
 * @returns keep(L) ++ skip(L)
 */
export const peachCipher = (L: List<bigint>): List<bigint> => {
  // Not straight from the spec!
  return peachEncode(L, nil, nil);
};

/** Implements peach-cipher(L, k, s) where peach-cipher is defined as follows:
 *   peach-cipher: (List<Z>, List<Z>, List<Z>) -> List<Z>
 *      peach-cipher(nil, k, s)        := k ++ s
 *      peach-cipher(a::nil, k, s)     := (k ++ (a :: nil)) ++ s
 *      peach-cipher(a::b::L, k, s)    := peach-cipher(L, k ++ (a::nil), s ++ (b::nil))
*/
export const peachEncode = (L: List<bigint>, k: List<bigint>, s: List<bigint>): List<bigint> => {
  if (L.kind === "nil") {
    return concat(k, s);
  } else if (L.tl.kind === "nil") {
    return concat(concat(k, cons(L.hd, nil)), s);
  } else { // a :: b :: L
    return peachEncode(
      L.tl.tl,
      concat(k, cons(L.hd, nil)),
      concat(s, cons(L.tl.hd, nil))
    )
  }
}