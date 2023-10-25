import { TemplateResult, html, render} from 'lit-html';
import JoloHtmlElement from "./jolo-html-element";

type PropsCallback = () => void;

export default abstract class DynamicHtmlElement extends JoloHtmlElement {

  static html(template: TemplateStringsArray, ...values: unknown[]) {
    return html(template, values);
  }

  template: null | (() => TemplateResult)

  /**
     * Dynamic props callbacks map
     */
  #propsCallbacks: Map<string, Array<PropsCallback>>;

  /**
     * Define attributes that can be updated once the component is initialized
     * @see https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
     */
  static get observedAttributes(): string[] {
    throw new Error (`static get observedAttributes() method must be implemented on the class ${this.name}`)
  }

  constructor() {
    super();
    this.template = null;
    this.#propsCallbacks = new Map();
  }

  /**
     * Helper that initialize the shadow DOM for a Web Component
     * @see https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM
     * @param template 
     * @param shadowOptions 
     */
  initShadowDom(shadowOptions: ShadowRootInit = { mode: 'open' }) {
    this.attachShadow(shadowOptions);
  }

  /**
     * Lifecycle hook that is invoked when one of the custom element's attributes is added, removed, or changed
     * @see https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
     * @param property 
     * @param oldValue 
     * @param newValue 
     * @returns 
     */
  attributeChangedCallback(property: string, oldValue: string, newValue: string): void {
    if (oldValue === newValue) return;
    
    console.debug(`Class ${this.constructor.name}, property ${property} set with value ${newValue}`);
    
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this[property] = newValue;

    if (this.#propsCallbacks.has(property)) {
      console.debug(`Class ${this.constructor.name}, property ${property}, calling ${this.#propsCallbacks.get(property)?.length} update callback${this.#propsCallbacks.get(property)?.length === 1 ? '' : 's'}`);
      this.#propsCallbacks.get(property)?.forEach(callback => callback());
    }
    else {
      if (this.template != null && this.shadowRoot != null) {
        render(this.template(), this.shadowRoot);
      }
    }
  }

  /**
     * Add a callback to be invoked when the key prop is updated
     * @param property 
     * @param callback 
     */
  propertyUpdateCallback(property: string, callback: PropsCallback): void {
    let callbacks = this.#propsCallbacks.get(property);
    if (!callbacks) {
      callbacks = [];
    }
    callbacks.push(callback.bind(this));
    this.#propsCallbacks.set(property, callbacks);
  }
}