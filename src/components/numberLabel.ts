import DynamicHtmlElement from "../core/dynamic-html-element.ts";
import {html} from 'lit-html';

export default class NumberLabel extends DynamicHtmlElement {

    static get observedAttributes() {
        return ['value'];
    }

    value: string;
    #spanNode: HTMLSpanElement | null | undefined;

    constructor() {
        super();

        console.log('Number label constructor');

        this.initShadowDom();

        this.template = () => html`<span>${this.value}</span>`;

        this.value = '';
    }
}