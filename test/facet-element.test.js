import { html, fixture, expect } from '@open-wc/testing';

// import sinon from 'sinon';
import FacetElement from '../src/FacetElement.js';

describe('FacetElement', () => {
  let el;

  beforeEach(async () => {
    el = await fixture(
      html` <facet-element title="Nanostructure"></facet-element> `
    );
  });

  it('has a default title "Nanostructure"', async () => {
    await expect(el.title).to.equal('Nanostructure');
  });

  it('renders a sortBy button at top', async () => {
    await expect(
      el.shadowRoot.querySelector('.SortBtn').textContent.trim()
    ).to.equal('Sort by name');
  });

  it('renders a list of 10 facets with checkboxes initially', async () => {
    const facets = el.shadowRoot.querySelectorAll('.Facet__checkbox');
    await expect(facets.length).to.equal(10);
  });

  it('should have a show all link at bottom', async () => {
    const linkText = el.shadowRoot.querySelector('.SeeAll--link').textContent;
    await expect(linkText).to.equal('See all(32)');
  });

  it('should show all the facets on clicking See all link', async () => {
    let ShowAllLink = el.shadowRoot.querySelector('.SeeAll--link');
    await el.shadowRoot.querySelector('a.SeeAll--link').click();
    /* expect(el.shadowRoot.querySelectorAll(".Facet__checkbox").length).to.equal(32); */

    ShowAllLink = el.shadowRoot.querySelector('a.SeeAll--link').textContent;
    await expect(ShowAllLink).to.equal('See less');
  });

  it('should sort facets by name/count', async () => {
    let sortBtn = el.shadowRoot.getElementById('sortBy');
    let firstFacetCount = el.shadowRoot
      .querySelectorAll('li.Facets__listItem')[0]
      .querySelector('.Facet__value')
      .textContent.trim();

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

  xit('Should search in facet list when the no of characters is more than 3', async () => {
    const searchInput = el.shadowRoot.querySelector('.FacetSearch__input');

    await searchInput.sendKeys('jaydeep'); // check for function use
    console.log(searchInput.textContent);

    expect(FacetElement.prototype._searchFacet.called).to.equal(true);
  });

  it('passes the a11y audit', async () => {
    await expect(el).shadowDom.to.be.accessible();
  });
});
