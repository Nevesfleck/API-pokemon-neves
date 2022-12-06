const pokemonNome = document.querySelector('.nome_pokemon');
const pokemonNumero = document.querySelector('.pokemon_numero');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const botaoPrev = document.querySelector('.botao-prev');
const botaoNext = document.querySelector('.botao-next');

let procurarPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
    }
}
const renderPokemon = async (pokemon) => {

    pokemonNome.innerHTML = 'Loading...';
    pokemonNumero.innerHTML = '';
  
    const data = await fetchPokemon(pokemon);
  
    if (data) {
      pokemonImage.style.display = 'block';
      pokemonNome.innerHTML = data.name;
      pokemonNumero.innerHTML = data.id;
      pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
      input.value = '';
      procurarPokemon = data.id;
    } else {
      pokemonImage.style.display = 'none';
      pokemonNome.innerHTML = 'Not found :c';
      pokemonNumero.innerHTML = '';
    }
  }
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
  });
  botaoPrev.addEventListener('click', () => {
    if (procurarPokemon > 1) {
      procurarPokemon -= 1;
      renderPokemon(procurarPokemon);
    }
  });
  botaoNext.addEventListener('click', () => {
    procurarPokemon += 1;
    renderPokemon(procurarPokemon);
  });
  renderPokemon(procurarPokemon);