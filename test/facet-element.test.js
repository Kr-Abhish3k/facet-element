import { html, fixture, expect } from '@open-wc/testing';

import '../src/FacetElement.js';
// '../facet-element.js';

describe('FacetElement', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el = await fixture(html` <facet-element></facet-element> `);

    expect(el.title).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture(html` <facet-element></facet-element> `);
    el.shadowRoot.querySelector('button').click();

    expect(el.counter).to.equal(6);
  });

  it('can override the title via attribute', async () => {
    const el = await fixture(html`
      <facet-element title="attribute title"></facet-element>
    `);

    expect(el.title).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(html` <facet-element></facet-element> `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
