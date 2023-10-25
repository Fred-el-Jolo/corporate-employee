import DynamicHtmlElement from "../core/dynamic-html-element.ts";
const html = DynamicHtmlElement.html; 

export default class NumberLabel extends DynamicHtmlElement {

  static get observedAttributes() {
    return ['value'];
  }

  value: string;

  constructor() {
    super();

    console.log('Number label constructor');

    this.initShadowDom();

    this.template = () => html`<span>${this.value}</span>`;

    this.value = '';
  }
}