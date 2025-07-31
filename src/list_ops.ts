import { cons, List, nil } from "./list";

/**
 * converts a string to a list of bigints representing the characters
 * @param str string to be converted to a list
 * @returns a list that has numbers corresponding to each character
 * in the string
 */
export const stringToList = (str: string): List<bigint> => {
  if (str === "") {
    return nil;
  } else {
    const char: number = (str.charCodeAt(0) - 'a'.charCodeAt(0));
    const intChar: bigint = BigInt(char);
    return cons(intChar, stringToList(str.slice(1)));
  }
}

/**
 * Converts a list of bigints to a string
 * @param L list of bigints to be converted to a string
 * @returns a string that is equivalent to the list of bigints
 */
export const listToString = (L: List<bigint>): string => {
  if (L.kind === "nil") {
    return "";
  } else {
    const c: string = String.fromCharCode(Number(L.hd) + 'a'.charCodeAt(0));
    return c.concat(listToString(L.tl));
  }
}
