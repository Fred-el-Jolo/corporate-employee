export default abstract class JoloHtmlElement extends HTMLElement {
    /**
     * Define a custom element with the current class
     * @param tagName custom element tag name
     */
    static defineCustomElement (tagName: string) {
        customElements.define(tagName, this as any);
    }
}