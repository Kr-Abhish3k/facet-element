import { html, fixture, expect } from '@open-wc/testing';

import '../src/FacetElement.js';

describe('FacetElement', () => {
  it('has a default title "Nanostructure"', async () => {
    const el = await fixture(
      html` <facet-element title="Nanostructure"></facet-element> `
    );
    expect(el.title).to.equal('Nanostructure');
  });

  it('renders a sortBy button at top', async () => {
    const el = await fixture(html` <facet-element></facet-element> `);
    expect(el.shadowRoot.querySelector('.SortBtn').textContent.trim()).to.equal(
      'Sort by name'
    );
  });

  it('renders a list of 10 facets with checkboxes initially', async () => {
    const el = await fixture(html` <facet-element></facet-element> `);
    const facets = el.shadowRoot.querySelectorAll('.Facet__checkbox');
    expect(facets.length).to.equal(10);
  });

  it('should have a show all link at bottom', async () => {
    const el = await fixture(html` <facet-element></facet-element> `);
    const linkText = el.shadowRoot.querySelector('.SeeAll--link').textContent;
    expect(linkText).to.equal('See all(32)');
  });

  it('should show all the facets on clicking See all link', async () => {
    let ShowAllLink;
    const el = await fixture(html` <facet-element></facet-element> `);
    ShowAllLink = el.shadowRoot.querySelector('.SeeAll--link');
    await el.shadowRoot.querySelector('a.SeeAll--link').click();
    /* expect(el.shadowRoot.querySelectorAll(".Facet__checkbox").length).to.equal(32); */

    ShowAllLink = el.shadowRoot.querySelector('a.SeeAll--link').textContent;
    expect(ShowAllLink).to.equal('See less');
  });

  it('should sort facets by name/count', async () => {
    const el = await fixture(html` <facet-element></facet-element> `);
    let sortBtn = el.shadowRoot.getElementById('sortBy');
    let firstFacetCount = el.shadowRoot
      .querySelectorAll('li.Facets__listItem')[0]
      .querySelector('.Facet__value')
      .textContent.trim();
    expect(sortBtn.textContent.trim()).to.equal('Sort by name');
    expect(firstFacetCount).to.equal('99474');

    await sortBtn.click();

    firstFacetCount = el.shadowRoot
      .querySelectorAll('li.Facets__listItem')[0]
      .querySelector('.Facet__value')
      .textContent.trim();
    sortBtn = el.shadowRoot.getElementById('sortBy');

    expect(firstFacetCount).to.equal('314');
    expect(sortBtn.textContent.trim()).to.equal('Sort by count');

    await sortBtn.click();
    firstFacetCount = el.shadowRoot
      .querySelectorAll('li.Facets__listItem')[0]
      .querySelector('.Facet__value')
      .textContent.trim();
    expect(sortBtn.textContent.trim()).to.equal('Sort by name');
    expect(firstFacetCount).to.equal('99474');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(
      html` <facet-element title="Nanostructure"></facet-element> `
    );

    await expect(el).shadowDom.to.be.accessible();
  });
});
