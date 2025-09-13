import { seasons, genres } from "./data.js";
class PodcastModal extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });

		this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal {
          background: white;
          border-radius: 10px;
          max-width: 800px;
          width: 95%;
          padding: 20px;
          position: relative;
          overflow-y: auto;
          max-height: 90vh;
        }
        .close {
          position: absolute;
          top: 15px;
          right: 20px;
          cursor: pointer;
          font-size: 22px;
          font-weight: bold;
        }
        .header {
          display: flex;
          gap: 20px;
        }
        .cover {
          width: 40%;
          background: #eee;
          border-radius: 6px;
          flex-shrink: 0;
          object-fit: cover;
          margin-top:40px;
        }
        .info {
          flex: 1;
        }
        h2 {
          margin: 0;
          font-size: 1.6em;
          position: absolute;
          left: 0;
          margin-left: 20px;
          margin-bottom: 30px;
        }
        .genres {
          margin: 10px 0;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tag {
          background: #f0f0f0;
          border-radius: 20px;
          padding: 5px 12px;
          font-size: 0.85em;
        }
        .updated {
          font-size: 0.9em;
          color: #555;
          margin-top: 8px;
        }
        .description{
          margin-top: 4px;
          }  
        h3 {
          margin-top: 20px;
          font-size: 1.2em;
          border-bottom: 1px solid #ddd;
          padding-bottom: 5px;
        }
         h4{
         margin:20px;
         margin-left:0;
         } 
        .season {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 12px;
          margin: 10px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .season-title {
          font-weight: bold;
        }
        .season-sub {
          font-size: 0.9em;
          color: #666;
        }
      </style>
      <div class="modal">
        <span class="close">&times;</span>
        <div class="header">
          <img id="cover" class="cover" src="" alt="Podcast cover" />
          <div class="info">
            <h2 id="title">Podcast Title</h2>
            <h4>Description</h4>
            <p id="description" class='description'>Podcast description...</p>
            
            <p class="updated"><strong>Last updated:</strong> <span id="updated"></span></p>
            <div class="genres"><strong>Genres:</strong> <span id="genres"></span></div>
          </div>
        </div>
        <h3>Seasons</h3>
        <div id="seasons"></div>
      </div>
    `;
	}

	connectedCallback() {
		this.shadowRoot.querySelector(".close").addEventListener("click", () => {
			this.close();
		});
		this.addEventListener("click", (e) => {
			if (e.target === this) this.close(); // click outside modal closes
		});
	}

	open(podcast) {
		if (!podcast) return;

		// match podcast seasons
		const seasonData = seasons.find((s) => s.id === podcast.id);
		const seasonList = seasonData ? seasonData.seasonDetails : [];

		// fill podcast info
		this.shadowRoot.getElementById("cover").src = podcast.image || "";
		this.shadowRoot.getElementById("title").textContent =
			podcast.title || "Untitled Podcast";
		this.shadowRoot.getElementById("description").textContent =
			podcast.description || "No description.";
		this.shadowRoot.getElementById("updated").textContent = podcast.updated
			? new Date(podcast.updated).toLocaleDateString()
			: "Unknown";

		// ✅ FIXED GENRES
		const genresEl = this.shadowRoot.getElementById("genres");
		genresEl.innerHTML = "";

		const genreNames = genres
			.filter((g) => g.shows.includes(podcast.id))
			.map((g) => g.title);

		if (genreNames.length) {
			genreNames.forEach((name) => {
				const span = document.createElement("span");
				span.className = "tag";
				span.textContent = name;
				genresEl.appendChild(span);
			});
		} else {
			genresEl.textContent = "No genres";
		}

		// seasons
		const seasonsEl = this.shadowRoot.getElementById("seasons");
		seasonsEl.innerHTML = "";
		if (seasonList.length > 0) {
			seasonList.forEach((s) => {
				const div = document.createElement("div");
				div.className = "season";
				div.innerHTML = `
          <div>
            <div class="season-title">${s.title}</div>
            <div class="season-sub">${s.description || ""}</div>
          </div>
          <div>${s.episodes || 0} episodes</div>
        `;
				seasonsEl.appendChild(div);
			});
		} else {
			seasonsEl.innerHTML = "<p>No seasons available</p>";
		}

		this.style.display = "flex";
	}

	close() {
		this.style.display = "none";
	}
}

customElements.define("podcast-modal", PodcastModal);
