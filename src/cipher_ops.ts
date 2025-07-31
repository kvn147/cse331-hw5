import { cons, List, nil } from "./list";

/** Determines whether the given character is a vowel. */
const is_latin_vowel = (c: number): boolean => {
  const ch = String.fromCharCode(c).toLowerCase();
  return "aeiou".indexOf(ch) >= 0;
};

/** Determines whether the given character is a Latin consonant. */
const is_latin_consonant = (c: number): boolean => {
  const ch = String.fromCharCode(c).toLowerCase();
  return "bcdfghjklmnpqrstvwxyz".indexOf(ch) >= 0;
};

/**
 * Returns the number of consonants at the start of the given string
 * before the first vowel, or -1 if there are no vowels
 */
export const count_consonants = (L: List<number>): bigint => {
  if (L.kind === "nil") {
    return -1n;
  } else if (is_latin_vowel(L.hd)) {
    return 0n;
  } else if (is_latin_consonant(L.hd)) {
    const n = count_consonants(L.tl);
    if (n === -1n) {
      return -1n;
    } else {
      return n + 1n;
    }
  } else {
    // not a vowel or a consonant
    return -1n;
  }
};

/** Returns the elements of a list, packed into a string. */
export const compact = (L: List<number>): string => {
  if (L.kind === "nil") {
    return "";
  } else {
    if (L.hd < 0 || 65536 <= L.hd) {
      throw new Error(`invalid char code "${L.hd}"`)
    } else {
      return String.fromCharCode(L.hd) + compact(L.tl);
    }
  }
};


/** Returns the chars of the given string in a char list. */
export const explode = (s: string): List<number> => {
  if (s.length === 0) {
    return nil;
  } else {
    return cons(s.charCodeAt(0), explode(s.substring(1)));
  }
};

/** Returns the a list consisting of L followed by R. */
export const concat = <A,>(L: List<A>, R: List<A>): List<A> => {
  if (L.kind === "nil") {
    return R;
  } else {
    return cons(L.hd, concat(L.tl, R));
  }
};

/** Returns the prefix consisting of the first n elements of L. */
export const prefix = <A,>(n: bigint, L: List<A>): List<A> => {
  if (n === 0n) {
    return nil;
  } else if (L.kind === "nil") {
    throw new Error("not enough elements in L");
  } else {
    return cons(L.hd, prefix(n - 1n, L.tl))
  }
};

/** Returns the suffix consisting of the elements of L after the first n. */
export const suffix = <A,>(n: bigint, L: List<A>): List<A> => {
  if (n === 0n) {
    return L;
  } else if (L.kind === "nil") {
    throw new Error("not enough elements in L");
  } else {
    return suffix(n - 1n, L.tl);
  }
};