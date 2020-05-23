import { html, css, LitElement } from 'lit-element';

export class FacetElement extends LitElement {
  static get styles() {
    return css`
      *,
      *::afetr,
      *::before {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      :host {
        display: block;
        padding: 25px;
        color: var(--facet-element-text-color, #000);
      }

      .Facets__Wrapper {
        width: 225px;
      }

      .Facets__header {
        position: relative;
        /*text-align:center;*/
        padding: 4px 10px;
        background-color: #dae5e9;
      }

      .Facets__header > h4 {
        margin: 0;
      }

      .FacetSearch {
        padding: 8px;
        position: relative;
      }

      .FacetSearch__inputWrapper {
        padding-right: 22px;
        height: 24px;
        border-bottom: 2px solid #dcdcdc;
      }

      .FacetSearch__input {
        background-color: transparent;
        border: none;
        box-sizing: border-box;
        padding: 4px 3px 3px 3px;
        width: 100%;
        height: 24px;
        outline: none;
        color: #666666;
        font-size: 1rem;
      }

      .FacetSearch__submit {
        background: url('../images/icon-search-25x25-gray.svg') center no-repeat;
        background-size: 15px auto;
        width: 24px;
        height: 24px;
        border: none;
        position: absolute;
        right: 8px;
        top: 8px;
      }

      .FacetSearch__submit:hover {
        background: url('../images/icon-search-16x16-blue.svg') center no-repeat;
      }

      .Facets__list,
      ul {
        list-style: none;
        padding: 0;
      }

      .Facets__listItem {
        position: relative;
        border-bottom: 1px solid #e9e9e9;
      }

      .Facets__listItem--hidden {
        display: none;
      }

      .Facets__listItem--active {
        display: block;
      }

      .Facet__checkbox {
        position: absolute;
        left: 0;
        top: 25%;
      }

      .Facet_title {
        padding: 10px 50px 10px 25px;
        word-wrap: break-word;
        display: block;
      }

      .Facet__value {
        position: absolute;
        right: 5px;
        top: 25%;
        padding-left: 5px;
      }

      .SeeAll--link {
        position: relative;
        color: #069;
        padding-left: 20px;
      }

      .SeeAll--link.SeeAll--expand::before {
        transform: rotate(0deg);
      }

      .SeeAll--link::before {
        content: '';
        display: inline-block;
        height: 8px;
        width: 13px;
        position: absolute;
        left: 0;
        top: 3px;
        background: url('../images/triangle-3.svg') no-repeat;
        transform: rotate(180deg);
      }

      .SortBtn {
        color: #000;
        background-color: #e9e9e9;
        font-weight: bold;
        position: absolute;
        top: 3px;
        right: 5px;
        border: 1px solid #069;
      }
    `;
  }

  static get properties() {
    return {
      facetCollection: { type: Object },
      sortBy: { type: String },
      title: { type: String },
    };
  }

  constructor() {
    super();
    this.facetCollection = [
      { name: 'Nanostructured materials', count: 99474 },
      { name: 'Nanoparticles', count: 68375 },
      { name: 'Nanofilm', count: 18541 },
      { name: 'Nanosheets', count: 14189 },
      { name: 'Nanoporous materials', count: 13015 },
      { name: 'Nanowires', count: 8572 },
      { name: 'Nanocrystals', count: 7144 },
      { name: 'Nanofibers', count: 5981 },
      { name: 'Nanorods', count: 5348 },
      { name: 'Quantum dots', count: 5212 },
      { name: 'Nanocapsules', count: 5063 },
      { name: 'Nanotubes', count: 4414 },
      { name: 'Nanogel', count: 2344 },
      { name: 'Supramolecule', count: 2259 },
      { name: 'Multi-walled nanotube', count: 2064 },
      { name: 'Fullerene', count: 1718 },
      { name: 'Single-walled nanotube', count: 1706 },
      { name: 'Nanoribbons', count: 1275 },
      { name: 'Nanoemulsions', count: 868 },
      { name: 'DNA origami', count: 811 },
      { name: 'Nanocages', count: 737 },
      { name: 'Quantum wells', count: 578 },
      { name: 'Nanobelts', count: 491 },
      { name: 'Dendrimers', count: 314 },
      { name: 'Nanorings', count: 301 },
      { name: 'Nanoneedles', count: 253 },
      { name: 'Generic', count: 151 },
      { name: 'Nanochains', count: 125 },
      { name: 'DNA polyhedron', count: 119 },
      { name: 'Nanowhiskers', count: 89 },
      { name: 'Tiling array', count: 72 },
      { name: 'Quantum wires', count: 40 },
    ];
  }

