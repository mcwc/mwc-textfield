/**
@license
Copyright 2019 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import '@material/mwc-notched-outline';
import { FormElement, PropertyValues, TemplateResult } from '@material/mwc-base/form-element.js';
import { FloatingLabel } from '@material/mwc-floating-label';
import { LineRipple } from '@material/mwc-line-ripple';
import { NotchedOutline } from '@material/mwc-notched-outline';
import { MDCTextFieldAdapter, MDCTextFieldInputAdapter, MDCTextFieldLabelAdapter, MDCTextFieldLineRippleAdapter, MDCTextFieldOutlineAdapter, MDCTextFieldRootAdapter } from '@material/textfield/adapter.js';
import MDCTextFieldFoundation from '@material/textfield/foundation.js';
import { CharacterCounter } from './character-counter/mwc-character-counter-directive.js';
/**
 * This is the enumerated typeof HTMLInputElement.type as declared by
 * lit-analyzer.
 */
export declare type TextFieldType = 'text' | 'search' | 'tel' | 'url' | 'email' | 'password' | 'date' | 'month' | 'week' | 'time' | 'datetime-local' | 'number' | 'color';
export declare abstract class TextFieldBase extends FormElement {
    protected mdcFoundation: MDCTextFieldFoundation;
    protected readonly mdcFoundationClass: typeof MDCTextFieldFoundation;
    protected mdcRoot: HTMLElement;
    protected formElement: HTMLInputElement;
    protected labelElement: FloatingLabel | null;
    protected lineRippleElement: LineRipple | null;
    protected outlineElement: NotchedOutline | null;
    protected notchElement: HTMLElement;
    protected charCounterElement: CharacterCounter;
    value: string;
    type: TextFieldType;
    placeholder: string;
    label: string;
    icon: string;
    iconTrailing: string;
    disabled: boolean;
    required: boolean;
    maxlength: number;
    outlined: boolean;
    fullWidth: boolean;
    helper: string;
    helperPersistent: boolean;
    charCounter: boolean;
    protected outlineOpen: boolean;
    protected outlineWidth: number;
    render(): TemplateResult;
    updated(changedProperties: PropertyValues): void;
    protected renderInput(): TemplateResult;
    protected renderIcon(icon: String): TemplateResult;
    protected renderOutlined(): TemplateResult;
    protected renderLabelText(): TemplateResult;
    protected renderHelperText(): TemplateResult;
    protected handleInputChange(): void;
    protected createFoundation(): void;
    protected createAdapter(): MDCTextFieldAdapter;
    protected getRootAdapterMethods(): MDCTextFieldRootAdapter;
    protected getInputAdapterMethods(): MDCTextFieldInputAdapter;
    protected getLabelAdapterMethods(): MDCTextFieldLabelAdapter;
    protected getLineRippleAdapterMethods(): MDCTextFieldLineRippleAdapter;
    firstUpdated(): Promise<void>;
    protected getOutlineAdapterMethods(): MDCTextFieldOutlineAdapter;
}
