// PodcastPreview.js
class PodcastPreview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.data = null;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          cursor: pointer;
          border-radius: 10px;
          overflow: hidden;
          background: white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        :host(:hover) {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        img {
          width: 100%;
          display: block;
          height: 180px;
          object-fit: cover;
        }
        .content {
          padding: 10px 15px;
        }
        h3 {
          margin: 0 0 5px 0;
          font-size: 18px;
        }
        .genres {
          font-size: 12px;
          color: #666;
          margin-bottom: 5px;
        }
        .seasons {
          font-size: 12px;
          color: #333;
        }
      </style>
      <img id="cover" src="" alt="Podcast cover">
      <div class="content">
        <h3 id="title"></h3>
        <div class="genres" id="genres"></div>
        <div class="seasons" id="seasons"></div>
      </div>
    `;
  }

  set data(value) {
    this._data = value;
    if (value) this.render();
  }

  get data() {
    return this._data;
  }

  connectedCallback() {
    this.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("podcast-click", { bubbles: true, composed: true })
      );
    });
  }

  render() {
    const cover = this.shadowRoot.getElementById("cover");
    const title = this.shadowRoot.getElementById("title");
    const genresEl = this.shadowRoot.getElementById("genres");
    const seasonsEl = this.shadowRoot.getElementById("seasons");

    cover.src = this._data.image || "";
    cover.alt = this._data.title || "Podcast cover";
    title.textContent = this._data.title || "No title";

    // Display genre names
    genresEl.textContent = this._data.genres
      .map(g => g.title)
      .join(", ");

    // Display number of seasons
    seasonsEl.textContent = `${this._data.seasons} season(s)`;
  }
}

customElements.define("podcast-preview", PodcastPreview);
