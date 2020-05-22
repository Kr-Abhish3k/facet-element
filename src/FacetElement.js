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

      .Facets__header{
         text-align:center;
         padding: 4px 10px;
         background-color: #dae5e9;
      }

      .Facets__header>h4 {
         margin: 0;
      }

      .Facets__list , ul{
        list-style: none;
        padding: 0;
      }

      .Facets__listItem {
        position: relative;
        border-bottom: 1px solid #E9E9E9;
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

      .SeeAll--link.SeeAll--expand::before  {
         transform: rotate(0deg);
      }

      .SeeAll--link::before {
         content: "";
         display: inline-block;
         height: 8px;
         width: 13px;
         position: absolute;
         left: 0;
         top: 3px;
         background: url("../images/triangle-3.svg") no-repeat;
         transform: rotate(180deg);
      }
    `;
   }

   static get properties() {
      return {
         facetCollection: {
            type: Object,
            name: {},
         },
         facetName: { type: String, attribute: 'facet-name' },
      };
   }

   constructor() {
      super();
      this.facetCollection = [
         { name: 'Nanostructured materials', count: '99474' },
         { name: 'Nanoparticles', count: '68375' },
         { name: 'Nanofilm', count: '18541' },
         { name: 'Nanosheets', count: '14189' },
         { name: 'Nanoporous materials', count: '13015' },
         { name: 'Nanowires', count: '8572' },
         { name: 'Nanocrystals', count: '7144' },
         { name: 'Nanofibers', count: '5,981' },
         { name: 'Nanorods', count: '5,348' },
         { name: 'Quantum dots', count: '5,212' },
         { name: 'Nanocapsules', count: '5,063' },
         { name: 'Nanotubes', count: '4,414' },
         { name: 'Nanogel', count: '2,344' },
         { name: 'Supramolecule', count: '2,259' },
         { name: 'Multi-walled nanotube', count: '2,064' },
         { name: 'Fullerene', count: '1,718' },
         { name: 'Single-walled nanotube', count: '1,706' },
         { name: 'Nanoribbons', count: '1,275' },
         { name: 'Nanoemulsions', count: '868' },
         { name: 'DNA origami', count: '811' },
         { name: 'Nanocages', count: '737' },
         { name: 'Quantum wells', count: '578' },
         { name: 'Nanobelts', count: '491' },
         { name: 'Dendrimers', count: '314' },
         { name: 'Nanorings', count: '301' },
         { name: 'Nanoneedles', count: '253' },
         { name: 'Generic', count: '151' },
         { name: 'Nanochains', count: '125' },
         { name: 'DNA polyhedron', count: '119' },
         { name: 'Nanowhiskers', count: '89' },
         { name: 'Tiling array', count: '72' },
         { name: 'Quantum wires', count: '40' },
      ];
   }

   render() {
      return html`<div class="Facets__Wrapper">
         <div class="Facets__header">
            <h4>Nanostructure</h4>
         </div>
         <ul id="Nanomaterial-Facet" class="Facets__list">
         ${this.facetCollection.map((facet, index) =>
         index < 10 ? html`
            <li class="Facets__listItem Facet">
               <input type="checkbox" class="Facet__checkbox" name=${facet.name} />
               <label class="Facet_title" for="facet">${facet.name}</label>
               <span class="Facet__value"> ${facet.count}</span>
            </li>`
            :
            html`
            <li class="Facets__listItem Facets__listItem--hidden Facet">
               <input type="checkbox" class="Facet__checkbox" name=${facet.name} />
               <label class="Facet_title" for="facet">${facet.name}</label>
               <span class="Facet__value"> ${facet.count}</span>
            </li>`
      )}
         </ul>
         ${this.facetCollection.length > 10 ? html`<a class="SeeAll--link SeeAll--expand" @click=${this._showAll}>See all(${this.facetCollection.length})</a>` : html``}
      </div>`
      /*return html`<div class="Facets__Wrapper">
         ${this.facetCollection.map((facet, index) =>
         index <= 10 ?
            html`
            <ul class="Facets__list">
               <li class="Facets__listItem Facet">
                  <input type="checkbox" class="Facet__checkbox" name=${facet.name} />
                  <label class="Facet_title" for="facet">${facet.name}</label>
                  <span class="Facet__value"> ${facet.count}</span>
               </li>
            </ul>`
            :
            html`
            <ul class="Facets__list--collapse">
               <li class="Facets__listItem Facet ">
                  <input type="checkbox" class="Facet__checkbox" name=${facet.name} />
                  <label class="Facet_title" for="facet">${facet.name}</label>
                  <span class="Facet__value"> ${facet.count}</span>
               </li>
            </ul>
            `
      )}
      ${this.facetCollection.length > 10 ? html`<a>See all(${this.facetCollection.length})</a>` : html``}
      </div>`*/
   }

   _showAll(event) {
      const facetList = this.shadowRoot.getElementById("Nanomaterial-Facet");
      const listItems = Array.from(facetList.children);

      listItems.map(element => {
         if (element.classList.contains("Facets__listItem--hidden")) {
            element.classList.replace("Facets__listItem--hidden", "Facets__listItem--active");
            event.target.innerText = "See Less";
            this.shadowRoot.querySelector(".SeeAll--link").classList.remove("SeeAll--expand");
         }
         else if (element.classList.contains("Facets__listItem--active")) {
            element.classList.replace("Facets__listItem--active", "Facets__listItem--hidden");
            event.target.innerText = `See all(${this.facetCollection.length})`;
            this.shadowRoot.querySelector(".SeeAll--link").classList.add("SeeAll--expand");
         }
      });
   }
}

customElements.define("facet-element", FacetElement);