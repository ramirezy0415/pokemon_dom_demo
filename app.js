/**
 * @typedef Pokemon
 * @property {string} name
 * @property {string} type
 * @property {number} hp
 * @property {string[]} moves
 */

// === Constants ===
const POKEMON_NAMES = ["Charmander", "Squirtle", "Bulbasaur"];
const POKEMON_TYPES = ["Fire", "Water", "Grass"];
const POKEMON_HPS = [39, 44, 45];
const POKEMON_MOVES = [
  ["Scratch", "Ember"],
  ["Tackle", "Water Gun"],
  ["Tackle", "Vine Whip"],
];

const POKEMON_LENGTH = POKEMON_NAMES.length;

// CREATE POKEMONS
const pokemons = Array.from({ length: POKEMON_LENGTH }, make_pokemon);
const avg_HP = getAvgHP();

/** @returns {Pokemon} a Pokémon from constants by index */
function make_pokemon(_, index) {
  return {
    name: POKEMON_NAMES[index],
    type: POKEMON_TYPES[index],
    hp: POKEMON_HPS[index],
    moves: POKEMON_MOVES[index],
  };
}
console.log(pokemons);

/** @returns {number} the average HP of all `pokemons` */
function getAvgHP() {
  const total =
    pokemons.reduce((accumulator, currentPokemon) => {
      return accumulator + currentPokemon.hp;
    }, 0) / POKEMON_LENGTH;

  return total;
}
console.log(avg_HP);

// === Components===
function AVERAGE_HP() {
  // create p tag
  const $p = document.createElement("p");
  // Add text to the p tag
  $p.textContent = `Average HP: ${avg_HP.toFixed(1)}`;
  // return tag
  return $p;
}

function POKEMON_ROW({ name, type, hp, moves }) {
  // Create a tr elemement
  const $tr = document.createElement("tr");
  // Add class to the tr type = pokemon type
  $tr.classList.add(`type-${type.toLowerCase()}`);
  // Creating all table data
  $tr.innerHTML = `
    <td>${name}</td>
    <td class = "cell-type">${type}</td>
    <td>${hp}</td>
    <td>${moves.join(", ")}</td>
  `;

  return $tr;
}

function ROWS() {
  // Create a tbody to store all table rows
  const $tbody = document.createElement("tbody");
  // place all the pokemon inside of each row
  const $rows = pokemons.map(POKEMON_ROW);
  // empty out the tbody so there's nothing old left
  $tbody.replaceChildren(...$rows);
  // then insert the new tr rows at once
  return $tbody;
}

// === RENDER ===
function render() {
  // Select the app id element
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Pokemon Table</h1>
    <AverageHP></AverageHP>
    <table>
        <thead>
          <tr>
            <th> NAME </th>
            <th> TYPE </th>
            <th> HP </th>
            <th> MOVES </th>
          </tr>
        </thead>
        <tbody id="PokemonRows">
        </tbody>
        <tbody>
    </table>
  `;
  $app.querySelector("AverageHP").replaceWith(AVERAGE_HP());
  $app.querySelector("#PokemonRows").replaceWith(ROWS());
}

render();
