var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import { addHasRemoveClass, classMap, FormElement, html, property, query } from '@material/mwc-base/form-element.js';
import { floatingLabel } from '@material/mwc-floating-label';
import { lineRipple } from '@material/mwc-line-ripple';
import MDCTextFieldFoundation from '@material/textfield/foundation.js';
import { characterCounter } from './character-counter/mwc-character-counter-directive.js';
const passiveEvents = ['touchstart', 'touchmove', 'scroll', 'mousewheel'];
export class TextFieldBase extends FormElement {
    constructor() {
        super(...arguments);
        this.mdcFoundationClass = MDCTextFieldFoundation;
        this.value = '';
        this.type = 'text';
        this.placeholder = '';
        this.label = '';
        this.icon = '';
        this.iconTrailing = '';
        this.disabled = false;
        this.required = false;
        this.maxlength = -1;
        this.outlined = false;
        this.fullWidth = false;
        this.helper = '';
        this.helperPersistent = false;
        this.charCounter = false;
        this.outlineOpen = false;
        this.outlineWidth = 0;
    }
    render() {
        const classes = {
            'mdc-text-field--disabled': this.disabled,
            'mdc-text-field--no-label': !this.label,
            'mdc-text-field--outlined': this.outlined,
            'mdc-text-field--fullwidth': this.fullWidth,
            'mdc-text-field--with-leading-icon': this.icon,
            'mdc-text-field--with-trailing-icon': this.iconTrailing,
        };
        return html `
      <div class="mdc-text-field ${classMap(classes)}">
        ${this.icon ? this.renderIcon(this.icon) : ''}
        ${this.renderInput()}
        ${this.iconTrailing ? this.renderIcon(this.iconTrailing) : ''}
        ${this.outlined ? this.renderOutlined() : this.renderLabelText()}
      </div>
      ${(this.helper || this.charCounter) ? this.renderHelperText() : ''}
    `;
    }
    updated(changedProperties) {
        const charCounter = changedProperties.get('charCounter');
        // update foundation only when charCounter goes from false to true
        if (!charCounter && this.charCounter) {
            this.createFoundation();
        }
    }
    renderInput() {
        return html `
      <input
          id="text-field"
          class="mdc-text-field__input"
          type="${this.type}"
          .value="${this.value}"
          ?disabled="${this.disabled}"
          placeholder="${this.placeholder}"
          ?required="${this.required}"
          maxlength="${this.maxlength}"
          @change="${this.handleInputChange}">`;
    }
    renderIcon(icon) {
        return html `<i class="material-icons mdc-text-field__icon">${icon}</i>`;
    }
    renderOutlined() {
        let labelTemplate = '';
        if (this.label) {
            labelTemplate = html `
        <label .foundation=${floatingLabel()} for="text-field">
          ${this.label}
        </label>
      `;
        }
        return html `
      <mwc-notched-outline
          .width=${this.outlineWidth}
          .open=${this.outlineOpen}
          class="mdc-notched-outline">
        ${labelTemplate}
      </mwc-notched-outline>`;
    }
    renderLabelText() {
        let labelTemplate = '';
        if (this.label && !this.fullWidth) {
            labelTemplate = html `
      <label .foundation=${floatingLabel()} for="text-field">
        ${this.label}
      </label>`;
        }
        return html `
      ${labelTemplate}
      <div .foundation=${lineRipple()}></div>
    `;
    }
    renderHelperText() {
        const classes = {
            'mdc-text-field-helper-text--persistent': this.helperPersistent,
        };
        let charCounterTemplate = '';
        if (this.charCounter) {
            charCounterTemplate = html `<div .foundation=${characterCounter()}></div>`;
        }
        return html `
      <div class="mdc-text-field-helper-line">
        <div class="mdc-text-field-helper-text ${classMap(classes)}">
          ${this.helper}
        </div>
        ${charCounterTemplate}
      </div>
    `;
    }
    handleInputChange() {
        this.value = this.formElement.value;
    }
    createFoundation() {
        if (this.mdcFoundation !== undefined) {
            this.mdcFoundation.destroy();
        }
        this.mdcFoundation = new this.mdcFoundationClass(this.createAdapter(), {
            characterCounter: this.charCounterElement ?
                this.charCounterElement.foundation :
                undefined
        });
        this.mdcFoundation.init();
    }
    createAdapter() {
        return Object.assign({}, this.getRootAdapterMethods(), this.getInputAdapterMethods(), this.getLabelAdapterMethods(), this.getLineRippleAdapterMethods(), this.getOutlineAdapterMethods());
    }
    getRootAdapterMethods() {
        return Object.assign({ registerTextFieldInteractionHandler: (evtType, handler) => this.addEventListener(evtType, handler), deregisterTextFieldInteractionHandler: (evtType, handler) => this.removeEventListener(evtType, handler), registerValidationAttributeChangeHandler: (handler) => {
                const getAttributesList = (mutationsList) => {
                    return mutationsList.map((mutation) => mutation.attributeName)
                        .filter((attributeName) => attributeName);
                };
                const observer = new MutationObserver((mutationsList) => handler(getAttributesList(mutationsList)));
                const config = { attributes: true };
                observer.observe(this.formElement, config);
                return observer;
            }, deregisterValidationAttributeChangeHandler: (observer) => observer.disconnect() }, addHasRemoveClass(this.mdcRoot));
    }
    getInputAdapterMethods() {
        return {
            getNativeInput: () => this.formElement,
            isFocused: () => this.shadowRoot.activeElement === this.formElement,
            registerInputInteractionHandler: (evtType, handler) => this.formElement.addEventListener(evtType, handler, { passive: evtType in passiveEvents }),
            deregisterInputInteractionHandler: (evtType, handler) => this.formElement.removeEventListener(evtType, handler),
        };
    }
    getLabelAdapterMethods() {
        return {
            floatLabel: (shouldFloat) => this.labelElement && this.labelElement.foundation.float(shouldFloat),
            getLabelWidth: () => {
                return this.labelElement ? this.labelElement.foundation.getWidth() : 0;
            },
            hasLabel: () => Boolean(this.labelElement),
            shakeLabel: (shouldShake) => this.labelElement && this.labelElement.foundation.shake(shouldShake),
        };
    }
    getLineRippleAdapterMethods() {
        return {
            activateLineRipple: () => {
                if (this.lineRippleElement) {
                    this.lineRippleElement.foundation.activate();
                }
            },
            deactivateLineRipple: () => {
                if (this.lineRippleElement) {
                    this.lineRippleElement.foundation.deactivate();
                }
            },
            setLineRippleTransformOrigin: (normalizedX) => {
                if (this.lineRippleElement) {
                    this.lineRippleElement.foundation.setRippleCenter(normalizedX);
                }
            },
        };
    }
    async firstUpdated() {
        const outlineElement = this.outlineElement;
        if (outlineElement) {
            await outlineElement.updateComplete;
        }
        super.firstUpdated();
    }
    getOutlineAdapterMethods() {
        return {
            closeOutline: () => this.outlineElement && (this.outlineOpen = false),
            hasOutline: () => Boolean(this.outlineElement),
            notchOutline: (labelWidth) => {
                const outlineElement = this.outlineElement;
                if (outlineElement) {
                    this.outlineWidth = labelWidth;
                    this.outlineOpen = true;
                }
            }
        };
    }
}
__decorate([
    query('.mdc-text-field')
], TextFieldBase.prototype, "mdcRoot", void 0);
__decorate([
    query('input')
], TextFieldBase.prototype, "formElement", void 0);
__decorate([
    query('.mdc-floating-label')
], TextFieldBase.prototype, "labelElement", void 0);
__decorate([
    query('.mdc-line-ripple')
], TextFieldBase.prototype, "lineRippleElement", void 0);
__decorate([
    query('mwc-notched-outline')
], TextFieldBase.prototype, "outlineElement", void 0);
__decorate([
    query('.mdc-notched-outline__notch')
], TextFieldBase.prototype, "notchElement", void 0);
__decorate([
    query('.mdc-text-field-character-counter')
], TextFieldBase.prototype, "charCounterElement", void 0);
__decorate([
    property({ type: String })
], TextFieldBase.prototype, "value", void 0);
__decorate([
    property({ type: String })
], TextFieldBase.prototype, "type", void 0);
__decorate([
    property({ type: String })
], TextFieldBase.prototype, "placeholder", void 0);
__decorate([
    property({ type: String })
], TextFieldBase.prototype, "label", void 0);
__decorate([
    property({ type: String })
], TextFieldBase.prototype, "icon", void 0);
__decorate([
    property({ type: String })
], TextFieldBase.prototype, "iconTrailing", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], TextFieldBase.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], TextFieldBase.prototype, "required", void 0);
__decorate([
    property({ type: Number })
], TextFieldBase.prototype, "maxlength", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], TextFieldBase.prototype, "outlined", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], TextFieldBase.prototype, "fullWidth", void 0);
__decorate([
    property({ type: String })
], TextFieldBase.prototype, "helper", void 0);
__decorate([
    property({ type: Boolean })
], TextFieldBase.prototype, "helperPersistent", void 0);
__decorate([
    property({ type: Boolean })
], TextFieldBase.prototype, "charCounter", void 0);
__decorate([
    property({ type: Boolean })
], TextFieldBase.prototype, "outlineOpen", void 0);
__decorate([
    property({ type: Number })
], TextFieldBase.prototype, "outlineWidth", void 0);
//# sourceMappingURL=mwc-textfield-base.js.map