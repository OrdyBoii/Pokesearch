const searchForm = document.querySelector("form");
const searchResults = document.querySelector("main");
const changeBg = document.querySelector(".poke-info");
let searchQuery = "";
const colours = {
  fire: "#fddfdf",
  grass: "#defde0",
  electric: "#fcf7de",
  water: "#def3fd",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#f5f5f5",
  fighting: "#e6e0d4",
  normal: "#f5f5f5",
};

const elementTypes = Object.keys(colours);

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("#search").value.toLowerCase();
  fetchData();

  const removeAnyErrors = document.querySelector(".error");
  removeAnyErrors.remove();
  const removeAnyLoaders = document.querySelector(".lds-ring");
  removeAnyLoaders.remove();
  console.clear();
});

const fetchData = async () => {
  const toArray = [];

  let loader = document.createElement("div");
  loader.className = "loader-centered";
  loader.innerHTML = `
  <div class="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  `;
  searchResults.appendChild(loader);

  try {
    const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchQuery}`);
    const data = await request.json();
    console.log(data);
    toArray.push(data);
    updatePokedex(toArray);
  } catch (err) {
    console.log(err);

    const errorMsg = document.createElement("div");
    errorMsg.className = "error";
    errorMsg.innerHTML = `
    <img src="./assets/error-image.gif" alt="sad pikachu gif" />
    <h2>Apologies we could not find that pokemon :(</h2>
    <p>Pikachu is so sorry!</p>
    `;
    searchResults.appendChild(errorMsg);

    const removeAnyCurrentSearches = document.querySelector(".pokesearch-results");
    removeAnyCurrentSearches.remove();
    loader.remove();
  }
  console.clear();
};

const updatePokedex = (results) => {
  let generateHTML = "";

  const name = results[0].name.charAt(0).toUpperCase() + results[0].name.slice(1);
  const typeName =
    results[0].types[0].type.name.charAt(0).toUpperCase() + results[0].types[0].type.name.slice(1);
  const ability =
    results[0].abilities[0].ability.name.charAt(0).toUpperCase() +
    results[0].abilities[0].ability.name.slice(1);
  const pokeTypes = results[0].types.map((element) => element.type.name);
  const type = elementTypes.find((type) => pokeTypes.indexOf(type) > -1);

  results.slice(0, 1).map((result) => {
    generateHTML = `
    <div class="pokesearch-results">
        <div class="poke-info">
            <p>${name}</p>
            <p>Pokedex No. <span>#${result.id}<span></p>
            <div class="shiny-check">
              <label for="shiny">Shiny Sprite?</label>
              <input type="checkbox" name="shiny" id="shiny" />
            </div>
            <img src="${result.sprites["front_default"]}" loading="lazy" class="pokemon-sprite" />
          </div>
          <div class="poke-stats">
            <div class="abilities">
              <p><strong>Type:</strong> ${typeName}</p>
              <p><strong>Ability:</strong> ${ability}</p>
              <p><strong>Weight:</strong> ${result.weight} lbs</p>
            </div>
            <div class="stats">
              <div class="stats-left">
                <ul>
                  <li><strong>HP:</strong> ${result.stats[0].base_stat}</li>
                  <li><strong>ATK:</strong> ${result.stats[1].base_stat}</li>
                  <li><strong>DEF:</strong> ${result.stats[2].base_stat}</li>
                </ul>
              </div>
              <div class="stats-right">
                <ul>
                  <li><strong>SP.ATK:</strong> ${result.stats[3].base_stat}</li>
                  <li><strong>SP.DEF:</strong> ${result.stats[4].base_stat}</li>
                  <li><strong>SPEED:</strong> ${result.stats[0].base_stat}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
    </div>
    `;
  });
  searchResults.innerHTML = generateHTML;

  let changeBg = document.querySelector(".poke-info");
  const colour = colours[type];
  changeBg.style.backgroundColor = colour;

  const shinyCheck = document.querySelector("#shiny");
  shinyCheck.addEventListener("click", () => {
    if (shinyCheck.checked) {
      document.querySelector(".pokemon-sprite").src = results[0].sprites["front_shiny"];
    } else {
      document.querySelector(".pokemon-sprite").src = results[0].sprites["front_default"];
    }
  });
};
