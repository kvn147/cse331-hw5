import React, { Component } from 'react';
import { koopaLatin, lakituCipher, peachEncode } from './cipher';
import { compact, explode } from './cipher_ops';
import { cons, List, nil } from './list';

type AppProps = {};  // no props

type AppState = {
  // TODO (Task 8): add state variables for the app
  message: string;
  cipher: string;
  encodedMessage: string;
  showResult: boolean;
  error: string;
};

/** Helper: string -> List<bigint> using cons (pure, no mutation) */
const stringToCharCodeList = (str: string): List<bigint> => {
  if (str === '') {
    return nil;
  }

  const char = str.charAt(0);
  const code = char.charCodeAt(0);
  const charIndex: bigint =
    code >= 65 && code <= 90
      ? BigInt(code - 65)
      : code >= 97 && code <= 122
      ? BigInt(code - 97)
      : BigInt(code);

  return cons(charIndex, stringToCharCodeList(str.substring(1)));
};

/** Helper: List<bigint> -> string (lowercase a-z for 0..25) */
const charCodeListToString = (list: List<bigint>): string => {
  if (list.kind === 'nil') {
    return '';
  }

  const index = Number(list.hd);
  const char: string =
    index >= 0 && index <= 25
      ? String.fromCharCode(index + 97)
      : String.fromCharCode(index);

  return char + charCodeListToString(list.tl);
};

/** Top-level component that displays the entire UI. */
export class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      // TODO (Task 8): add state variables for the app
      message: '',
      cipher: '',
      encodedMessage: '',
      showResult: false,
      error: ''
    }
  }

  render = (): JSX.Element => {
    // TODO (Task 8): add html to render
    return <div style={{fontFamily: "sans-serif"}}>
      <label>Input: </label>
      <input
        type="text"
        value={this.state.message}
        onChange={(e) => this.setState({ message: e.target.value })}
        placeholder="Enter message here"
      />
      <br/>
      <label>Choose Cipher: </label>
      <select name="cipher" value={this.state.cipher} onChange={this.doCipherChange}>
        <option value="">Select</option>
        <option value="koopa">Koopa</option>
        <option value="lakitu">Lakitu</option>
        <option value="recipe">Recipe</option>
      </select>
      <br/>
      <div style={{marginBottom: "20px"}}>
        <button onClick={this.doEncodeClick}>
          Encode
        </button>
      </div>

      {this.state.error && (
        <div style={{color: "red", marginTop: "10px"}}>
          {this.state.error}
        </div>
      )}
      
      {this.state.showResult && (
        <div style={{marginTop: "10px"}}>
          <strong>Encoded Message: </strong>
          {this.state.encodedMessage}
        </div>
      )}
    </div>;
  }

  // TODO (Task 8): add event handlers as needed
  doCipherChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const cipher = event.target.value;
    this.setState({ 
      cipher, 
      showResult: false, 
      encodedMessage: '', 
      error: '' 
    });
  }

  doEncodeClick = (): void => {
    // Validate inputs
    if (this.state.message.trim() === '') {
      this.setState({ error: 'Please enter a message to encode.', showResult: false });
      return;
    }

    if (this.state.cipher === '') {
      this.setState({ error: 'Please select a cipher.', showResult: false });
      return;
    }

   try {
      const encodedMessage: string =
        this.state.cipher === 'koopa'
          ? compact(koopaLatin(explode(this.state.message)))
          : this.state.cipher === 'lakitu'
          ? charCodeListToString(
              lakituCipher(stringToCharCodeList(this.state.message))
            )
          : /* recipe */ charCodeListToString(
              peachEncode(stringToCharCodeList(this.state.message), nil, nil)
            );

    this.setState({
      encodedMessage,
      showResult: true,
      error: '',
    });
  } catch (error: unknown) {
    this.setState({
      error: `Encoding failed: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
      showResult: false,
    });
    }
  };
}
