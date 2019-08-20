import { MDCTextFieldCharacterCounterFoundation } from '@material/textfield/character-counter/foundation.js';
import { PropertyPart } from 'lit-html';
export interface CharacterCounter extends HTMLElement {
    foundation: MDCTextFieldCharacterCounterFoundation;
}
export declare const characterCounter: () => (part: PropertyPart) => void;
