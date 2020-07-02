import { html, css, LitElement } from 'lit-element';

export default class FacetElement extends LitElement {
  static get styles() {
    return css`
      *,
      *::afetr,
      *::before {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      p {
        margin: 5px 0;
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
        position: relative;
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
        font-size: 0.8rem;
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
        margin: 0;
      }

      .Facets__listWrapper {
        padding: 0 8px;
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

      #drawer {
        position: relative;
      }

      .selectedRow {
        color: white;
        background: #606062;
      }

      ul.autosuggest {
        position: absolute;
        top: 0;
        left: 0;
        background: #f4f4f4;
        width: 100%;
        border: 1px solid silver;
        z-index: 10;
        cursor: pointer;
      }

      li.autosuggest__item {
        margin: 1px;
        border-bottom: 1px solid silver;
        display: block;
        color: black;
        text-decoration: none;
        padding: 5px;
      }

      li.autosuggest__item:last-child {
        border-bottom: none;
      }

      li.autosuggest__item > a {
        text-decoration: none;
        color: #000000;
      }
    `;
  }

  static get properties() {
    return {
      facetCollection: { type: Object },
      sortBy: { type: String },
      title: { type: String },
      seeAll: { type: Boolean },
      autosuggestList: { type: Array },
      selectedFacets: { type: Array },
    };
  }

  constructor() {
    super();
    this.sortBy = 'count';
    this.seeAll = false;
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

    this.dictionary = this.facetCollection.map(facet => facet.name);
    this.selectedIndex = 0;
    this.filteredWordsCount = 0;
    this.autosuggestList = [];
    this.selectedFacets = [];
  }

  render() {
    return html`
      <div id="test" class="Facets__Wrapper">
        <div class="Facets__header">
          <h4>${this.title}</h4>
          ${this._renderSortButton()}
        </div>

        <div class="FacetSearch">
          <div class="FacetSearch__inputWrapper">
            <input
              id="textfield"
              class="FacetSearch__input"
              type="text"
              placeholder="Search"
              autocomplete="off"
              aria-label="Search for a facet"
              @keyup=${this._searchFacet}
            />
          </div>

          <input
            type="button"
            role="button"
            class="FacetSearch__submit"
            name="submit"
            value=""
            aria-label="Facet Search Submit"
          />
          <div id="drawer">
            ${this._showAutosuggest()}
          </div>
        </div>

        <div class="Facets__listWrapper">
          ${this._renderFacets()} ${this._renderSeeAllLessBtn()}
        </div>
      </div>
    `;
  }

  _renderFacets() {
    this._rearrangeCollection();
    const facets = this.seeAll
      ? this.facetCollection
      : this.facetCollection.slice(0, 10);

    return html`<ul id="Nanomaterial-Facet" class="Facets__list">
      ${facets.map(
        facet => html` <li class="Facets__listItem Facet">
          <input
            aria-label=${facet.name}
            aria-labelledby=${facet.name.replace(' ', '', 'g')}
            type="checkbox"
            class="Facet__checkbox"
            id=${facet.name.replace(' ', '', 'g')}
            name=${facet.name}
            @click=${this._handleCheckBoxClick}
          />

          <label class="Facet_title" for="facet">
            ${facet.name}
          </label>
          <span class="Facet__value"> ${facet.count} </span>
        </li>`
      )}
      ${this._markSelected()}
    </ul>`;
  }

  _renderSeeAllLessBtn() {
    const linkText = this.seeAll
      ? 'See less'
      : `See all(${this.facetCollection.length})`;

    const className = this.seeAll ? '' : 'SeeAll--expand';

    return this.facetCollection.length > 10
      ? html`<a class="SeeAll--link ${className}" @click=${this._showAll}
          >${linkText}</a
        >`
      : undefined;
  }

  _showAll() {
    this.seeAll = !this.seeAll;
  }

  _renderSortButton() {
    const buttonText =
      this.sortBy === 'count' ? 'Sort by name' : 'Sort by count';
    return html`<button
      id="sortBy"
      class="SortBtn"
      @click=${this._sortFacets}
      type="button"
      name="SortFacets"
    >
      ${buttonText}
    </button>`;
  }

  _sortFacets() {
    this.sortBy = this.sortBy === 'count' ? 'name' : 'count';
    if (this.sortBy === 'count') this._sortByCount();
    else this._sortByName();
  }

  _sortByName() {
    this.facetCollection.sort((a, b) => a.name.localeCompare(b.name));
  }

  _sortByCount() {
    this.facetCollection.sort((a, b) => b.count - a.count);
  }