  render() {
    return html` <div class="Facets__Wrapper">
      <div class="Facets__header">
        <h4>${this.title}</h4>
        <button
          class="SortBtn"
          @click=${this._sortBy}
          prop="name"
          type="button"
          name="SortFacets"
        >
          Sort by name
        </button>
      </div>

      <div class="FacetSearch">
        <div class="FacetSearch__inputWrapper">
          <input
            class="FacetSearch__input"
            type="text"
            placeholder="Search"
            autocomplete="off"
          />
        </div>
        <input type="button" class="FacetSearch__submit" />
      </div>

      <div class="Facets__listWrapper">
        <ul id="Nanomaterial-Facet" class="Facets__list">
          ${this.facetCollection.map((facet, index) =>
            index < 10
              ? html` <li class="Facets__listItem Facet">
                  <input
                    type="checkbox"
                    class="Facet__checkbox"
                    name=${facet.name}
                  />
                  <label class="Facet_title" for="facet">${facet.name}</label>
                  <span class="Facet__value"> ${facet.count}</span>
                </li>`
              : html` <li
                  class="Facets__listItem Facets__listItem--hidden Facet"
                >
                  <input
                    type="checkbox"
                    class="Facet__checkbox"
                    name=${facet.name}
                  />
                  <label class="Facet_title" for="facet">${facet.name}</label>
                  <span class="Facet__value"> ${facet.count}</span>
                </li>`
          )}
        </ul>

        ${this.facetCollection.length > 10
          ? html`<a class="SeeAll--link SeeAll--expand" @click=${this._showAll}
              >See all(${this.facetCollection.length})</a
            >`
          : html``}
      </div>
    </div>`;
  }

  _showAll(event) {
    const facetList = this.shadowRoot.getElementById('Nanomaterial-Facet');
    const listItems = Array.from(facetList.children);

    listItems.map(element => {
      const ele = event.target;
      if (element.classList.contains('Facets__listItem--hidden')) {
        element.classList.replace(
          'Facets__listItem--hidden',
          'Facets__listItem--active'
        );
        ele.innerText = 'See Less';
        this.shadowRoot
          .querySelector('.SeeAll--link')
          .classList.remove('SeeAll--expand');
      } else if (element.classList.contains('Facets__listItem--active')) {
        element.classList.replace(
          'Facets__listItem--active',
          'Facets__listItem--hidden'
        );
        ele.innerText = `See all(${this.facetCollection.length})`;
        this.shadowRoot
          .querySelector('.SeeAll--link')
          .classList.add('SeeAll--expand');
      }
      return true;
    });
  }

  _sortBy() {
    const options = ['name', 'count'];
    const property = this.shadowRoot
      .querySelector('.SortBtn')
      .getAttribute('prop');
    this.sortBy = property;
    this.facetCollection.sort((element1, element2) => {
      if (element1[property] > element2[property]) return 1;
      if (element1[property] < element2[property]) return -1;
      return 0;
    });

    options.forEach(option => {
      if (option !== property) {
        this.shadowRoot.querySelector('.SortBtn').setAttribute('prop', option);
        this.shadowRoot.querySelector(
          '.SortBtn'
        ).textContent = `Sort by ${option}`;
      }
    });
  }
}

customElements.define('facet-element', FacetElement);
