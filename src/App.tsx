import React, { Component, ChangeEvent } from 'react';
import { koopaLatin, lakituCipher, peachEncode, explode, compact } from './cipher';
import { List } from './list';

type AppProps = {};  // no props

type AppState = {
  // TODO (Task 8): add state variables for the app
  message: string;
  cipher: string;
  encodedMessage: string;
  showResult: boolean;
  error: string;
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
        <button 
          onClick={this.doEncodeClick}
        >
          Encode
        </button>
      </div>
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
      this.setState({ error: 'Please enter a message to encode.' });
      return;
    }

    if (this.state.cipher === '') {
      this.setState({ error: 'Please select a cipher.' });
      return;
    }

    try {
      let encodedMessage = '';
      
      if (this.state.cipher === 'koopa') {
        const messageList = explode(this.state.message);
        const encoded = koopaLatin(messageList);
        encodedMessage = compact(encoded);
      }
      else if (this.state.cipher === 'lakitu') {
        // For Lakitu cipher, we need to handle character conversion properly
        encodedMessage = this.encodeLakitu(this.state.message);
      }
      else if (this.state.cipher === 'recipe') {
        const messageList = explode(this.state.message);
        const encoded = peachEncode(messageList);
        encodedMessage = compact(encoded);
      }
      else {
        this.setState({ error: 'Please select a valid cipher.' });
        return;
      }

      this.setState({ 
        encodedMessage, 
        showResult: true, 
        error: '' 
      });

    } catch (error) {
      this.setState({ 
        error: `Encoding failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        showResult: false 
      });
    }
  }

    private encodeLakitu = (message: string): string => {
    let result = '';
    for (let i = 0; i < message.length; i++) {
      const char = message[i];
      const code = char.charCodeAt(0);
      
      // Convert A-Z to 0-25, a-z to 0-25
      let letterIndex = -1;
      let isUpperCase = false;
      
      if (code >= 65 && code <= 90) { // A-Z
        letterIndex = code - 65;
        isUpperCase = true;
      } else if (code >= 97 && code <= 122) { // a-z
        letterIndex = code - 97;
        isUpperCase = false;
      }
      
      if (letterIndex !== -1) {
        // Apply Lakitu encoding (ROT13 for 0-25 range)
        let encodedIndex;
        if (letterIndex >= 0 && letterIndex <= 12) {
          encodedIndex = letterIndex + 13;
        } else if (letterIndex >= 13 && letterIndex <= 25) {
          encodedIndex = letterIndex - 13;
        } else {
          encodedIndex = letterIndex; // shouldn't happen for valid letters
        }
        
        // Convert back to character (preserve case)
        if (isUpperCase) {
          result += String.fromCharCode(encodedIndex + 65);
        } else {
          result += String.fromCharCode(encodedIndex + 97);
        }
      } else {
        // Non-letter character, keep as is
        result += char;
      }
    }
    return result;
  }
}