  _searchFacet(e) {
    // select element from autosuggest on enter
    if (e.keyCode === 13) {
      this._rowSelected();
      return;
    }

    // arrow keys up and down event
    if ([38, 40].includes(e.keyCode)) {
      this._arrowUpDown(e);
      return;
    }

    const searchTerm = this.shadowRoot.getElementById('textfield').value;
    if (searchTerm === '') {
      this.autosuggestList = [];
      // this.shadowRoot.getElementById("drawer").innerHTML = '';
      return;
    }
    this._filterList(searchTerm);
  }

  _filterList(prefix) {
    const result = [];
    this.dictionary.map(term =>
      term.toLowerCase().match(prefix.toLowerCase()) ? result.push(term) : ''
    );
    this.filteredWordsCount = result.length;
    this.autosuggestList = result.length > 0 ? [...result] : ['no match found'];
  }

  _showAutosuggest() {
    /* to select first element from autosuggest by default add check on class name */
    return this.autosuggestList.length > 0
      ? html`<ul class="autosuggest">
          ${this.autosuggestList.map(
            (element, index) => html` <li
              id="row-${index}"
              class=${index === 0
                ? 'autosuggest__item selectedRow'
                : 'autosuggest__item'}
              @mousemove=${() => this._selectHighlight(index)}
              @click=${() => this._rowSelected()}
              @keydown=${this._tabSelect}
            >
              ${!this.autosuggestList.includes('no match found')
                ? html`<a href="#">${element}</a>`
                : html`<p>${element}</p>`}
            </li>`
          )}
        </ul>`
      : html``;
  }

  _selectHighlight(index) {
    this.shadowRoot
      .getElementById(`row-${this.selectedIndex}`)
      .classList.remove('selectedRow');
    this.shadowRoot.getElementById(`row-${index}`).classList.add('selectedRow');
    this.selectedIndex = index;
  }

  _tabSelect(event) {
    if (event.keyCode === 9) {
      this.shadowRoot.getElementById(`row-${this.selectedIndex}`).focus();
      this._rowSelected();
    }
  }

  _rowSelected() {
    const selectedSuggestion = this.shadowRoot.getElementById(
      `row-${this.selectedIndex}`
    ).innerText;
    // fill the text field with the selected value
    this.shadowRoot.getElementById('textfield').value = selectedSuggestion;

    // select the checkbox in facet
    this._selectFacet(selectedSuggestion);

    // hide the autosuggest menu
    this.autosuggestList = [];
    // this.shadowRoot.getElementById("drawer").innerHTML = '';
    this.selectedIndex = 0;
    this.filteredWordsCount = 0;

    // clear search field
    this.shadowRoot.getElementById('textfield').value = '';
  }

  _arrowUpDown(e) {
    // remove highlight from previous selection
    this.shadowRoot
      .getElementById(`row-${this.selectedIndex}`)
      .classList.remove('selectedRow');

    // arrow-up key
    if (e.keyCode === 38 && this.selectedIndex > 0) {
      // should not be focused on first element of autosuggest
      this.selectedIndex -= 1;
    }

    // arrow-down key
    if (e.keyCode === 40 && this.selectedIndex < this.filteredWordsCount - 1) {
      // should not be focused on last element of autosuggest
      this.selectedIndex += 1;
    }

    // add highlight on current selection
    this.shadowRoot
      .getElementById(`row-${this.selectedIndex}`)
      .classList.add('selectedRow');
  }

  _selectFacet(facetName) {
    this.selectedFacets = [...this.selectedFacets, facetName];

    // Remove duplicates if any
    this.selectedFacets = this.selectedFacets.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
  }

  _handleCheckBoxClick(event) {
    const targetValue = event.target.name;

    if (event.target.checked) this._selectFacet(targetValue);
    else this._deselectFacet(targetValue);
  }

  _deselectFacet(facetName) {
    // remove the element from this.selectedFacets array
    this.selectedFacets = this.selectedFacets.filter(
      facet => facet !== facetName
    );
  }

  _markSelected() {
    // add checked property to checkboxes
    this.selectedFacets.forEach(facet => {
      this.shadowRoot.getElementById(facet.replace(' ', '', 'g')).checked =
        'checked';
    });
  }

  _rearrangeCollection() {
    // add selected facets to top of collection
    this.selectedFacets.forEach(selectedFacet => {
      this.facetCollection.forEach((facet, index) => {
        if (selectedFacet === facet.name) {
          // remove the entry from it's position and add it on top
          this.facetCollection.unshift(
            ...this.facetCollection.splice(index, 1)
          );
        }
      });
    });
  }
}

customElements.define('facet-element', FacetElement);
