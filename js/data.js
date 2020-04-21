const colors = [
  'ice#98d8d8',
  'poison#a040a0',
  'rock#b8a038',
  'water#6890f0',
  'shadow#66625c',
  'bug#9cb820',
  'dragon#7038f8',
  'fairy#f09ad9',
  'fire#f08030',
  'ghost#705898',
  'ground#e0b668',
  'normal#a8a8a8',
  'psychic#eb2d77',
  'steel#6d8f9c',
  'dark#504843',
  'electric#c09643',
  'fighting#c03028',
  'flying#9096f0',
  'grass#22c02a'
]

const elForm = document.querySelector('#search-from');
const elSearchInput = document.querySelector('#search-input');
const elTypeBox = document.querySelector('.types__wrapper');
const elsAllTypeBtn = document.querySelectorAll('.btn');
const elAllPokemonsBox = document.querySelector('.pokemons');
const elAllPokemonsList = document.querySelector('.pokemons__list');
const elPostsTemplate = document.querySelector('#pokemon-card-temp').content;
const elLoadMoreBtn = document.querySelector('.load-more-btn');
const elDetailsBox = document.querySelector('.details');




function showPokemons(response, isAll = false, start = 0, fromBtn = false){
  // https://www.serebii.net/art/th/1.png
  // https://www.serebii.net/pokemon/art/${r.imgId}.png
  if (fromBtn) {
    elAllPokemonsList.innerHTML = '';
    postIterator(response, start, start + 36);  
    elLoadMoreBtn.style.display = 'block';
    imageLoad();
    return;
  }
  if (isAll) {
    postIterator(response, start, start + 36);
  } else {
    elAllPokemonsList.innerHTML = '';
    elLoadMoreBtn.style.display = 'none';
    postIterator(response, start, response.length);
  }
  imageLoad();
}
//////////////////////////////


function animatePosts() {
  const items = elAllPokemonsList.children;
  for (let i = 0; i < items.length; i++) {
    items[i].classList.add('--activate-animation');
    items[i].dataset.aos="flip-right";
  }
}

function getPokemonIdByName(name) {
  const id = data.filter(d => {
    return d.name == name;
  });
  return id[0].id;
}

function postIterator(response,start,end) {
  const elPostFragment = document.createDocumentFragment();
  if (end >= 802) {
    end = 802;
    elLoadMoreBtn.style.display = 'none';
  }
  for (let k = start; k < end ; k++) {
    const postClone = document.importNode(elPostsTemplate, true);
    postClone.querySelector('.pokemons__item').dataset.id = response[k].id;
    postClone.querySelector('.pokemon-img').dataset.src = `https://www.serebii.net/art/th/${response[k].id}.png`;
    postClone.querySelector('.pokemon-img').alt = response[k].name;
    postClone.querySelector('.pokemon-card__name').textContent = response[k].name.toUpperCase();
    postClone.querySelector('.pokemon-card__genus').textContent = response[k].species;
    postClone.querySelector('.pokemon-id').textContent = '#' + response[k].imgId;
    const elTypesList = postClone.querySelector('.pokemon-types');
    for (let j = 0; j < response[k].types.length; j++) {
      let elSpan1 = document.createElement('span');
      elSpan1.classList.add(`pokemon-type`);
      elSpan1.classList.add(`--${response[k].types[j]}`);
      elSpan1.textContent = response[k].types[j];
      elTypesList.appendChild(elSpan1);
    }
    const elAbilityList = postClone.querySelector('.pokemon-card__abilities');
    for (let i = 0; i < response[k].abilities.length; i++) {
      let elSpan = document.createElement('span');
      elSpan.classList.add('pokemon-card__ability');
      elSpan.textContent = response[k].abilities[i];
      elAbilityList.appendChild(elSpan);
    }
    postClone.querySelector('.--height').textContent = response[k].height + 'm';
    postClone.querySelector('.--weight').textContent = response[k].weight + 'kg';
    elPostFragment.appendChild(postClone);
  }
  elAllPokemonsList.appendChild(elPostFragment);
}

function imageLoad() {
  const objects = document.querySelectorAll('.lazy');
  Array.from(objects).map((item) => {
    // Start loading image
    const img = new Image();
    img.src = item.dataset.src;
    // Once image is loaded replace the src of the HTML element
    img.onload = () => {
      return item.nodeName === 'IMG' ? 
        item.src = item.dataset.src :        
        item.style.backgroundImage = `url(${item.dataset.src})`;
    };
  });
}

function getEvolutionList(name) {
  let evolutionList;
  evolution.forEach(e => {
    for (let i = 1; i < 4; i++) {
      if (e[i] === name) {
        evolutionList = e;
      }
    }
  });
  return Object.values(evolutionList);
}




const data = [{
    "id": 1,
    "species": "Seed Pokémon",
    "description": "Bulbasaur can be seen napping in bright sunlight.\nThere is a seed on its back. By soaking up the sun’s rays,\nthe seed grows progressively larger.",
    "name": "bulbasaur",
    "abilities": [
      "chlorophyll",
      "overgrow"
    ],
    "types": [
      "poison",
      "grass"
    ],
    "height": 0.7,
    "weight": 6.9,
    "imgId": "001"
  },
  {
    "id": 2,
    "species": "Seed Pokémon",
    "description": "There is a bud on this Pokémon’s back. To support its weight,\nIvysaur’s legs and trunk grow thick and strong.\nIf it starts spending more time lying in the sunlight,\nit’s a sign that the bud will bloom into a large flower soon.",
    "name": "ivysaur",
    "abilities": [
      "chlorophyll",
      "overgrow"
    ],
    "types": [
      "poison",
      "grass"
    ],
    "height": 1,
    "weight": 13,
    "imgId": "002"
  },
  {
    "id": 3,
    "species": "Seed Pokémon",
    "description": "There is a large flower on Venusaur’s back. The flower is said\nto take on vivid colors if it gets plenty of nutrition and sunlight.\nThe flower’s aroma soothes the emotions of people.",
    "name": "venusaur",
    "abilities": [
      "chlorophyll",
      "overgrow"
    ],
    "types": [
      "poison",
      "grass"
    ],
    "height": 2,
    "weight": 100,
    "imgId": "003"
  },
  {
    "id": 4,
    "species": "Lizard Pokémon",
    "description": "The flame that burns at the tip of its tail is an indication\nof its emotions. The flame wavers when Charmander\nis enjoying itself. If the Pokémon becomes enraged,\nthe flame burns fiercely.",
    "name": "charmander",
    "abilities": [
      "solar-power",
      "blaze"
    ],
    "types": [
      "fire"
    ],
    "height": 0.6,
    "weight": 8.5,
    "imgId": "004"
  },
  {
    "id": 5,
    "species": "Flame Pokémon",
    "description": "Charmeleon mercilessly destroys its foes using its sharp\nclaws. If it encounters a strong foe, it turns aggressive.\nIn this excited state, the flame at the tip of its tail flares with\na bluish white color.",
    "name": "charmeleon",
    "abilities": [
      "solar-power",
      "blaze"
    ],
    "types": [
      "fire"
    ],
    "height": 1.1,
    "weight": 19,
    "imgId": "005"
  },
  {
    "id": 6,
    "species": "Flame Pokémon",
    "description": "Charizard flies around the sky in search of powerful opponents.\nIt breathes fire of such great heat that it melts anything.\nHowever, it never turns its fiery breath on any opponent\nweaker than itself.",
    "name": "charizard",
    "abilities": [
      "solar-power",
      "blaze"
    ],
    "types": [
      "flying",
      "fire"
    ],
    "height": 1.7,
    "weight": 90.5,
    "imgId": "006"
  },
  {
    "id": 7,
    "species": "Tiny Turtle Pokémon",
    "description": "Squirtle’s shell is not merely used for protection.\nThe shell’s rounded shape and the grooves on its\nsurface help minimize resistance in water,\nenabling this Pokémon to swim at high speeds.",
    "name": "squirtle",
    "abilities": [
      "rain-dish",
      "torrent"
    ],
    "types": [
      "water"
    ],
    "height": 0.5,
    "weight": 9,
    "imgId": "007"
  },
  {
    "id": 8,
    "species": "Turtle Pokémon",
    "description": "Its tail is large and covered with a rich, thick fur. The tail\nbecomes increasingly deeper in color as Wartortle ages.\nThe scratches on its shell are evidence of this Pokémon’s\ntoughness as a battler.",
    "name": "wartortle",
    "abilities": [
      "rain-dish",
      "torrent"
    ],
    "types": [
      "water"
    ],
    "height": 1,
    "weight": 22.5,
    "imgId": "008"
  },
  {
    "id": 9,
    "species": "Shellfish Pokémon",
    "description": "Blastoise has water spouts that protrude from its shell.\nThe water spouts are very accurate.\nThey can shoot bullets of water with enough accuracy\nto strike empty cans from a distance of over 160 feet.",
    "name": "blastoise",
    "abilities": [
      "rain-dish",
      "torrent"
    ],
    "types": [
      "water"
    ],
    "height": 1.6,
    "weight": 85.5,
    "imgId": "009"
  },
  {
    "id": 10,
    "species": "Worm Pokémon",
    "description": "It’s easy to catch, and it grows quickly, making\nit one of the top recommendations for novice\nPokémon Trainers.",
    "name": "caterpie",
    "abilities": [
      "run-away",
      "shield-dust"
    ],
    "types": [
      "bug"
    ],
    "height": 0.3,
    "weight": 2.9,
    "imgId": "010"
  },
  {
    "id": 11,
    "species": "Cocoon Pokémon",
    "description": "Its shell is hard, but it’s still just a bug shell.\nIt’s been known to break, so intense battles\nwith it should be avoided.",
    "name": "metapod",
    "abilities": [
      "shed-skin"
    ],
    "types": [
      "bug"
    ],
    "height": 0.7,
    "weight": 9.9,
    "imgId": "011"
  },
  {
    "id": 12,
    "species": "Butterfly Pokémon",
    "description": "When attacked by other Pokémon, it defends\nitself by scattering its poisonous scales and\nfluttering its wings.",
    "name": "butterfree",
    "abilities": [
      "tinted-lens",
      "compound-eyes"
    ],
    "types": [
      "flying",
      "bug"
    ],
    "height": 1.1,
    "weight": 32,
    "imgId": "012"
  },
  {
    "id": 13,
    "species": "Hairy Bug Pokémon",
    "description": "Weedle has an extremely acute sense of smell. It is capable\nof distinguishing its favorite kinds of leaves from those it\ndislikes just by sniffing with its big red proboscis (nose).",
    "name": "weedle",
    "abilities": [
      "run-away",
      "shield-dust"
    ],
    "types": [
      "poison",
      "bug"
    ],
    "height": 0.3,
    "weight": 3.2,
    "imgId": "013"
  },
  {
    "id": 14,
    "species": "Cocoon Pokémon",
    "description": "Kakuna remains virtually immobile as it clings to a tree.\nHowever, on the inside, it is extremely busy as it prepares\nfor its coming evolution.\nThis is evident from how hot the shell becomes to the touch.",
    "name": "kakuna",
    "abilities": [
      "shed-skin"
    ],
    "types": [
      "poison",
      "bug"
    ],
    "height": 0.6,
    "weight": 10,
    "imgId": "014"
  },
  {
    "id": 15,
    "species": "Poison Bee Pokémon",
    "description": "Beedrill is extremely territorial. No one should ever approach\nits nest—this is for their own safety. If angered, they will attack\nin a furious swarm.",
    "name": "beedrill",
    "abilities": [
      "sniper",
      "swarm"
    ],
    "types": [
      "poison",
      "bug"
    ],
    "height": 1,
    "weight": 29.5,
    "imgId": "015"
  },
  {
    "id": 16,
    "species": "Tiny Bird Pokémon",
    "description": "Pidgey has an extremely sharp sense of direction.\nIt is capable of unerringly returning home to its nest,\nhowever far it may be removed from its familiar surroundings.",
    "name": "pidgey",
    "abilities": [
      "big-pecks",
      "tangled-feet",
      "keen-eye"
    ],
    "types": [
      "flying",
      "normal"
    ],
    "height": 0.3,
    "weight": 1.8,
    "imgId": "016"
  },
  {
    "id": 17,
    "species": "Bird Pokémon",
    "description": "Pidgeotto claims a large area as its own territory. This\nPokémon flies around, patrolling its living space. If its territory\nis violated, it shows no mercy in thoroughly punishing the foe\nwith its sharp claws.",
    "name": "pidgeotto",
    "abilities": [
      "big-pecks",
      "tangled-feet",
      "keen-eye"
    ],
    "types": [
      "flying",
      "normal"
    ],
    "height": 1.1,
    "weight": 30,
    "imgId": "017"
  },
  {
    "id": 18,
    "species": "Bird Pokémon",
    "description": "This Pokémon has a dazzling plumage of beautifully\nglossy feathers. Many Trainers are captivated by the\nstriking beauty of the feathers on its head, compelling\nthem to choose Pidgeot as their Pokémon.",
    "name": "pidgeot",
    "abilities": [
      "big-pecks",
      "tangled-feet",
      "keen-eye"
    ],
    "types": [
      "flying",
      "normal"
    ],
    "height": 1.5,
    "weight": 39.5,
    "imgId": "018"
  },
  {
    "id": 19,
    "species": "Mouse Pokémon",
    "description": "With their strong capacity for survival, they can\nlive in dirty places without concern. Left\nunchecked, their numbers multiply rapidly.",
    "name": "rattata",
    "abilities": [
      "hustle",
      "guts",
      "run-away"
    ],
    "types": [
      "normal"
    ],
    "height": 0.3,
    "weight": 3.5,
    "imgId": "019"
  },
  {
    "id": 20,
    "species": "Mouse Pokémon",
    "description": "Its disposition is far more violent than its looks\nwould suggest. Don’t let your hand get too close\nto its face, as it could bite your hand clean off.",
    "name": "raticate",
    "abilities": [
      "hustle",
      "guts",
      "run-away"
    ],
    "types": [
      "normal"
    ],
    "height": 0.7,
    "weight": 18.5,
    "imgId": "020"
  },
  {
    "id": 21,
    "species": "Tiny Bird Pokémon",
    "description": "Farmers whose fields are troubled by bug\nPokémon appreciate Spearow for its vigorous\nappetite and look after it.",
    "name": "spearow",
    "abilities": [
      "sniper",
      "keen-eye"
    ],
    "types": [
      "flying",
      "normal"
    ],
    "height": 0.3,
    "weight": 2,
    "imgId": "021"
  },
  {
    "id": 22,
    "species": "Beak Pokémon",
    "description": "Drawings of a Pokémon resembling Fearow can\nbe seen in murals from deep in ancient history.",
    "name": "fearow",
    "abilities": [
      "sniper",
      "keen-eye"
    ],
    "types": [
      "flying",
      "normal"
    ],
    "height": 1.2,
    "weight": 38,
    "imgId": "022"
  },
  {
    "id": 23,
    "species": "Snake Pokémon",
    "description": "Ekans curls itself up in a spiral while it rests. Assuming this\nposition allows it to quickly respond to a threat from any\ndirection with a glare from its upraised head.",
    "name": "ekans",
    "abilities": [
      "unnerve",
      "shed-skin",
      "intimidate"
    ],
    "types": [
      "poison"
    ],
    "height": 2,
    "weight": 6.9,
    "imgId": "023"
  },
  {
    "id": 24,
    "species": "Cobra Pokémon",
    "description": "This Pokémon is terrifically strong in order to constrict things\nwith its body. It can even flatten steel oil drums. Once Arbok\nwraps its body around its foe, escaping its crunching embrace\nis impossible.",
    "name": "arbok",
    "abilities": [
      "unnerve",
      "shed-skin",
      "intimidate"
    ],
    "types": [
      "poison"
    ],
    "height": 3.5,
    "weight": 65,
    "imgId": "024"
  },
  {
    "id": 25,
    "species": "Mouse Pokémon",
    "description": "It’s in its nature to store electricity. It feels\nstressed now and then if it’s unable to fully\ndischarge the electricity.",
    "name": "pikachu",
    "abilities": [
      "lightning-rod",
      "static"
    ],
    "types": [
      "electric"
    ],
    "height": 0.4,
    "weight": 6,
    "imgId": "025"
  },
  {
    "id": 26,
    "species": "Mouse Pokémon",
    "description": "It becomes aggressive when it has electricity\nstored up. At such times, even its Trainer has to\ntake care to avoid being attacked.",
    "name": "raichu",
    "abilities": [
      "lightning-rod",
      "static"
    ],
    "types": [
      "electric"
    ],
    "height": 0.8,
    "weight": 30,
    "imgId": "026"
  },
  {
    "id": 27,
    "species": "Mouse Pokémon",
    "description": "It usually makes its home in deserts and arid\nzones, where rain does not fall. It digs holes to\ncatch Bug-type Pokémon.",
    "name": "sandshrew",
    "abilities": [
      "sand-rush",
      "sand-veil"
    ],
    "types": [
      "ground"
    ],
    "height": 0.6,
    "weight": 12,
    "imgId": "027"
  },
  {
    "id": 28,
    "species": "Mouse Pokémon",
    "description": "It uses its claws to climb trees and then curls\nits body into a spiny ball, ready to drop onto\nany prey that appears.",
    "name": "sandslash",
    "abilities": [
      "sand-rush",
      "sand-veil"
    ],
    "types": [
      "ground"
    ],
    "height": 1,
    "weight": 29.5,
    "imgId": "028"
  },
  {
    "id": 29,
    "species": "Poison Pin Pokémon",
    "description": "Nidoran♀ has barbs that secrete a powerful poison.\nThey are thought to have developed as protection for\nthis small-bodied Pokémon. When enraged, it releases\na horrible toxin from its horn.",
    "name": "nidoran-f",
    "abilities": [
      "hustle",
      "rivalry",
      "poison-point"
    ],
    "types": [
      "poison"
    ],
    "height": 0.4,
    "weight": 7,
    "imgId": "029"
  },
  {
    "id": 30,
    "species": "Poison Pin Pokémon",
    "description": "When Nidorina are with their friends or family, they keep\ntheir barbs tucked away to prevent hurting each other.\nThis Pokémon appears to become nervous if separated\nfrom the others.",
    "name": "nidorina",
    "abilities": [
      "hustle",
      "rivalry",
      "poison-point"
    ],
    "types": [
      "poison"
    ],
    "height": 0.8,
    "weight": 20,
    "imgId": "030"
  },
  {
    "id": 31,
    "species": "Drill Pokémon",
    "description": "Nidoqueen’s body is encased in extremely hard scales.\nIt is adept at sending foes flying with harsh tackles. This\nPokémon is at its strongest when it is defending its young.",
    "name": "nidoqueen",
    "abilities": [
      "sheer-force",
      "rivalry",
      "poison-point"
    ],
    "types": [
      "ground",
      "poison"
    ],
    "height": 1.3,
    "weight": 60,
    "imgId": "031"
  },
  {
    "id": 32,
    "species": "Poison Pin Pokémon",
    "description": "Nidoran♂ has developed muscles for moving its ears. Thanks\nto them, the ears can be freely moved in any direction. Even\nthe slightest sound does not escape this Pokémon’s notice.",
    "name": "nidoran-m",
    "abilities": [
      "hustle",
      "rivalry",
      "poison-point"
    ],
    "types": [
      "poison"
    ],
    "height": 0.5,
    "weight": 9,
    "imgId": "032"
  },
  {
    "id": 33,
    "species": "Poison Pin Pokémon",
    "description": "Nidorino has a horn that is harder than a diamond. If it senses\na hostile presence, all the barbs on its back bristle up at once,\nand it challenges the foe with all its might.",
    "name": "nidorino",
    "abilities": [
      "hustle",
      "rivalry",
      "poison-point"
    ],
    "types": [
      "poison"
    ],
    "height": 0.9,
    "weight": 19.5,
    "imgId": "033"
  },
  {
    "id": 34,
    "species": "Drill Pokémon",
    "description": "Nidoking’s thick tail packs enormously destructive power.\nWith one swing, it can topple a metal transmission tower. Once\nthis Pokémon goes on a rampage, there is no stopping it.",
    "name": "nidoking",
    "abilities": [
      "sheer-force",
      "rivalry",
      "poison-point"
    ],
    "types": [
      "ground",
      "poison"
    ],
    "height": 1.4,
    "weight": 62,
    "imgId": "034"
  },
  {
    "id": 35,
    "species": "Fairy Pokémon",
    "description": "On nights with a full moon, they gather together\nand dance. The surrounding area is enveloped\nin an abnormal magnetic field.",
    "name": "clefairy",
    "abilities": [
      "friend-guard",
      "magic-guard",
      "cute-charm"
    ],
    "types": [
      "fairy"
    ],
    "height": 0.6,
    "weight": 7.5,
    "imgId": "035"
  },
  {
    "id": 36,
    "species": "Fairy Pokémon",
    "description": "According to tradition, people who see a pair\nof Clefable skipping by can look forward to a\nhappy marriage.",
    "name": "clefable",
    "abilities": [
      "unaware",
      "magic-guard",
      "cute-charm"
    ],
    "types": [
      "fairy"
    ],
    "height": 1.3,
    "weight": 40,
    "imgId": "036"
  },
  {
    "id": 37,
    "species": "Fox Pokémon",
    "description": "From its mouth spew flames that seem to\nresemble the spirits of the deceased. Some\npeople mistakenly think this fire is a ghost.",
    "name": "vulpix",
    "abilities": [
      "drought",
      "flash-fire"
    ],
    "types": [
      "fire"
    ],
    "height": 0.6,
    "weight": 9.9,
    "imgId": "037"
  },
  {
    "id": 38,
    "species": "Fox Pokémon",
    "description": "Said to live for a thousand years, this Pokémon\nuses its supernatural abilities to manipulate fire.\nIt can burn its prey to a crisp as it pleases.",
    "name": "ninetales",
    "abilities": [
      "drought",
      "flash-fire"
    ],
    "types": [
      "fire"
    ],
    "height": 1.1,
    "weight": 19.9,
    "imgId": "038"
  },
  {
    "id": 39,
    "species": "Balloon Pokémon",
    "description": "Jigglypuff possess a vocal range that exceeds\n12 octaves, but each individual’s singing skill\ndepends on its own effort.",
    "name": "jigglypuff",
    "abilities": [
      "friend-guard",
      "competitive",
      "cute-charm"
    ],
    "types": [
      "fairy",
      "normal"
    ],
    "height": 0.5,
    "weight": 5.5,
    "imgId": "039"
  },
  {
    "id": 40,
    "species": "Balloon Pokémon",
    "description": "As it inhales, it expands...and expands...and\nexpands. Wigglytuff compete to see which one\ncan inflate itself the most.",
    "name": "wigglytuff",
    "abilities": [
      "frisk",
      "competitive",
      "cute-charm"
    ],
    "types": [
      "fairy",
      "normal"
    ],
    "height": 1,
    "weight": 12,
    "imgId": "040"
  },
  {
    "id": 41,
    "species": "Bat Pokémon",
    "description": "When exposed to sunlight, they suffer burns.\nThe frequency of their ultrasonic waves can\ndiffer slightly from colony to colony.",
    "name": "zubat",
    "abilities": [
      "infiltrator",
      "inner-focus"
    ],
    "types": [
      "flying",
      "poison"
    ],
    "height": 0.8,
    "weight": 7.5,
    "imgId": "041"
  },
  {
    "id": 42,
    "species": "Bat Pokémon",
    "description": "Sometimes they drink so much blood, they can’t\nfly anymore. Then they fall to the ground and\nbecome food for other Pokémon.",
    "name": "golbat",
    "abilities": [
      "infiltrator",
      "inner-focus"
    ],
    "types": [
      "flying",
      "poison"
    ],
    "height": 1.6,
    "weight": 55,
    "imgId": "042"
  },
  {
    "id": 43,
    "species": "Weed Pokémon",
    "description": "Oddish searches for fertile, nutrient-rich soil, then plants itself.\nDuring the daytime, while it is planted, this Pokémon’s feet\nare thought to change shape and become similar to the roots\nof trees.",
    "name": "oddish",
    "abilities": [
      "run-away",
      "chlorophyll"
    ],
    "types": [
      "poison",
      "grass"
    ],
    "height": 0.5,
    "weight": 5.4,
    "imgId": "043"
  },
  {
    "id": 44,
    "species": "Weed Pokémon",
    "description": "From its mouth Gloom drips honey that smells absolutely\nhorrible. Apparently, it loves the horrid stench. It sniffs the\nnoxious fumes and then drools even more of its honey.",
    "name": "gloom",
    "abilities": [
      "stench",
      "chlorophyll"
    ],
    "types": [
      "poison",
      "grass"
    ],
    "height": 0.8,
    "weight": 8.6,
    "imgId": "044"
  },
  {
    "id": 45,
    "species": "Flower Pokémon",
    "description": "Vileplume has the world’s largest petals. They are used to\nattract prey that are then doused with toxic spores. Once the\nprey are immobilized, this Pokémon catches and devours them.",
    "name": "vileplume",
    "abilities": [
      "effect-spore",
      "chlorophyll"
    ],
    "types": [
      "poison",
      "grass"
    ],
    "height": 1.2,
    "weight": 18.6,
    "imgId": "045"
  },
  {
    "id": 46,
    "species": "Mushroom Pokémon",
    "description": "Mushrooms called tochukaso sprout from its\nback. They can be dried and powdered to make\na medicine used to extend life.",
    "name": "paras",
    "abilities": [
      "damp",
      "dry-skin",
      "effect-spore"
    ],
    "types": [
      "grass",
      "bug"
    ],
    "height": 0.3,
    "weight": 5.4,
    "imgId": "046"
  },
  {
    "id": 47,
    "species": "Mushroom Pokémon",
    "description": "It scatters toxic spores from its mushroom cap.\nOnce harvested, these spores can be steeped\nand boiled down to prepare herbal medicines.",
    "name": "parasect",
    "abilities": [
      "damp",
      "dry-skin",
      "effect-spore"
    ],
    "types": [
      "grass",
      "bug"
    ],
    "height": 1,
    "weight": 29.5,
    "imgId": "047"
  },
  {
    "id": 48,
    "species": "Insect Pokémon",
    "description": "Venonat is said to have evolved with a coat of thin, stiff hair\nthat covers its entire body for protection. It possesses large\neyes that never fail to spot even minuscule prey.",
    "name": "venonat",
    "abilities": [
      "run-away",
      "tinted-lens",
      "compound-eyes"
    ],
    "types": [
      "poison",
      "bug"
    ],
    "height": 1,
    "weight": 30,
    "imgId": "048"
  },
  {
    "id": 49,
    "species": "Poison Moth Pokémon",
    "description": "Venomoth is nocturnal—it is a Pokémon that only becomes\nactive at night. Its favorite prey are small insects that gather\naround streetlights, attracted by the light in the darkness.",
    "name": "venomoth",
    "abilities": [
      "wonder-skin",
      "tinted-lens",
      "shield-dust"
    ],
    "types": [
      "poison",
      "bug"
    ],
    "height": 1.5,
    "weight": 12.5,
    "imgId": "049"
  },
  {
    "id": 50,
    "species": "Mole Pokémon",
    "description": "Many farmers cherish and nurture Diglett\nbecause its droppings enrich the soil it lives in.",
    "name": "diglett",
    "abilities": [
      "sand-force",
      "arena-trap",
      "sand-veil"
    ],
    "types": [
      "ground"
    ],
    "height": 0.2,
    "weight": 0.8,
    "imgId": "050"
  },
  {
    "id": 51,
    "species": "Mole Pokémon",
    "description": "Despite the closeness between this Pokémon\nand farmers and other people, no one has ever\nseen the parts of it concealed underground.",
    "name": "dugtrio",
    "abilities": [
      "sand-force",
      "arena-trap",
      "sand-veil"
    ],
    "types": [
      "ground"
    ],
    "height": 0.7,
    "weight": 33.3,
    "imgId": "051"
  },
  {
    "id": 52,
    "species": "Scratch Cat Pokémon",
    "description": "It loves shiny things. It often fights with\nMurkrow over prey they’re both trying to catch.",
    "name": "meowth",
    "abilities": [
      "unnerve",
      "technician",
      "pickup"
    ],
    "types": [
      "normal"
    ],
    "height": 0.4,
    "weight": 4.2,
    "imgId": "052"
  },
  {
    "id": 53,
    "species": "Classy Cat Pokémon",
    "description": "It has a high opinion of itself, although not to\nthe same extent as the Alolan Persian. It’s quite\ndifficult to make friends with this Pokémon.",
    "name": "persian",
    "abilities": [
      "unnerve",
      "technician",
      "limber"
    ],
    "types": [
      "normal"
    ],
    "height": 1,
    "weight": 32,
    "imgId": "053"
  },
  {
    "id": 54,
    "species": "Duck Pokémon",
    "description": "This Pokémon is troubled by constant\nheadaches. The more pain it’s in, the more\npowerful its psychokinesis becomes.",
    "name": "psyduck",
    "abilities": [
      "swift-swim",
      "cloud-nine",
      "damp"
    ],
    "types": [
      "water"
    ],
    "height": 0.8,
    "weight": 19.6,
    "imgId": "054"
  },
  {
    "id": 55,
    "species": "Duck Pokémon",
    "description": "It swims along the banks of lakes and catches\nfish Pokémon. It takes them to the shore and\nquietly eats them up.",
    "name": "golduck",
    "abilities": [
      "swift-swim",
      "cloud-nine",
      "damp"
    ],
    "types": [
      "water"
    ],
    "height": 1.7,
    "weight": 76.6,
    "imgId": "055"
  },
  {
    "id": 56,
    "species": "Pig Monkey Pokémon",
    "description": "Its raging tires it out and causes it to fall asleep,\nbut the anger resonating in its dreams causes it\nto wake up—which infuriates it all over again.",
    "name": "mankey",
    "abilities": [
      "defiant",
      "anger-point",
      "vital-spirit"
    ],
    "types": [
      "fighting"
    ],
    "height": 0.5,
    "weight": 28,
    "imgId": "056"
  },
  {
    "id": 57,
    "species": "Pig Monkey Pokémon",
    "description": "Some researchers theorize that Primeape\nremains angry even when inside a Poké Ball.",
    "name": "primeape",
    "abilities": [
      "defiant",
      "anger-point",
      "vital-spirit"
    ],
    "types": [
      "fighting"
    ],
    "height": 1,
    "weight": 32,
    "imgId": "057"
  },
  {
    "id": 58,
    "species": "Puppy Pokémon",
    "description": "It looks cute, but when you approach another\nTrainer’s Growlithe, it will bark at you and bite.",
    "name": "growlithe",
    "abilities": [
      "justified",
      "flash-fire",
      "intimidate"
    ],
    "types": [
      "fire"
    ],
    "height": 0.7,
    "weight": 19,
    "imgId": "058"
  },
  {
    "id": 59,
    "species": "Legendary Pokémon",
    "description": "The fire burning inside its body serves as the\nenergy to fuel it as it runs great distances.\nIt appears in many legends.",
    "name": "arcanine",
    "abilities": [
      "justified",
      "flash-fire",
      "intimidate"
    ],
    "types": [
      "fire"
    ],
    "height": 1.9,
    "weight": 155,
    "imgId": "059"
  },
  {
    "id": 60,
    "species": "Tadpole Pokémon",
    "description": "It’s still not very good at walking. Its Trainers\nshould train this Pokémon to walk every day.",
    "name": "poliwag",
    "abilities": [
      "swift-swim",
      "damp",
      "water-absorb"
    ],
    "types": [
      "water"
    ],
    "height": 0.6,
    "weight": 12.4,
    "imgId": "060"
  },
  {
    "id": 61,
    "species": "Tadpole Pokémon",
    "description": "It marches over the land in search of bug\nPokémon to eat. Then it takes them underwater\nso it can dine on them where it’s safe.",
    "name": "poliwhirl",
    "abilities": [
      "swift-swim",
      "damp",
      "water-absorb"
    ],
    "types": [
      "water"
    ],
    "height": 1,
    "weight": 20,
    "imgId": "061"
  },
  {
    "id": 62,
    "species": "Tadpole Pokémon",
    "description": "Its percentage of body fat is nearly zero. Its\nbody is entirely muscle, which makes it heavy\nand forces its swimming prowess to develop.",
    "name": "poliwrath",
    "abilities": [
      "swift-swim",
      "damp",
      "water-absorb"
    ],
    "types": [
      "fighting",
      "water"
    ],
    "height": 1.3,
    "weight": 54,
    "imgId": "062"
  },
  {
    "id": 63,
    "species": "Psi Pokémon",
    "description": "It can teleport itself to safety while it’s asleep,\nbut when it wakes, it doesn’t know where it is,\nso it panics.",
    "name": "abra",
    "abilities": [
      "magic-guard",
      "inner-focus",
      "synchronize"
    ],
    "types": [
      "psychic"
    ],
    "height": 0.9,
    "weight": 19.5,
    "imgId": "063"
  },
  {
    "id": 64,
    "species": "Psi Pokémon",
    "description": "Kadabra’s presence infests televisions and\nmonitors with creepy shadows that bring\nbad luck.",
    "name": "kadabra",
    "abilities": [
      "magic-guard",
      "inner-focus",
      "synchronize"
    ],
    "types": [
      "psychic"
    ],
    "height": 1.3,
    "weight": 56.5,
    "imgId": "064"
  },
  {
    "id": 65,
    "species": "Psi Pokémon",
    "description": "Its brain cells continue to increase in number\nuntil its death. The older the Alakazam, the\nlarger its head.",
    "name": "alakazam",
    "abilities": [
      "magic-guard",
      "inner-focus",
      "synchronize"
    ],
    "types": [
      "psychic"
    ],
    "height": 1.5,
    "weight": 48,
    "imgId": "065"
  },
  {
    "id": 66,
    "species": "Superpower Pokémon",
    "description": "With its superhuman strength, it’s able to throw\na hundred people all at the same time. Its\nstrength comes from lifting Graveler every day.",
    "name": "machop",
    "abilities": [
      "steadfast",
      "no-guard",
      "guts"
    ],
    "types": [
      "fighting"
    ],
    "height": 0.8,
    "weight": 19.5,
    "imgId": "066"
  },
  {
    "id": 67,
    "species": "Superpower Pokémon",
    "description": "It willingly assists with hard labor because it\nknows the work is good training for its muscles.",
    "name": "machoke",
    "abilities": [
      "steadfast",
      "no-guard",
      "guts"
    ],
    "types": [
      "fighting"
    ],
    "height": 1.5,
    "weight": 70.5,
    "imgId": "067"
  },
  {
    "id": 68,
    "species": "Superpower Pokémon",
    "description": "It can lift heavy loads with the greatest of ease.\nIt can even heft dump trucks. But its clumsy\nfingers prevent it from doing any precision work.",
    "name": "machamp",
    "abilities": [
      "steadfast",
      "no-guard",
      "guts"
    ],
    "types": [
      "fighting"
    ],
    "height": 1.6,
    "weight": 130,
    "imgId": "068"
  },
  {
    "id": 69,
    "species": "Flower Pokémon",
    "description": "Bellsprout’s thin and flexible body lets it bend and sway\nto avoid any attack, however strong it may be. From its mouth,\nthis Pokémon spits a corrosive fluid that melts even iron.",
    "name": "bellsprout",
    "abilities": [
      "gluttony",
      "chlorophyll"
    ],
    "types": [
      "poison",
      "grass"
    ],
    "height": 0.7,
    "weight": 4,
    "imgId": "069"
  },
  {
    "id": 70,
    "species": "Flycatcher Pokémon",
    "description": "Weepinbell has a large hook on its rear end. At night, the\nPokémon hooks on to a tree branch and goes to sleep.\nIf it moves around in its sleep, it may wake up to find itself\non the ground.",
    "name": "weepinbell",
    "abilities": [
      "gluttony",
      "chlorophyll"
    ],
    "types": [
      "poison",
      "grass"
    ],
    "height": 1,
    "weight": 6.4,
    "imgId": "070"
  },
  {
    "id": 71,
    "species": "Flycatcher Pokémon",
    "description": "Victreebel has a long vine that extends from its head.\nThis vine is waved and flicked about as if it were an animal\nto attract prey. When an unsuspecting prey draws near,\nthis Pokémon swallows it whole.",
    "name": "victreebel",
    "abilities": [
      "gluttony",
      "chlorophyll"
    ],
    "types": [
      "poison",
      "grass"
    ],
    "height": 1.7,
    "weight": 15.5,
    "imgId": "071"
  },
  {
    "id": 72,
    "species": "Jellyfish Pokémon",
    "description": "It drifts in shallow seas, such as the areas near\nbeaches. If you get bitten or stabbed by its\ntoxic tentacles, rush to the hospital.",
    "name": "tentacool",
    "abilities": [
      "rain-dish",
      "liquid-ooze",
      "clear-body"
    ],
    "types": [
      "poison",
      "water"
    ],
    "height": 0.9,
    "weight": 45.5,
    "imgId": "072"
  },
  {
    "id": 73,
    "species": "Jellyfish Pokémon",
    "description": "Although these Pokémon are rare, when a large\noutbreak of them occurs, all fish Pokémon\ndisappear from the surrounding sea.",
    "name": "tentacruel",
    "abilities": [
      "rain-dish",
      "liquid-ooze",
      "clear-body"
    ],
    "types": [
      "poison",
      "water"
    ],
    "height": 1.6,
    "weight": 55,
    "imgId": "073"
  },
  {
    "id": 74,
    "species": "Rock Pokémon",
    "description": "There are plenty of them to be found along any\nroad. A scholar with too much free time once\ncounted a hundred of them along a single route.",
    "name": "geodude",
    "abilities": [
      "sand-veil",
      "sturdy",
      "rock-head"
    ],
    "types": [
      "ground",
      "rock"
    ],
    "height": 0.4,
    "weight": 20,
    "imgId": "074"
  },
  {
    "id": 75,
    "species": "Rock Pokémon",
    "description": "This slow-footed Pokémon moves by curling up\nand rolling instead of walking. With enough\nmomentum, its speed can exceed 60 mph.",
    "name": "graveler",
    "abilities": [
      "sand-veil",
      "sturdy",
      "rock-head"
    ],
    "types": [
      "ground",
      "rock"
    ],
    "height": 1,
    "weight": 105,
    "imgId": "075"
  },
  {
    "id": 76,
    "species": "Megaton Pokémon",
    "description": "Once a year, this Pokémon molts, and its shed\nshell returns to the soil. This process creates\nenriched soil, so farmers collect the shells.",
    "name": "golem",
    "abilities": [
      "sand-veil",
      "sturdy",
      "rock-head"
    ],
    "types": [
      "ground",
      "rock"
    ],
    "height": 1.4,
    "weight": 300,
    "imgId": "076"
  },
  {
    "id": 77,
    "species": "Fire Horse Pokémon",
    "description": "Ponyta is very weak at birth. It can barely stand up.\nThis Pokémon becomes stronger by stumbling and\nfalling to keep up with its parent.",
    "name": "ponyta",
    "abilities": [
      "flame-body",
      "flash-fire",
      "run-away"
    ],
    "types": [
      "fire"
    ],
    "height": 1,
    "weight": 30,
    "imgId": "077"
  },
  {
    "id": 78,
    "species": "Fire Horse Pokémon",
    "description": "Rapidash usually can be seen casually cantering in the fields\nand plains. However, when this Pokémon turns serious, its\nfiery manes flare and blaze as it gallops its way up to 150 mph.",
    "name": "rapidash",
    "abilities": [
      "flame-body",
      "flash-fire",
      "run-away"
    ],
    "types": [
      "fire"
    ],
    "height": 1.7,
    "weight": 95,
    "imgId": "078"
  },
  {
    "id": 79,
    "species": "Dopey Pokémon",
    "description": "Alolan home cooking involves drying Slowpoke\ntails and then simmering them into a salty stew.",
    "name": "slowpoke",
    "abilities": [
      "regenerator",
      "own-tempo",
      "oblivious"
    ],
    "types": [
      "psychic",
      "water"
    ],
    "height": 1.2,
    "weight": 36,
    "imgId": "079"
  },
  {
    "id": 80,
    "species": "Hermit Crab Pokémon",
    "description": "Whenever Shellder bites down hard on its tail,\nit gives Slowbro a flash of inspiration...which it\nforgets a moment later.",
    "name": "slowbro",
    "abilities": [
      "regenerator",
      "own-tempo",
      "oblivious"
    ],
    "types": [
      "psychic",
      "water"
    ],
    "height": 1.6,
    "weight": 78.5,
    "imgId": "080"
  },
  {
    "id": 81,
    "species": "Magnet Pokémon",
    "description": "It sends out electromagnetic waves, which let it\nfloat through the air. Touching it while it’s eating\nelectricity will give you a full-body shock.",
    "name": "magnemite",
    "abilities": [
      "analytic",
      "sturdy",
      "magnet-pull"
    ],
    "types": [
      "steel",
      "electric"
    ],
    "height": 0.3,
    "weight": 6,
    "imgId": "081"
  },
  {
    "id": 82,
    "species": "Magnet Pokémon",
    "description": "It has about three times the electrical power of\nMagnemite. For some reason, outbreaks of this\nPokémon happen when lots of sunspots appear.",
    "name": "magneton",
    "abilities": [
      "analytic",
      "sturdy",
      "magnet-pull"
    ],
    "types": [
      "steel",
      "electric"
    ],
    "height": 1,
    "weight": 60,
    "imgId": "082"
  },
  {
    "id": 83,
    "species": "Wild Duck Pokémon",
    "description": "Farfetch’d is always seen with a stalk from a plant of some\nsort. Apparently, there are good stalks and bad stalks. This\nPokémon has been known to fight with others over stalks.",
    "name": "farfetchd",
    "abilities": [
      "defiant",
      "inner-focus",
      "keen-eye"
    ],
    "types": [
      "flying",
      "normal"
    ],
    "height": 0.8,
    "weight": 15,
    "imgId": "083"
  },
  {
    "id": 84,
    "species": "Twin Bird Pokémon",
    "description": "Doduo’s two heads contain completely identical brains. A\nscientific study reported that on rare occasions, there will be\nexamples of this Pokémon possessing different sets of brains.",
    "name": "doduo",
    "abilities": [
      "tangled-feet",
      "early-bird",
      "run-away"
    ],
    "types": [
      "flying",
      "normal"
    ],
    "height": 1.4,
    "weight": 39.2,
    "imgId": "084"
  },
  {
    "id": 85,
    "species": "Triple Bird Pokémon",
    "description": "Apparently, the heads aren’t the only parts of the body that\nDodrio has three of. It has three sets of hearts and lungs as\nwell, so it is capable of running long distances without rest.",
    "name": "dodrio",
    "abilities": [
      "tangled-feet",
      "early-bird",
      "run-away"
    ],
    "types": [
      "flying",
      "normal"
    ],
    "height": 1.8,
    "weight": 85.2,
    "imgId": "085"
  },
  {
    "id": 86,
    "species": "Sea Lion Pokémon",
    "description": "Seel hunts for prey in the frigid sea underneath sheets of ice.\nWhen it needs to breathe, it punches a hole through the ice\nwith the sharply protruding section of its head.",
    "name": "seel",
    "abilities": [
      "ice-body",
      "hydration",
      "thick-fat"
    ],
    "types": [
      "water"
    ],
    "height": 1.1,
    "weight": 90,
    "imgId": "086"
  },
  {
    "id": 87,
    "species": "Sea Lion Pokémon",
    "description": "Dewgong loves to snooze on bitterly cold ice. The sight of\nthis Pokémon sleeping on a glacier was mistakenly thought\nto be a mermaid by a mariner long ago.",
    "name": "dewgong",
    "abilities": [
      "ice-body",
      "hydration",
      "thick-fat"
    ],
    "types": [
      "ice",
      "water"
    ],
    "height": 1.7,
    "weight": 120,
    "imgId": "087"
  },
  {
    "id": 88,
    "species": "Sludge Pokémon",
    "description": "It was born from sludge transformed by\nexposure to X-rays from the moon. When its\ninternal load of germs decreases, it dies.",
    "name": "grimer",
    "abilities": [
      "poison-touch",
      "sticky-hold",
      "stench"
    ],
    "types": [
      "poison"
    ],
    "height": 0.9,
    "weight": 30,
    "imgId": "088"
  },
  {
    "id": 89,
    "species": "Sludge Pokémon",
    "description": "After recent environmental improvements, this\nPokémon is now hardly seen at all. People\nspeculate that it may go extinct at some point.",
    "name": "muk",
    "abilities": [
      "poison-touch",
      "sticky-hold",
      "stench"
    ],
    "types": [
      "poison"
    ],
    "height": 1.2,
    "weight": 30,
    "imgId": "089"
  },
  {
    "id": 90,
    "species": "Bivalve Pokémon",
    "description": "This Pokémon’s tongue is always hanging out.\nIt uses its tongue with great dexterity to dig up\nsand from the seabed in its search for food.",
    "name": "shellder",
    "abilities": [
      "overcoat",
      "skill-link",
      "shell-armor"
    ],
    "types": [
      "water"
    ],
    "height": 0.3,
    "weight": 4,
    "imgId": "090"
  },
  {
    "id": 91,
    "species": "Bivalve Pokémon",
    "description": "Excavation of the tombs of ancient hunting\ntribes has turned up many spears tipped with\nspikes that had fallen off this Pokémon’s shell.",
    "name": "cloyster",
    "abilities": [
      "overcoat",
      "skill-link",
      "shell-armor"
    ],
    "types": [
      "ice",
      "water"
    ],
    "height": 1.5,
    "weight": 132.5,
    "imgId": "091"
  },
  {
    "id": 92,
    "species": "Gas Pokémon",
    "description": "Although Gastly is barely visible, when it’s near,\na faint sweet smell lingers.",
    "name": "gastly",
    "abilities": [
      "levitate"
    ],
    "types": [
      "poison",
      "ghost"
    ],
    "height": 1.3,
    "weight": 0.1,
    "imgId": "092"
  },
  {
    "id": 93,
    "species": "Gas Pokémon",
    "description": "It fears the light and revels in the dark. It may\nbe on the verge of extinction in cities that stay\nbrightly lit at night.",
    "name": "haunter",
    "abilities": [
      "levitate"
    ],
    "types": [
      "poison",
      "ghost"
    ],
    "height": 1.6,
    "weight": 0.1,
    "imgId": "093"
  },
  {
    "id": 94,
    "species": "Shadow Pokémon",
    "description": "It apparently wishes for a traveling companion.\nSince it was once human itself, it tries to create\none by taking the lives of other humans.",
    "name": "gengar",
    "abilities": [
      "cursed-body"
    ],
    "types": [
      "poison",
      "ghost"
    ],
    "height": 1.5,
    "weight": 40.5,
    "imgId": "094"
  },
  {
    "id": 95,
    "species": "Rock Snake Pokémon",
    "description": "Onix has a magnet in its brain. It acts as a compass so that\nthis Pokémon does not lose direction while it is tunneling.\nAs it grows older, its body becomes increasingly rounder\nand smoother.",
    "name": "onix",
    "abilities": [
      "weak-armor",
      "sturdy",
      "rock-head"
    ],
    "types": [
      "ground",
      "rock"
    ],
    "height": 8.8,
    "weight": 210,
    "imgId": "095"
  },
  {
    "id": 96,
    "species": "Hypnosis Pokémon",
    "description": "It finds really fun dreams tasty. When it makes\nfriends with people, it may show them the most\ndelicious dreams it’s ever eaten.",
    "name": "drowzee",
    "abilities": [
      "inner-focus",
      "forewarn",
      "insomnia"
    ],
    "types": [
      "psychic"
    ],
    "height": 1,
    "weight": 32.4,
    "imgId": "096"
  },
  {
    "id": 97,
    "species": "Hypnosis Pokémon",
    "description": "As a matter of course, it makes anyone it meets\nfall asleep and has a taste of their dreams.\nAnyone having a good dream, it carries off.",
    "name": "hypno",
    "abilities": [
      "inner-focus",
      "forewarn",
      "insomnia"
    ],
    "types": [
      "psychic"
    ],
    "height": 1.6,
    "weight": 75.6,
    "imgId": "097"
  },
  {
    "id": 98,
    "species": "River Crab Pokémon",
    "description": "Krabby live on beaches, burrowed inside holes dug into\nthe sand. On sandy beaches with little in the way of food,\nthese Pokémon can be seen squabbling with each other\nover territory.",
    "name": "krabby",
    "abilities": [
      "sheer-force",
      "shell-armor",
      "hyper-cutter"
    ],
    "types": [
      "water"
    ],
    "height": 0.4,
    "weight": 6.5,
    "imgId": "098"
  },
  {
    "id": 99,
    "species": "Pincer Pokémon",
    "description": "Kingler has an enormous, oversized claw. It waves this huge\nclaw in the air to communicate with others. However, because\nthe claw is so heavy, the Pokémon quickly tires.",
    "name": "kingler",
    "abilities": [
      "sheer-force",
      "shell-armor",
      "hyper-cutter"
    ],
    "types": [
      "water"
    ],
    "height": 1.3,
    "weight": 60,
    "imgId": "099"
  },
  {
    "id": 100,
    "species": "Ball Pokémon",
    "description": "Voltorb is extremely sensitive—it explodes at the slightest\nof shocks. It is rumored that it was first created when a\nPoké Ball was exposed to a powerful pulse of energy.",
    "name": "voltorb",
    "abilities": [
      "aftermath",
      "static",
      "soundproof"
    ],
    "types": [
      "electric"
    ],
    "height": 0.5,
    "weight": 10.4,
    "imgId": "100"
  },
  {
    "id": 101,
    "species": "Ball Pokémon",
    "description": "One of Electrode’s characteristics is its attraction to electricity.\nIt is a problematical Pokémon that congregates mostly at\nelectrical power plants to feed on electricity that has just\nbeen generated.",
    "name": "electrode",
    "abilities": [
      "aftermath",
      "static",
      "soundproof"
    ],
    "types": [
      "electric"
    ],
    "height": 1.2,
    "weight": 66.6,
    "imgId": "101"
  },
  {
    "id": 102,
    "species": "Egg Pokémon",
    "description": "Six of them together form a full-fledged\nPokémon. It’s often hunted by Crabrawler,\nbut uses psychokinesis to drive it off.",
    "name": "exeggcute",
    "abilities": [
      "harvest",
      "chlorophyll"
    ],
    "types": [
      "psychic",
      "grass"
    ],
    "height": 0.4,
    "weight": 2.5,
    "imgId": "102"
  },
  {
    "id": 103,
    "species": "Coconut Pokémon",
    "description": "When the time comes, one of its three heads\nfalls off. Before long, the fallen head grows into\nan Exeggcute.",
    "name": "exeggutor",
    "abilities": [
      "harvest",
      "chlorophyll"
    ],
    "types": [
      "psychic",
      "grass"
    ],
    "height": 2,
    "weight": 120,
    "imgId": "103"
  },
  {
    "id": 104,
    "species": "Lonely Pokémon",
    "description": "The skull it wears on its head is that of its dead\nmother. According to some, it will evolve when\nit comes to terms with the pain of her death.",
    "name": "cubone",
    "abilities": [
      "battle-armor",
      "lightning-rod",
      "rock-head"
    ],
    "types": [
      "ground"
    ],
    "height": 0.4,
    "weight": 6.5,
    "imgId": "104"
  },
  {
    "id": 105,
    "species": "Bone Keeper Pokémon",
    "description": "This Pokémon is out for vengeance on its natural\nenemy, Mandibuzz. It throws bones like\nboomerangs to try to take it down.",
    "name": "marowak",
    "abilities": [
      "battle-armor",
      "lightning-rod",
      "rock-head"
    ],
    "types": [
      "ground"
    ],
    "height": 1,
    "weight": 45,
    "imgId": "105"
  },
  {
    "id": 106,
    "species": "Kicking Pokémon",
    "description": "Hitmonlee’s legs freely contract and stretch. Using these\nspringlike legs, it bowls over foes with devastating kicks.\nAfter battle, it rubs down its legs and loosens the muscles\nto overcome fatigue.",
    "name": "hitmonlee",
    "abilities": [
      "unburden",
      "reckless",
      "limber"
    ],
    "types": [
      "fighting"
    ],
    "height": 1.5,
    "weight": 49.8,
    "imgId": "106"
  },
  {
    "id": 107,
    "species": "Punching Pokémon",
    "description": "Hitmonchan is said to possess the spirit of a boxer who had\nbeen working toward a world championship. This Pokémon\nhas an indomitable spirit and will never give up in the face\nof adversity.",
    "name": "hitmonchan",
    "abilities": [
      "inner-focus",
      "iron-fist",
      "keen-eye"
    ],
    "types": [
      "fighting"
    ],
    "height": 1.4,
    "weight": 50.2,
    "imgId": "107"
  },
  {
    "id": 108,
    "species": "Licking Pokémon",
    "description": "Whenever Lickitung comes across something new, it will\nunfailingly give it a lick. It does so because it memorizes things\nby texture and by taste. It is somewhat put off by sour things.",
    "name": "lickitung",
    "abilities": [
      "cloud-nine",
      "oblivious",
      "own-tempo"
    ],
    "types": [
      "normal"
    ],
    "height": 1.2,
    "weight": 65.5,
    "imgId": "108"
  },
  {
    "id": 109,
    "species": "Poison Gas Pokémon",
    "description": "Koffing embodies toxic substances. It mixes the toxins with raw\ngarbage to set off a chemical reaction that results in a terribly\npowerful poison gas. The higher the temperature, the more gas\nis concocted by this Pokémon.",
    "name": "koffing",
    "abilities": [
      "levitate"
    ],
    "types": [
      "poison"
    ],
    "height": 0.6,
    "weight": 1,
    "imgId": "109"
  },
  {
    "id": 110,
    "species": "Poison Gas Pokémon",
    "description": "Weezing alternately shrinks and inflates its twin bodies to mix\ntogether toxic gases inside. The more the gases are mixed,\nthe more powerful the toxins become. The Pokémon also\nbecomes more putrid.",
    "name": "weezing",
    "abilities": [
      "levitate"
    ],
    "types": [
      "poison"
    ],
    "height": 1.2,
    "weight": 9.5,
    "imgId": "110"
  },
  {
    "id": 111,
    "species": "Spikes Pokémon",
    "description": "Rhyhorn’s brain is very small. It is so dense, while on a run\nit forgets why it started running in the first place. It apparently\nremembers sometimes if it demolishes something.",
    "name": "rhyhorn",
    "abilities": [
      "reckless",
      "rock-head",
      "lightning-rod"
    ],
    "types": [
      "rock",
      "ground"
    ],
    "height": 1,
    "weight": 115,
    "imgId": "111"
  },
  {
    "id": 112,
    "species": "Drill Pokémon",
    "description": "Rhydon has a horn that serves as a drill. It is used for\ndestroying rocks and boulders. This Pokémon occasionally\nrams into streams of magma, but the armor-like hide prevents\nit from feeling the heat.",
    "name": "rhydon",
    "abilities": [
      "reckless",
      "rock-head",
      "lightning-rod"
    ],
    "types": [
      "rock",
      "ground"
    ],
    "height": 1.9,
    "weight": 120,
    "imgId": "112"
  },
  {
    "id": 113,
    "species": "Egg Pokémon",
    "description": "Not only are these Pokémon fast runners,\nthey’re also few in number, so anyone who finds\none must be lucky indeed.",
    "name": "chansey",
    "abilities": [
      "healer",
      "serene-grace",
      "natural-cure"
    ],
    "types": [
      "normal"
    ],
    "height": 1.1,
    "weight": 34.6,
    "imgId": "113"
  },
  {
    "id": 114,
    "species": "Vine Pokémon",
    "description": "Tangela’s vines snap off easily if they are grabbed. This\nhappens without pain, allowing it to make a quick getaway.\nThe lost vines are replaced by newly grown vines the very\nnext day.",
    "name": "tangela",
    "abilities": [
      "regenerator",
      "leaf-guard",
      "chlorophyll"
    ],
    "types": [
      "grass"
    ],
    "height": 1,
    "weight": 35,
    "imgId": "114"
  },
  {
    "id": 115,
    "species": "Parent Pokémon",
    "description": "The child in its pouch leaves home after roughly\nthree years. That is the only time the mother is\nheard to cry wildly.",
    "name": "kangaskhan",
    "abilities": [
      "inner-focus",
      "scrappy",
      "early-bird"
    ],
    "types": [
      "normal"
    ],
    "height": 2.2,
    "weight": 80,
    "imgId": "115"
  },
  {
    "id": 116,
    "species": "Dragon Pokémon",
    "description": "If Horsea senses danger, it will reflexively spray a dense\nblack ink from its mouth and try to escape. This Pokémon\nswims by cleverly flapping the fin on its back.",
    "name": "horsea",
    "abilities": [
      "damp",
      "sniper",
      "swift-swim"
    ],
    "types": [
      "water"
    ],
    "height": 0.4,
    "weight": 8,
    "imgId": "116"
  },
  {
    "id": 117,
    "species": "Dragon Pokémon",
    "description": "Seadra generates whirlpools by spinning its body.\nThe whirlpools are strong enough to swallow even\nfishing boats. This Pokémon weakens prey with\nthese currents, then swallows it whole.",
    "name": "seadra",
    "abilities": [
      "damp",
      "sniper",
      "poison-point"
    ],
    "types": [
      "water"
    ],
    "height": 1.2,
    "weight": 25,
    "imgId": "117"
  },
  {
    "id": 118,
    "species": "Goldfish Pokémon",
    "description": "Spellbound by the length of its horn and the\nbeauty of its fins, many strange Trainers raise\nGoldeen and nothing but Goldeen.",
    "name": "goldeen",
    "abilities": [
      "lightning-rod",
      "water-veil",
      "swift-swim"
    ],
    "types": [
      "water"
    ],
    "height": 0.6,
    "weight": 15,
    "imgId": "118"
  },
  {
    "id": 119,
    "species": "Goldfish Pokémon",
    "description": "Trainers who are crazy for Seaking are divided\ninto horn enthusiasts and fin enthusiasts.\nThe two groups do not get along well.",
    "name": "seaking",
    "abilities": [
      "lightning-rod",
      "water-veil",
      "swift-swim"
    ],
    "types": [
      "water"
    ],
    "height": 1.3,
    "weight": 39,
    "imgId": "119"
  },
  {
    "id": 120,
    "species": "Star Shape Pokémon",
    "description": "This Pokémon gets nibbled on by Lumineon and\nothers. Thanks to its red core, it regenerates\nfast, so it’s unconcerned by their snack attacks.",
    "name": "staryu",
    "abilities": [
      "analytic",
      "natural-cure",
      "illuminate"
    ],
    "types": [
      "water"
    ],
    "height": 0.8,
    "weight": 34.5,
    "imgId": "120"
  },
  {
    "id": 121,
    "species": "Mysterious Pokémon",
    "description": "Its unusual body shape, reminiscent of abstract\nart, led local people to spread rumors that this\nPokémon may be an invader from outer space.",
    "name": "starmie",
    "abilities": [
      "analytic",
      "natural-cure",
      "illuminate"
    ],
    "types": [
      "psychic",
      "water"
    ],
    "height": 1.1,
    "weight": 80,
    "imgId": "121"
  },
  {
    "id": 122,
    "species": "Barrier Pokémon",
    "description": "Mr. Mime is a master of pantomime. Its gestures and motions\nconvince watchers that something unseeable actually exists.\nOnce the watchers are convinced, the unseeable thing exists\nas if it were real.",
    "name": "mr-mime",
    "abilities": [
      "technician",
      "filter",
      "soundproof"
    ],
    "types": [
      "fairy",
      "psychic"
    ],
    "height": 1.3,
    "weight": 54.5,
    "imgId": "122"
  },
  {
    "id": 123,
    "species": "Mantis Pokémon",
    "description": "While young, they live together deep in the\nmountains, training themselves in how to fight\nwith their scythes and move at high speeds.",
    "name": "scyther",
    "abilities": [
      "steadfast",
      "technician",
      "swarm"
    ],
    "types": [
      "flying",
      "bug"
    ],
    "height": 1.5,
    "weight": 56,
    "imgId": "123"
  },
  {
    "id": 124,
    "species": "Human Shape Pokémon",
    "description": "Jynx walks rhythmically, swaying and shaking its hips\nas if it were dancing. Its motions are so bouncingly alluring,\npeople seeing it are compelled to shake their hips without\ngiving any thought to what they are doing.",
    "name": "jynx",
    "abilities": [
      "dry-skin",
      "forewarn",
      "oblivious"
    ],
    "types": [
      "psychic",
      "ice"
    ],
    "height": 1.4,
    "weight": 40.6,
    "imgId": "124"
  },
  {
    "id": 125,
    "species": "Electric Pokémon",
    "description": "Electricity leaks from it in amounts far greater\nthan the amount of electricity it eats.",
    "name": "electabuzz",
    "abilities": [
      "vital-spirit",
      "static"
    ],
    "types": [
      "electric"
    ],
    "height": 1.1,
    "weight": 30,
    "imgId": "125"
  },
  {
    "id": 126,
    "species": "Spitfire Pokémon",
    "description": "When angered, it spouts brilliant fire from all\nover its body. It doesn’t calm down until its\nopponent has burned to ash.",
    "name": "magmar",
    "abilities": [
      "vital-spirit",
      "flame-body"
    ],
    "types": [
      "fire"
    ],
    "height": 1.3,
    "weight": 44.5,
    "imgId": "126"
  },
  {
    "id": 127,
    "species": "Stag Beetle Pokémon",
    "description": "One solid blow from its horns is enough to split\napart a large tree. Its greatest rival in Alola\nis Vikavolt.",
    "name": "pinsir",
    "abilities": [
      "moxie",
      "mold-breaker",
      "hyper-cutter"
    ],
    "types": [
      "bug"
    ],
    "height": 1.5,
    "weight": 55,
    "imgId": "127"
  },
  {
    "id": 128,
    "species": "Wild Bull Pokémon",
    "description": "Although it’s known to be a fierce Pokémon,\nTauros in the Alola region are said to possess\na measure of calmness.",
    "name": "tauros",
    "abilities": [
      "sheer-force",
      "anger-point",
      "intimidate"
    ],
    "types": [
      "normal"
    ],
    "height": 1.4,
    "weight": 88.4,
    "imgId": "128"
  },
  {
    "id": 129,
    "species": "Fish Pokémon",
    "description": "Its reckless leaps make it easy pickings for\npredators. On the bright side, many Pokémon\nenjoy longer life spans, thanks to Magikarp.",
    "name": "magikarp",
    "abilities": [
      "rattled",
      "swift-swim"
    ],
    "types": [
      "water"
    ],
    "height": 0.9,
    "weight": 10,
    "imgId": "129"
  },
  {
    "id": 130,
    "species": "Atrocious Pokémon",
    "description": "There are people who swear that any place\nGyarados appears is fated for destruction.",
    "name": "gyarados",
    "abilities": [
      "moxie",
      "intimidate"
    ],
    "types": [
      "flying",
      "water"
    ],
    "height": 6.5,
    "weight": 235,
    "imgId": "130"
  },
  {
    "id": 131,
    "species": "Transport Pokémon",
    "description": "These Pokémon were once near extinction due\nto poaching. Following protective regulations,\nthere is now an overabundance of them.",
    "name": "lapras",
    "abilities": [
      "hydration",
      "shell-armor",
      "water-absorb"
    ],
    "types": [
      "ice",
      "water"
    ],
    "height": 2.5,
    "weight": 220,
    "imgId": "131"
  },
  {
    "id": 132,
    "species": "Transform Pokémon",
    "description": "With its astonishing capacity for\nmetamorphosis, it can get along with anything.\nIt does not get along well with its fellow Ditto.",
    "name": "ditto",
    "abilities": [
      "imposter",
      "limber"
    ],
    "types": [
      "normal"
    ],
    "height": 0.3,
    "weight": 4,
    "imgId": "132"
  },
  {
    "id": 133,
    "species": "Evolution Pokémon",
    "description": "Current studies show it can evolve into an\nincredible eight different species of Pokémon.",
    "name": "eevee",
    "abilities": [
      "anticipation",
      "adaptability",
      "run-away"
    ],
    "types": [
      "normal"
    ],
    "height": 0.3,
    "weight": 6.5,
    "imgId": "133"
  },
  {
    "id": 134,
    "species": "Bubble Jet Pokémon",
    "description": "Blending in with the water and erasing all signs\nof its presence, it patiently waits for its prey,\nfish Pokémon.",
    "name": "vaporeon",
    "abilities": [
      "hydration",
      "water-absorb"
    ],
    "types": [
      "water"
    ],
    "height": 1,
    "weight": 29,
    "imgId": "134"
  },
  {
    "id": 135,
    "species": "Lightning Pokémon",
    "description": "When its fur stands on end, that’s a sign it’s\nabout to give off a jolt of electricity. Take care,\nas sometimes lightning strikes next to it, too.",
    "name": "jolteon",
    "abilities": [
      "quick-feet",
      "volt-absorb"
    ],
    "types": [
      "electric"
    ],
    "height": 0.8,
    "weight": 24.5,
    "imgId": "135"
  },
  {
    "id": 136,
    "species": "Flame Pokémon",
    "description": "Its average body temperature is between 1,300\nand 1,500 degrees Fahrenheit. In its internal\nflame sac, temperatures reach 3,000 degrees.",
    "name": "flareon",
    "abilities": [
      "guts",
      "flash-fire"
    ],
    "types": [
      "fire"
    ],
    "height": 0.9,
    "weight": 25,
    "imgId": "136"
  },
  {
    "id": 137,
    "species": "Virtual Pokémon",
    "description": "It can convert its body into digital data,\nwhich enables it to enter cyberspace.",
    "name": "porygon",
    "abilities": [
      "analytic",
      "download",
      "trace"
    ],
    "types": [
      "normal"
    ],
    "height": 0.8,
    "weight": 36.5,
    "imgId": "137"
  },
  {
    "id": 138,
    "species": "Spiral Pokémon",
    "description": "Omanyte is one of the ancient and long-since-extinct Pokémon\nthat have been regenerated from fossils by people. If attacked\nby an enemy, it withdraws itself inside its hard shell.",
    "name": "omanyte",
    "abilities": [
      "weak-armor",
      "shell-armor",
      "swift-swim"
    ],
    "types": [
      "water",
      "rock"
    ],
    "height": 0.4,
    "weight": 7.5,
    "imgId": "138"
  },
  {
    "id": 139,
    "species": "Spiral Pokémon",
    "description": "Omastar uses its tentacles to capture its prey. It is\nbelieved to have become extinct because its shell grew too\nlarge and heavy, causing its movements to become too slow\nand ponderous.",
    "name": "omastar",
    "abilities": [
      "weak-armor",
      "shell-armor",
      "swift-swim"
    ],
    "types": [
      "water",
      "rock"
    ],
    "height": 1,
    "weight": 35,
    "imgId": "139"
  },
  {
    "id": 140,
    "species": "Shellfish Pokémon",
    "description": "Kabuto is a Pokémon that has been regenerated from a fossil.\nHowever, in extremely rare cases, living examples have\nbeen discovered. The Pokémon has not changed at all for\n300 million years.",
    "name": "kabuto",
    "abilities": [
      "weak-armor",
      "battle-armor",
      "swift-swim"
    ],
    "types": [
      "water",
      "rock"
    ],
    "height": 0.5,
    "weight": 11.5,
    "imgId": "140"
  },
  {
    "id": 141,
    "species": "Shellfish Pokémon",
    "description": "Kabutops swam underwater to hunt for its prey in ancient\ntimes. The Pokémon was apparently evolving from being a\nwater dweller to living on land as evident from the beginnings\nof change in its gills and legs.",
    "name": "kabutops",
    "abilities": [
      "weak-armor",
      "battle-armor",
      "swift-swim"
    ],
    "types": [
      "water",
      "rock"
    ],
    "height": 1.3,
    "weight": 40.5,
    "imgId": "141"
  },
  {
    "id": 142,
    "species": "Fossil Pokémon",
    "description": "In ancient times, it ruled the skies. A widely\naccepted theory is that it went extinct due to\na large meteor impact.",
    "name": "aerodactyl",
    "abilities": [
      "unnerve",
      "pressure",
      "rock-head"
    ],
    "types": [
      "flying",
      "rock"
    ],
    "height": 1.8,
    "weight": 59,
    "imgId": "142"
  },
  {
    "id": 143,
    "species": "Sleeping Pokémon",
    "description": "It eats nearly 900 pounds of food every day.\nIt starts nodding off while eating—and continues\nto eat even while it’s asleep.",
    "name": "snorlax",
    "abilities": [
      "gluttony",
      "thick-fat",
      "immunity"
    ],
    "types": [
      "normal"
    ],
    "height": 2.1,
    "weight": 460,
    "imgId": "143"
  },
  {
    "id": 144,
    "species": "Freeze Pokémon",
    "description": "Articuno is a legendary bird Pokémon that can control ice.\nThe flapping of its wings chills the air. As a result, it is said\nthat when this Pokémon flies, snow will fall.",
    "name": "articuno",
    "abilities": [
      "snow-cloak",
      "pressure"
    ],
    "types": [
      "flying",
      "ice"
    ],
    "height": 1.7,
    "weight": 55.4,
    "imgId": "144"
  },
  {
    "id": 145,
    "species": "Electric Pokémon",
    "description": "Zapdos is a legendary bird Pokémon that has the ability\nto control electricity. It usually lives in thunderclouds.\nThe Pokémon gains power if it is stricken by lightning bolts.",
    "name": "zapdos",
    "abilities": [
      "static",
      "pressure"
    ],
    "types": [
      "flying",
      "electric"
    ],
    "height": 1.6,
    "weight": 52.6,
    "imgId": "145"
  },
  {
    "id": 146,
    "species": "Flame Pokémon",
    "description": "Moltres is a legendary bird Pokémon that has the ability\nto control fire. If this Pokémon is injured, it is said to dip its\nbody in the molten magma of a volcano to burn and heal itself.",
    "name": "moltres",
    "abilities": [
      "flame-body",
      "pressure"
    ],
    "types": [
      "flying",
      "fire"
    ],
    "height": 2,
    "weight": 60,
    "imgId": "146"
  },
  {
    "id": 147,
    "species": "Dragon Pokémon",
    "description": "After a 10-hour struggle, a fisherman was able\nto pull one up and confirm its existence.",
    "name": "dratini",
    "abilities": [
      "marvel-scale",
      "shed-skin"
    ],
    "types": [
      "dragon"
    ],
    "height": 1.8,
    "weight": 3.3,
    "imgId": "147"
  },
  {
    "id": 148,
    "species": "Dragon Pokémon",
    "description": "From time immemorial, it has been venerated by\nagricultural peoples as an entity able to control\nthe weather.",
    "name": "dragonair",
    "abilities": [
      "marvel-scale",
      "shed-skin"
    ],
    "types": [
      "dragon"
    ],
    "height": 4,
    "weight": 16.5,
    "imgId": "148"
  },
  {
    "id": 149,
    "species": "Dragon Pokémon",
    "description": "Incur the wrath of this normally calm Pokémon\nat your peril, because it will smash everything\nto smithereens before it’s satisfied.",
    "name": "dragonite",
    "abilities": [
      "multiscale",
      "inner-focus"
    ],
    "types": [
      "flying",
      "dragon"
    ],
    "height": 2.2,
    "weight": 210,
    "imgId": "149"
  },
  {
    "id": 150,
    "species": "Genetic Pokémon",
    "description": "Mewtwo is a Pokémon that was created by genetic\nmanipulation. However, even though the scientific power\nof humans created this Pokémon’s body, they failed to\nendow Mewtwo with a compassionate heart.",
    "name": "mewtwo",
    "abilities": [
      "unnerve",
      "pressure"
    ],
    "types": [
      "psychic"
    ],
    "height": 2,
    "weight": 122,
    "imgId": "150"
  },
  {
    "id": 151,
    "species": "New Species Pokémon",
    "description": "Mew is said to possess the genetic composition of all\nPokémon. It is capable of making itself invisible at will,\nso it entirely avoids notice even if it approaches people.",
    "name": "mew",
    "abilities": [
      "synchronize"
    ],
    "types": [
      "psychic"
    ],
    "height": 0.4,
    "weight": 4,
    "imgId": "151"
  },
  {
    "id": 152,
    "species": "Leaf Pokémon",
    "description": "In battle, Chikorita waves its leaf around to keep the foe at\nbay. However, a sweet fragrance also wafts from the leaf,\nbecalming the battling Pokémon and creating a cozy,\nfriendly atmosphere all around.",
    "name": "chikorita",
    "abilities": [
      "leaf-guard",
      "overgrow"
    ],
    "types": [
      "grass"
    ],
    "height": 0.9,
    "weight": 6.4,
    "imgId": "152"
  },
  {
    "id": 153,
    "species": "Leaf Pokémon",
    "description": "Bayleef’s neck is ringed by curled-up leaves. Inside each\ntubular leaf is a small shoot of a tree. The fragrance of this\nshoot makes people peppy.",
    "name": "bayleef",
    "abilities": [
      "leaf-guard",
      "overgrow"
    ],
    "types": [
      "grass"
    ],
    "height": 1.2,
    "weight": 15.8,
    "imgId": "153"
  },
  {
    "id": 154,
    "species": "Herb Pokémon",
    "description": "The fragrance of Meganium’s flower soothes and calms\nemotions. In battle, this Pokémon gives off more of its\nbecalming scent to blunt the foe’s fighting spirit.",
    "name": "meganium",
    "abilities": [
      "leaf-guard",
      "overgrow"
    ],
    "types": [
      "grass"
    ],
    "height": 1.8,
    "weight": 100.5,
    "imgId": "154"
  },
  {
    "id": 155,
    "species": "Fire Mouse Pokémon",
    "description": "Cyndaquil protects itself by flaring up the flames on its back.\nThe flames are vigorous if the Pokémon is angry. However, if it\nis tired, the flames splutter fitfully with incomplete combustion.",
    "name": "cyndaquil",
    "abilities": [
      "flash-fire",
      "blaze"
    ],
    "types": [
      "fire"
    ],
    "height": 0.5,
    "weight": 7.9,
    "imgId": "155"
  },
  {
    "id": 156,
    "species": "Volcano Pokémon",
    "description": "Quilava keeps its foes at bay with the intensity of its flames\nand gusts of superheated air. This Pokémon applies its\noutstanding nimbleness to dodge attacks even while scorching\nthe foe with flames.",
    "name": "quilava",
    "abilities": [
      "flash-fire",
      "blaze"
    ],
    "types": [
      "fire"
    ],
    "height": 0.9,
    "weight": 19,
    "imgId": "156"
  },
  {
    "id": 157,
    "species": "Volcano Pokémon",
    "description": "Typhlosion obscures itself behind a shimmering heat haze that\nit creates using its intensely hot flames. This Pokémon creates\nblazing explosive blasts that burn everything to cinders.",
    "name": "typhlosion",
    "abilities": [
      "flash-fire",
      "blaze"
    ],
    "types": [
      "fire"
    ],
    "height": 1.7,
    "weight": 79.5,
    "imgId": "157"
  },
  {
    "id": 158,
    "species": "Big Jaw Pokémon",
    "description": "Despite the smallness of its body, Totodile’s jaws are very\npowerful. While the Pokémon may think it is just playfully\nnipping, its bite has enough power to cause serious injury.",
    "name": "totodile",
    "abilities": [
      "sheer-force",
      "torrent"
    ],
    "types": [
      "water"
    ],
    "height": 0.6,
    "weight": 9.5,
    "imgId": "158"
  },
  {
    "id": 159,
    "species": "Big Jaw Pokémon",
    "description": "Once Croconaw has clamped its jaws on its foe, it will\nabsolutely not let go. Because the tips of its fangs are\nforked back like barbed fishhooks, they become impossible\nto remove when they have sunk in.",
    "name": "croconaw",
    "abilities": [
      "sheer-force",
      "torrent"
    ],
    "types": [
      "water"
    ],
    "height": 1.1,
    "weight": 25,
    "imgId": "159"
  },
  {
    "id": 160,
    "species": "Big Jaw Pokémon",
    "description": "Feraligatr intimidates its foes by opening its huge mouth.\nIn battle, it will kick the ground hard with its thick and powerful\nhind legs to charge at the foe at an incredible speed.",
    "name": "feraligatr",
    "abilities": [
      "sheer-force",
      "torrent"
    ],
    "types": [
      "water"
    ],
    "height": 2.3,
    "weight": 88.8,
    "imgId": "160"
  },
  {
    "id": 161,
    "species": "Scout Pokémon",
    "description": "When Sentret sleeps, it does so while another stands guard.\nThe sentry wakes the others at the first sign of danger. When\nthis Pokémon becomes separated from its pack, it becomes\nincapable of sleep due to fear.",
    "name": "sentret",
    "abilities": [
      "frisk",
      "keen-eye",
      "run-away"
    ],
    "types": [
      "normal"
    ],
    "height": 0.8,
    "weight": 6,
    "imgId": "161"
  },
  {
    "id": 162,
    "species": "Long Body Pokémon",
    "description": "Furret has a very slim build. When under attack, it can slickly\nsquirm through narrow spaces and get away. In spite of its\nshort limbs, this Pokémon is very nimble and fleet.",
    "name": "furret",
    "abilities": [
      "frisk",
      "keen-eye",
      "run-away"
    ],
    "types": [
      "normal"
    ],
    "height": 1.8,
    "weight": 32.5,
    "imgId": "162"
  },
  {
    "id": 163,
    "species": "Owl Pokémon",
    "description": "Hoothoot has an internal organ that senses and tracks the\nearth’s rotation. Using this special organ, this Pokémon\nbegins hooting at precisely the same time every day.",
    "name": "hoothoot",
    "abilities": [
      "tinted-lens",
      "keen-eye",
      "insomnia"
    ],
    "types": [
      "flying",
      "normal"
    ],
    "height": 0.7,
    "weight": 21.2,
    "imgId": "163"
  },
  {
    "id": 164,
    "species": "Owl Pokémon",
    "description": "Noctowl never fails at catching prey in darkness. This Pokémon\nowes its success to its superior vision that allows it to see in\nminimal light, and to its soft, supple wings that make no sound\nin flight.",
    "name": "noctowl",
    "abilities": [
      "tinted-lens",
      "keen-eye",
      "insomnia"
    ],
    "types": [
      "flying",
      "normal"
    ],
    "height": 1.6,
    "weight": 40.8,
    "imgId": "164"
  },
  {
    "id": 165,
    "species": "Five Star Pokémon",
    "description": "They communicate with one another using bodily\nfluids that give off odors. When they’re angry,\ntheir odor smells sour.",
    "name": "ledyba",
    "abilities": [
      "rattled",
      "early-bird",
      "swarm"
    ],
    "types": [
      "flying",
      "bug"
    ],
    "height": 1,
    "weight": 10.8,
    "imgId": "165"
  },
  {
    "id": 166,
    "species": "Five Star Pokémon",
    "description": "In battle, it throws punches with all four arms.\nThe power of each individual blow is piddly,\nso it aims to win by quantity rather than quality.",
    "name": "ledian",
    "abilities": [
      "iron-fist",
      "early-bird",
      "swarm"
    ],
    "types": [
      "flying",
      "bug"
    ],
    "height": 1.4,
    "weight": 35.6,
    "imgId": "166"
  },
  {
    "id": 167,
    "species": "String Spit Pokémon",
    "description": "Some fishermen weave its sturdy thread into\nnets to catch fish Pokémon.",
    "name": "spinarak",
    "abilities": [
      "sniper",
      "insomnia",
      "swarm"
    ],
    "types": [
      "poison",
      "bug"
    ],
    "height": 0.5,
    "weight": 8.5,
    "imgId": "167"
  },
  {
    "id": 168,
    "species": "Long Leg Pokémon",
    "description": "It spins thread from both its rear and its mouth.\nThen it wraps its prey up in thread and sips\ntheir bodily fluids at its leisure.",
    "name": "ariados",
    "abilities": [
      "sniper",
      "insomnia",
      "swarm"
    ],
    "types": [
      "poison",
      "bug"
    ],
    "height": 1.1,
    "weight": 33.5,
    "imgId": "168"
  },
  {
    "id": 169,
    "species": "Bat Pokémon",
    "description": "Silent and swift in its four-winged flight, it bites\ndown on its prey before they realize what’s\nhappening. In a heartbeat, it drains their blood.",
    "name": "crobat",
    "abilities": [
      "infiltrator",
      "inner-focus"
    ],
    "types": [
      "flying",
      "poison"
    ],
    "height": 1.8,
    "weight": 75,
    "imgId": "169"
  },
  {
    "id": 170,
    "species": "Angler Pokémon",
    "description": "It lives in the depths beyond the reach of\nsunlight. It flashes lights on its antennae\nto communicate with others of its kind.",
    "name": "chinchou",
    "abilities": [
      "water-absorb",
      "illuminate",
      "volt-absorb"
    ],
    "types": [
      "electric",
      "water"
    ],
    "height": 0.5,
    "weight": 12,
    "imgId": "170"
  },
  {
    "id": 171,
    "species": "Light Pokémon",
    "description": "This Pokémon flashes a bright light that blinds\nits prey. This creates an opening for it to deliver\nan electrical attack.",
    "name": "lanturn",
    "abilities": [
      "water-absorb",
      "illuminate",
      "volt-absorb"
    ],
    "types": [
      "electric",
      "water"
    ],
    "height": 1.2,
    "weight": 22.5,
    "imgId": "171"
  },
  {
    "id": 172,
    "species": "Tiny Mouse Pokémon",
    "description": "Despite this Pokémon’s cute appearance, those\nwho want to live with one should prepare to be\non the receiving end of its electric jolts.",
    "name": "pichu",
    "abilities": [
      "lightning-rod",
      "static"
    ],
    "types": [
      "electric"
    ],
    "height": 0.3,
    "weight": 2,
    "imgId": "172"
  },
  {
    "id": 173,
    "species": "Star Shape Pokémon",
    "description": "Because of its silhouette, it’s believed to be a\nstar reborn. For some reason, it loves Minior.",
    "name": "cleffa",
    "abilities": [
      "friend-guard",
      "magic-guard",
      "cute-charm"
    ],
    "types": [
      "fairy"
    ],
    "height": 0.3,
    "weight": 3,
    "imgId": "173"
  },
  {
    "id": 174,
    "species": "Balloon Pokémon",
    "description": "It moves by bouncing along. As it moves a lot,\nit sweats, and its body gives off a sweet aroma.",
    "name": "igglybuff",
    "abilities": [
      "friend-guard",
      "competitive",
      "cute-charm"
    ],
    "types": [
      "fairy",
      "normal"
    ],
    "height": 0.3,
    "weight": 1,
    "imgId": "174"
  },
  {
    "id": 175,
    "species": "Spike Ball Pokémon",
    "description": "As its energy, Togepi uses the positive emotions of\ncompassion and pleasure exuded by people and Pokémon.\nThis Pokémon stores up feelings of happiness inside its shell,\nthen shares them with others.",
    "name": "togepi",
    "abilities": [
      "super-luck",
      "serene-grace",
      "hustle"
    ],
    "types": [
      "fairy"
    ],
    "height": 0.3,
    "weight": 1.5,
    "imgId": "175"
  },
  {
    "id": 176,
    "species": "Happiness Pokémon",
    "description": "Togetic is said to be a Pokémon that brings good fortune.\nWhen the Pokémon spots someone who is pure of heart,\nit is said to appear and share its happiness with that person.",
    "name": "togetic",
    "abilities": [
      "super-luck",
      "serene-grace",
      "hustle"
    ],
    "types": [
      "flying",
      "fairy"
    ],
    "height": 0.6,
    "weight": 3.2,
    "imgId": "176"
  },
  {
    "id": 177,
    "species": "Tiny Bird Pokémon",
    "description": "Natu has a highly developed jumping ability. The Pokémon\nflaps and leaps onto tree branches that are taller than\ngrown-up people to pick at the tree’s new shoots.",
    "name": "natu",
    "abilities": [
      "magic-bounce",
      "early-bird",
      "synchronize"
    ],
    "types": [
      "flying",
      "psychic"
    ],
    "height": 0.2,
    "weight": 2,
    "imgId": "177"
  },
  {
    "id": 178,
    "species": "Mystic Pokémon",
    "description": "Xatu is known to stand motionless while staring at the sun all\nday long. Some people revere it as a mystical Pokémon out of\ntheir belief that Xatu is in possession of the power to see into\nthe future.",
    "name": "xatu",
    "abilities": [
      "magic-bounce",
      "early-bird",
      "synchronize"
    ],
    "types": [
      "flying",
      "psychic"
    ],
    "height": 1.5,
    "weight": 15,
    "imgId": "178"
  },
  {
    "id": 179,
    "species": "Wool Pokémon",
    "description": "Mareep’s fluffy coat of wool rubs together and builds a static\ncharge. The more static electricity is charged, the more brightly\nthe lightbulb at the tip of its tail glows.",
    "name": "mareep",
    "abilities": [
      "plus",
      "static"
    ],
    "types": [
      "electric"
    ],
    "height": 0.6,
    "weight": 7.8,
    "imgId": "179"
  },
  {
    "id": 180,
    "species": "Wool Pokémon",
    "description": "Flaaffy’s wool quality changes so that it can generate\na high amount of static electricity with a small amount of\nwool. The bare and slick parts of its hide are shielded\nagainst electricity.",
    "name": "flaaffy",
    "abilities": [
      "plus",
      "static"
    ],
    "types": [
      "electric"
    ],
    "height": 0.8,
    "weight": 13.3,
    "imgId": "180"
  },
  {
    "id": 181,
    "species": "Light Pokémon",
    "description": "Ampharos gives off so much light that it can be seen even from\nspace. People in the old days used the light of this Pokémon\nto send signals back and forth with others far away.",
    "name": "ampharos",
    "abilities": [
      "plus",
      "static"
    ],
    "types": [
      "electric"
    ],
    "height": 1.4,
    "weight": 61.5,
    "imgId": "181"
  },
  {
    "id": 182,
    "species": "Flower Pokémon",
    "description": "A Bellossom grows flowers more beautifully if it has evolved\nfrom a smelly Gloom—the more stinky the better. At night, this\nPokémon closes its petals and goes to sleep.",
    "name": "bellossom",
    "abilities": [
      "healer",
      "chlorophyll"
    ],
    "types": [
      "grass"
    ],
    "height": 0.4,
    "weight": 5.8,
    "imgId": "182"
  },
  {
    "id": 183,
    "species": "Aqua Mouse Pokémon",
    "description": "When fishing for food at the edge of a fast-running stream,\nMarill wraps its tail around the trunk of a tree. This Pokémon’s\ntail is flexible and configured to stretch.",
    "name": "marill",
    "abilities": [
      "sap-sipper",
      "huge-power",
      "thick-fat"
    ],
    "types": [
      "fairy",
      "water"
    ],
    "height": 0.4,
    "weight": 8.5,
    "imgId": "183"
  },
  {
    "id": 184,
    "species": "Aqua Rabbit Pokémon",
    "description": "Azumarill can make balloons out of air. It makes these air\nballoons if it spots a drowning Pokémon. The air balloons\nenable the Pokémon in trouble to breathe.",
    "name": "azumarill",
    "abilities": [
      "sap-sipper",
      "huge-power",
      "thick-fat"
    ],
    "types": [
      "fairy",
      "water"
    ],
    "height": 0.8,
    "weight": 28.5,
    "imgId": "184"
  },
  {
    "id": 185,
    "species": "Imitation Pokémon",
    "description": "Apparently, the larger the green parts of this\nPokémon, the more collectors value it. It’s a\nparticular favorite among elderly people.",
    "name": "sudowoodo",
    "abilities": [
      "rattled",
      "rock-head",
      "sturdy"
    ],
    "types": [
      "rock"
    ],
    "height": 1.2,
    "weight": 38,
    "imgId": "185"
  },
  {
    "id": 186,
    "species": "Frog Pokémon",
    "description": "It’s the leader of Poliwag and Poliwhirl.\nWhen Politoed roars, they all cower in fear.",
    "name": "politoed",
    "abilities": [
      "drizzle",
      "damp",
      "water-absorb"
    ],
    "types": [
      "water"
    ],
    "height": 1.1,
    "weight": 33.9,
    "imgId": "186"
  },
  {
    "id": 187,
    "species": "Cottonweed Pokémon",
    "description": "This Pokémon drifts and floats with the wind. If it senses the\napproach of strong winds, Hoppip links its leaves with other\nHoppip to prepare against being blown away.",
    "name": "hoppip",
    "abilities": [
      "infiltrator",
      "leaf-guard",
      "chlorophyll"
    ],
    "types": [
      "flying",
      "grass"
    ],
    "height": 0.4,
    "weight": 0.5,
    "imgId": "187"
  },
  {
    "id": 188,
    "species": "Cottonweed Pokémon",
    "description": "Skiploom’s flower blossoms when the temperature rises\nabove 64 degrees Fahrenheit. How much the flower opens\ndepends on the temperature. For that reason, this Pokémon\nis sometimes used as a thermometer.",
    "name": "skiploom",
    "abilities": [
      "infiltrator",
      "leaf-guard",
      "chlorophyll"
    ],
    "types": [
      "flying",
      "grass"
    ],
    "height": 0.6,
    "weight": 1,
    "imgId": "188"
  },
  {
    "id": 189,
    "species": "Cottonweed Pokémon",
    "description": "Jumpluff rides warm southern winds to cross the sea and fly to\nforeign lands. The Pokémon descends to the ground when it\nencounters cold air while it is floating.",
    "name": "jumpluff",
    "abilities": [
      "infiltrator",
      "leaf-guard",
      "chlorophyll"
    ],
    "types": [
      "flying",
      "grass"
    ],
    "height": 0.8,
    "weight": 3,
    "imgId": "189"
  },
  {
    "id": 190,
    "species": "Long Tail Pokémon",
    "description": "Aipom’s tail ends in a hand-like appendage that can be cleverly\nmanipulated. However, because the Pokémon uses its tail so\nmuch, its real hands have become rather clumsy.",
    "name": "aipom",
    "abilities": [
      "skill-link",
      "pickup",
      "run-away"
    ],
    "types": [
      "normal"
    ],
    "height": 0.8,
    "weight": 11.5,
    "imgId": "190"
  },
  {
    "id": 191,
    "species": "Seed Pokémon",
    "description": "Sunkern tries to move as little as it possibly can. It does so\nbecause it tries to conserve all the nutrients it has stored in its\nbody for its evolution. It will not eat a thing, subsisting only on\nmorning dew.",
    "name": "sunkern",
    "abilities": [
      "early-bird",
      "solar-power",
      "chlorophyll"
    ],
    "types": [
      "grass"
    ],
    "height": 0.3,
    "weight": 1.8,
    "imgId": "191"
  },
  {
    "id": 192,
    "species": "Sun Pokémon",
    "description": "Sunflora converts solar energy into nutrition. It moves around\nactively in the daytime when it is warm. It stops moving as\nsoon as the sun goes down for the night.",
    "name": "sunflora",
    "abilities": [
      "early-bird",
      "solar-power",
      "chlorophyll"
    ],
    "types": [
      "grass"
    ],
    "height": 0.8,
    "weight": 8.5,
    "imgId": "192"
  },
  {
    "id": 193,
    "species": "Clear Wing Pokémon",
    "description": "Yanma is capable of seeing 360 degrees without having to\nmove its eyes. It is a great flier that is adept at making sudden\nstops and turning midair. This Pokémon uses its flying ability\nto quickly chase down targeted prey.",
    "name": "yanma",
    "abilities": [
      "frisk",
      "compound-eyes",
      "speed-boost"
    ],
    "types": [
      "flying",
      "bug"
    ],
    "height": 1.2,
    "weight": 38,
    "imgId": "193"
  },
  {
    "id": 194,
    "species": "Water Fish Pokémon",
    "description": "Wooper usually lives in water. However, it occasionally comes\nout onto land in search of food. On land, it coats its body with\na gooey, toxic film.",
    "name": "wooper",
    "abilities": [
      "unaware",
      "water-absorb",
      "damp"
    ],
    "types": [
      "ground",
      "water"
    ],
    "height": 0.4,
    "weight": 8.5,
    "imgId": "194"
  },
  {
    "id": 195,
    "species": "Water Fish Pokémon",
    "description": "Quagsire hunts for food by leaving its mouth wide open in\nwater and waiting for its prey to blunder in unaware. Because\nthe Pokémon does not move, it does not get very hungry.",
    "name": "quagsire",
    "abilities": [
      "unaware",
      "water-absorb",
      "damp"
    ],
    "types": [
      "ground",
      "water"
    ],
    "height": 1.4,
    "weight": 75,
    "imgId": "195"
  },
  {
    "id": 196,
    "species": "Sun Pokémon",
    "description": "It unleashes psychic power from the orb on its\nforehead. When its power is exhausted, the orb\ngrows dull and dark.",
    "name": "espeon",
    "abilities": [
      "magic-bounce",
      "synchronize"
    ],
    "types": [
      "psychic"
    ],
    "height": 0.9,
    "weight": 26.5,
    "imgId": "196"
  },
  {
    "id": 197,
    "species": "Moonlight Pokémon",
    "description": "With its black fur, it blends into the darkness.\nIt bides its time, and when prey appears, this\nPokémon goes for its throat, and then eats it.",
    "name": "umbreon",
    "abilities": [
      "inner-focus",
      "synchronize"
    ],
    "types": [
      "dark"
    ],
    "height": 1,
    "weight": 27,
    "imgId": "197"
  },
  {
    "id": 198,
    "species": "Darkness Pokémon",
    "description": "Seen as a symbol of bad luck, it’s generally\ndisliked. Yet it gives presents—objects that\nsparkle or shine—to Trainers it’s close to.",
    "name": "murkrow",
    "abilities": [
      "prankster",
      "super-luck",
      "insomnia"
    ],
    "types": [
      "flying",
      "dark"
    ],
    "height": 0.5,
    "weight": 2.1,
    "imgId": "198"
  },
  {
    "id": 199,
    "species": "Royal Pokémon",
    "description": "This Pokémon is so famed for its intellect that a\nproverb still persists in some regions: “When in\ndoubt, ask Slowking.”",
    "name": "slowking",
    "abilities": [
      "regenerator",
      "own-tempo",
      "oblivious"
    ],
    "types": [
      "psychic",
      "water"
    ],
    "height": 2,
    "weight": 79.5,
    "imgId": "199"
  },
  {
    "id": 200,
    "species": "Screech Pokémon",
    "description": "If you hear a sobbing sound emanating from a\nvacant room, it’s undoubtedly a bit of mischief\nfrom Misdreavus.",
    "name": "misdreavus",
    "abilities": [
      "levitate"
    ],
    "types": [
      "ghost"
    ],
    "height": 0.7,
    "weight": 1,
    "imgId": "200"
  },
  {
    "id": 201,
    "species": "Symbol Pokémon",
    "description": "This Pokémon is shaped like ancient writing. It is a mystery as\nto which came first, the ancient writings or the various Unown.\nResearch into this topic is ongoing but nothing is known.",
    "name": "unown",
    "abilities": [
      "levitate"
    ],
    "types": [
      "psychic"
    ],
    "height": 0.5,
    "weight": 5,
    "imgId": "201"
  },
  {
    "id": 202,
    "species": "Patient Pokémon",
    "description": "Wobbuffet does nothing but endure attacks—it won’t attack on\nits own. However, it won’t endure an attack on its tail. When\nthat happens, the Pokémon will try to take the foe with it using\nDestiny Bond.",
    "name": "wobbuffet",
    "abilities": [
      "telepathy",
      "shadow-tag"
    ],
    "types": [
      "psychic"
    ],
    "height": 1.3,
    "weight": 28.5,
    "imgId": "202"
  },
  {
    "id": 203,
    "species": "Long Neck Pokémon",
    "description": "Girafarig’s rear head contains a tiny brain that is too small for\nthinking. However, the rear head doesn’t need to sleep, so it\ncan keep watch over its surroundings 24 hours a day.",
    "name": "girafarig",
    "abilities": [
      "sap-sipper",
      "early-bird",
      "inner-focus"
    ],
    "types": [
      "psychic",
      "normal"
    ],
    "height": 1.5,
    "weight": 41.5,
    "imgId": "203"
  },
  {
    "id": 204,
    "species": "Bagworm Pokémon",
    "description": "Pineco hangs from a tree branch and patiently waits for prey to\ncome along. If the Pokémon is disturbed while eating by\nsomeone shaking its tree, it drops down to the ground and\nexplodes with no warning.",
    "name": "pineco",
    "abilities": [
      "overcoat",
      "sturdy"
    ],
    "types": [
      "bug"
    ],
    "height": 0.6,
    "weight": 7.2,
    "imgId": "204"
  },
  {
    "id": 205,
    "species": "Bagworm Pokémon",
    "description": "Forretress conceals itself inside its hardened steel shell.\nThe shell is opened when the Pokémon is catching prey,\nbut it does so at such a quick pace that the shell’s inside\ncannot be seen.",
    "name": "forretress",
    "abilities": [
      "overcoat",
      "sturdy"
    ],
    "types": [
      "steel",
      "bug"
    ],
    "height": 1.2,
    "weight": 125.8,
    "imgId": "205"
  },
  {
    "id": 206,
    "species": "Land Snake Pokémon",
    "description": "Dunsparce has a drill for its tail. It uses this tail to burrow into\nthe ground backward. This Pokémon is known to make its\nnest in complex shapes deep under the ground.",
    "name": "dunsparce",
    "abilities": [
      "rattled",
      "run-away",
      "serene-grace"
    ],
    "types": [
      "normal"
    ],
    "height": 1.5,
    "weight": 14,
    "imgId": "206"
  },
  {
    "id": 207,
    "species": "Fly Scorpion Pokémon",
    "description": "Gligar glides through the air without a sound as if it were\nsliding. This Pokémon hangs on to the face of its foe using\nits clawed hind legs and the large pincers on its forelegs, then\ninjects the prey with its poison barb.",
    "name": "gligar",
    "abilities": [
      "immunity",
      "sand-veil",
      "hyper-cutter"
    ],
    "types": [
      "flying",
      "ground"
    ],
    "height": 1.1,
    "weight": 64.8,
    "imgId": "207"
  },
  {
    "id": 208,
    "species": "Iron Snake Pokémon",
    "description": "Steelix lives even further underground than Onix.\nThis Pokémon is known to dig toward the earth’s core.\nThere are records of this Pokémon reaching a depth of\nover six-tenths of a mile underground.",
    "name": "steelix",
    "abilities": [
      "sheer-force",
      "sturdy",
      "rock-head"
    ],
    "types": [
      "ground",
      "steel"
    ],
    "height": 9.2,
    "weight": 400,
    "imgId": "208"
  },
  {
    "id": 209,
    "species": "Fairy Pokémon",
    "description": "Its growls make its opponents uneasy. This\nlaid-back Pokémon tends to sleep half the day.",
    "name": "snubbull",
    "abilities": [
      "rattled",
      "run-away",
      "intimidate"
    ],
    "types": [
      "fairy"
    ],
    "height": 0.6,
    "weight": 7.8,
    "imgId": "209"
  },
  {
    "id": 210,
    "species": "Fairy Pokémon",
    "description": "More timid than Snubbull, this Pokémon is doted\non by young people amused at the contrast\nbetween its looks and its attitude.",
    "name": "granbull",
    "abilities": [
      "rattled",
      "quick-feet",
      "intimidate"
    ],
    "types": [
      "fairy"
    ],
    "height": 1.4,
    "weight": 48.7,
    "imgId": "210"
  },
  {
    "id": 211,
    "species": "Balloon Pokémon",
    "description": "Qwilfish sucks in water, inflating itself. This Pokémon\nuses the pressure of the water it swallowed to shoot toxic\nquills all at once from all over its body. It finds swimming\nsomewhat challenging.",
    "name": "qwilfish",
    "abilities": [
      "intimidate",
      "swift-swim",
      "poison-point"
    ],
    "types": [
      "poison",
      "water"
    ],
    "height": 0.5,
    "weight": 3.9,
    "imgId": "211"
  },
  {
    "id": 212,
    "species": "Pincer Pokémon",
    "description": "Once it has identified an enemy, this Pokémon\nsmashes it mercilessly with pincers hard\nas steel.",
    "name": "scizor",
    "abilities": [
      "light-metal",
      "technician",
      "swarm"
    ],
    "types": [
      "steel",
      "bug"
    ],
    "height": 1.8,
    "weight": 118,
    "imgId": "212"
  },
  {
    "id": 213,
    "species": "Mold Pokémon",
    "description": "Shuckle quietly hides itself under rocks, keeping its body\nconcealed inside its hard shell while eating berries it has\nstored away. The berries mix with its body fluids to become\na juice.",
    "name": "shuckle",
    "abilities": [
      "contrary",
      "gluttony",
      "sturdy"
    ],
    "types": [
      "rock",
      "bug"
    ],
    "height": 0.6,
    "weight": 20.5,
    "imgId": "213"
  },
  {
    "id": 214,
    "species": "Single Horn Pokémon",
    "description": "Heracross has sharp claws on its feet. These are planted\nfirmly into the ground or the bark of a tree, giving the\nPokémon a secure and solid footing to forcefully fling away\nfoes with its proud horn.",
    "name": "heracross",
    "abilities": [
      "moxie",
      "guts",
      "swarm"
    ],
    "types": [
      "fighting",
      "bug"
    ],
    "height": 1.5,
    "weight": 54,
    "imgId": "214"
  },
  {
    "id": 215,
    "species": "Sharp Claw Pokémon",
    "description": "It uses its claws to poke holes in eggs so it can\nslurp out the insides. Breeders consider it a\nscourge and will drive it away or eradicate it.",
    "name": "sneasel",
    "abilities": [
      "pickpocket",
      "keen-eye",
      "inner-focus"
    ],
    "types": [
      "ice",
      "dark"
    ],
    "height": 0.9,
    "weight": 28,
    "imgId": "215"
  },
  {
    "id": 216,
    "species": "Little Bear Pokémon",
    "description": "This Pokémon likes to lick its palms that are sweetened by\nbeing soaked in honey. Teddiursa concocts its own honey\nby blending fruits and pollen collected by Beedrill.",
    "name": "teddiursa",
    "abilities": [
      "honey-gather",
      "quick-feet",
      "pickup"
    ],
    "types": [
      "normal"
    ],
    "height": 0.6,
    "weight": 8.8,
    "imgId": "216"
  },
  {
    "id": 217,
    "species": "Hibernator Pokémon",
    "description": "In the forests inhabited by Ursaring, it is said that there are\nmany streams and towering trees where they gather food. This\nPokémon walks through its forest gathering food every day.",
    "name": "ursaring",
    "abilities": [
      "unnerve",
      "quick-feet",
      "guts"
    ],
    "types": [
      "normal"
    ],
    "height": 1.8,
    "weight": 125.8,
    "imgId": "217"
  },
  {
    "id": 218,
    "species": "Lava Pokémon",
    "description": "Slugma does not have any blood in its body. Instead, intensely\nhot magma circulates throughout this Pokémon’s body,\ncarrying essential nutrients and oxygen to its organs.",
    "name": "slugma",
    "abilities": [
      "weak-armor",
      "flame-body",
      "magma-armor"
    ],
    "types": [
      "fire"
    ],
    "height": 0.7,
    "weight": 35,
    "imgId": "218"
  },
  {
    "id": 219,
    "species": "Lava Pokémon",
    "description": "Magcargo’s body temperature is approximately\n18,000 degrees Fahrenheit. Water is vaporized on contact.\nIf this Pokémon is caught in the rain, the raindrops instantly\nturn into steam, cloaking the area in a thick fog.",
    "name": "magcargo",
    "abilities": [
      "weak-armor",
      "flame-body",
      "magma-armor"
    ],
    "types": [
      "rock",
      "fire"
    ],
    "height": 0.8,
    "weight": 55,
    "imgId": "219"
  },
  {
    "id": 220,
    "species": "Pig Pokémon",
    "description": "Swinub roots for food by rubbing its snout against the ground.\nIts favorite food is a mushroom that grows under the cover of\ndead grass. This Pokémon occasionally roots out hot springs.",
    "name": "swinub",
    "abilities": [
      "thick-fat",
      "snow-cloak",
      "oblivious"
    ],
    "types": [
      "ground",
      "ice"
    ],
    "height": 0.4,
    "weight": 6.5,
    "imgId": "220"
  },
  {
    "id": 221,
    "species": "Swine Pokémon",
    "description": "Piloswine is covered by a thick coat of long hair that enables\nit to endure the freezing cold. This Pokémon uses its tusks to\ndig up food that has been buried under ice.",
    "name": "piloswine",
    "abilities": [
      "thick-fat",
      "snow-cloak",
      "oblivious"
    ],
    "types": [
      "ground",
      "ice"
    ],
    "height": 1.1,
    "weight": 55.8,
    "imgId": "221"
  },
  {
    "id": 222,
    "species": "Coral Pokémon",
    "description": "Pursued by Mareanie for the branches on its\nhead, this Pokémon will sometimes snap its own\nbranches off as a diversion while it escapes.",
    "name": "corsola",
    "abilities": [
      "regenerator",
      "natural-cure",
      "hustle"
    ],
    "types": [
      "rock",
      "water"
    ],
    "height": 0.6,
    "weight": 5,
    "imgId": "222"
  },
  {
    "id": 223,
    "species": "Jet Pokémon",
    "description": "Remoraid sucks in water, then expels it at high velocity using\nits abdominal muscles to shoot down flying prey. When\nevolution draws near, this Pokémon travels downstream\nfrom rivers.",
    "name": "remoraid",
    "abilities": [
      "moody",
      "sniper",
      "hustle"
    ],
    "types": [
      "water"
    ],
    "height": 0.6,
    "weight": 12,
    "imgId": "223"
  },
  {
    "id": 224,
    "species": "Jet Pokémon",
    "description": "Octillery grabs onto its foe using its tentacles. This Pokémon\ntries to immobilize it before delivering the finishing blow. If the\nfoe turns out to be too strong, Octillery spews ink to escape.",
    "name": "octillery",
    "abilities": [
      "moody",
      "sniper",
      "suction-cups"
    ],
    "types": [
      "water"
    ],
    "height": 0.9,
    "weight": 28.5,
    "imgId": "224"
  },
  {
    "id": 225,
    "species": "Delivery Pokémon",
    "description": "It has a generous habit of sharing its food with\npeople and Pokémon, so it’s always scrounging\naround for more food.",
    "name": "delibird",
    "abilities": [
      "insomnia",
      "hustle",
      "vital-spirit"
    ],
    "types": [
      "flying",
      "ice"
    ],
    "height": 0.9,
    "weight": 16,
    "imgId": "225"
  },
  {
    "id": 226,
    "species": "Kite Pokémon",
    "description": "On sunny days, schools of Mantine can be seen elegantly\nleaping over the sea’s waves. This Pokémon is not bothered\nby the Remoraid that hitches rides.",
    "name": "mantine",
    "abilities": [
      "water-veil",
      "water-absorb",
      "swift-swim"
    ],
    "types": [
      "flying",
      "water"
    ],
    "height": 2.1,
    "weight": 220,
    "imgId": "226"
  },
  {
    "id": 227,
    "species": "Armor Bird Pokémon",
    "description": "Its metal body is sturdy, but it does rust rather\neasily. So on rainy days, this Pokémon prefers\nto stay put in its nest.",
    "name": "skarmory",
    "abilities": [
      "weak-armor",
      "sturdy",
      "keen-eye"
    ],
    "types": [
      "flying",
      "steel"
    ],
    "height": 1.7,
    "weight": 50.5,
    "imgId": "227"
  },
  {
    "id": 228,
    "species": "Dark Pokémon",
    "description": "Houndour hunt as a coordinated pack. They communicate\nwith each other using a variety of cries to corner their prey.\nThis Pokémon’s remarkable teamwork is unparalleled.",
    "name": "houndour",
    "abilities": [
      "unnerve",
      "flash-fire",
      "early-bird"
    ],
    "types": [
      "fire",
      "dark"
    ],
    "height": 0.6,
    "weight": 10.8,
    "imgId": "228"
  },
  {
    "id": 229,
    "species": "Dark Pokémon",
    "description": "In a Houndoom pack, the one with its horns raked sharply\ntoward the back serves a leadership role. These Pokémon\nchoose their leader by fighting among themselves.",
    "name": "houndoom",
    "abilities": [
      "unnerve",
      "flash-fire",
      "early-bird"
    ],
    "types": [
      "fire",
      "dark"
    ],
    "height": 1.4,
    "weight": 35,
    "imgId": "229"
  },
  {
    "id": 230,
    "species": "Dragon Pokémon",
    "description": "Kingdra sleeps on the seafloor where it is otherwise devoid\nof life. When a storm arrives, the Pokémon is said to awaken\nand wander about in search of prey.",
    "name": "kingdra",
    "abilities": [
      "damp",
      "sniper",
      "swift-swim"
    ],
    "types": [
      "dragon",
      "water"
    ],
    "height": 1.8,
    "weight": 152,
    "imgId": "230"
  },
  {
    "id": 231,
    "species": "Long Nose Pokémon",
    "description": "Phanpy uses its long nose to shower itself. When others\ngather around, they thoroughly douse each other with water.\nThese Pokémon can be seen drying their soaking-wet\nbodies at the edge of water.",
    "name": "phanpy",
    "abilities": [
      "sand-veil",
      "pickup"
    ],
    "types": [
      "ground"
    ],
    "height": 0.5,
    "weight": 33.5,
    "imgId": "231"
  },
  {
    "id": 232,
    "species": "Armor Pokémon",
    "description": "If Donphan were to tackle with its hard body, even a house\ncould be destroyed. Using its massive strength, the Pokémon\nhelps clear rock and mud slides that block mountain trails.",
    "name": "donphan",
    "abilities": [
      "sand-veil",
      "sturdy"
    ],
    "types": [
      "ground"
    ],
    "height": 1.1,
    "weight": 120,
    "imgId": "232"
  },
  {
    "id": 233,
    "species": "Virtual Pokémon",
    "description": "Porygon was updated to a new version in\nreadiness for planetary development. But that\ndream remains unrealized as yet.",
    "name": "porygon2",
    "abilities": [
      "analytic",
      "download",
      "trace"
    ],
    "types": [
      "normal"
    ],
    "height": 0.6,
    "weight": 32.5,
    "imgId": "233"
  },
  {
    "id": 234,
    "species": "Big Horn Pokémon",
    "description": "Stantler’s magnificent antlers were traded at high prices as\nworks of art. As a result, this Pokémon was hunted close to\nextinction by those who were after the priceless antlers.",
    "name": "stantler",
    "abilities": [
      "sap-sipper",
      "frisk",
      "intimidate"
    ],
    "types": [
      "normal"
    ],
    "height": 1.4,
    "weight": 71.2,
    "imgId": "234"
  },
  {
    "id": 235,
    "species": "Painter Pokémon",
    "description": "It draws symbols all over the place to mark its\nterritory. In towns with many Smeargle, the walls\nare covered in graffiti.",
    "name": "smeargle",
    "abilities": [
      "moody",
      "technician",
      "own-tempo"
    ],
    "types": [
      "normal"
    ],
    "height": 1.2,
    "weight": 58,
    "imgId": "235"
  },
  {
    "id": 236,
    "species": "Scuffle Pokémon",
    "description": "Tyrogue becomes stressed out if it does not get to train every\nday. When raising this Pokémon, the Trainer must establish\nand uphold various training methods.",
    "name": "tyrogue",
    "abilities": [
      "vital-spirit",
      "steadfast",
      "guts"
    ],
    "types": [
      "fighting"
    ],
    "height": 0.7,
    "weight": 21,
    "imgId": "236"
  },
  {
    "id": 237,
    "species": "Handstand Pokémon",
    "description": "Hitmontop spins on its head at high speed, all the while\ndelivering kicks. This technique is a remarkable mix of both\noffense and defense at the same time. The Pokémon travels\nfaster spinning than it does walking.",
    "name": "hitmontop",
    "abilities": [
      "steadfast",
      "technician",
      "intimidate"
    ],
    "types": [
      "fighting"
    ],
    "height": 1.4,
    "weight": 48,
    "imgId": "237"
  },
  {
    "id": 238,
    "species": "Kiss Pokémon",
    "description": "Smoochum actively runs about, but also falls quite often.\nWhenever the chance arrives, it will look for its reflection to\nmake sure its face hasn’t become dirty.",
    "name": "smoochum",
    "abilities": [
      "hydration",
      "forewarn",
      "oblivious"
    ],
    "types": [
      "psychic",
      "ice"
    ],
    "height": 0.4,
    "weight": 6,
    "imgId": "238"
  },
  {
    "id": 239,
    "species": "Electric Pokémon",
    "description": "This Pokémon is constantly fighting with\nTogedemaru that try to steal its electricity.\nIt’s a pretty even match.",
    "name": "elekid",
    "abilities": [
      "vital-spirit",
      "static"
    ],
    "types": [
      "electric"
    ],
    "height": 0.6,
    "weight": 23.5,
    "imgId": "239"
  },
  {
    "id": 240,
    "species": "Live Coal Pokémon",
    "description": "A famous potter lives with a Magby.\nApparently its soft flames produce fine works.",
    "name": "magby",
    "abilities": [
      "vital-spirit",
      "flame-body"
    ],
    "types": [
      "fire"
    ],
    "height": 0.7,
    "weight": 21.4,
    "imgId": "240"
  },
  {
    "id": 241,
    "species": "Milk Cow Pokémon",
    "description": "Most people raise it for its milk, but it’s quite\ntough and strong, so it’s also well suited\nfor battle.",
    "name": "miltank",
    "abilities": [
      "sap-sipper",
      "scrappy",
      "thick-fat"
    ],
    "types": [
      "normal"
    ],
    "height": 1.2,
    "weight": 75.5,
    "imgId": "241"
  },
  {
    "id": 242,
    "species": "Happiness Pokémon",
    "description": "Its fluffy fur coat acts as a sensor, enabling it to\nread the feelings of people and Pokémon.",
    "name": "blissey",
    "abilities": [
      "healer",
      "serene-grace",
      "natural-cure"
    ],
    "types": [
      "normal"
    ],
    "height": 1.5,
    "weight": 46.8,
    "imgId": "242"
  },
  {
    "id": 243,
    "species": "Thunder Pokémon",
    "description": "Raikou embodies the speed of lightning. The roars of\nthis Pokémon send shock waves shuddering through the\nair and shake the ground as if lightning bolts had come\ncrashing down.",
    "name": "raikou",
    "abilities": [
      "inner-focus",
      "pressure"
    ],
    "types": [
      "electric"
    ],
    "height": 1.9,
    "weight": 178,
    "imgId": "243"
  },
  {
    "id": 244,
    "species": "Volcano Pokémon",
    "description": "Entei embodies the passion of magma. This Pokémon is\nthought to have been born in the eruption of a volcano.\nIt sends up massive bursts of fire that utterly consume all\nthat they touch.",
    "name": "entei",
    "abilities": [
      "inner-focus",
      "pressure"
    ],
    "types": [
      "fire"
    ],
    "height": 2.1,
    "weight": 198,
    "imgId": "244"
  },
  {
    "id": 245,
    "species": "Aurora Pokémon",
    "description": "Suicune embodies the compassion of a pure spring of water.\nIt runs across the land with gracefulness. This Pokémon has\nthe power to purify dirty water.",
    "name": "suicune",
    "abilities": [
      "inner-focus",
      "pressure"
    ],
    "types": [
      "water"
    ],
    "height": 2,
    "weight": 187,
    "imgId": "245"
  },
  {
    "id": 246,
    "species": "Rock Skin Pokémon",
    "description": "Larvitar is born deep under the ground. To come up to the\nsurface, this Pokémon must eat its way through the soil above.\nUntil it does so, Larvitar cannot see its parents.",
    "name": "larvitar",
    "abilities": [
      "sand-veil",
      "guts"
    ],
    "types": [
      "ground",
      "rock"
    ],
    "height": 0.6,
    "weight": 72,
    "imgId": "246"
  },
  {
    "id": 247,
    "species": "Hard Shell Pokémon",
    "description": "Pupitar creates a gas inside its body that it compresses and\nforcefully ejects to propel itself like a jet. The body is very\ndurable—it avoids damage even if it hits solid steel.",
    "name": "pupitar",
    "abilities": [
      "shed-skin"
    ],
    "types": [
      "ground",
      "rock"
    ],
    "height": 1.2,
    "weight": 152,
    "imgId": "247"
  },
  {
    "id": 248,
    "species": "Armor Pokémon",
    "description": "Tyranitar is so overwhelmingly powerful, it can bring down a\nwhole mountain to make its nest. This Pokémon wanders about\nin mountains seeking new opponents to fight.",
    "name": "tyranitar",
    "abilities": [
      "unnerve",
      "sand-stream"
    ],
    "types": [
      "dark",
      "rock"
    ],
    "height": 2,
    "weight": 202,
    "imgId": "248"
  },
  {
    "id": 249,
    "species": "Diving Pokémon",
    "description": "Lugia’s wings pack devastating power—a light fluttering of its\nwings can blow apart regular houses. As a result, this\nPokémon chooses to live out of sight deep under the sea.",
    "name": "lugia",
    "abilities": [
      "multiscale",
      "pressure"
    ],
    "types": [
      "flying",
      "psychic"
    ],
    "height": 5.2,
    "weight": 216,
    "imgId": "249"
  },
  {
    "id": 250,
    "species": "Rainbow Pokémon",
    "description": "Ho-Oh’s feathers glow in seven colors depending on the angle\nat which they are struck by light. These feathers are said to\nbring happiness to the bearers. This Pokémon is said to live at\nthe foot of a rainbow.",
    "name": "ho-oh",
    "abilities": [
      "regenerator",
      "pressure"
    ],
    "types": [
      "flying",
      "fire"
    ],
    "height": 3.8,
    "weight": 199,
    "imgId": "250"
  },
  {
    "id": 251,
    "species": "Time Travel Pokémon",
    "description": "This Pokémon came from the future by crossing over time.\nIt is thought that so long as Celebi appears, a bright and\nshining future awaits us.",
    "name": "celebi",
    "abilities": [
      "natural-cure"
    ],
    "types": [
      "grass",
      "psychic"
    ],
    "height": 0.6,
    "weight": 5,
    "imgId": "251"
  },
  {
    "id": 252,
    "species": "Wood Gecko Pokémon",
    "description": "Treecko is cool, calm, and collected—it never panics under\nany situation. If a bigger foe were to glare at this Pokémon,\nit would glare right back without conceding an inch of ground.",
    "name": "treecko",
    "abilities": [
      "unburden",
      "overgrow"
    ],
    "types": [
      "grass"
    ],
    "height": 0.5,
    "weight": 5,
    "imgId": "252"
  },
  {
    "id": 253,
    "species": "Wood Gecko Pokémon",
    "description": "This Pokémon adeptly flies from branch to branch in trees.\nIn a forest, no Pokémon can ever hope to catch a fleeing\nGrovyle however fast they may be.",
    "name": "grovyle",
    "abilities": [
      "unburden",
      "overgrow"
    ],
    "types": [
      "grass"
    ],
    "height": 0.9,
    "weight": 21.6,
    "imgId": "253"
  },
  {
    "id": 254,
    "species": "Forest Pokémon",
    "description": "Sceptile has seeds growing on its back. They are said to be\nbursting with nutrients that revitalize trees. This Pokémon\nraises the trees in a forest with loving care.",
    "name": "sceptile",
    "abilities": [
      "unburden",
      "overgrow"
    ],
    "types": [
      "grass"
    ],
    "height": 1.7,
    "weight": 52.2,
    "imgId": "254"
  },
  {
    "id": 255,
    "species": "Chick Pokémon",
    "description": "Torchic has a place inside its body where it keeps its flame.\nGive it a hug—it will be glowing with warmth. This Pokémon is\ncovered all over by a fluffy coat of down.",
    "name": "torchic",
    "abilities": [
      "speed-boost",
      "blaze"
    ],
    "types": [
      "fire"
    ],
    "height": 0.4,
    "weight": 2.5,
    "imgId": "255"
  },
  {
    "id": 256,
    "species": "Young Fowl Pokémon",
    "description": "Combusken battles with the intensely hot flames it spews from\nits beak and with outstandingly destructive kicks. This\nPokémon’s cry is very loud and distracting.",
    "name": "combusken",
    "abilities": [
      "speed-boost",
      "blaze"
    ],
    "types": [
      "fighting",
      "fire"
    ],
    "height": 0.9,
    "weight": 19.5,
    "imgId": "256"
  },
  {
    "id": 257,
    "species": "Blaze Pokémon",
    "description": "Blaziken has incredibly strong legs—it can easily clear a\n30-story building in one leap. This Pokémon’s blazing punches\nleave its foes scorched and blackened.",
    "name": "blaziken",
    "abilities": [
      "speed-boost",
      "blaze"
    ],
    "types": [
      "fighting",
      "fire"
    ],
    "height": 1.9,
    "weight": 52,
    "imgId": "257"
  },
  {
    "id": 258,
    "species": "Mud Fish Pokémon",
    "description": "In water, Mudkip breathes using the gills on its cheeks. If it is\nfaced with a tight situation in battle, this Pokémon will unleash\nits amazing power—it can crush rocks bigger than itself.",
    "name": "mudkip",
    "abilities": [
      "damp",
      "torrent"
    ],
    "types": [
      "water"
    ],
    "height": 0.4,
    "weight": 7.6,
    "imgId": "258"
  },
  {
    "id": 259,
    "species": "Mud Fish Pokémon",
    "description": "Marshtomp is much faster at traveling through mud than it is at\nswimming. This Pokémon’s hindquarters exhibit obvious\ndevelopment, giving it the ability to walk on just its hind legs.",
    "name": "marshtomp",
    "abilities": [
      "damp",
      "torrent"
    ],
    "types": [
      "ground",
      "water"
    ],
    "height": 0.7,
    "weight": 28,
    "imgId": "259"
  },
  {
    "id": 260,
    "species": "Mud Fish Pokémon",
    "description": "Swampert predicts storms by sensing subtle differences in the\nsounds of waves and tidal winds with its fins. If a storm is\napproaching, it piles up boulders to protect itself.",
    "name": "swampert",
    "abilities": [
      "damp",
      "torrent"
    ],
    "types": [
      "ground",
      "water"
    ],
    "height": 1.5,
    "weight": 81.9,
    "imgId": "260"
  },
  {
    "id": 261,
    "species": "Bite Pokémon",
    "description": "Poochyena is an omnivore—it will eat anything. A distinguishing\nfeature is how large its fangs are compared to its body. This\nPokémon tries to intimidate its foes by making the hair on its\ntail bristle out.",
    "name": "poochyena",
    "abilities": [
      "rattled",
      "quick-feet",
      "run-away"
    ],
    "types": [
      "dark"
    ],
    "height": 0.5,
    "weight": 13.6,
    "imgId": "261"
  },
  {
    "id": 262,
    "species": "Bite Pokémon",
    "description": "Mightyena travel and act as a pack in the wild. The memory\nof its life in the wild compels the Pokémon to obey only\nthose Trainers that it recognizes to possess superior skill.",
    "name": "mightyena",
    "abilities": [
      "moxie",
      "quick-feet",
      "intimidate"
    ],
    "types": [
      "dark"
    ],
    "height": 1,
    "weight": 37,
    "imgId": "262"
  },
  {
    "id": 263,
    "species": "Tiny Raccoon Pokémon",
    "description": "The hair on Zigzagoon’s back is bristly. It rubs the hard back\nhair against trees to leave its territorial markings. This Pokémon\nmay play dead to fool foes in battle.",
    "name": "zigzagoon",
    "abilities": [
      "quick-feet",
      "gluttony",
      "pickup"
    ],
    "types": [
      "normal"
    ],
    "height": 0.4,
    "weight": 17.5,
    "imgId": "263"
  },
  {
    "id": 264,
    "species": "Rushing Pokémon",
    "description": "When hunting, Linoone will make a beeline straight for the\nprey at a full run. While this Pokémon is capable of topping\n60 mph, it has to come to a screeching halt before it can turn.",
    "name": "linoone",
    "abilities": [
      "quick-feet",
      "gluttony",
      "pickup"
    ],
    "types": [
      "normal"
    ],
    "height": 0.5,
    "weight": 32.5,
    "imgId": "264"
  },
  {
    "id": 265,
    "species": "Worm Pokémon",
    "description": "Wurmple is targeted by Swellow as prey. This Pokémon\nwill try to resist by pointing the spikes on its rear at the\nattacking predator. It will weaken the foe by leaking poison\nfrom the spikes.",
    "name": "wurmple",
    "abilities": [
      "run-away",
      "shield-dust"
    ],
    "types": [
      "bug"
    ],
    "height": 0.3,
    "weight": 3.6,
    "imgId": "265"
  },
  {
    "id": 266,
    "species": "Cocoon Pokémon",
    "description": "Silcoon was thought to endure hunger and not consume\nanything before its evolution. However, it is now thought\nthat this Pokémon slakes its thirst by drinking rainwater\nthat collects on its silk.",
    "name": "silcoon",
    "abilities": [
      "shed-skin"
    ],
    "types": [
      "bug"
    ],
    "height": 0.6,
    "weight": 10,
    "imgId": "266"
  },
  {
    "id": 267,
    "species": "Butterfly Pokémon",
    "description": "Beautifly has a long mouth like a coiled needle, which is very\nconvenient for collecting pollen from flowers. This Pokémon\nrides the spring winds as it flits around gathering pollen.",
    "name": "beautifly",
    "abilities": [
      "rivalry",
      "swarm"
    ],
    "types": [
      "flying",
      "bug"
    ],
    "height": 1,
    "weight": 28.4,
    "imgId": "267"
  },
  {
    "id": 268,
    "species": "Cocoon Pokémon",
    "description": "If it is attacked, Cascoon remains motionless however badly it\nmay be hurt. It does so because if it were to move, its body\nwould be weak upon evolution. This Pokémon will also not\nforget the pain it endured.",
    "name": "cascoon",
    "abilities": [
      "shed-skin"
    ],
    "types": [
      "bug"
    ],
    "height": 0.7,
    "weight": 11.5,
    "imgId": "268"
  },
  {
    "id": 269,
    "species": "Poison Moth Pokémon",
    "description": "When Dustox flaps its wings, a fine dust is scattered all over.\nThis dust is actually a powerful poison that will even make a\npro wrestler sick. This Pokémon searches for food using its\nantennae like radar.",
    "name": "dustox",
    "abilities": [
      "compound-eyes",
      "shield-dust"
    ],
    "types": [
      "poison",
      "bug"
    ],
    "height": 1.2,
    "weight": 31.6,
    "imgId": "269"
  },
  {
    "id": 270,
    "species": "Water Weed Pokémon",
    "description": "Lotad is said to have dwelled on land before. However, this\nPokémon is thought to have returned to water because the\nleaf on its head grew large and heavy. It now lives by floating\natop the water.",
    "name": "lotad",
    "abilities": [
      "own-tempo",
      "rain-dish",
      "swift-swim"
    ],
    "types": [
      "grass",
      "water"
    ],
    "height": 0.5,
    "weight": 2.6,
    "imgId": "270"
  },
  {
    "id": 271,
    "species": "Jolly Pokémon",
    "description": "Lombre’s entire body is covered by a slippery, slimy film.\nIt feels horribly unpleasant to be touched by this Pokémon’s\nhands. Lombre is often mistaken for a human child.",
    "name": "lombre",
    "abilities": [
      "own-tempo",
      "rain-dish",
      "swift-swim"
    ],
    "types": [
      "grass",
      "water"
    ],
    "height": 1.2,
    "weight": 32.5,
    "imgId": "271"
  },
  {
    "id": 272,
    "species": "Carefree Pokémon",
    "description": "Upon hearing an upbeat and cheerful rhythm, the cells in\nLudicolo’s body become very energetic and active. Even\nin battle, this Pokémon will exhibit an amazing amount\nof power.",
    "name": "ludicolo",
    "abilities": [
      "own-tempo",
      "rain-dish",
      "swift-swim"
    ],
    "types": [
      "grass",
      "water"
    ],
    "height": 1.5,
    "weight": 55,
    "imgId": "272"
  },
  {
    "id": 273,
    "species": "Acorn Pokémon",
    "description": "Seedot looks exactly like an acorn when it is dangling from a\ntree branch. It startles other Pokémon by suddenly moving.\nThis Pokémon polishes its body once a day using leaves.",
    "name": "seedot",
    "abilities": [
      "pickpocket",
      "early-bird",
      "chlorophyll"
    ],
    "types": [
      "grass"
    ],
    "height": 0.5,
    "weight": 4,
    "imgId": "273"
  },
  {
    "id": 274,
    "species": "Wily Pokémon",
    "description": "This Pokémon pulls out the leaf on its head and makes a flute\nwith it. The sound of Nuzleaf’s flute strikes fear and uncertainty\nin the hearts of people lost in a forest.",
    "name": "nuzleaf",
    "abilities": [
      "pickpocket",
      "early-bird",
      "chlorophyll"
    ],
    "types": [
      "dark",
      "grass"
    ],
    "height": 1,
    "weight": 28,
    "imgId": "274"
  },
  {
    "id": 275,
    "species": "Wicked Pokémon",
    "description": "Shiftry’s large fans generate awesome gusts of wind at a\nspeed close to 100 feet per second. The whipped-up wind\nblows anything away. This Pokémon chooses to live quietly\ndeep in forests.",
    "name": "shiftry",
    "abilities": [
      "pickpocket",
      "early-bird",
      "chlorophyll"
    ],
    "types": [
      "dark",
      "grass"
    ],
    "height": 1.3,
    "weight": 59.6,
    "imgId": "275"
  },
  {
    "id": 276,
    "species": "Tiny Swallow Pokémon",
    "description": "Taillow is young—it has only just left its nest. As a result,\nit sometimes becomes lonesome and cries at night.\nThis Pokémon feeds on Wurmple that live in forests.",
    "name": "taillow",
    "abilities": [
      "scrappy",
      "guts"
    ],
    "types": [
      "flying",
      "normal"
    ],
    "height": 0.3,
    "weight": 2.3,
    "imgId": "276"
  },
  {
    "id": 277,
    "species": "Swallow Pokémon",
    "description": "Swellow is very conscientious about the upkeep of its glossy\nwings. Once two Swellow are gathered, they diligently take\ncare of cleaning each other’s wings.",
    "name": "swellow",
    "abilities": [
      "scrappy",
      "guts"
    ],
    "types": [
      "flying",
      "normal"
    ],
    "height": 0.7,
    "weight": 19.8,
    "imgId": "277"
  },
  {
    "id": 278,
    "species": "Seagull Pokémon",
    "description": "Fishermen keep an eye out for Wingull in the\nsky, because wherever they’re circling, the\nocean is sure to be teeming with fish Pokémon.",
    "name": "wingull",
    "abilities": [
      "rain-dish",
      "hydration",
      "keen-eye"
    ],
    "types": [
      "flying",
      "water"
    ],
    "height": 0.6,
    "weight": 9.5,
    "imgId": "278"
  },
  {
    "id": 279,
    "species": "Water Bird Pokémon",
    "description": "Gathering food is the work of young males.\nThey store food in their capacious beaks and\ncarry it back to others waiting in the nest.",
    "name": "pelipper",
    "abilities": [
      "rain-dish",
      "drizzle",
      "keen-eye"
    ],
    "types": [
      "flying",
      "water"
    ],
    "height": 1.2,
    "weight": 28,
    "imgId": "279"
  },
  {
    "id": 280,
    "species": "Feeling Pokémon",
    "description": "Ralts has the ability to sense the emotions of people. If its\nTrainer is in a cheerful mood, this Pokémon grows cheerful\nand joyous in the same way.",
    "name": "ralts",
    "abilities": [
      "telepathy",
      "trace",
      "synchronize"
    ],
    "types": [
      "fairy",
      "psychic"
    ],
    "height": 0.4,
    "weight": 6.6,
    "imgId": "280"
  },
  {
    "id": 281,
    "species": "Emotion Pokémon",
    "description": "Kirlia uses the horns on its head to amplify its psychokinetic\npower. When the Pokémon uses its power, the air around it\nbecomes distorted, creating mirages of nonexistent scenery.",
    "name": "kirlia",
    "abilities": [
      "telepathy",
      "trace",
      "synchronize"
    ],
    "types": [
      "fairy",
      "psychic"
    ],
    "height": 0.8,
    "weight": 20.2,
    "imgId": "281"
  },
  {
    "id": 282,
    "species": "Embrace Pokémon",
    "description": "Gardevoir has the psychokinetic power to distort the\ndimensions and create a small black hole. This Pokémon\nwill try to protect its Trainer even at the risk of its own life.",
    "name": "gardevoir",
    "abilities": [
      "telepathy",
      "trace",
      "synchronize"
    ],
    "types": [
      "fairy",
      "psychic"
    ],
    "height": 1.6,
    "weight": 48.4,
    "imgId": "282"
  },
  {
    "id": 283,
    "species": "Pond Skater Pokémon",
    "description": "When this Pokémon senses danger, a sweet\nfluid oozes from the tip of its head. The taste\nof it disgusts bird Pokémon.",
    "name": "surskit",
    "abilities": [
      "rain-dish",
      "swift-swim"
    ],
    "types": [
      "water",
      "bug"
    ],
    "height": 0.5,
    "weight": 1.7,
    "imgId": "283"
  },
  {
    "id": 284,
    "species": "Eyeball Pokémon",
    "description": "Its wings and antennae don’t cope well with\nmoisture. After a rain, it faces sunward to\ndry off.",
    "name": "masquerain",
    "abilities": [
      "unnerve",
      "intimidate"
    ],
    "types": [
      "flying",
      "bug"
    ],
    "height": 0.8,
    "weight": 3.6,
    "imgId": "284"
  },
  {
    "id": 285,
    "species": "Mushroom Pokémon",
    "description": "If Shroomish senses danger, it shakes its body and scatters\nspores from the top of its head. This Pokémon’s spores are\nso toxic, they make trees and weeds wilt.",
    "name": "shroomish",
    "abilities": [
      "quick-feet",
      "poison-heal",
      "effect-spore"
    ],
    "types": [
      "grass"
    ],
    "height": 0.4,
    "weight": 4.5,
    "imgId": "285"
  },
  {
    "id": 286,
    "species": "Mushroom Pokémon",
    "description": "The seeds ringing Breloom’s tail are made of hardened toxic\nspores. It is horrible to eat the seeds. Just taking a bite of this\nPokémon’s seed will cause your stomach to rumble.",
    "name": "breloom",
    "abilities": [
      "technician",
      "poison-heal",
      "effect-spore"
    ],
    "types": [
      "fighting",
      "grass"
    ],
    "height": 1.2,
    "weight": 39.2,
    "imgId": "286"
  },
  {
    "id": 287,
    "species": "Slacker Pokémon",
    "description": "Slakoth’s heart beats just once a minute. Whatever happens,\nit is content to loaf around motionless. It is rare to see this\nPokémon in motion.",
    "name": "slakoth",
    "abilities": [
      "truant"
    ],
    "types": [
      "normal"
    ],
    "height": 0.8,
    "weight": 24,
    "imgId": "287"
  },
  {
    "id": 288,
    "species": "Wild Monkey Pokémon",
    "description": "Vigoroth is simply incapable of remaining still. Even when it\ntries to sleep, the blood in its veins grows agitated, compelling\nthis Pokémon to run wild throughout the jungle before it can\nsettle down.",
    "name": "vigoroth",
    "abilities": [
      "vital-spirit"
    ],
    "types": [
      "normal"
    ],
    "height": 1.4,
    "weight": 46.5,
    "imgId": "288"
  },
  {
    "id": 289,
    "species": "Lazy Pokémon",
    "description": "Wherever Slaking live, rings of over a yard in diameter appear\nin grassy fields. They are made by the Pokémon as it eats all\nthe grass within reach while lying prone on the ground.",
    "name": "slaking",
    "abilities": [
      "truant"
    ],
    "types": [
      "normal"
    ],
    "height": 2,
    "weight": 130.5,
    "imgId": "289"
  },
  {
    "id": 290,
    "species": "Trainee Pokémon",
    "description": "Nincada lives underground. It uses its sharp claws to carve the\nroots of trees and absorb moisture and nutrients.\nThis Pokémon can’t withstand bright sunlight so avoids it.",
    "name": "nincada",
    "abilities": [
      "run-away",
      "compound-eyes"
    ],
    "types": [
      "ground",
      "bug"
    ],
    "height": 0.5,
    "weight": 5.5,
    "imgId": "290"
  },
  {
    "id": 291,
    "species": "Ninja Pokémon",
    "description": "If Ninjask is not trained properly, it will refuse to obey\nthe Trainer and cry loudly continuously. Because of this\nquality, this Pokémon is said to be one that puts the\nTrainer’s abilities to the test.",
    "name": "ninjask",
    "abilities": [
      "infiltrator",
      "speed-boost"
    ],
    "types": [
      "flying",
      "bug"
    ],
    "height": 0.8,
    "weight": 12,
    "imgId": "291"
  },
  {
    "id": 292,
    "species": "Shed Pokémon",
    "description": "Shedinja is a peculiar Pokémon. It seems to appear unsought\nin a Poké Ball after a Nincada evolves. This bizarre Pokémon\nis entirely immobile—it doesn’t even breathe.",
    "name": "shedinja",
    "abilities": [
      "wonder-guard"
    ],
    "types": [
      "ghost",
      "bug"
    ],
    "height": 0.8,
    "weight": 1.2,
    "imgId": "292"
  },
  {
    "id": 293,
    "species": "Whisper Pokémon",
    "description": "Whismur is very timid. If it starts to cry loudly, it becomes\nstartled by its own crying and cries even harder. When it finally\nstops crying, the Pokémon goes to sleep, all tired out.",
    "name": "whismur",
    "abilities": [
      "rattled",
      "soundproof"
    ],
    "types": [
      "normal"
    ],
    "height": 0.6,
    "weight": 16.3,
    "imgId": "293"
  },
  {
    "id": 294,
    "species": "Big Voice Pokémon",
    "description": "Loudred shouts while stamping its feet. After it finishes\nshouting, this Pokémon becomes incapable of hearing\nanything for a while. This is considered to be a weak point.",
    "name": "loudred",
    "abilities": [
      "scrappy",
      "soundproof"
    ],
    "types": [
      "normal"
    ],
    "height": 1,
    "weight": 40.5,
    "imgId": "294"
  },
  {
    "id": 295,
    "species": "Loud Noise Pokémon",
    "description": "Exploud communicates its feelings to the others by emitting\nwhistle-like sounds from the tubes on its body. This Pokémon\nonly raises its voice when it is in battle.",
    "name": "exploud",
    "abilities": [
      "scrappy",
      "soundproof"
    ],
    "types": [
      "normal"
    ],
    "height": 1.5,
    "weight": 84,
    "imgId": "295"
  },
  {
    "id": 296,
    "species": "Guts Pokémon",
    "description": "Their daily routine consists of training together\nfirst thing in the morning, eating and napping in\nthe afternoon, and then more training afterward.",
    "name": "makuhita",
    "abilities": [
      "sheer-force",
      "guts",
      "thick-fat"
    ],
    "types": [
      "fighting"
    ],
    "height": 1,
    "weight": 86.4,
    "imgId": "296"
  },
  {
    "id": 297,
    "species": "Arm Thrust Pokémon",
    "description": "They love to compare their freakish strength—\nstrength enough to send a truck flying with a\nsingle slap.",
    "name": "hariyama",
    "abilities": [
      "sheer-force",
      "guts",
      "thick-fat"
    ],
    "types": [
      "fighting"
    ],
    "height": 2.3,
    "weight": 253.8,
    "imgId": "297"
  },
  {
    "id": 298,
    "species": "Polka Dot Pokémon",
    "description": "Azurill’s tail is large and bouncy. It is packed full of the\nnutrients this Pokémon needs to grow. Azurill can be seen\nbouncing and playing on its big, rubbery tail.",
    "name": "azurill",
    "abilities": [
      "sap-sipper",
      "huge-power",
      "thick-fat"
    ],
    "types": [
      "fairy",
      "normal"
    ],
    "height": 0.2,
    "weight": 2,
    "imgId": "298"
  },
  {
    "id": 299,
    "species": "Compass Pokémon",
    "description": "It uses powerful magnetism to drag its prey\ntoward it. It’s also been known to pull in metal,\nwhich it collects and uses to protect itself.",
    "name": "nosepass",
    "abilities": [
      "sand-force",
      "magnet-pull",
      "sturdy"
    ],
    "types": [
      "rock"
    ],
    "height": 1,
    "weight": 97,
    "imgId": "299"
  },
  {
    "id": 300,
    "species": "Kitten Pokémon",
    "description": "Skitty is known to chase around playfully after its own tail.\nIn the wild, this Pokémon lives in holes in the trees of forests.\nIt is very popular as a pet because of its adorable looks.",
    "name": "skitty",
    "abilities": [
      "wonder-skin",
      "normalize",
      "cute-charm"
    ],
    "types": [
      "normal"
    ],
    "height": 0.6,
    "weight": 11,
    "imgId": "300"
  },
  {
    "id": 301,
    "species": "Prim Pokémon",
    "description": "Delcatty sleeps anywhere it wants without keeping a permanent\nnest. If other Pokémon approach it as it sleeps, this Pokémon\nwill never fight—it will just move away somewhere else.",
    "name": "delcatty",
    "abilities": [
      "wonder-skin",
      "normalize",
      "cute-charm"
    ],
    "types": [
      "normal"
    ],
    "height": 1.1,
    "weight": 32.6,
    "imgId": "301"
  },
  {
    "id": 302,
    "species": "Darkness Pokémon",
    "description": "This Pokémon is feared. When its gemstone eyes\nbegin to glow with a sinister shine, it’s believed\nthat Sableye will steal people’s spirits away.",
    "name": "sableye",
    "abilities": [
      "prankster",
      "stall",
      "keen-eye"
    ],
    "types": [
      "ghost",
      "dark"
    ],
    "height": 0.5,
    "weight": 11,
    "imgId": "302"
  },
  {
    "id": 303,
    "species": "Deceiver Pokémon",
    "description": "Don’t be taken in by this Pokémon’s cute face—it’s very\ndangerous. Mawile fools the foe into letting down its guard,\nthen chomps down with its massive jaws. The steel jaws are\nreally horns that have been transformed.",
    "name": "mawile",
    "abilities": [
      "sheer-force",
      "intimidate",
      "hyper-cutter"
    ],
    "types": [
      "fairy",
      "steel"
    ],
    "height": 0.6,
    "weight": 11.5,
    "imgId": "303"
  },
  {
    "id": 304,
    "species": "Iron Armor Pokémon",
    "description": "Aron has a body of steel. With one all-out charge, this\nPokémon can demolish even a heavy dump truck.\nThe destroyed dump truck then becomes a handy meal\nfor the Pokémon.",
    "name": "aron",
    "abilities": [
      "heavy-metal",
      "rock-head",
      "sturdy"
    ],
    "types": [
      "rock",
      "steel"
    ],
    "height": 0.4,
    "weight": 60,
    "imgId": "304"
  },
  {
    "id": 305,
    "species": "Iron Armor Pokémon",
    "description": "Lairon feeds on iron contained in rocks and water. It makes\nits nest on mountains where iron ore is buried. As a result,\nthe Pokémon often clashes with humans mining the iron ore.",
    "name": "lairon",
    "abilities": [
      "heavy-metal",
      "rock-head",
      "sturdy"
    ],
    "types": [
      "rock",
      "steel"
    ],
    "height": 0.9,
    "weight": 120,
    "imgId": "305"
  },
  {
    "id": 306,
    "species": "Iron Armor Pokémon",
    "description": "Aggron is protective of its environment. If its mountain is\nravaged by a landslide or a fire, this Pokémon will haul\ntopsoil to the area, plant trees, and beautifully restore its\nown territory.",
    "name": "aggron",
    "abilities": [
      "heavy-metal",
      "rock-head",
      "sturdy"
    ],
    "types": [
      "rock",
      "steel"
    ],
    "height": 2.1,
    "weight": 360,
    "imgId": "306"
  },
  {
    "id": 307,
    "species": "Meditate Pokémon",
    "description": "Meditite heightens its inner energy through meditation.\nIt survives on just one berry a day. Minimal eating is another\naspect of this Pokémon’s training.",
    "name": "meditite",
    "abilities": [
      "telepathy",
      "pure-power"
    ],
    "types": [
      "psychic",
      "fighting"
    ],
    "height": 0.6,
    "weight": 11.2,
    "imgId": "307"
  },
  {
    "id": 308,
    "species": "Meditate Pokémon",
    "description": "Through the power of meditation, Medicham developed its\nsixth sense. It gained the ability to use psychokinetic powers.\nThis Pokémon is known to meditate for a whole month\nwithout eating.",
    "name": "medicham",
    "abilities": [
      "telepathy",
      "pure-power"
    ],
    "types": [
      "psychic",
      "fighting"
    ],
    "height": 1.3,
    "weight": 31.5,
    "imgId": "308"
  },
  {
    "id": 309,
    "species": "Lightning Pokémon",
    "description": "Electrike runs faster than the human eye can follow.\nThe friction from running is converted into electricity,\nwhich is then stored in this Pokémon’s fur.",
    "name": "electrike",
    "abilities": [
      "minus",
      "lightning-rod",
      "static"
    ],
    "types": [
      "electric"
    ],
    "height": 0.6,
    "weight": 15.2,
    "imgId": "309"
  },
  {
    "id": 310,
    "species": "Discharge Pokémon",
    "description": "Manectric discharges strong electricity from its mane.\nThe mane is used for collecting electricity in the atmosphere.\nThis Pokémon creates thunderclouds above its head.",
    "name": "manectric",
    "abilities": [
      "minus",
      "lightning-rod",
      "static"
    ],
    "types": [
      "electric"
    ],
    "height": 1.5,
    "weight": 40.2,
    "imgId": "310"
  },
  {
    "id": 311,
    "species": "Cheering Pokémon",
    "description": "When Plusle is cheering on its partner, it flashes with electric\nsparks from all over its body. If its partner loses, this Pokémon\ncries loudly.",
    "name": "plusle",
    "abilities": [
      "lightning-rod",
      "plus"
    ],
    "types": [
      "electric"
    ],
    "height": 0.4,
    "weight": 4.2,
    "imgId": "311"
  },
  {
    "id": 312,
    "species": "Cheering Pokémon",
    "description": "Minun loves to cheer on its partner in battle. It gives off sparks\nfrom its body while it is doing so. If its partner is in trouble,\nthis Pokémon gives off increasing amounts of sparks.",
    "name": "minun",
    "abilities": [
      "volt-absorb",
      "minus"
    ],
    "types": [
      "electric"
    ],
    "height": 0.4,
    "weight": 4.2,
    "imgId": "312"
  },
  {
    "id": 313,
    "species": "Firefly Pokémon",
    "description": "Volbeat’s tail glows like a lightbulb. With other Volbeat,\nit uses its tail to draw geometric shapes in the night sky.\nThis Pokémon loves the sweet aroma given off by Illumise.",
    "name": "volbeat",
    "abilities": [
      "prankster",
      "swarm",
      "illuminate"
    ],
    "types": [
      "bug"
    ],
    "height": 0.7,
    "weight": 17.7,
    "imgId": "313"
  },
  {
    "id": 314,
    "species": "Firefly Pokémon",
    "description": "Illumise leads a flight of illuminated Volbeat to draw signs in\nthe night sky. This Pokémon is said to earn greater respect\nfrom its peers by composing more complex designs in the sky.",
    "name": "illumise",
    "abilities": [
      "prankster",
      "tinted-lens",
      "oblivious"
    ],
    "types": [
      "bug"
    ],
    "height": 0.6,
    "weight": 17.7,
    "imgId": "314"
  },
  {
    "id": 315,
    "species": "Thorn Pokémon",
    "description": "On extremely rare occasions, a Roselia is said to appear with\nits flowers in unusual colors. The thorns on this Pokémon’s\nhead contain a vicious poison.",
    "name": "roselia",
    "abilities": [
      "leaf-guard",
      "poison-point",
      "natural-cure"
    ],
    "types": [
      "poison",
      "grass"
    ],
    "height": 0.3,
    "weight": 2,
    "imgId": "315"
  },
  {
    "id": 316,
    "species": "Stomach Pokémon",
    "description": "Most of Gulpin’s body is made up of its stomach—its heart and\nbrain are very small in comparison. This Pokémon’s stomach\ncontains special enzymes that dissolve anything.",
    "name": "gulpin",
    "abilities": [
      "gluttony",
      "sticky-hold",
      "liquid-ooze"
    ],
    "types": [
      "poison"
    ],
    "height": 0.4,
    "weight": 10.3,
    "imgId": "316"
  },
  {
    "id": 317,
    "species": "Poison Bag Pokémon",
    "description": "Swalot has no teeth, so what it eats, it swallows whole, no\nmatter what. Its cavernous mouth yawns widely. An automobile\ntire could easily fit inside this Pokémon’s mouth.",
    "name": "swalot",
    "abilities": [
      "gluttony",
      "sticky-hold",
      "liquid-ooze"
    ],
    "types": [
      "poison"
    ],
    "height": 1.7,
    "weight": 80,
    "imgId": "317"
  },
  {
    "id": 318,
    "species": "Savage Pokémon",
    "description": "If they scent the faintest trace of blood, they\nrush to attack en masse. When alone, they’re\nrather cowardly.",
    "name": "carvanha",
    "abilities": [
      "speed-boost",
      "rough-skin"
    ],
    "types": [
      "dark",
      "water"
    ],
    "height": 0.8,
    "weight": 20.8,
    "imgId": "318"
  },
  {
    "id": 319,
    "species": "Brutal Pokémon",
    "description": "It has a sad history. In the past, its dorsal fin\nwas a treasured foodstuff, so this Pokémon\nbecame a victim of overfishing.",
    "name": "sharpedo",
    "abilities": [
      "speed-boost",
      "rough-skin"
    ],
    "types": [
      "dark",
      "water"
    ],
    "height": 1.8,
    "weight": 88.8,
    "imgId": "319"
  },
  {
    "id": 320,
    "species": "Ball Whale Pokémon",
    "description": "It shows off by spraying jets of seawater from\nthe nostrils above its eyes. It eats a solid ton of\nWishiwashi every day.",
    "name": "wailmer",
    "abilities": [
      "pressure",
      "oblivious",
      "water-veil"
    ],
    "types": [
      "water"
    ],
    "height": 2,
    "weight": 130,
    "imgId": "320"
  },
  {
    "id": 321,
    "species": "Float Whale Pokémon",
    "description": "Its immense size is the reason for its popularity.\nWailord watching is a favorite sightseeing\nactivity in various parts of the world.",
    "name": "wailord",
    "abilities": [
      "pressure",
      "oblivious",
      "water-veil"
    ],
    "types": [
      "water"
    ],
    "height": 14.5,
    "weight": 398,
    "imgId": "321"
  },
  {
    "id": 322,
    "species": "Numb Pokémon",
    "description": "Numel stores magma of almost 2,200 degrees Fahrenheit\nwithin its body. If it gets wet, the magma cools and hardens.\nIn that event, the Pokémon’s body grows heavy and its\nmovements become sluggish.",
    "name": "numel",
    "abilities": [
      "own-tempo",
      "simple",
      "oblivious"
    ],
    "types": [
      "ground",
      "fire"
    ],
    "height": 0.7,
    "weight": 24,
    "imgId": "322"
  },
  {
    "id": 323,
    "species": "Eruption Pokémon",
    "description": "The humps on Camerupt’s back are formed by a transformation\nof its bones. They sometimes blast out molten magma.\nThis Pokémon apparently erupts often when it is enraged.",
    "name": "camerupt",
    "abilities": [
      "anger-point",
      "solid-rock",
      "magma-armor"
    ],
    "types": [
      "ground",
      "fire"
    ],
    "height": 1.9,
    "weight": 220,
    "imgId": "323"
  },
  {
    "id": 324,
    "species": "Coal Pokémon",
    "description": "If the fire burning within its shell goes out, it will\ndie. Those who wish to raise one in their home\nmust always keep something flammable at hand.",
    "name": "torkoal",
    "abilities": [
      "shell-armor",
      "drought",
      "white-smoke"
    ],
    "types": [
      "fire"
    ],
    "height": 0.5,
    "weight": 80.4,
    "imgId": "324"
  },
  {
    "id": 325,
    "species": "Bounce Pokémon",
    "description": "Spoink keeps a pearl on top of its head. The pearl functions to\namplify this Pokémon’s psychokinetic powers. It is therefore on\na constant search for a bigger pearl.",
    "name": "spoink",
    "abilities": [
      "gluttony",
      "own-tempo",
      "thick-fat"
    ],
    "types": [
      "psychic"
    ],
    "height": 0.7,
    "weight": 30.6,
    "imgId": "325"
  },
  {
    "id": 326,
    "species": "Manipulate Pokémon",
    "description": "Grumpig uses the black pearls on its body to wield\nits fantastic powers. When it is doing so, it dances bizarrely.\nThis Pokémon’s black pearls are valuable as works of art.",
    "name": "grumpig",
    "abilities": [
      "gluttony",
      "own-tempo",
      "thick-fat"
    ],
    "types": [
      "psychic"
    ],
    "height": 0.9,
    "weight": 71.5,
    "imgId": "326"
  },
  {
    "id": 327,
    "species": "Spot Panda Pokémon",
    "description": "Each and every Spinda has a slightly different\nconfiguration of spots. There are collectors who\nenjoy the tiny differences in their spot patterns.",
    "name": "spinda",
    "abilities": [
      "contrary",
      "tangled-feet",
      "own-tempo"
    ],
    "types": [
      "normal"
    ],
    "height": 1.1,
    "weight": 5,
    "imgId": "327"
  },
  {
    "id": 328,
    "species": "Ant Pit Pokémon",
    "description": "As it digs through the sand, its giant jaws\ncrush any rocks that obstruct its path. It builds\na funnel-shaped nest.",
    "name": "trapinch",
    "abilities": [
      "sheer-force",
      "arena-trap",
      "hyper-cutter"
    ],
    "types": [
      "ground"
    ],
    "height": 0.7,
    "weight": 15,
    "imgId": "328"
  },
  {
    "id": 329,
    "species": "Vibration Pokémon",
    "description": "To help make its wings grow, it dissolves\nquantities of prey in its digestive juices and\nguzzles them down every day.",
    "name": "vibrava",
    "abilities": [
      "levitate"
    ],
    "types": [
      "dragon",
      "ground"
    ],
    "height": 1.1,
    "weight": 15.3,
    "imgId": "329"
  },
  {
    "id": 330,
    "species": "Mystic Pokémon",
    "description": "This Pokémon hides in the heart of sandstorms\nit creates and seldom appears where people\ncan see it.",
    "name": "flygon",
    "abilities": [
      "levitate"
    ],
    "types": [
      "dragon",
      "ground"
    ],
    "height": 2,
    "weight": 82,
    "imgId": "330"
  },
  {
    "id": 331,
    "species": "Cactus Pokémon",
    "description": "The more arid and harsh the environment, the more pretty and\nfragrant a flower Cacnea grows. This Pokémon battles by\nwildly swinging its thorny arms.",
    "name": "cacnea",
    "abilities": [
      "water-absorb",
      "sand-veil"
    ],
    "types": [
      "grass"
    ],
    "height": 0.4,
    "weight": 51.3,
    "imgId": "331"
  },
  {
    "id": 332,
    "species": "Scarecrow Pokémon",
    "description": "If a traveler is going through a desert in the thick of night,\nCacturne will follow in a ragtag group. The Pokémon are\nbiding their time, waiting for the traveler to tire and become\nincapable of moving.",
    "name": "cacturne",
    "abilities": [
      "water-absorb",
      "sand-veil"
    ],
    "types": [
      "dark",
      "grass"
    ],
    "height": 1.3,
    "weight": 77.4,
    "imgId": "332"
  },
  {
    "id": 333,
    "species": "Cotton Bird Pokémon",
    "description": "Swablu loves to make things clean. If it spots something dirty,\nit will wipe and polish it with its cottony wings. If its wings\nbecome dirty, this Pokémon finds a stream and showers itself.",
    "name": "swablu",
    "abilities": [
      "cloud-nine",
      "natural-cure"
    ],
    "types": [
      "flying",
      "normal"
    ],
    "height": 0.4,
    "weight": 1.2,
    "imgId": "333"
  },
  {
    "id": 334,
    "species": "Humming Pokémon",
    "description": "Altaria sings in a gorgeous soprano. Its wings are like cotton\nclouds. This Pokémon catches updrafts with its buoyant wings\nand soars way up into the wild blue yonder.",
    "name": "altaria",
    "abilities": [
      "cloud-nine",
      "natural-cure"
    ],
    "types": [
      "flying",
      "dragon"
    ],
    "height": 1.1,
    "weight": 20.6,
    "imgId": "334"
  },
  {
    "id": 335,
    "species": "Cat Ferret Pokémon",
    "description": "Zangoose usually stays on all fours, but when angered, it gets\nup on its hind legs and extends its claws. This Pokémon shares\na bitter rivalry with Seviper that dates back over generations.",
    "name": "zangoose",
    "abilities": [
      "toxic-boost",
      "immunity"
    ],
    "types": [
      "normal"
    ],
    "height": 1.3,
    "weight": 40.3,
    "imgId": "335"
  },
  {
    "id": 336,
    "species": "Fang Snake Pokémon",
    "description": "Seviper’s swordlike tail serves two purposes—it slashes foes\nand douses them with secreted poison. This Pokémon will not\ngive up its long-running blood feud with Zangoose.",
    "name": "seviper",
    "abilities": [
      "infiltrator",
      "shed-skin"
    ],
    "types": [
      "poison"
    ],
    "height": 2.7,
    "weight": 52.5,
    "imgId": "336"
  },
  {
    "id": 337,
    "species": "Meteorite Pokémon",
    "description": "Lunatone becomes active around the time of the full moon.\nInstead of walking, it moves by floating in midair.\nThe Pokémon’s intimidating red eyes cause all those who\nsee it to become transfixed with fear.",
    "name": "lunatone",
    "abilities": [
      "levitate"
    ],
    "types": [
      "psychic",
      "rock"
    ],
    "height": 1,
    "weight": 168,
    "imgId": "337"
  },
  {
    "id": 338,
    "species": "Meteorite Pokémon",
    "description": "Sunlight is the source of Solrock’s power. It is said to possess\nthe ability to read the emotions of others. This Pokémon gives\noff intense heat while rotating its body.",
    "name": "solrock",
    "abilities": [
      "levitate"
    ],
    "types": [
      "psychic",
      "rock"
    ],
    "height": 1.2,
    "weight": 154,
    "imgId": "338"
  },
  {
    "id": 339,
    "species": "Whiskers Pokémon",
    "description": "Its slippery body is hard to grasp, so much so\nthat there are festivals where people compete\nto see how many they can catch barehanded.",
    "name": "barboach",
    "abilities": [
      "hydration",
      "anticipation",
      "oblivious"
    ],
    "types": [
      "ground",
      "water"
    ],
    "height": 0.4,
    "weight": 1.9,
    "imgId": "339"
  },
  {
    "id": 340,
    "species": "Whiskers Pokémon",
    "description": "Sighting Whiscash leaping from the water\nis believed to herald an earthquake.",
    "name": "whiscash",
    "abilities": [
      "hydration",
      "anticipation",
      "oblivious"
    ],
    "types": [
      "ground",
      "water"
    ],
    "height": 0.9,
    "weight": 23.6,
    "imgId": "340"
  },
  {
    "id": 341,
    "species": "Ruffian Pokémon",
    "description": "Corphish catches prey with its sharp claws. It has no\nlikes or dislikes when it comes to food—it will eat anything.\nThis Pokémon has no trouble living in filthy water.",
    "name": "corphish",
    "abilities": [
      "adaptability",
      "shell-armor",
      "hyper-cutter"
    ],
    "types": [
      "water"
    ],
    "height": 0.6,
    "weight": 11.5,
    "imgId": "341"
  },
  {
    "id": 342,
    "species": "Rogue Pokémon",
    "description": "Crawdaunt molts (sheds) its shell regularly. Immediately after\nmolting, its shell is soft and tender. Until the shell hardens,\nthis Pokémon hides in its streambed burrow to avoid attack\nfrom its foes.",
    "name": "crawdaunt",
    "abilities": [
      "adaptability",
      "shell-armor",
      "hyper-cutter"
    ],
    "types": [
      "dark",
      "water"
    ],
    "height": 1.1,
    "weight": 32.8,
    "imgId": "342"
  },
  {
    "id": 343,
    "species": "Clay Doll Pokémon",
    "description": "As soon as it spots others of its kind, Baltoy congregates with\nthem and then begins crying noisily in unison. This Pokémon\nsleeps while cleverly balancing itself on its one foot.",
    "name": "baltoy",
    "abilities": [
      "levitate"
    ],
    "types": [
      "psychic",
      "ground"
    ],
    "height": 0.5,
    "weight": 21.5,
    "imgId": "343"
  },
  {
    "id": 344,
    "species": "Clay Doll Pokémon",
    "description": "Claydol is an enigma that appeared from a clay statue made by\nan ancient civilization dating back 20,000 years. This Pokémon\nshoots beams from both its hands.",
    "name": "claydol",
    "abilities": [
      "levitate"
    ],
    "types": [
      "psychic",
      "ground"
    ],
    "height": 1.5,
    "weight": 108,
    "imgId": "344"
  },
  {
    "id": 345,
    "species": "Sea Lily Pokémon",
    "description": "Lileep is an ancient Pokémon that was regenerated from a\nfossil. It remains permanently anchored to a rock. From its\nimmobile perch, this Pokémon intently scans for prey with its\ntwo eyes.",
    "name": "lileep",
    "abilities": [
      "storm-drain",
      "suction-cups"
    ],
    "types": [
      "grass",
      "rock"
    ],
    "height": 1,
    "weight": 23.8,
    "imgId": "345"
  },
  {
    "id": 346,
    "species": "Barnacle Pokémon",
    "description": "Cradily’s body serves as an anchor, preventing it from being\nwashed away in rough seas. This Pokémon secretes a strong\ndigestive fluid from its tentacles.",
    "name": "cradily",
    "abilities": [
      "storm-drain",
      "suction-cups"
    ],
    "types": [
      "grass",
      "rock"
    ],
    "height": 1.5,
    "weight": 60.4,
    "imgId": "346"
  },
  {
    "id": 347,
    "species": "Old Shrimp Pokémon",
    "description": "Anorith is said to be a type of Pokémon predecessor, with\neight wings at the sides of its body. This Pokémon swam in the\nprimordial sea by undulating these eight wings.",
    "name": "anorith",
    "abilities": [
      "swift-swim",
      "battle-armor"
    ],
    "types": [
      "bug",
      "rock"
    ],
    "height": 0.7,
    "weight": 12.5,
    "imgId": "347"
  },
  {
    "id": 348,
    "species": "Plate Pokémon",
    "description": "Armaldo is a Pokémon species that became extinct in\nprehistoric times. This Pokémon is said to have walked\non its hind legs, which would have been more convenient\nfor life on land.",
    "name": "armaldo",
    "abilities": [
      "swift-swim",
      "battle-armor"
    ],
    "types": [
      "bug",
      "rock"
    ],
    "height": 1.5,
    "weight": 68.2,
    "imgId": "348"
  },
  {
    "id": 349,
    "species": "Fish Pokémon",
    "description": "Although unattractive and unpopular, this\nPokémon’s marvelous vitality has made it a\nsubject of research.",
    "name": "feebas",
    "abilities": [
      "adaptability",
      "oblivious",
      "swift-swim"
    ],
    "types": [
      "water"
    ],
    "height": 0.6,
    "weight": 7.4,
    "imgId": "349"
  },
  {
    "id": 350,
    "species": "Tender Pokémon",
    "description": "It lives at the bottom of clear lakes. In times of\nwar, it shows itself, which soothes people’s\nminds and hearts.",
    "name": "milotic",
    "abilities": [
      "cute-charm",
      "competitive",
      "marvel-scale"
    ],
    "types": [
      "water"
    ],
    "height": 6.2,
    "weight": 162,
    "imgId": "350"
  },
  {
    "id": 351,
    "species": "Weather Pokémon",
    "description": "Its form changes on its own, due to its cells’\nsensitive reactions to temperature and humidity.",
    "name": "castform",
    "abilities": [
      "forecast"
    ],
    "types": [
      "normal"
    ],
    "height": 0.3,
    "weight": 0.8,
    "imgId": "351"
  },
  {
    "id": 352,
    "species": "Color Swap Pokémon",
    "description": "Kecleon alters its body coloration to blend in with its\nsurroundings, allowing it to sneak up on its prey unnoticed.\nThen it lashes out with its long, stretchy tongue to instantly\nensnare the unsuspecting target.",
    "name": "kecleon",
    "abilities": [
      "protean",
      "color-change"
    ],
    "types": [
      "normal"
    ],
    "height": 1,
    "weight": 22,
    "imgId": "352"
  },
  {
    "id": 353,
    "species": "Puppet Pokémon",
    "description": "Shuppet grows by feeding on dark emotions, such as\nvengefulness and envy, in the hearts of people. It roams\nthrough cities in search of grudges that taint people.",
    "name": "shuppet",
    "abilities": [
      "cursed-body",
      "frisk",
      "insomnia"
    ],
    "types": [
      "ghost"
    ],
    "height": 0.6,
    "weight": 2.3,
    "imgId": "353"
  },
  {
    "id": 354,
    "species": "Marionette Pokémon",
    "description": "A cursed energy permeated the stuffing of a discarded and\nforgotten plush doll, giving it new life as Banette.\nThe Pokémon’s energy would escape if it were to ever open\nits mouth.",
    "name": "banette",
    "abilities": [
      "cursed-body",
      "frisk",
      "insomnia"
    ],
    "types": [
      "ghost"
    ],
    "height": 1.1,
    "weight": 12.5,
    "imgId": "354"
  },
  {
    "id": 355,
    "species": "Requiem Pokémon",
    "description": "Duskull wanders lost among the deep darkness of midnight.\nThere is an oft-told admonishment given to misbehaving\nchildren that this Pokémon will spirit away bad children who\nearn scoldings from their mothers.",
    "name": "duskull",
    "abilities": [
      "frisk",
      "levitate"
    ],
    "types": [
      "ghost"
    ],
    "height": 0.8,
    "weight": 15,
    "imgId": "355"
  },
  {
    "id": 356,
    "species": "Beckon Pokémon",
    "description": "Dusclops absorbs anything, however large the object may be.\nThis Pokémon hypnotizes its foe by waving its hands in a\nmacabre manner and by bringing its single eye to bear.\nThe hypnotized foe is made to do Dusclops’s bidding.",
    "name": "dusclops",
    "abilities": [
      "frisk",
      "pressure"
    ],
    "types": [
      "ghost"
    ],
    "height": 1.6,
    "weight": 30.6,
    "imgId": "356"
  },
  {
    "id": 357,
    "species": "Fruit Pokémon",
    "description": "Children of the southern tropics eat as snacks the fruit that\ngrows in bunches around the neck of Tropius. This Pokémon\nflies by flapping the leaves on its back as if they were wings.",
    "name": "tropius",
    "abilities": [
      "harvest",
      "solar-power",
      "chlorophyll"
    ],
    "types": [
      "flying",
      "grass"
    ],
    "height": 2,
    "weight": 100,
    "imgId": "357"
  },
  {
    "id": 358,
    "species": "Wind Chime Pokémon",
    "description": "In high winds, Chimecho cries as it hangs from a tree branch or\nthe eaves of a building using a suction cup on its head. This\nPokémon plucks berries with its long tail and eats them.",
    "name": "chimecho",
    "abilities": [
      "levitate"
    ],
    "types": [
      "psychic"
    ],
    "height": 0.6,
    "weight": 1,
    "imgId": "358"
  },
  {
    "id": 359,
    "species": "Disaster Pokémon",
    "description": "Although it’s said to bring disaster, in actuality,\nthis Pokémon possesses a calm disposition and\nwarns people of any crises that loom.",
    "name": "absol",
    "abilities": [
      "justified",
      "super-luck",
      "pressure"
    ],
    "types": [
      "dark"
    ],
    "height": 1.2,
    "weight": 47,
    "imgId": "359"
  },
  {
    "id": 360,
    "species": "Bright Pokémon",
    "description": "Wynaut gather on moonlit nights to play by squeezing up\nagainst each other. By being squeezed, this Pokémon gains\nendurance and is trained to dole out powerful counterattacks.",
    "name": "wynaut",
    "abilities": [
      "telepathy",
      "shadow-tag"
    ],
    "types": [
      "psychic"
    ],
    "height": 0.6,
    "weight": 14,
    "imgId": "360"
  },
  {
    "id": 361,
    "species": "Snow Hat Pokémon",
    "description": "It can only survive in cold areas. It bounces\nhappily around, even in environments as cold as\n-150 degrees Fahrenheit.",
    "name": "snorunt",
    "abilities": [
      "moody",
      "ice-body",
      "inner-focus"
    ],
    "types": [
      "ice"
    ],
    "height": 0.7,
    "weight": 16.8,
    "imgId": "361"
  },
  {
    "id": 362,
    "species": "Face Pokémon",
    "description": "Its prey is instantaneously frozen stiff by the\ncold air it exhales from its huge mouth. While\nthey’re in that frozen state, it gobbles them up.",
    "name": "glalie",
    "abilities": [
      "moody",
      "ice-body",
      "inner-focus"
    ],
    "types": [
      "ice"
    ],
    "height": 1.5,
    "weight": 256.5,
    "imgId": "362"
  },
  {
    "id": 363,
    "species": "Clap Pokémon",
    "description": "Spheal always travels by rolling around on its ball-like body.\nWhen the season for ice floes arrives, this Pokémon can be\nseen rolling about on ice and crossing the sea.",
    "name": "spheal",
    "abilities": [
      "oblivious",
      "ice-body",
      "thick-fat"
    ],
    "types": [
      "water",
      "ice"
    ],
    "height": 0.8,
    "weight": 39.5,
    "imgId": "363"
  },
  {
    "id": 364,
    "species": "Ball Roll Pokémon",
    "description": "Sealeo often balances and rolls things on the tip of its\nnose. While the Pokémon is rolling something, it checks\nthe object’s aroma and texture to determine whether it likes\nthe object or not.",
    "name": "sealeo",
    "abilities": [
      "oblivious",
      "ice-body",
      "thick-fat"
    ],
    "types": [
      "water",
      "ice"
    ],
    "height": 1.1,
    "weight": 87.6,
    "imgId": "364"
  },
  {
    "id": 365,
    "species": "Ice Break Pokémon",
    "description": "Walrein swims all over in frigid seawater while crushing\nicebergs with its grand, imposing tusks. Its thick layer of\nblubber makes enemy attacks bounce off harmlessly.",
    "name": "walrein",
    "abilities": [
      "oblivious",
      "ice-body",
      "thick-fat"
    ],
    "types": [
      "water",
      "ice"
    ],
    "height": 1.4,
    "weight": 150.6,
    "imgId": "365"
  },
  {
    "id": 366,
    "species": "Bivalve Pokémon",
    "description": "Clamperl grows while being protected by its rock-hard shell.\nWhen its body becomes too large to fit inside the shell, it is\nsure evidence that this Pokémon is getting close to evolution.",
    "name": "clamperl",
    "abilities": [
      "rattled",
      "shell-armor"
    ],
    "types": [
      "water"
    ],
    "height": 0.4,
    "weight": 52.5,
    "imgId": "366"
  },
  {
    "id": 367,
    "species": "Deep Sea Pokémon",
    "description": "Huntail’s tail is shaped like a fish. It uses the tail to attract\nprey, then swallows the prey whole with its large, gaping\nmouth. This Pokémon swims by wiggling its slender body\nlike a snake.",
    "name": "huntail",
    "abilities": [
      "water-veil",
      "swift-swim"
    ],
    "types": [
      "water"
    ],
    "height": 1.7,
    "weight": 27,
    "imgId": "367"
  },
  {
    "id": 368,
    "species": "South Sea Pokémon",
    "description": "Although Gorebyss is the very picture of elegance and beauty\nwhile swimming, it is also cruel. When it spots prey, this\nPokémon inserts its thin mouth into the prey’s body and drains\nthe prey of its body fluids.",
    "name": "gorebyss",
    "abilities": [
      "hydration",
      "swift-swim"
    ],
    "types": [
      "water"
    ],
    "height": 1.8,
    "weight": 22.6,
    "imgId": "368"
  },
  {
    "id": 369,
    "species": "Longevity Pokémon",
    "description": "It was fortuitously discovered during a deep sea\nexpedition. Its teeth have atrophied, so it now\nsurvives on microscopic organisms it sucks up.",
    "name": "relicanth",
    "abilities": [
      "sturdy",
      "rock-head",
      "swift-swim"
    ],
    "types": [
      "rock",
      "water"
    ],
    "height": 1,
    "weight": 23.4,
    "imgId": "369"
  },
  {
    "id": 370,
    "species": "Rendezvous Pokémon",
    "description": "Loving couples have a soft spot for this\nPokémon, so honeymoon hotels often release\nthis Pokémon into their pools.",
    "name": "luvdisc",
    "abilities": [
      "hydration",
      "swift-swim"
    ],
    "types": [
      "water"
    ],
    "height": 0.6,
    "weight": 8.7,
    "imgId": "370"
  },
  {
    "id": 371,
    "species": "Rock Head Pokémon",
    "description": "With its steel-hard stone head, it headbutts\nindiscriminately. This is because of the stress\nit feels at being unable to fly.",
    "name": "bagon",
    "abilities": [
      "sheer-force",
      "rock-head"
    ],
    "types": [
      "dragon"
    ],
    "height": 0.6,
    "weight": 42.1,
    "imgId": "371"
  },
  {
    "id": 372,
    "species": "Endurance Pokémon",
    "description": "They lurk deep within caves—motionless,\nneither eating nor drinking. Why they don’t die is\nnot known.",
    "name": "shelgon",
    "abilities": [
      "overcoat",
      "rock-head"
    ],
    "types": [
      "dragon"
    ],
    "height": 1.1,
    "weight": 110.5,
    "imgId": "372"
  },
  {
    "id": 373,
    "species": "Dragon Pokémon",
    "description": "It flies around on its wings, which have grown in\nat last. In its happiness, it gushes hot flames,\nburning up the fields it passes over.",
    "name": "salamence",
    "abilities": [
      "moxie",
      "intimidate"
    ],
    "types": [
      "flying",
      "dragon"
    ],
    "height": 1.5,
    "weight": 102.6,
    "imgId": "373"
  },
  {
    "id": 374,
    "species": "Iron Ball Pokémon",
    "description": "With magnetic traction, it pulls its opponents in\nclose. When they’re in range, it slashes them\nwith its rear claws.",
    "name": "beldum",
    "abilities": [
      "light-metal",
      "clear-body"
    ],
    "types": [
      "psychic",
      "steel"
    ],
    "height": 0.6,
    "weight": 95.2,
    "imgId": "374"
  },
  {
    "id": 375,
    "species": "Iron Claw Pokémon",
    "description": "It adores magnetic minerals, so it pursues\nNosepass at speeds exceeding 60 mph.",
    "name": "metang",
    "abilities": [
      "light-metal",
      "clear-body"
    ],
    "types": [
      "psychic",
      "steel"
    ],
    "height": 1.2,
    "weight": 202.5,
    "imgId": "375"
  },
  {
    "id": 376,
    "species": "Iron Leg Pokémon",
    "description": "A linkage of two Metang, this Pokémon can\nperform any calculation in a flash by utilizing\nparallel processing in its four brains.",
    "name": "metagross",
    "abilities": [
      "light-metal",
      "clear-body"
    ],
    "types": [
      "psychic",
      "steel"
    ],
    "height": 1.6,
    "weight": 550,
    "imgId": "376"
  },
  {
    "id": 377,
    "species": "Rock Peak Pokémon",
    "description": "Regirock’s body is composed entirely of rocks. Recently,\na study made the startling discovery that the rocks were all\nunearthed from different locations.",
    "name": "regirock",
    "abilities": [
      "sturdy",
      "clear-body"
    ],
    "types": [
      "rock"
    ],
    "height": 1.7,
    "weight": 230,
    "imgId": "377"
  },
  {
    "id": 378,
    "species": "Iceberg Pokémon",
    "description": "Regice cloaks itself with frigid air of -328 degrees Fahrenheit.\nThings will freeze solid just by going near this Pokémon.\nIts icy body is so cold, it will not melt even if it is immersed\nin magma.",
    "name": "regice",
    "abilities": [
      "ice-body",
      "clear-body"
    ],
    "types": [
      "ice"
    ],
    "height": 1.8,
    "weight": 175,
    "imgId": "378"
  },
  {
    "id": 379,
    "species": "Iron Pokémon",
    "description": "Registeel was imprisoned by people in ancient times.\nThe metal composing its body is thought to be a curious\nsubstance that is not of this earth.",
    "name": "registeel",
    "abilities": [
      "light-metal",
      "clear-body"
    ],
    "types": [
      "steel"
    ],
    "height": 1.9,
    "weight": 205,
    "imgId": "379"
  },
  {
    "id": 380,
    "species": "Eon Pokémon",
    "description": "Latias is highly intelligent and capable of understanding\nhuman speech. It is covered with a glass-like down.\nThe Pokémon enfolds its body with its down and refracts\nlight to alter its appearance.",
    "name": "latias",
    "abilities": [
      "levitate"
    ],
    "types": [
      "psychic",
      "dragon"
    ],
    "height": 1.4,
    "weight": 40,
    "imgId": "380"
  },
  {
    "id": 381,
    "species": "Eon Pokémon",
    "description": "Latios will only open its heart to a Trainer with a\ncompassionate spirit. This Pokémon can fly faster than a\njet plane by folding its forelegs to minimize air resistance.",
    "name": "latios",
    "abilities": [
      "levitate"
    ],
    "types": [
      "psychic",
      "dragon"
    ],
    "height": 2,
    "weight": 60,
    "imgId": "381"
  },
  {
    "id": 382,
    "species": "Sea Basin Pokémon",
    "description": "Kyogre is said to be the personification of the sea itself.\nLegends tell of its many clashes against Groudon,\nas each sought to gain the power of nature.",
    "name": "kyogre",
    "abilities": [
      "drizzle"
    ],
    "types": [
      "water"
    ],
    "height": 4.5,
    "weight": 352,
    "imgId": "382"
  },
  {
    "id": 383,
    "species": "Continent Pokémon",
    "description": "Through Primal Reversion and with nature’s full power,\nit will take back its true form. It can cause magma to\nerupt and expand the landmass of the world.",
    "name": "groudon",
    "abilities": [
      "drought"
    ],
    "types": [
      "ground"
    ],
    "height": 3.5,
    "weight": 950,
    "imgId": "383"
  },
  {
    "id": 384,
    "species": "Sky High Pokémon",
    "description": "It flies forever through the ozone layer, consuming\nmeteoroids for sustenance. The many meteoroids\nin its body provide the energy it needs to Mega Evolve.",
    "name": "rayquaza",
    "abilities": [
      "air-lock"
    ],
    "types": [
      "flying",
      "dragon"
    ],
    "height": 7,
    "weight": 206.5,
    "imgId": "384"
  },
  {
    "id": 385,
    "species": "Wish Pokémon",
    "description": "Jirachi will awaken from its sleep of a thousand years if you\nsing to it in a voice of purity. It is said to make true any wish\nthat people desire.",
    "name": "jirachi",
    "abilities": [
      "serene-grace"
    ],
    "types": [
      "psychic",
      "steel"
    ],
    "height": 0.3,
    "weight": 1.1,
    "imgId": "385"
  },
  {
    "id": 386,
    "species": "DNA Pokémon",
    "description": "Deoxys emerged from a virus that came from space. It is highly\nintelligent and wields psychokinetic powers. This Pokémon\nshoots lasers from the crystalline organ on its chest.",
    "name": "deoxys-normal",
    "abilities": [
      "pressure"
    ],
    "types": [
      "psychic"
    ],
    "height": 1.7,
    "weight": 60.8,
    "imgId": "386"
  },
  {
    "id": 387,
    "species": "Tiny Leaf Pokémon",
    "description": "It undertakes photosynthesis with its body, making\noxygen. The leaf on its head wilts if it is thirsty.",
    "name": "turtwig",
    "abilities": [
      "shell-armor",
      "overgrow"
    ],
    "types": [
      "grass"
    ],
    "height": 0.4,
    "weight": 10.2,
    "imgId": "387"
  },
  {
    "id": 388,
    "species": "Grove Pokémon",
    "description": "It knows where pure water wells up. It carries fellow\nPokémon there on its back.",
    "name": "grotle",
    "abilities": [
      "shell-armor",
      "overgrow"
    ],
    "types": [
      "grass"
    ],
    "height": 1.1,
    "weight": 97,
    "imgId": "388"
  },
  {
    "id": 389,
    "species": "Continent Pokémon",
    "description": "Small Pokémon occasionally gather on its unmoving\nback to begin building their nests.",
    "name": "torterra",
    "abilities": [
      "shell-armor",
      "overgrow"
    ],
    "types": [
      "ground",
      "grass"
    ],
    "height": 2.2,
    "weight": 310,
    "imgId": "389"
  },
  {
    "id": 390,
    "species": "Chimp Pokémon",
    "description": "The gas made in its belly burns from its rear end.\nThe fire burns weakly when it feels sick.",
    "name": "chimchar",
    "abilities": [
      "iron-fist",
      "blaze"
    ],
    "types": [
      "fire"
    ],
    "height": 0.5,
    "weight": 6.2,
    "imgId": "390"
  },
  {
    "id": 391,
    "species": "Playful Pokémon",
    "description": "It uses ceilings and walls to launch aerial attacks.\nIts fiery tail is but one weapon.",
    "name": "monferno",
    "abilities": [
      "iron-fist",
      "blaze"
    ],
    "types": [
      "fighting",
      "fire"
    ],
    "height": 0.9,
    "weight": 22,
    "imgId": "391"
  },
  {
    "id": 392,
    "species": "Flame Pokémon",
    "description": "It tosses its enemies around with agility. It uses all\nits limbs to fight in its own unique style.",
    "name": "infernape",
    "abilities": [
      "iron-fist",
      "blaze"
    ],
    "types": [
      "fighting",
      "fire"
    ],
    "height": 1.2,
    "weight": 55,
    "imgId": "392"
  },
  {
    "id": 393,
    "species": "Penguin Pokémon",
    "description": "Because it is very proud, it hates accepting food\nfrom people. Its thick down guards it from cold.",
    "name": "piplup",
    "abilities": [
      "defiant",
      "torrent"
    ],
    "types": [
      "water"
    ],
    "height": 0.4,
    "weight": 5.2,
    "imgId": "393"
  },
  {
    "id": 394,
    "species": "Penguin Pokémon",
    "description": "It lives a solitary life. Its wings deliver wicked blows\nthat can snap even the thickest of trees.",
    "name": "prinplup",
    "abilities": [
      "defiant",
      "torrent"
    ],
    "types": [
      "water"
    ],
    "height": 0.8,
    "weight": 23,
    "imgId": "394"
  },
  {
    "id": 395,
    "species": "Emperor Pokémon",
    "description": "The three horns that extend from its beak attest to\nits power. The leader has the biggest horns.",
    "name": "empoleon",
    "abilities": [
      "defiant",
      "torrent"
    ],
    "types": [
      "steel",
      "water"
    ],
    "height": 1.7,
    "weight": 84.5,
    "imgId": "395"
  },
  {
    "id": 396,
    "species": "Starling Pokémon",
    "description": "They flock around mountains and fields, chasing\nafter bug Pokémon. Their singing is noisy\nand annoying.",
    "name": "starly",
    "abilities": [
      "reckless",
      "keen-eye"
    ],
    "types": [
      "flying",
      "normal"
    ],
    "height": 0.3,
    "weight": 2,
    "imgId": "396"
  },
  {
    "id": 397,
    "species": "Starling Pokémon",
    "description": "It lives in forests and fields. Squabbles over\nterritory occur when flocks collide.",
    "name": "staravia",
    "abilities": [
      "reckless",
      "intimidate"
    ],
    "types": [
      "flying",
      "normal"
    ],
    "height": 0.6,
    "weight": 15.5,
    "imgId": "397"
  },
  {
    "id": 398,
    "species": "Predator Pokémon",
    "description": "When Staravia evolve into Staraptor, they leave the\nflock to live alone. They have sturdy wings.",
    "name": "staraptor",
    "abilities": [
      "reckless",
      "intimidate"
    ],
    "types": [
      "flying",
      "normal"
    ],
    "height": 1.2,
    "weight": 24.9,
    "imgId": "398"
  },
  {
    "id": 399,
    "species": "Plump Mouse Pokémon",
    "description": "It constantly gnaws on logs and rocks to whittle\ndown its front teeth. It nests alongside water.",
    "name": "bidoof",
    "abilities": [
      "moody",
      "unaware",
      "simple"
    ],
    "types": [
      "normal"
    ],
    "height": 0.5,
    "weight": 20,
    "imgId": "399"
  },
  {
    "id": 400,
    "species": "Beaver Pokémon",
    "description": "It makes its nest by damming streams with bark and\nmud. It is known as an industrious worker.",
    "name": "bibarel",
    "abilities": [
      "moody",
      "unaware",
      "simple"
    ],
    "types": [
      "water",
      "normal"
    ],
    "height": 1,
    "weight": 31.5,
    "imgId": "400"
  },
  {
    "id": 401,
    "species": "Cricket Pokémon",
    "description": "When its antennae hit each other, it sounds like the\nmusic of a xylophone.",
    "name": "kricketot",
    "abilities": [
      "run-away",
      "shed-skin"
    ],
    "types": [
      "bug"
    ],
    "height": 0.3,
    "weight": 2.2,
    "imgId": "401"
  },
  {
    "id": 402,
    "species": "Cricket Pokémon",
    "description": "It signals its emotions with its melodies. Scientists\nare studying these melodic patterns.",
    "name": "kricketune",
    "abilities": [
      "technician",
      "swarm"
    ],
    "types": [
      "bug"
    ],
    "height": 1,
    "weight": 25.5,
    "imgId": "402"
  },
  {
    "id": 403,
    "species": "Flash Pokémon",
    "description": "All of its fur dazzles if danger is sensed. It flees\nwhile the foe is momentarily blinded.",
    "name": "shinx",
    "abilities": [
      "guts",
      "intimidate",
      "rivalry"
    ],
    "types": [
      "electric"
    ],
    "height": 0.5,
    "weight": 9.5,
    "imgId": "403"
  },
  {
    "id": 404,
    "species": "Spark Pokémon",
    "description": "Strong electricity courses through the tips of its\nsharp claws. A light scratch causes fainting in foes.",
    "name": "luxio",
    "abilities": [
      "guts",
      "intimidate",
      "rivalry"
    ],
    "types": [
      "electric"
    ],
    "height": 0.9,
    "weight": 30.5,
    "imgId": "404"
  },
  {
    "id": 405,
    "species": "Gleam Eyes Pokémon",
    "description": "Luxray’s ability to see through objects comes in\nhandy when it’s scouting for danger.",
    "name": "luxray",
    "abilities": [
      "guts",
      "intimidate",
      "rivalry"
    ],
    "types": [
      "electric"
    ],
    "height": 1.4,
    "weight": 42,
    "imgId": "405"
  },
  {
    "id": 406,
    "species": "Bud Pokémon",
    "description": "Over the winter, it closes its bud and endures the\ncold. In spring, the bud opens and releases pollen.",
    "name": "budew",
    "abilities": [
      "leaf-guard",
      "poison-point",
      "natural-cure"
    ],
    "types": [
      "poison",
      "grass"
    ],
    "height": 0.2,
    "weight": 1.2,
    "imgId": "406"
  },
  {
    "id": 407,
    "species": "Bouquet Pokémon",
    "description": "With the movements of a dancer, it strikes with\nwhips that are densely lined with poison thorns.",
    "name": "roserade",
    "abilities": [
      "technician",
      "poison-point",
      "natural-cure"
    ],
    "types": [
      "poison",
      "grass"
    ],
    "height": 0.9,
    "weight": 14.5,
    "imgId": "407"
  },
  {
    "id": 408,
    "species": "Head Butt Pokémon",
    "description": "In rock layers where Cranidos fossils are found,\nthe fossilized trunks of trees snapped in two\nare also often found.",
    "name": "cranidos",
    "abilities": [
      "sheer-force",
      "mold-breaker"
    ],
    "types": [
      "rock"
    ],
    "height": 0.9,
    "weight": 31.5,
    "imgId": "408"
  },
  {
    "id": 409,
    "species": "Head Butt Pokémon",
    "description": "Records exist of a revived fossil that evolved\ninto Rampardos. It proceeded to escape and\nthen destroy a skyscraper with a headbutt.",
    "name": "rampardos",
    "abilities": [
      "sheer-force",
      "mold-breaker"
    ],
    "types": [
      "rock"
    ],
    "height": 1.6,
    "weight": 102.5,
    "imgId": "409"
  },
  {
    "id": 410,
    "species": "Shield Pokémon",
    "description": "This Pokémon lived in primeval jungles. Few\nenemies would have been willing to square off\nagainst its heavily armored face, so it’s thought.",
    "name": "shieldon",
    "abilities": [
      "soundproof",
      "sturdy"
    ],
    "types": [
      "steel",
      "rock"
    ],
    "height": 0.5,
    "weight": 57,
    "imgId": "410"
  },
  {
    "id": 411,
    "species": "Shield Pokémon",
    "description": "It lived in the same environments as Rampardos.\nTheir fossils have been found together—\nseemingly from after they’d fought to the finish.",
    "name": "bastiodon",
    "abilities": [
      "soundproof",
      "sturdy"
    ],
    "types": [
      "steel",
      "rock"
    ],
    "height": 1.3,
    "weight": 149.5,
    "imgId": "411"
  },
  {
    "id": 412,
    "species": "Bagworm Pokémon",
    "description": "If its cloak is broken in battle, it quickly remakes\nthe cloak with materials nearby.",
    "name": "burmy",
    "abilities": [
      "overcoat",
      "shed-skin"
    ],
    "types": [
      "bug"
    ],
    "height": 0.2,
    "weight": 3.4,
    "imgId": "412"
  },
  {
    "id": 413,
    "species": "Bagworm Pokémon",
    "description": "When Burmy evolved, its cloak became a part of\nthis Pokémon’s body. The cloak is never shed.",
    "name": "wormadam-plant",
    "abilities": [
      "overcoat",
      "anticipation"
    ],
    "types": [
      "grass",
      "bug"
    ],
    "height": 0.5,
    "weight": 6.5,
    "imgId": "413"
  },
  {
    "id": 414,
    "species": "Moth Pokémon",
    "description": "It flutters around at night and steals honey from\nthe Combee hive.",
    "name": "mothim",
    "abilities": [
      "tinted-lens",
      "swarm"
    ],
    "types": [
      "flying",
      "bug"
    ],
    "height": 0.9,
    "weight": 23.3,
    "imgId": "414"
  },
  {
    "id": 415,
    "species": "Tiny Bee Pokémon",
    "description": "It collects and delivers honey to its colony.\nAt night, they cluster to form a beehive and sleep.",
    "name": "combee",
    "abilities": [
      "hustle",
      "honey-gather"
    ],
    "types": [
      "flying",
      "bug"
    ],
    "height": 0.3,
    "weight": 5.5,
    "imgId": "415"
  },
  {
    "id": 416,
    "species": "Beehive Pokémon",
    "description": "Its abdomen is a honeycomb for grubs. It raises its\ngrubs on honey collected by Combee.",
    "name": "vespiquen",
    "abilities": [
      "unnerve",
      "pressure"
    ],
    "types": [
      "flying",
      "bug"
    ],
    "height": 1.2,
    "weight": 38.5,
    "imgId": "416"
  },
  {
    "id": 417,
    "species": "EleSquirrel Pokémon",
    "description": "A pair may be seen rubbing their cheek pouches\ntogether in an effort to share stored electricity.",
    "name": "pachirisu",
    "abilities": [
      "volt-absorb",
      "pickup",
      "run-away"
    ],
    "types": [
      "electric"
    ],
    "height": 0.4,
    "weight": 3.9,
    "imgId": "417"
  },
  {
    "id": 418,
    "species": "Sea Weasel Pokémon",
    "description": "It inflates the flotation sac around its neck and\npokes its head out of the water to see what is\ngoing on.",
    "name": "buizel",
    "abilities": [
      "water-veil",
      "swift-swim"
    ],
    "types": [
      "water"
    ],
    "height": 0.7,
    "weight": 29.5,
    "imgId": "418"
  },
  {
    "id": 419,
    "species": "Sea Weasel Pokémon",
    "description": "Its flotation sac developed as a result of pursuing\naquatic prey. It can double as a rubber raft.",
    "name": "floatzel",
    "abilities": [
      "water-veil",
      "swift-swim"
    ],
    "types": [
      "water"
    ],
    "height": 1.1,
    "weight": 33.5,
    "imgId": "419"
  },
  {
    "id": 420,
    "species": "Cherry Pokémon",
    "description": "It evolves by sucking the energy out of the small\nball where it had been storing nutrients.",
    "name": "cherubi",
    "abilities": [
      "chlorophyll"
    ],
    "types": [
      "grass"
    ],
    "height": 0.4,
    "weight": 3.3,
    "imgId": "420"
  },
  {
    "id": 421,
    "species": "Blossom Pokémon",
    "description": "If it senses strong sunlight, it opens its folded\npetals to absorb the sun’s rays with its whole body.",
    "name": "cherrim",
    "abilities": [
      "flower-gift"
    ],
    "types": [
      "grass"
    ],
    "height": 0.5,
    "weight": 9.3,
    "imgId": "421"
  },
  {
    "id": 422,
    "species": "Sea Slug Pokémon",
    "description": "Purple mucus sticks to the hands of anyone\nwho touches it. Take care, as the substance is\ntroublesome to wash off. ",
    "name": "shellos",
    "abilities": [
      "sand-force",
      "storm-drain",
      "sticky-hold"
    ],
    "types": [
      "water"
    ],
    "height": 0.3,
    "weight": 6.3,
    "imgId": "422"
  },
  {
    "id": 423,
    "species": "Sea Slug Pokémon",
    "description": "Plankton, invisible to the naked eye, is its main\nfood source. It comes onto the land periodically,\nbut the reason for this is not known.",
    "name": "gastrodon",
    "abilities": [
      "sand-force",
      "storm-drain",
      "sticky-hold"
    ],
    "types": [
      "ground",
      "water"
    ],
    "height": 0.9,
    "weight": 29.9,
    "imgId": "423"
  },
  {
    "id": 424,
    "species": "Long Tail Pokémon",
    "description": "To eat, it deftly shucks nuts with its two tails.\nIt rarely uses its arms now.",
    "name": "ambipom",
    "abilities": [
      "skill-link",
      "pickup",
      "technician"
    ],
    "types": [
      "normal"
    ],
    "height": 1.2,
    "weight": 20.3,
    "imgId": "424"
  },
  {
    "id": 425,
    "species": "Balloon Pokémon",
    "description": "If for some reason its body bursts, its soul spills\nout with a screaming sound.",
    "name": "drifloon",
    "abilities": [
      "flare-boost",
      "unburden",
      "aftermath"
    ],
    "types": [
      "flying",
      "ghost"
    ],
    "height": 0.4,
    "weight": 1.2,
    "imgId": "425"
  },
  {
    "id": 426,
    "species": "Blimp Pokémon",
    "description": "Even while under careful observation, large\nflocks of Drifblim flying at dusk will inexplicably\ndisappear from view.",
    "name": "drifblim",
    "abilities": [
      "flare-boost",
      "unburden",
      "aftermath"
    ],
    "types": [
      "flying",
      "ghost"
    ],
    "height": 1.2,
    "weight": 15,
    "imgId": "426"
  },
  {
    "id": 427,
    "species": "Rabbit Pokémon",
    "description": "When it senses danger, it perks up its ears.\nOn cold nights, it sleeps with its head tucked into\nits fur.",
    "name": "buneary",
    "abilities": [
      "limber",
      "klutz",
      "run-away"
    ],
    "types": [
      "normal"
    ],
    "height": 0.4,
    "weight": 5.5,
    "imgId": "427"
  },
  {
    "id": 428,
    "species": "Rabbit Pokémon",
    "description": "The ears appear to be delicate. If they are touched\nroughly, it kicks with its graceful legs.",
    "name": "lopunny",
    "abilities": [
      "limber",
      "klutz",
      "cute-charm"
    ],
    "types": [
      "normal"
    ],
    "height": 1.2,
    "weight": 33.3,
    "imgId": "428"
  },
  {
    "id": 429,
    "species": "Magical Pokémon",
    "description": "Mismagius have been known to cast spells to\nmake people fall in love, so some people search\nfor this Pokémon as if their life depended on it.",
    "name": "mismagius",
    "abilities": [
      "levitate"
    ],
    "types": [
      "ghost"
    ],
    "height": 0.9,
    "weight": 4.4,
    "imgId": "429"
  },
  {
    "id": 430,
    "species": "Big Boss Pokémon",
    "description": "If its Murkrow cronies fail to catch food for it,\nor if it feels they have betrayed it, it will hunt\nthem down wherever they are and punish them.",
    "name": "honchkrow",
    "abilities": [
      "moxie",
      "super-luck",
      "insomnia"
    ],
    "types": [
      "flying",
      "dark"
    ],
    "height": 0.9,
    "weight": 27.3,
    "imgId": "430"
  },
  {
    "id": 431,
    "species": "Catty Pokémon",
    "description": "When it’s happy, Glameow demonstrates beautiful\nmovements of its tail, like a dancing ribbon.",
    "name": "glameow",
    "abilities": [
      "keen-eye",
      "own-tempo",
      "limber"
    ],
    "types": [
      "normal"
    ],
    "height": 0.5,
    "weight": 3.9,
    "imgId": "431"
  },
  {
    "id": 432,
    "species": "Tiger Cat Pokémon",
    "description": "To make itself appear intimidatingly beefy, it tightly\ncinches its waist with its twin tails.",
    "name": "purugly",
    "abilities": [
      "defiant",
      "own-tempo",
      "thick-fat"
    ],
    "types": [
      "normal"
    ],
    "height": 1,
    "weight": 43.8,
    "imgId": "432"
  },
  {
    "id": 433,
    "species": "Bell Pokémon",
    "description": "There is an orb inside its mouth. When it hops,\nthe orb bounces all over and makes a\nringing sound.",
    "name": "chingling",
    "abilities": [
      "levitate"
    ],
    "types": [
      "psychic"
    ],
    "height": 0.2,
    "weight": 0.6,
    "imgId": "433"
  },
  {
    "id": 434,
    "species": "Skunk Pokémon",
    "description": "It protects itself by spraying a noxious fluid from its\nrear. The stench lingers for 24 hours.",
    "name": "stunky",
    "abilities": [
      "keen-eye",
      "aftermath",
      "stench"
    ],
    "types": [
      "dark",
      "poison"
    ],
    "height": 0.4,
    "weight": 19.2,
    "imgId": "434"
  },
  {
    "id": 435,
    "species": "Skunk Pokémon",
    "description": "It sprays a stinky fluid from its tail. The fluid smells\nworse the longer it is allowed to fester.",
    "name": "skuntank",
    "abilities": [
      "keen-eye",
      "aftermath",
      "stench"
    ],
    "types": [
      "dark",
      "poison"
    ],
    "height": 1,
    "weight": 38,
    "imgId": "435"
  },
  {
    "id": 436,
    "species": "Bronze Pokémon",
    "description": "Implements shaped like it were discovered in\nancient tombs. It is unknown if they are related.",
    "name": "bronzor",
    "abilities": [
      "heavy-metal",
      "heatproof",
      "levitate"
    ],
    "types": [
      "psychic",
      "steel"
    ],
    "height": 0.5,
    "weight": 60.5,
    "imgId": "436"
  },
  {
    "id": 437,
    "species": "Bronze Bell Pokémon",
    "description": "Ancient people believed that petitioning Bronzong\nfor rain was the way to make crops grow.",
    "name": "bronzong",
    "abilities": [
      "heavy-metal",
      "heatproof",
      "levitate"
    ],
    "types": [
      "psychic",
      "steel"
    ],
    "height": 1.3,
    "weight": 187,
    "imgId": "437"
  },
  {
    "id": 438,
    "species": "Bonsai Pokémon",
    "description": "From its eyes, it can expel excess moisture from\nits body. This liquid is similar in composition to\nhuman sweat.",
    "name": "bonsly",
    "abilities": [
      "rattled",
      "rock-head",
      "sturdy"
    ],
    "types": [
      "rock"
    ],
    "height": 0.5,
    "weight": 15,
    "imgId": "438"
  },
  {
    "id": 439,
    "species": "Mime Pokémon",
    "description": "It habitually mimics foes. Once mimicked, the foe\ncannot take its eyes off this Pokémon.",
    "name": "mime-jr",
    "abilities": [
      "technician",
      "filter",
      "soundproof"
    ],
    "types": [
      "fairy",
      "psychic"
    ],
    "height": 0.6,
    "weight": 13,
    "imgId": "439"
  },
  {
    "id": 440,
    "species": "Playhouse Pokémon",
    "description": "It’s too small to lay eggs yet. As a surrogate,\nit searches out round white stones.",
    "name": "happiny",
    "abilities": [
      "friend-guard",
      "serene-grace",
      "natural-cure"
    ],
    "types": [
      "normal"
    ],
    "height": 0.6,
    "weight": 24.4,
    "imgId": "440"
  },
  {
    "id": 441,
    "species": "Music Note Pokémon",
    "description": "It can learn and speak human words. If they gather,\nthey all learn the same saying.",
    "name": "chatot",
    "abilities": [
      "big-pecks",
      "tangled-feet",
      "keen-eye"
    ],
    "types": [
      "flying",
      "normal"
    ],
    "height": 0.5,
    "weight": 1.9,
    "imgId": "441"
  },
  {
    "id": 442,
    "species": "Forbidden Pokémon",
    "description": "It was bound to a fissure in an odd keystone as\npunishment for misdeeds 500 years ago.",
    "name": "spiritomb",
    "abilities": [
      "infiltrator",
      "pressure"
    ],
    "types": [
      "dark",
      "ghost"
    ],
    "height": 1,
    "weight": 108,
    "imgId": "442"
  },
  {
    "id": 443,
    "species": "Land Shark Pokémon",
    "description": "It skulks in caves, and when prey or an enemy\npasses by, it leaps out and chomps them. The\nforce of its attack sometimes chips its teeth.",
    "name": "gible",
    "abilities": [
      "rough-skin",
      "sand-veil"
    ],
    "types": [
      "ground",
      "dragon"
    ],
    "height": 0.7,
    "weight": 20.5,
    "imgId": "443"
  },
  {
    "id": 444,
    "species": "Cave Pokémon",
    "description": "Shiny objects are its passion. It can be found in\nits cave, scarcely moving, its gaze fixed on the\njewels it’s amassed or Carbink it has caught.",
    "name": "gabite",
    "abilities": [
      "rough-skin",
      "sand-veil"
    ],
    "types": [
      "ground",
      "dragon"
    ],
    "height": 1.4,
    "weight": 56,
    "imgId": "444"
  },
  {
    "id": 445,
    "species": "Mach Pokémon",
    "description": "The protuberances on its head serve as\nsensors. It can even detect distant prey.",
    "name": "garchomp",
    "abilities": [
      "rough-skin",
      "sand-veil"
    ],
    "types": [
      "ground",
      "dragon"
    ],
    "height": 1.9,
    "weight": 95,
    "imgId": "445"
  },
  {
    "id": 446,
    "species": "Big Eater Pokémon",
    "description": "When it finds something that looks like it might\nbe edible, it goes right ahead and swallows it\nwhole. That’s why it gets fatter day by day.",
    "name": "munchlax",
    "abilities": [
      "gluttony",
      "thick-fat",
      "pickup"
    ],
    "types": [
      "normal"
    ],
    "height": 0.6,
    "weight": 105,
    "imgId": "446"
  },
  {
    "id": 447,
    "species": "Emanation Pokémon",
    "description": "It’s tough enough to run right through the night,\nand it’s also a hard worker, but it’s still just\na youngster.",
    "name": "riolu",
    "abilities": [
      "prankster",
      "inner-focus",
      "steadfast"
    ],
    "types": [
      "fighting"
    ],
    "height": 0.7,
    "weight": 20.2,
    "imgId": "447"
  },
  {
    "id": 448,
    "species": "Aura Pokémon",
    "description": "They can detect the species of a living being—\nand its emotions—from over half a mile away.\nThey control auras and hunt their prey in packs.",
    "name": "lucario",
    "abilities": [
      "justified",
      "inner-focus",
      "steadfast"
    ],
    "types": [
      "steel",
      "fighting"
    ],
    "height": 1.2,
    "weight": 54,
    "imgId": "448"
  },
  {
    "id": 449,
    "species": "Hippo Pokémon",
    "description": "It enshrouds itself with sand to protect itself from\ngerms. It does not enjoy getting wet.",
    "name": "hippopotas",
    "abilities": [
      "sand-force",
      "sand-stream"
    ],
    "types": [
      "ground"
    ],
    "height": 0.8,
    "weight": 49.5,
    "imgId": "449"
  },
  {
    "id": 450,
    "species": "Heavyweight Pokémon",
    "description": "It blasts internally stored sand from ports on its\nbody to create a towering twister for attack.",
    "name": "hippowdon",
    "abilities": [
      "sand-force",
      "sand-stream"
    ],
    "types": [
      "ground"
    ],
    "height": 2,
    "weight": 300,
    "imgId": "450"
  },
  {
    "id": 451,
    "species": "Scorpion Pokémon",
    "description": "It burrows under the sand to lie in wait for prey.\nIts tail claws can inject its prey with a\nsavage poison.",
    "name": "skorupi",
    "abilities": [
      "keen-eye",
      "sniper",
      "battle-armor"
    ],
    "types": [
      "bug",
      "poison"
    ],
    "height": 0.8,
    "weight": 12,
    "imgId": "451"
  },
  {
    "id": 452,
    "species": "Ogre Scorpion Pokémon",
    "description": "It has the power in its clawed arms to make scrap\nof a car. The tips of its claws release poison.",
    "name": "drapion",
    "abilities": [
      "keen-eye",
      "sniper",
      "battle-armor"
    ],
    "types": [
      "dark",
      "poison"
    ],
    "height": 1.3,
    "weight": 61.5,
    "imgId": "452"
  },
  {
    "id": 453,
    "species": "Toxic Mouth Pokémon",
    "description": "Inflating its poison sacs, it fills the area with an odd\nsound and hits flinching opponents with a\npoison jab.",
    "name": "croagunk",
    "abilities": [
      "poison-touch",
      "dry-skin",
      "anticipation"
    ],
    "types": [
      "fighting",
      "poison"
    ],
    "height": 0.7,
    "weight": 23,
    "imgId": "453"
  },
  {
    "id": 454,
    "species": "Toxic Mouth Pokémon",
    "description": "Its knuckle claws secrete a toxin so vile that even a\nscratch could prove fatal.",
    "name": "toxicroak",
    "abilities": [
      "poison-touch",
      "dry-skin",
      "anticipation"
    ],
    "types": [
      "fighting",
      "poison"
    ],
    "height": 1.3,
    "weight": 44.4,
    "imgId": "454"
  },
  {
    "id": 455,
    "species": "Bug Catcher Pokémon",
    "description": "It binds itself to trees in marshes. It attracts prey\nwith its sweet-smelling drool and gulps them down.",
    "name": "carnivine",
    "abilities": [
      "levitate"
    ],
    "types": [
      "grass"
    ],
    "height": 1.4,
    "weight": 27,
    "imgId": "455"
  },
  {
    "id": 456,
    "species": "Wing Fish Pokémon",
    "description": "Its double tail fins propel its energetic jumps.\nWhen it breaks the surface of the sea, Wingull\nswoop down to grab it on the fly.",
    "name": "finneon",
    "abilities": [
      "water-veil",
      "storm-drain",
      "swift-swim"
    ],
    "types": [
      "water"
    ],
    "height": 0.4,
    "weight": 7,
    "imgId": "456"
  },
  {
    "id": 457,
    "species": "Neon Pokémon",
    "description": "This deep-sea Pokémon lives at the bottom of\nthe sea. Its fins haul it over the seabed in\nsearch of its favorite food—Starmie.",
    "name": "lumineon",
    "abilities": [
      "water-veil",
      "storm-drain",
      "swift-swim"
    ],
    "types": [
      "water"
    ],
    "height": 1.2,
    "weight": 24,
    "imgId": "457"
  },
  {
    "id": 458,
    "species": "Kite Pokémon",
    "description": "When it swims close to the surface of the ocean,\npeople aboard ships are able to observe the pattern\non its back.",
    "name": "mantyke",
    "abilities": [
      "water-veil",
      "water-absorb",
      "swift-swim"
    ],
    "types": [
      "flying",
      "water"
    ],
    "height": 1,
    "weight": 65,
    "imgId": "458"
  },
  {
    "id": 459,
    "species": "Frost Tree Pokémon",
    "description": "In the spring, it grows berries with the texture of\nfrozen treats around its belly.",
    "name": "snover",
    "abilities": [
      "soundproof",
      "snow-warning"
    ],
    "types": [
      "ice",
      "grass"
    ],
    "height": 1,
    "weight": 50.5,
    "imgId": "459"
  },
  {
    "id": 460,
    "species": "Frost Tree Pokémon",
    "description": "It lives a quiet life on mountains that are perpetually\ncovered in snow. It hides itself by whipping\nup blizzards.",
    "name": "abomasnow",
    "abilities": [
      "soundproof",
      "snow-warning"
    ],
    "types": [
      "ice",
      "grass"
    ],
    "height": 2.2,
    "weight": 135.5,
    "imgId": "460"
  },
  {
    "id": 461,
    "species": "Sharp Claw Pokémon",
    "description": "They dwell in cold places. This Pokémon’s main\nfood source in Alola is Vulpix and Sandshrew,\nwhich they carefully divide among their group.",
    "name": "weavile",
    "abilities": [
      "pickpocket",
      "pressure"
    ],
    "types": [
      "ice",
      "dark"
    ],
    "height": 1.1,
    "weight": 34,
    "imgId": "461"
  },
  {
    "id": 462,
    "species": "Magnet Area Pokémon",
    "description": "As it zooms through the sky, this Pokémon\nseems to be receiving signals of unknown origin,\nwhile transmitting signals of unknown purpose.",
    "name": "magnezone",
    "abilities": [
      "analytic",
      "sturdy",
      "magnet-pull"
    ],
    "types": [
      "steel",
      "electric"
    ],
    "height": 1.2,
    "weight": 180,
    "imgId": "462"
  },
  {
    "id": 463,
    "species": "Licking Pokémon",
    "description": "Their saliva contains lots of components that can\ndissolve anything. The numbness caused by their\nlick does not dissipate.",
    "name": "lickilicky",
    "abilities": [
      "cloud-nine",
      "oblivious",
      "own-tempo"
    ],
    "types": [
      "normal"
    ],
    "height": 1.7,
    "weight": 140,
    "imgId": "463"
  },
  {
    "id": 464,
    "species": "Drill Pokémon",
    "description": "It puts rocks in holes in its palms and uses its\nmuscles to shoot them. Geodude are shot at\nrare times.",
    "name": "rhyperior",
    "abilities": [
      "reckless",
      "solid-rock",
      "lightning-rod"
    ],
    "types": [
      "rock",
      "ground"
    ],
    "height": 2.4,
    "weight": 282.8,
    "imgId": "464"
  },
  {
    "id": 465,
    "species": "Vine Pokémon",
    "description": "Its vines grow so profusely that, in the warm\nseason, you can’t even see its eyes.",
    "name": "tangrowth",
    "abilities": [
      "regenerator",
      "leaf-guard",
      "chlorophyll"
    ],
    "types": [
      "grass"
    ],
    "height": 2,
    "weight": 128.6,
    "imgId": "465"
  },
  {
    "id": 466,
    "species": "Thunderbolt Pokémon",
    "description": "When it gets excited, it thumps its chest. With\nevery thud, thunder roars and electric sparks\nshower all around.",
    "name": "electivire",
    "abilities": [
      "vital-spirit",
      "motor-drive"
    ],
    "types": [
      "electric"
    ],
    "height": 1.8,
    "weight": 138.6,
    "imgId": "466"
  },
  {
    "id": 467,
    "species": "Blast Pokémon",
    "description": "From its arm, it launches fireballs hotter than\n3,500 degrees Fahrenheit. Its arm starts to\nmelt when it fires a whole barrage.",
    "name": "magmortar",
    "abilities": [
      "vital-spirit",
      "flame-body"
    ],
    "types": [
      "fire"
    ],
    "height": 1.6,
    "weight": 68,
    "imgId": "467"
  },
  {
    "id": 468,
    "species": "Jubilee Pokémon",
    "description": "It shares many blessings with people who respect\none another’s rights and avoid needless strife.",
    "name": "togekiss",
    "abilities": [
      "super-luck",
      "serene-grace",
      "hustle"
    ],
    "types": [
      "flying",
      "fairy"
    ],
    "height": 1.5,
    "weight": 38,
    "imgId": "468"
  },
  {
    "id": 469,
    "species": "Ogre Darner Pokémon",
    "description": "This six-legged Pokémon is easily capable of\ntransporting an adult in flight. The wings on its tail\nhelp it stay balanced.",
    "name": "yanmega",
    "abilities": [
      "frisk",
      "tinted-lens",
      "speed-boost"
    ],
    "types": [
      "flying",
      "bug"
    ],
    "height": 1.9,
    "weight": 51.5,
    "imgId": "469"
  },
  {
    "id": 470,
    "species": "Verdant Pokémon",
    "description": "The younger they are, the more they smell like\nfresh grass. With age, their fragrance takes on\nthe odor of fallen leaves.",
    "name": "leafeon",
    "abilities": [
      "chlorophyll",
      "leaf-guard"
    ],
    "types": [
      "grass"
    ],
    "height": 1,
    "weight": 25.5,
    "imgId": "470"
  },
  {
    "id": 471,
    "species": "Fresh Snow Pokémon",
    "description": "It freezes its fur into icicles, spiky and sharp,\nand tackles its prey.",
    "name": "glaceon",
    "abilities": [
      "ice-body",
      "snow-cloak"
    ],
    "types": [
      "ice"
    ],
    "height": 0.8,
    "weight": 25.9,
    "imgId": "471"
  },
  {
    "id": 472,
    "species": "Fang Scorpion Pokémon",
    "description": "Its flight is soundless. It uses its lengthy tail to\ncarry off its prey... Then its elongated fangs do\nthe rest.",
    "name": "gliscor",
    "abilities": [
      "poison-heal",
      "sand-veil",
      "hyper-cutter"
    ],
    "types": [
      "flying",
      "ground"
    ],
    "height": 2,
    "weight": 42.5,
    "imgId": "472"
  },
  {
    "id": 473,
    "species": "Twin Tusk Pokémon",
    "description": "Its impressive tusks are made of ice. The population\nthinned when it turned warm after the ice age.",
    "name": "mamoswine",
    "abilities": [
      "thick-fat",
      "snow-cloak",
      "oblivious"
    ],
    "types": [
      "ground",
      "ice"
    ],
    "height": 2.5,
    "weight": 291,
    "imgId": "473"
  },
  {
    "id": 474,
    "species": "Virtual Pokémon",
    "description": "Its program was modified to facilitate\nextra-dimensional activities, but that led to\nnoticeably strange behavior.",
    "name": "porygon-z",
    "abilities": [
      "analytic",
      "download",
      "adaptability"
    ],
    "types": [
      "normal"
    ],
    "height": 0.9,
    "weight": 34,
    "imgId": "474"
  },
  {
    "id": 475,
    "species": "Blade Pokémon",
    "description": "A master of courtesy and swordsmanship, it fights\nusing extending swords on its elbows.",
    "name": "gallade",
    "abilities": [
      "justified",
      "steadfast"
    ],
    "types": [
      "fighting",
      "psychic"
    ],
    "height": 1.6,
    "weight": 52,
    "imgId": "475"
  },
  {
    "id": 476,
    "species": "Compass Pokémon",
    "description": "The main body controls three mobile units called\nMini-Noses, which it maneuvers to catch prey.",
    "name": "probopass",
    "abilities": [
      "sand-force",
      "magnet-pull",
      "sturdy"
    ],
    "types": [
      "steel",
      "rock"
    ],
    "height": 1.4,
    "weight": 340,
    "imgId": "476"
  },
  {
    "id": 477,
    "species": "Gripper Pokémon",
    "description": "The antenna on its head captures radio waves from\nthe world of spirits that command it to take\npeople there.",
    "name": "dusknoir",
    "abilities": [
      "frisk",
      "pressure"
    ],
    "types": [
      "ghost"
    ],
    "height": 2.2,
    "weight": 106.6,
    "imgId": "477"
  },
  {
    "id": 478,
    "species": "Snow Land Pokémon",
    "description": "The soul of a woman lost on a snowy mountain\npossessed an icicle, becoming this Pokémon.\nThe food it most relishes is the souls of men.",
    "name": "froslass",
    "abilities": [
      "cursed-body",
      "snow-cloak"
    ],
    "types": [
      "ghost",
      "ice"
    ],
    "height": 1.3,
    "weight": 26.6,
    "imgId": "478"
  },
  {
    "id": 479,
    "species": "Plasma Pokémon",
    "description": "Its body is composed of plasma. It is known to\ninfiltrate electronic devices and wreak havoc.",
    "name": "rotom",
    "abilities": [
      "levitate"
    ],
    "types": [
      "ghost",
      "electric"
    ],
    "height": 0.3,
    "weight": 0.3,
    "imgId": "479"
  },
  {
    "id": 480,
    "species": "Knowledge Pokémon",
    "description": "It is said that its emergence gave humans the\nintelligence to improve their quality of life.",
    "name": "uxie",
    "abilities": [
      "levitate"
    ],
    "types": [
      "psychic"
    ],
    "height": 0.3,
    "weight": 0.3,
    "imgId": "480"
  },
  {
    "id": 481,
    "species": "Emotion Pokémon",
    "description": "It sleeps at the bottom of a lake. Its spirit is said to\nleave its body to fly on the lake’s surface.",
    "name": "mesprit",
    "abilities": [
      "levitate"
    ],
    "types": [
      "psychic"
    ],
    "height": 0.3,
    "weight": 0.3,
    "imgId": "481"
  },
  {
    "id": 482,
    "species": "Willpower Pokémon",
    "description": "It is thought that Uxie, Mesprit, and Azelf all came\nfrom the same egg.",
    "name": "azelf",
    "abilities": [
      "levitate"
    ],
    "types": [
      "psychic"
    ],
    "height": 0.3,
    "weight": 0.3,
    "imgId": "482"
  },
  {
    "id": 483,
    "species": "Temporal Pokémon",
    "description": "It has the power to control time. It appears in\nSinnoh-region myths as an ancient deity.",
    "name": "dialga",
    "abilities": [
      "telepathy",
      "pressure"
    ],
    "types": [
      "dragon",
      "steel"
    ],
    "height": 5.4,
    "weight": 683,
    "imgId": "483"
  },
  {
    "id": 484,
    "species": "Spatial Pokémon",
    "description": "It has the ability to distort space. It is described as\na deity in Sinnoh-region mythology.",
    "name": "palkia",
    "abilities": [
      "telepathy",
      "pressure"
    ],
    "types": [
      "dragon",
      "water"
    ],
    "height": 4.2,
    "weight": 336,
    "imgId": "484"
  },
  {
    "id": 485,
    "species": "Lava Dome Pokémon",
    "description": "Boiling blood, like magma, circulates through its\nbody. It makes its dwelling place in volcanic caves.",
    "name": "heatran",
    "abilities": [
      "flame-body",
      "flash-fire"
    ],
    "types": [
      "steel",
      "fire"
    ],
    "height": 1.7,
    "weight": 430,
    "imgId": "485"
  },
  {
    "id": 486,
    "species": "Colossal Pokémon",
    "description": "There is an enduring legend that states this\nPokémon towed continents with ropes.",
    "name": "regigigas",
    "abilities": [
      "slow-start"
    ],
    "types": [
      "normal"
    ],
    "height": 3.7,
    "weight": 420,
    "imgId": "486"
  },
  {
    "id": 487,
    "species": "Renegade Pokémon",
    "description": "It was banished for its violence. It silently gazed\nupon the old world from the Distortion World.",
    "name": "giratina-altered",
    "abilities": [
      "telepathy",
      "pressure"
    ],
    "types": [
      "dragon",
      "ghost"
    ],
    "height": 4.5,
    "weight": 750,
    "imgId": "487"
  },
  {
    "id": 488,
    "species": "Lunar Pokémon",
    "description": "Those who sleep holding Cresselia’s feather are\nassured of joyful dreams. It is said to represent\nthe crescent moon.",
    "name": "cresselia",
    "abilities": [
      "levitate"
    ],
    "types": [
      "psychic"
    ],
    "height": 1.5,
    "weight": 85.6,
    "imgId": "488"
  },
  {
    "id": 489,
    "species": "Sea Drifter Pokémon",
    "description": "It drifts in warm seas. It always returns to where it\nwas born, no matter how far it may have drifted.",
    "name": "phione",
    "abilities": [
      "hydration"
    ],
    "types": [
      "water"
    ],
    "height": 0.4,
    "weight": 3.1,
    "imgId": "489"
  },
  {
    "id": 490,
    "species": "Seafaring Pokémon",
    "description": "It starts its life with a wondrous power that permits\nit to bond with any kind of Pokémon.",
    "name": "manaphy",
    "abilities": [
      "hydration"
    ],
    "types": [
      "water"
    ],
    "height": 0.3,
    "weight": 1.4,
    "imgId": "490"
  },
  {
    "id": 491,
    "species": "Pitch-Black Pokémon",
    "description": "It can lull people to sleep and make them dream.\nIt is active during nights of the new moon.",
    "name": "darkrai",
    "abilities": [
      "bad-dreams"
    ],
    "types": [
      "dark"
    ],
    "height": 1.5,
    "weight": 50.5,
    "imgId": "491"
  },
  {
    "id": 492,
    "species": "Gratitude Pokémon",
    "description": "The blooming of Gracidea flowers confers the\npower of flight upon it. Feelings of gratitude are\nthe message it delivers.",
    "name": "shaymin-land",
    "abilities": [
      "natural-cure"
    ],
    "types": [
      "grass"
    ],
    "height": 0.2,
    "weight": 2.1,
    "imgId": "492"
  },
  {
    "id": 493,
    "species": "Alpha Pokémon",
    "description": "It is told in mythology that this Pokémon was born\nbefore the universe even existed.",
    "name": "arceus",
    "abilities": [
      "multitype"
    ],
    "types": [
      "normal"
    ],
    "height": 3.2,
    "weight": 320,
    "imgId": "493"
  },
  {
    "id": 494,
    "species": "Victory Pokémon",
    "description": "When it shares the infinite energy it creates,\nthat being’s entire body will be overflowing\nwith power.",
    "name": "victini",
    "abilities": [
      "victory-star"
    ],
    "types": [
      "fire",
      "psychic"
    ],
    "height": 0.4,
    "weight": 4,
    "imgId": "494"
  },
  {
    "id": 495,
    "species": "Grass Snake Pokémon",
    "description": "They photosynthesize by bathing their tails in\nsunlight. When they are not feeling well, their\ntails droop.",
    "name": "snivy",
    "abilities": [
      "contrary",
      "overgrow"
    ],
    "types": [
      "grass"
    ],
    "height": 0.6,
    "weight": 8.1,
    "imgId": "495"
  },
  {
    "id": 496,
    "species": "Grass Snake Pokémon",
    "description": "When it gets dirty, its leaves can’t be used in\nphotosynthesis, so it always keeps itself clean.",
    "name": "servine",
    "abilities": [
      "contrary",
      "overgrow"
    ],
    "types": [
      "grass"
    ],
    "height": 0.8,
    "weight": 16,
    "imgId": "496"
  },
  {
    "id": 497,
    "species": "Regal Pokémon",
    "description": "It can stop its opponents’ movements with just a\nglare. It takes in solar energy and boosts\nit internally.",
    "name": "serperior",
    "abilities": [
      "contrary",
      "overgrow"
    ],
    "types": [
      "grass"
    ],
    "height": 3.3,
    "weight": 63,
    "imgId": "497"
  },
  {
    "id": 498,
    "species": "Fire Pig Pokémon",
    "description": "It loves to eat roasted berries, but sometimes it\ngets too excited and burns them to a crisp.",
    "name": "tepig",
    "abilities": [
      "thick-fat",
      "blaze"
    ],
    "types": [
      "fire"
    ],
    "height": 0.5,
    "weight": 9.9,
    "imgId": "498"
  },
  {
    "id": 499,
    "species": "Fire Pig Pokémon",
    "description": "When its internal fire flares up, its movements grow\nsharper and faster. When in trouble, it emits smoke.",
    "name": "pignite",
    "abilities": [
      "thick-fat",
      "blaze"
    ],
    "types": [
      "fighting",
      "fire"
    ],
    "height": 1,
    "weight": 55.5,
    "imgId": "499"
  },
  {
    "id": 500,
    "species": "Mega Fire Pig Pokémon",
    "description": "It has mastered fast and powerful fighting moves.\nIt grows a beard of fire.",
    "name": "emboar",
    "abilities": [
      "reckless",
      "blaze"
    ],
    "types": [
      "fighting",
      "fire"
    ],
    "height": 1.6,
    "weight": 150,
    "imgId": "500"
  },
  {
    "id": 501,
    "species": "Sea Otter Pokémon",
    "description": "It fights using the scalchop on its stomach.\nIn response to an attack, it retaliates immediately\nby slashing.",
    "name": "oshawott",
    "abilities": [
      "shell-armor",
      "torrent"
    ],
    "types": [
      "water"
    ],
    "height": 0.5,
    "weight": 5.9,
    "imgId": "501"
  },
  {
    "id": 502,
    "species": "Discipline Pokémon",
    "description": "As a result of strict training, each Dewott learns\ndifferent forms for using the scalchops.",
    "name": "dewott",
    "abilities": [
      "shell-armor",
      "torrent"
    ],
    "types": [
      "water"
    ],
    "height": 0.8,
    "weight": 24.5,
    "imgId": "502"
  },
  {
    "id": 503,
    "species": "Formidable Pokémon",
    "description": "One swing of the sword incorporated in its armor\ncan fell an opponent. A simple glare from one of\nthem quiets everybody.",
    "name": "samurott",
    "abilities": [
      "shell-armor",
      "torrent"
    ],
    "types": [
      "water"
    ],
    "height": 1.5,
    "weight": 94.6,
    "imgId": "503"
  },
  {
    "id": 504,
    "species": "Scout Pokémon",
    "description": "Extremely cautious, one of them will always be on\nthe lookout, but it won’t notice a foe coming\nfrom behind.",
    "name": "patrat",
    "abilities": [
      "analytic",
      "keen-eye",
      "run-away"
    ],
    "types": [
      "normal"
    ],
    "height": 0.5,
    "weight": 11.6,
    "imgId": "504"
  },
  {
    "id": 505,
    "species": "Lookout Pokémon",
    "description": "When they see an enemy, their tails stand high,\nand they spit the seeds of berries stored in their\ncheek pouches.",
    "name": "watchog",
    "abilities": [
      "analytic",
      "keen-eye",
      "illuminate"
    ],
    "types": [
      "normal"
    ],
    "height": 1.1,
    "weight": 27,
    "imgId": "505"
  },
  {
    "id": 506,
    "species": "Puppy Pokémon",
    "description": "The long fur surrounding its face functions as\nradar, enabling it to probe the condition of its\nbattle opponents.",
    "name": "lillipup",
    "abilities": [
      "run-away",
      "pickup",
      "vital-spirit"
    ],
    "types": [
      "normal"
    ],
    "height": 0.4,
    "weight": 4.1,
    "imgId": "506"
  },
  {
    "id": 507,
    "species": "Loyal Dog Pokémon",
    "description": "This Pokémon obeys its master’s orders\nfaithfully. However, it refuses to listen to\nanything said by a person it doesn’t respect.",
    "name": "herdier",
    "abilities": [
      "scrappy",
      "sand-rush",
      "intimidate"
    ],
    "types": [
      "normal"
    ],
    "height": 0.9,
    "weight": 14.7,
    "imgId": "507"
  },
  {
    "id": 508,
    "species": "Big-Hearted Pokémon",
    "description": "With this wise Pokémon, there could be no\nconcern that it would ever attack people. Some\nparents even trust it to babysit.",
    "name": "stoutland",
    "abilities": [
      "scrappy",
      "sand-rush",
      "intimidate"
    ],
    "types": [
      "normal"
    ],
    "height": 1.2,
    "weight": 61,
    "imgId": "508"
  },
  {
    "id": 509,
    "species": "Devious Pokémon",
    "description": "They steal from people for fun, but their victims\ncan’t help but forgive them. Their deceptively cute\nact is perfect.",
    "name": "purrloin",
    "abilities": [
      "prankster",
      "unburden",
      "limber"
    ],
    "types": [
      "dark"
    ],
    "height": 0.4,
    "weight": 10.1,
    "imgId": "509"
  },
  {
    "id": 510,
    "species": "Cruel Pokémon",
    "description": "Stealthily, it sneaks up on its target, striking from\nbehind before its victim has a chance to react.",
    "name": "liepard",
    "abilities": [
      "prankster",
      "unburden",
      "limber"
    ],
    "types": [
      "dark"
    ],
    "height": 1.1,
    "weight": 37.5,
    "imgId": "510"
  },
  {
    "id": 511,
    "species": "Grass Monkey Pokémon",
    "description": "It’s good at finding berries and gathers them from\nall over. It’s kind enough to share them\nwith friends.",
    "name": "pansage",
    "abilities": [
      "overgrow",
      "gluttony"
    ],
    "types": [
      "grass"
    ],
    "height": 0.6,
    "weight": 10.5,
    "imgId": "511"
  },
  {
    "id": 512,
    "species": "Thorn Monkey Pokémon",
    "description": "Ill tempered, it fights by swinging its barbed tail\naround wildly. The leaf growing on its head is\nvery bitter.",
    "name": "simisage",
    "abilities": [
      "overgrow",
      "gluttony"
    ],
    "types": [
      "grass"
    ],
    "height": 1.1,
    "weight": 30.5,
    "imgId": "512"
  },
  {
    "id": 513,
    "species": "High Temp Pokémon",
    "description": "This Pokémon lives in caves in volcanoes.\nThe fire within the tuft on its head can reach\n600 degrees Fahrenheit.",
    "name": "pansear",
    "abilities": [
      "blaze",
      "gluttony"
    ],
    "types": [
      "fire"
    ],
    "height": 0.6,
    "weight": 11,
    "imgId": "513"
  },
  {
    "id": 514,
    "species": "Ember Pokémon",
    "description": "When it gets excited, embers rise from its head\nand tail and it gets hot. For some reason, it\nloves sweets.",
    "name": "simisear",
    "abilities": [
      "blaze",
      "gluttony"
    ],
    "types": [
      "fire"
    ],
    "height": 1,
    "weight": 28,
    "imgId": "514"
  },
  {
    "id": 515,
    "species": "Spray Pokémon",
    "description": "The water stored inside the tuft on its head is full of\nnutrients. Plants that receive its water grow large.",
    "name": "panpour",
    "abilities": [
      "torrent",
      "gluttony"
    ],
    "types": [
      "water"
    ],
    "height": 0.6,
    "weight": 13.5,
    "imgId": "515"
  },
  {
    "id": 516,
    "species": "Geyser Pokémon",
    "description": "It prefers places with clean water. When its tuft runs\nlow, it replenishes it by siphoning up water with\nits tail.",
    "name": "simipour",
    "abilities": [
      "torrent",
      "gluttony"
    ],
    "types": [
      "water"
    ],
    "height": 1,
    "weight": 29,
    "imgId": "516"
  },
  {
    "id": 517,
    "species": "Dream Eater Pokémon",
    "description": "It eats the dreams of people and Pokémon. When it\neats a pleasant dream, it expels pink-colored mist.",
    "name": "munna",
    "abilities": [
      "telepathy",
      "synchronize",
      "forewarn"
    ],
    "types": [
      "psychic"
    ],
    "height": 0.6,
    "weight": 23.3,
    "imgId": "517"
  },
  {
    "id": 518,
    "species": "Drowsing Pokémon",
    "description": "The dream mist coming from its forehead changes\ninto many different colors depending on the dream\nthat was eaten.",
    "name": "musharna",
    "abilities": [
      "telepathy",
      "synchronize",
      "forewarn"
    ],
    "types": [
      "psychic"
    ],
    "height": 1.1,
    "weight": 60.5,
    "imgId": "518"
  },
  {
    "id": 519,
    "species": "Tiny Pigeon Pokémon",
    "description": "These Pokémon live in cities. They are accustomed\nto people. Flocks often gather in parks and plazas.",
    "name": "pidove",
    "abilities": [
      "rivalry",
      "super-luck",
      "big-pecks"
    ],
    "types": [
      "flying",
      "normal"
    ],
    "height": 0.3,
    "weight": 2.1,
    "imgId": "519"
  },
  {
    "id": 520,
    "species": "Wild Pigeon Pokémon",
    "description": "No matter where in the world it goes, it knows\nwhere its nest is, so it never gets separated from\nits Trainer.",
    "name": "tranquill",
    "abilities": [
      "rivalry",
      "super-luck",
      "big-pecks"
    ],
    "types": [
      "flying",
      "normal"
    ],
    "height": 0.6,
    "weight": 15,
    "imgId": "520"
  },
  {
    "id": 521,
    "species": "Proud Pokémon",
    "description": "Males have plumage on their heads. They will never\nlet themselves feel close to anyone other than\ntheir Trainers.",
    "name": "unfezant",
    "abilities": [
      "rivalry",
      "super-luck",
      "big-pecks"
    ],
    "types": [
      "flying",
      "normal"
    ],
    "height": 1.2,
    "weight": 29,
    "imgId": "521"
  },
  {
    "id": 522,
    "species": "Electrified Pokémon",
    "description": "Its mane shines when it discharges electricity.\nThey use the frequency and rhythm of these flashes\nto communicate.",
    "name": "blitzle",
    "abilities": [
      "sap-sipper",
      "motor-drive",
      "lightning-rod"
    ],
    "types": [
      "electric"
    ],
    "height": 0.8,
    "weight": 29.8,
    "imgId": "522"
  },
  {
    "id": 523,
    "species": "Thunderbolt Pokémon",
    "description": "They have lightning-like movements.\nWhen Zebstrika run at full speed, the sound of\nthunder reverberates.",
    "name": "zebstrika",
    "abilities": [
      "sap-sipper",
      "motor-drive",
      "lightning-rod"
    ],
    "types": [
      "electric"
    ],
    "height": 1.6,
    "weight": 79.5,
    "imgId": "523"
  },
  {
    "id": 524,
    "species": "Mantle Pokémon",
    "description": "The hexagonal cavity is its ear. It walks in the\ndirection of sounds it hears, but if the sounds\ncease, it panics and topples over.",
    "name": "roggenrola",
    "abilities": [
      "sand-force",
      "weak-armor",
      "sturdy"
    ],
    "types": [
      "rock"
    ],
    "height": 0.4,
    "weight": 18,
    "imgId": "524"
  },
  {
    "id": 525,
    "species": "Ore Pokémon",
    "description": "It explores caves in search of underground\nwater. It’s not comfortable around water, so\nthis Pokémon takes great care in lapping it up.",
    "name": "boldore",
    "abilities": [
      "sand-force",
      "weak-armor",
      "sturdy"
    ],
    "types": [
      "rock"
    ],
    "height": 0.9,
    "weight": 102,
    "imgId": "525"
  },
  {
    "id": 526,
    "species": "Compressed Pokémon",
    "description": "Known for its hefty horsepower, this Pokémon\nis a popular partner for construction workers.",
    "name": "gigalith",
    "abilities": [
      "sand-force",
      "sand-stream",
      "sturdy"
    ],
    "types": [
      "rock"
    ],
    "height": 1.7,
    "weight": 260,
    "imgId": "526"
  },
  {
    "id": 527,
    "species": "Bat Pokémon",
    "description": "The heart-shaped mark left on a body after a\nWoobat has been attached to it is said to bring\ngood fortune.",
    "name": "woobat",
    "abilities": [
      "simple",
      "klutz",
      "unaware"
    ],
    "types": [
      "flying",
      "psychic"
    ],
    "height": 0.4,
    "weight": 2.1,
    "imgId": "527"
  },
  {
    "id": 528,
    "species": "Courting Pokémon",
    "description": "Anyone who comes into contact with the ultrasonic\nwaves emitted by a courting male experiences a\npositive mood shift.",
    "name": "swoobat",
    "abilities": [
      "simple",
      "klutz",
      "unaware"
    ],
    "types": [
      "flying",
      "psychic"
    ],
    "height": 0.9,
    "weight": 10.5,
    "imgId": "528"
  },
  {
    "id": 529,
    "species": "Mole Pokémon",
    "description": "By spinning its body, it can dig straight through the\nground at a speed of 30 mph.",
    "name": "drilbur",
    "abilities": [
      "mold-breaker",
      "sand-force",
      "sand-rush"
    ],
    "types": [
      "ground"
    ],
    "height": 0.3,
    "weight": 8.5,
    "imgId": "529"
  },
  {
    "id": 530,
    "species": "Subterrene Pokémon",
    "description": "More than 300 feet below the surface, they build\nmazelike nests. Their activity can be destructive to\nsubway tunnels.",
    "name": "excadrill",
    "abilities": [
      "mold-breaker",
      "sand-force",
      "sand-rush"
    ],
    "types": [
      "steel",
      "ground"
    ],
    "height": 0.7,
    "weight": 40.4,
    "imgId": "530"
  },
  {
    "id": 531,
    "species": "Hearing Pokémon",
    "description": "It touches others with the feelers on its ears, using\nthe sound of their heartbeats to tell how they\nare feeling.",
    "name": "audino",
    "abilities": [
      "klutz",
      "regenerator",
      "healer"
    ],
    "types": [
      "normal"
    ],
    "height": 1.1,
    "weight": 31,
    "imgId": "531"
  },
  {
    "id": 532,
    "species": "Muscular Pokémon",
    "description": "Always carrying squared logs, they help out with\nconstruction. As they grow, they carry bigger logs.",
    "name": "timburr",
    "abilities": [
      "iron-fist",
      "sheer-force",
      "guts"
    ],
    "types": [
      "fighting"
    ],
    "height": 0.6,
    "weight": 12.5,
    "imgId": "532"
  },
  {
    "id": 533,
    "species": "Muscular Pokémon",
    "description": "This Pokémon is so muscular and strongly built that\neven a group of wrestlers could not make it budge\nan inch.",
    "name": "gurdurr",
    "abilities": [
      "iron-fist",
      "sheer-force",
      "guts"
    ],
    "types": [
      "fighting"
    ],
    "height": 1.2,
    "weight": 40,
    "imgId": "533"
  },
  {
    "id": 534,
    "species": "Muscular Pokémon",
    "description": "Rather than rely on force, they master moves that\nutilize the centrifugal force of spinning concrete.",
    "name": "conkeldurr",
    "abilities": [
      "iron-fist",
      "sheer-force",
      "guts"
    ],
    "types": [
      "fighting"
    ],
    "height": 1.4,
    "weight": 87,
    "imgId": "534"
  },
  {
    "id": 535,
    "species": "Tadpole Pokémon",
    "description": "By vibrating its cheeks, it emits sound waves\nimperceptible to humans. It uses the rhythm of\nthese sounds to talk.",
    "name": "tympole",
    "abilities": [
      "water-absorb",
      "hydration",
      "swift-swim"
    ],
    "types": [
      "water"
    ],
    "height": 0.5,
    "weight": 4.5,
    "imgId": "535"
  },
  {
    "id": 536,
    "species": "Vibration Pokémon",
    "description": "It lives in the water and on land. It uses its long,\nsticky tongue to immobilize its opponents.",
    "name": "palpitoad",
    "abilities": [
      "water-absorb",
      "hydration",
      "swift-swim"
    ],
    "types": [
      "ground",
      "water"
    ],
    "height": 0.8,
    "weight": 17,
    "imgId": "536"
  },
  {
    "id": 537,
    "species": "Vibration Pokémon",
    "description": "They shoot paralyzing liquid from their head bumps.\nThey use vibration to hurt their opponents.",
    "name": "seismitoad",
    "abilities": [
      "water-absorb",
      "poison-touch",
      "swift-swim"
    ],
    "types": [
      "ground",
      "water"
    ],
    "height": 1.5,
    "weight": 62,
    "imgId": "537"
  },
  {
    "id": 538,
    "species": "Judo Pokémon",
    "description": "When it encounters a foe bigger than itself, it wants\nto throw it. It changes belts as it gets stronger.",
    "name": "throh",
    "abilities": [
      "mold-breaker",
      "inner-focus",
      "guts"
    ],
    "types": [
      "fighting"
    ],
    "height": 1.3,
    "weight": 55.5,
    "imgId": "538"
  },
  {
    "id": 539,
    "species": "Karate Pokémon",
    "description": "Tying their belts gets them pumped and makes their\npunches more destructive. Disturbing their training\nangers them.",
    "name": "sawk",
    "abilities": [
      "mold-breaker",
      "inner-focus",
      "sturdy"
    ],
    "types": [
      "fighting"
    ],
    "height": 1.4,
    "weight": 51,
    "imgId": "539"
  },
  {
    "id": 540,
    "species": "Sewing Pokémon",
    "description": "Since this Pokémon makes its own clothes out of\nleaves, it is a popular mascot for fashion designers.",
    "name": "sewaddle",
    "abilities": [
      "overcoat",
      "chlorophyll",
      "swarm"
    ],
    "types": [
      "grass",
      "bug"
    ],
    "height": 0.3,
    "weight": 2.5,
    "imgId": "540"
  },
  {
    "id": 541,
    "species": "Leaf-Wrapped Pokémon",
    "description": "It protects itself from the cold by wrapping up in\nleaves. It stays on the move, eating leaves\nin forests.",
    "name": "swadloon",
    "abilities": [
      "overcoat",
      "chlorophyll",
      "leaf-guard"
    ],
    "types": [
      "grass",
      "bug"
    ],
    "height": 0.5,
    "weight": 7.3,
    "imgId": "541"
  },
  {
    "id": 542,
    "species": "Nurturing Pokémon",
    "description": "It keeps its eggs warm with heat from fermenting\nleaves. It also uses leaves to make warm wrappings\nfor Sewaddle.",
    "name": "leavanny",
    "abilities": [
      "overcoat",
      "chlorophyll",
      "swarm"
    ],
    "types": [
      "grass",
      "bug"
    ],
    "height": 1.2,
    "weight": 20.5,
    "imgId": "542"
  },
  {
    "id": 543,
    "species": "Centipede Pokémon",
    "description": "Its bite injects a potent poison, enough to paralyze\nlarge bird Pokémon that try to prey on it.",
    "name": "venipede",
    "abilities": [
      "speed-boost",
      "swarm",
      "poison-point"
    ],
    "types": [
      "poison",
      "bug"
    ],
    "height": 0.4,
    "weight": 5.3,
    "imgId": "543"
  },
  {
    "id": 544,
    "species": "Curlipede Pokémon",
    "description": "It is usually motionless, but when attacked,\nit rotates at high speed and then crashes into\nits opponent.",
    "name": "whirlipede",
    "abilities": [
      "speed-boost",
      "swarm",
      "poison-point"
    ],
    "types": [
      "poison",
      "bug"
    ],
    "height": 1.2,
    "weight": 58.5,
    "imgId": "544"
  },
  {
    "id": 545,
    "species": "Megapede Pokémon",
    "description": "With quick movements, it chases down its foes,\nattacking relentlessly with its horns until it prevails.",
    "name": "scolipede",
    "abilities": [
      "speed-boost",
      "swarm",
      "poison-point"
    ],
    "types": [
      "poison",
      "bug"
    ],
    "height": 2.5,
    "weight": 200.5,
    "imgId": "545"
  },
  {
    "id": 546,
    "species": "Cotton Puff Pokémon",
    "description": "Pillows and beds stuffed with cotton exhaled\nby Cottonee are soft and puffy, light and airy—\naltogether top quality.",
    "name": "cottonee",
    "abilities": [
      "chlorophyll",
      "infiltrator",
      "prankster"
    ],
    "types": [
      "fairy",
      "grass"
    ],
    "height": 0.3,
    "weight": 0.6,
    "imgId": "546"
  },
  {
    "id": 547,
    "species": "Windveiled Pokémon",
    "description": "This Pokémon appears, riding upon the wind.\nBut if the wind gusts up, it’ll blow the cotton on\nthis Pokémon’s head clean off.",
    "name": "whimsicott",
    "abilities": [
      "chlorophyll",
      "infiltrator",
      "prankster"
    ],
    "types": [
      "fairy",
      "grass"
    ],
    "height": 0.7,
    "weight": 6.6,
    "imgId": "547"
  },
  {
    "id": 548,
    "species": "Bulb Pokémon",
    "description": "By pruning the leaves on its head with\nregularity, this Pokémon can be grown into a\nfine plump shape.",
    "name": "petilil",
    "abilities": [
      "leaf-guard",
      "own-tempo",
      "chlorophyll"
    ],
    "types": [
      "grass"
    ],
    "height": 0.5,
    "weight": 6.6,
    "imgId": "548"
  },
  {
    "id": 549,
    "species": "Flowering Pokémon",
    "description": "As soon as it finds a male to be its partner,\nthe beautiful flower on its head darkens,\ndroops, and withers away.",
    "name": "lilligant",
    "abilities": [
      "leaf-guard",
      "own-tempo",
      "chlorophyll"
    ],
    "types": [
      "grass"
    ],
    "height": 1.1,
    "weight": 16.3,
    "imgId": "549"
  },
  {
    "id": 550,
    "species": "Hostile Pokémon",
    "description": "Red and blue Basculin usually do not get along,\nbut sometimes members of one school mingle with\nthe other’s school.",
    "name": "basculin-red-striped",
    "abilities": [
      "mold-breaker",
      "adaptability",
      "reckless"
    ],
    "types": [
      "water"
    ],
    "height": 1,
    "weight": 18,
    "imgId": "550"
  },
  {
    "id": 551,
    "species": "Desert Croc Pokémon",
    "description": "It conceals itself in the sand and chomps down\non the legs of any prey that unwarily walk over\nit. Its favorite food is Trapinch.",
    "name": "sandile",
    "abilities": [
      "anger-point",
      "moxie",
      "intimidate"
    ],
    "types": [
      "dark",
      "ground"
    ],
    "height": 0.7,
    "weight": 15.2,
    "imgId": "551"
  },
  {
    "id": 552,
    "species": "Desert Croc Pokémon",
    "description": "Thanks to the special membrane covering its\neyes, it can see its surroundings clearly, even in\nthe middle of the night.",
    "name": "krokorok",
    "abilities": [
      "anger-point",
      "moxie",
      "intimidate"
    ],
    "types": [
      "dark",
      "ground"
    ],
    "height": 1,
    "weight": 33.4,
    "imgId": "552"
  },
  {
    "id": 553,
    "species": "Intimidation Pokémon",
    "description": "After clamping down with its powerful jaws,\nit twists its body around to rip its prey in half.",
    "name": "krookodile",
    "abilities": [
      "anger-point",
      "moxie",
      "intimidate"
    ],
    "types": [
      "dark",
      "ground"
    ],
    "height": 1.5,
    "weight": 96.3,
    "imgId": "553"
  },
  {
    "id": 554,
    "species": "Zen Charm Pokémon",
    "description": "When it sleeps, it pulls its limbs into its\nbody and its internal fire goes down to\n1,100 degrees Fahrenheit.",
    "name": "darumaka",
    "abilities": [
      "inner-focus",
      "hustle"
    ],
    "types": [
      "fire"
    ],
    "height": 0.6,
    "weight": 37.5,
    "imgId": "554"
  },
  {
    "id": 555,
    "species": "Blazing Pokémon",
    "description": "Its internal fire burns at 2,500 degrees Fahrenheit,\nmaking enough power that it can destroy a dump\ntruck with one punch.",
    "name": "darmanitan-standard",
    "abilities": [
      "zen-mode",
      "sheer-force"
    ],
    "types": [
      "fire"
    ],
    "height": 1.3,
    "weight": 92.9,
    "imgId": "555"
  },
  {
    "id": 556,
    "species": "Cactus Pokémon",
    "description": "Arid regions are their habitat. They move\nrhythmically, making a sound similar to maracas.",
    "name": "maractus",
    "abilities": [
      "storm-drain",
      "chlorophyll",
      "water-absorb"
    ],
    "types": [
      "grass"
    ],
    "height": 1,
    "weight": 28,
    "imgId": "556"
  },
  {
    "id": 557,
    "species": "Rock Inn Pokémon",
    "description": "When it finds a stone of a suitable size, it secretes\na liquid from its mouth to open up a hole to\ncrawl into.",
    "name": "dwebble",
    "abilities": [
      "weak-armor",
      "shell-armor",
      "sturdy"
    ],
    "types": [
      "rock",
      "bug"
    ],
    "height": 0.3,
    "weight": 14.5,
    "imgId": "557"
  },
  {
    "id": 558,
    "species": "Stone Home Pokémon",
    "description": "Competing for territory, Crustle fight viciously.\nThe one whose boulder is broken is the loser of\nthe battle.",
    "name": "crustle",
    "abilities": [
      "weak-armor",
      "shell-armor",
      "sturdy"
    ],
    "types": [
      "rock",
      "bug"
    ],
    "height": 1.4,
    "weight": 200,
    "imgId": "558"
  },
  {
    "id": 559,
    "species": "Shedding Pokémon",
    "description": "Proud of its sturdy skull, it suddenly headbutts\neverything, but its weight makes it unstable, too.",
    "name": "scraggy",
    "abilities": [
      "intimidate",
      "moxie",
      "shed-skin"
    ],
    "types": [
      "fighting",
      "dark"
    ],
    "height": 0.6,
    "weight": 11.8,
    "imgId": "559"
  },
  {
    "id": 560,
    "species": "Hoodlum Pokémon",
    "description": "It can smash concrete blocks with its kicking\nattacks. The one with the biggest crest is the\ngroup leader.",
    "name": "scrafty",
    "abilities": [
      "intimidate",
      "moxie",
      "shed-skin"
    ],
    "types": [
      "fighting",
      "dark"
    ],
    "height": 1.1,
    "weight": 30,
    "imgId": "560"
  },
  {
    "id": 561,
    "species": "Avianoid Pokémon",
    "description": "The guardians of an ancient city, they always fly\nthe same route while keeping watch for invaders.",
    "name": "sigilyph",
    "abilities": [
      "tinted-lens",
      "magic-guard",
      "wonder-skin"
    ],
    "types": [
      "flying",
      "psychic"
    ],
    "height": 1.4,
    "weight": 14,
    "imgId": "561"
  },
  {
    "id": 562,
    "species": "Spirit Pokémon",
    "description": "Each of them carries a mask that used to be its face\nwhen it was human. Sometimes they look at it\nand cry.",
    "name": "yamask",
    "abilities": [
      "mummy"
    ],
    "types": [
      "ghost"
    ],
    "height": 0.5,
    "weight": 1.5,
    "imgId": "562"
  },
  {
    "id": 563,
    "species": "Coffin Pokémon",
    "description": "Grave robbers who mistake them for real coffins and\nget too close end up trapped inside their bodies.",
    "name": "cofagrigus",
    "abilities": [
      "mummy"
    ],
    "types": [
      "ghost"
    ],
    "height": 1.7,
    "weight": 76.5,
    "imgId": "563"
  },
  {
    "id": 564,
    "species": "Prototurtle Pokémon",
    "description": "Reputed to be the ancestor of most turtle\nPokémon, it lived in warm seas approximately\na hundred million years ago.",
    "name": "tirtouga",
    "abilities": [
      "swift-swim",
      "sturdy",
      "solid-rock"
    ],
    "types": [
      "rock",
      "water"
    ],
    "height": 0.7,
    "weight": 16.5,
    "imgId": "564"
  },
  {
    "id": 565,
    "species": "Prototurtle Pokémon",
    "description": "Active both on land and in the sea, this\nPokémon drags its land-based prey into the\nwater to finish it off.",
    "name": "carracosta",
    "abilities": [
      "swift-swim",
      "sturdy",
      "solid-rock"
    ],
    "types": [
      "rock",
      "water"
    ],
    "height": 1.2,
    "weight": 81,
    "imgId": "565"
  },
  {
    "id": 566,
    "species": "First Bird Pokémon",
    "description": "To all appearances flightless, it was able to\nglide down from tall treetops to snag its prey.",
    "name": "archen",
    "abilities": [
      "defeatist"
    ],
    "types": [
      "flying",
      "rock"
    ],
    "height": 0.5,
    "weight": 9.5,
    "imgId": "566"
  },
  {
    "id": 567,
    "species": "First Bird Pokémon",
    "description": "They hunted in flocks. When one Archeops had\nthe prey cornered, another would swoop on it.",
    "name": "archeops",
    "abilities": [
      "defeatist"
    ],
    "types": [
      "flying",
      "rock"
    ],
    "height": 1.4,
    "weight": 32,
    "imgId": "567"
  },
  {
    "id": 568,
    "species": "Trash Bag Pokémon",
    "description": "It gorges on trash until its stomach is full. Then\nit belches toxic gas. An unlucky whiff of gas will\nput a person in the hospital.",
    "name": "trubbish",
    "abilities": [
      "aftermath",
      "sticky-hold",
      "stench"
    ],
    "types": [
      "poison"
    ],
    "height": 0.6,
    "weight": 31,
    "imgId": "568"
  },
  {
    "id": 569,
    "species": "Trash Heap Pokémon",
    "description": "For a time, their numbers increased explosively\nin Alola. Since the arrival of Grimer, their\npopulation has decreased dramatically.",
    "name": "garbodor",
    "abilities": [
      "aftermath",
      "weak-armor",
      "stench"
    ],
    "types": [
      "poison"
    ],
    "height": 1.9,
    "weight": 107.3,
    "imgId": "569"
  },
  {
    "id": 570,
    "species": "Tricky Fox Pokémon",
    "description": "To protect themselves from danger, they hide their\ntrue identities by transforming into people\nand Pokémon.",
    "name": "zorua",
    "abilities": [
      "illusion"
    ],
    "types": [
      "dark"
    ],
    "height": 0.7,
    "weight": 12.5,
    "imgId": "570"
  },
  {
    "id": 571,
    "species": "Illusion Fox Pokémon",
    "description": "Bonds between these Pokémon are very strong.\nIt protects the safety of its pack by tricking\nits opponents.",
    "name": "zoroark",
    "abilities": [
      "illusion"
    ],
    "types": [
      "dark"
    ],
    "height": 1.6,
    "weight": 81.1,
    "imgId": "571"
  },
  {
    "id": 572,
    "species": "Chinchilla Pokémon",
    "description": "These Pokémon prefer a tidy habitat. They are\nalways sweeping and dusting, using their tails\nas brooms.",
    "name": "minccino",
    "abilities": [
      "skill-link",
      "technician",
      "cute-charm"
    ],
    "types": [
      "normal"
    ],
    "height": 0.4,
    "weight": 5.8,
    "imgId": "572"
  },
  {
    "id": 573,
    "species": "Scarf Pokémon",
    "description": "Cinccino’s body is coated in a special oil that helps\nit deflect attacks, such as punches.",
    "name": "cinccino",
    "abilities": [
      "skill-link",
      "technician",
      "cute-charm"
    ],
    "types": [
      "normal"
    ],
    "height": 0.5,
    "weight": 7.5,
    "imgId": "573"
  },
  {
    "id": 574,
    "species": "Fixation Pokémon",
    "description": "They intently observe both Trainers and Pokémon.\nApparently, they are looking at something that only\nGothita can see.",
    "name": "gothita",
    "abilities": [
      "shadow-tag",
      "competitive",
      "frisk"
    ],
    "types": [
      "psychic"
    ],
    "height": 0.4,
    "weight": 5.8,
    "imgId": "574"
  },
  {
    "id": 575,
    "species": "Manipulate Pokémon",
    "description": "According to many old tales, it creates friends for\nitself by controlling sleeping children on\nstarry nights.",
    "name": "gothorita",
    "abilities": [
      "shadow-tag",
      "competitive",
      "frisk"
    ],
    "types": [
      "psychic"
    ],
    "height": 0.7,
    "weight": 18,
    "imgId": "575"
  },
  {
    "id": 576,
    "species": "Astral Body Pokémon",
    "description": "They can predict the future from the placement and\nmovement of the stars. They can see Trainers’\nlife spans.",
    "name": "gothitelle",
    "abilities": [
      "shadow-tag",
      "competitive",
      "frisk"
    ],
    "types": [
      "psychic"
    ],
    "height": 1.5,
    "weight": 44,
    "imgId": "576"
  },
  {
    "id": 577,
    "species": "Cell Pokémon",
    "description": "They drive away attackers by unleashing psychic\npower. They can use telepathy to talk with others.",
    "name": "solosis",
    "abilities": [
      "regenerator",
      "magic-guard",
      "overcoat"
    ],
    "types": [
      "psychic"
    ],
    "height": 0.3,
    "weight": 1,
    "imgId": "577"
  },
  {
    "id": 578,
    "species": "Mitosis Pokémon",
    "description": "When their two divided brains think the same\nthoughts, their psychic power is maximized.",
    "name": "duosion",
    "abilities": [
      "regenerator",
      "magic-guard",
      "overcoat"
    ],
    "types": [
      "psychic"
    ],
    "height": 0.6,
    "weight": 8,
    "imgId": "578"
  },
  {
    "id": 579,
    "species": "Multiplying Pokémon",
    "description": "When Reuniclus shake hands, a network forms\nbetween their brains, increasing their\npsychic power.",
    "name": "reuniclus",
    "abilities": [
      "regenerator",
      "magic-guard",
      "overcoat"
    ],
    "types": [
      "psychic"
    ],
    "height": 1,
    "weight": 20.1,
    "imgId": "579"
  },
  {
    "id": 580,
    "species": "Water Bird Pokémon",
    "description": "They are better at swimming than flying, and they\nhappily eat their favorite food, peat moss, as they\ndive underwater.",
    "name": "ducklett",
    "abilities": [
      "hydration",
      "big-pecks",
      "keen-eye"
    ],
    "types": [
      "flying",
      "water"
    ],
    "height": 0.5,
    "weight": 5.5,
    "imgId": "580"
  },
  {
    "id": 581,
    "species": "White Bird Pokémon",
    "description": "Swanna start to dance at dusk. The one dancing in\nthe middle is the leader of the flock.",
    "name": "swanna",
    "abilities": [
      "hydration",
      "big-pecks",
      "keen-eye"
    ],
    "types": [
      "flying",
      "water"
    ],
    "height": 1.3,
    "weight": 24.2,
    "imgId": "581"
  },
  {
    "id": 582,
    "species": "Fresh Snow Pokémon",
    "description": "It feels pleasantly cool when embraced. This\nPokémon is treasured by households in\nwarm regions.",
    "name": "vanillite",
    "abilities": [
      "weak-armor",
      "snow-cloak",
      "ice-body"
    ],
    "types": [
      "ice"
    ],
    "height": 0.4,
    "weight": 5.7,
    "imgId": "582"
  },
  {
    "id": 583,
    "species": "Icy Snow Pokémon",
    "description": "This Pokémon has existed since the Ice Age. It\ncontrols particles of ice, freezes its opponents,\nand then shatters them with a headbutt.",
    "name": "vanillish",
    "abilities": [
      "weak-armor",
      "snow-cloak",
      "ice-body"
    ],
    "types": [
      "ice"
    ],
    "height": 1.1,
    "weight": 41,
    "imgId": "583"
  },
  {
    "id": 584,
    "species": "Snowstorm Pokémon",
    "description": "Even if it loses one of its heads, it can live\nrelatively problem-free. It makes snow clouds\ninside its body.",
    "name": "vanilluxe",
    "abilities": [
      "weak-armor",
      "snow-warning",
      "ice-body"
    ],
    "types": [
      "ice"
    ],
    "height": 1.3,
    "weight": 57.5,
    "imgId": "584"
  },
  {
    "id": 585,
    "species": "Season Pokémon",
    "description": "The turning of the seasons changes the color and\nscent of this Pokémon’s fur. People use it to mark\nthe seasons.",
    "name": "deerling",
    "abilities": [
      "serene-grace",
      "sap-sipper",
      "chlorophyll"
    ],
    "types": [
      "grass",
      "normal"
    ],
    "height": 0.6,
    "weight": 19.5,
    "imgId": "585"
  },
  {
    "id": 586,
    "species": "Season Pokémon",
    "description": "They migrate according to the seasons, so some\npeople call Sawsbuck the harbingers of spring.",
    "name": "sawsbuck",
    "abilities": [
      "serene-grace",
      "sap-sipper",
      "chlorophyll"
    ],
    "types": [
      "grass",
      "normal"
    ],
    "height": 1.9,
    "weight": 92.5,
    "imgId": "586"
  },
  {
    "id": 587,
    "species": "Sky Squirrel Pokémon",
    "description": "It grills berries and bug Pokémon with electric\nshocks and makes a meal of them. It usually\nnests in the holes gouged in trees by Pikipek.",
    "name": "emolga",
    "abilities": [
      "motor-drive",
      "static"
    ],
    "types": [
      "flying",
      "electric"
    ],
    "height": 0.4,
    "weight": 5,
    "imgId": "587"
  },
  {
    "id": 588,
    "species": "Clamping Pokémon",
    "description": "For some reason they evolve when they receive\nelectrical energy while they are attacking Shelmet.",
    "name": "karrablast",
    "abilities": [
      "no-guard",
      "shed-skin",
      "swarm"
    ],
    "types": [
      "bug"
    ],
    "height": 0.5,
    "weight": 5.9,
    "imgId": "588"
  },
  {
    "id": 589,
    "species": "Cavalry Pokémon",
    "description": "These Pokémon evolve by wearing the shell\ncovering of a Shelmet. The steel armor protects\ntheir whole body.",
    "name": "escavalier",
    "abilities": [
      "overcoat",
      "shell-armor",
      "swarm"
    ],
    "types": [
      "steel",
      "bug"
    ],
    "height": 1,
    "weight": 33,
    "imgId": "589"
  },
  {
    "id": 590,
    "species": "Mushroom Pokémon",
    "description": "It lures Pokémon with its pattern that looks just like\na Poké Ball, then releases poison spores.",
    "name": "foongus",
    "abilities": [
      "regenerator",
      "effect-spore"
    ],
    "types": [
      "poison",
      "grass"
    ],
    "height": 0.2,
    "weight": 1,
    "imgId": "590"
  },
  {
    "id": 591,
    "species": "Mushroom Pokémon",
    "description": "It lures prey close by dancing and waving its\narm caps, which resemble Poké Balls, in a\nswaying motion.",
    "name": "amoonguss",
    "abilities": [
      "regenerator",
      "effect-spore"
    ],
    "types": [
      "poison",
      "grass"
    ],
    "height": 0.6,
    "weight": 10.5,
    "imgId": "591"
  },
  {
    "id": 592,
    "species": "Floating Pokémon",
    "description": "If its veil-like arms stun and wrap a foe, that foe will\nbe dragged miles below the surface, never\nto return.",
    "name": "frillish",
    "abilities": [
      "damp",
      "cursed-body",
      "water-absorb"
    ],
    "types": [
      "ghost",
      "water"
    ],
    "height": 1.2,
    "weight": 33,
    "imgId": "592"
  },
  {
    "id": 593,
    "species": "Floating Pokémon",
    "description": "The fate of the ships and crew that wander into\nJellicent’s habitat: all sunken, all lost, all vanished.",
    "name": "jellicent",
    "abilities": [
      "damp",
      "cursed-body",
      "water-absorb"
    ],
    "types": [
      "ghost",
      "water"
    ],
    "height": 2.2,
    "weight": 135,
    "imgId": "593"
  },
  {
    "id": 594,
    "species": "Caring Pokémon",
    "description": "They float upon the open sea. Many water\nPokémon gather in the area around Alomomola.",
    "name": "alomomola",
    "abilities": [
      "regenerator",
      "hydration",
      "healer"
    ],
    "types": [
      "water"
    ],
    "height": 1.2,
    "weight": 31.6,
    "imgId": "594"
  },
  {
    "id": 595,
    "species": "Attaching Pokémon",
    "description": "They attach themselves to large-bodied Pokémon\nand absorb static electricity, which they store in an\nelectric pouch.",
    "name": "joltik",
    "abilities": [
      "swarm",
      "unnerve",
      "compound-eyes"
    ],
    "types": [
      "electric",
      "bug"
    ],
    "height": 0.1,
    "weight": 0.6,
    "imgId": "595"
  },
  {
    "id": 596,
    "species": "EleSpider Pokémon",
    "description": "When attacked, they create an electric barrier by\nspitting out many electrically charged threads.",
    "name": "galvantula",
    "abilities": [
      "swarm",
      "unnerve",
      "compound-eyes"
    ],
    "types": [
      "electric",
      "bug"
    ],
    "height": 0.8,
    "weight": 14.3,
    "imgId": "596"
  },
  {
    "id": 597,
    "species": "Thorn Seed Pokémon",
    "description": "It absorbs the iron it finds in the rock while clinging\nto the ceiling. It shoots spikes when in danger.",
    "name": "ferroseed",
    "abilities": [
      "iron-barbs"
    ],
    "types": [
      "steel",
      "grass"
    ],
    "height": 0.6,
    "weight": 18.8,
    "imgId": "597"
  },
  {
    "id": 598,
    "species": "Thorn Pod Pokémon",
    "description": "They attach themselves to cave ceilings, firing steel\nspikes at targets passing beneath them.",
    "name": "ferrothorn",
    "abilities": [
      "anticipation",
      "iron-barbs"
    ],
    "types": [
      "steel",
      "grass"
    ],
    "height": 1,
    "weight": 110,
    "imgId": "598"
  },
  {
    "id": 599,
    "species": "Gear Pokémon",
    "description": "The two minigears that mesh together are\npredetermined. Each will rebound from other\nminigears without meshing.",
    "name": "klink",
    "abilities": [
      "clear-body",
      "minus",
      "plus"
    ],
    "types": [
      "steel"
    ],
    "height": 0.3,
    "weight": 21,
    "imgId": "599"
  },
  {
    "id": 600,
    "species": "Gear Pokémon",
    "description": "A minigear and big gear comprise its body. If the\nminigear it launches at a foe doesn’t return, it\nwill die.",
    "name": "klang",
    "abilities": [
      "clear-body",
      "minus",
      "plus"
    ],
    "types": [
      "steel"
    ],
    "height": 0.6,
    "weight": 51,
    "imgId": "600"
  },
  {
    "id": 601,
    "species": "Gear Pokémon",
    "description": "Its red core functions as an energy tank. It fires the\ncharged energy through its spikes into an area.",
    "name": "klinklang",
    "abilities": [
      "clear-body",
      "minus",
      "plus"
    ],
    "types": [
      "steel"
    ],
    "height": 0.6,
    "weight": 81,
    "imgId": "601"
  },
  {
    "id": 602,
    "species": "EleFish Pokémon",
    "description": "One alone can emit only a trickle of electricity,\nso a group of them gathers to unleash a powerful\nelectric shock.",
    "name": "tynamo",
    "abilities": [
      "levitate"
    ],
    "types": [
      "electric"
    ],
    "height": 0.2,
    "weight": 0.3,
    "imgId": "602"
  },
  {
    "id": 603,
    "species": "EleFish Pokémon",
    "description": "These Pokémon have a big appetite. When they\nspot their prey, they attack it and paralyze it\nwith electricity.",
    "name": "eelektrik",
    "abilities": [
      "levitate"
    ],
    "types": [
      "electric"
    ],
    "height": 1.2,
    "weight": 22,
    "imgId": "603"
  },
  {
    "id": 604,
    "species": "EleFish Pokémon",
    "description": "They crawl out of the ocean using their arms.\nThey will attack prey on shore and immediately drag\nit into the ocean.",
    "name": "eelektross",
    "abilities": [
      "levitate"
    ],
    "types": [
      "electric"
    ],
    "height": 2.1,
    "weight": 80.5,
    "imgId": "604"
  },
  {
    "id": 605,
    "species": "Cerebral Pokémon",
    "description": "Rumors of its origin are linked to a UFO crash site\nin the desert 50 years ago.",
    "name": "elgyem",
    "abilities": [
      "analytic",
      "synchronize",
      "telepathy"
    ],
    "types": [
      "psychic"
    ],
    "height": 0.5,
    "weight": 9,
    "imgId": "605"
  },
  {
    "id": 606,
    "species": "Cerebral Pokémon",
    "description": "It uses psychic power to control an opponent’s\nbrain and tamper with its memories.",
    "name": "beheeyem",
    "abilities": [
      "analytic",
      "synchronize",
      "telepathy"
    ],
    "types": [
      "psychic"
    ],
    "height": 1,
    "weight": 34.5,
    "imgId": "606"
  },
  {
    "id": 607,
    "species": "Candle Pokémon",
    "description": "Litwick shines a light that absorbs the life energy of\npeople and Pokémon, which becomes the fuel that\nit burns.",
    "name": "litwick",
    "abilities": [
      "infiltrator",
      "flame-body",
      "flash-fire"
    ],
    "types": [
      "fire",
      "ghost"
    ],
    "height": 0.3,
    "weight": 3.1,
    "imgId": "607"
  },
  {
    "id": 608,
    "species": "Lamp Pokémon",
    "description": "It arrives near the moment of death and steals spirit\nfrom the body.",
    "name": "lampent",
    "abilities": [
      "infiltrator",
      "flame-body",
      "flash-fire"
    ],
    "types": [
      "fire",
      "ghost"
    ],
    "height": 0.6,
    "weight": 13,
    "imgId": "608"
  },
  {
    "id": 609,
    "species": "Luring Pokémon",
    "description": "The spirits burned up in its ominous flame lose their\nway and wander this world forever.",
    "name": "chandelure",
    "abilities": [
      "infiltrator",
      "flame-body",
      "flash-fire"
    ],
    "types": [
      "fire",
      "ghost"
    ],
    "height": 1,
    "weight": 34.3,
    "imgId": "609"
  },
  {
    "id": 610,
    "species": "Tusk Pokémon",
    "description": "They mark their territory by leaving gashes in trees\nwith their tusks. If a tusk breaks, a new one grows\nin quickly.",
    "name": "axew",
    "abilities": [
      "unnerve",
      "mold-breaker",
      "rivalry"
    ],
    "types": [
      "dragon"
    ],
    "height": 0.6,
    "weight": 18,
    "imgId": "610"
  },
  {
    "id": 611,
    "species": "Axe Jaw Pokémon",
    "description": "A broken tusk will not grow back, so it diligently\nsharpens its tusks on river rocks after the end of\na battle.",
    "name": "fraxure",
    "abilities": [
      "unnerve",
      "mold-breaker",
      "rivalry"
    ],
    "types": [
      "dragon"
    ],
    "height": 1,
    "weight": 36,
    "imgId": "611"
  },
  {
    "id": 612,
    "species": "Axe Jaw Pokémon",
    "description": "Their sturdy tusks will stay sharp even if used to cut\nsteel beams. These Pokémon are covered in\nhard armor.",
    "name": "haxorus",
    "abilities": [
      "unnerve",
      "mold-breaker",
      "rivalry"
    ],
    "types": [
      "dragon"
    ],
    "height": 1.8,
    "weight": 105.5,
    "imgId": "612"
  },
  {
    "id": 613,
    "species": "Chill Pokémon",
    "description": "Their snot is a barometer of health. When healthy,\ntheir snot is sticky and the power of their ice\nmoves increases.",
    "name": "cubchoo",
    "abilities": [
      "rattled",
      "slush-rush",
      "snow-cloak"
    ],
    "types": [
      "ice"
    ],
    "height": 0.5,
    "weight": 8.5,
    "imgId": "613"
  },
  {
    "id": 614,
    "species": "Freezing Pokémon",
    "description": "It freezes its breath to create fangs and claws of ice\nto fight with. Cold northern areas are its habitat.",
    "name": "beartic",
    "abilities": [
      "swift-swim",
      "slush-rush",
      "snow-cloak"
    ],
    "types": [
      "ice"
    ],
    "height": 2.6,
    "weight": 260,
    "imgId": "614"
  },
  {
    "id": 615,
    "species": "Crystallizing Pokémon",
    "description": "They are composed of ice crystals. They capture\nprey with chains of ice, freezing the prey at\n-148 degrees Fahrenheit.",
    "name": "cryogonal",
    "abilities": [
      "levitate"
    ],
    "types": [
      "ice"
    ],
    "height": 1.1,
    "weight": 148,
    "imgId": "615"
  },
  {
    "id": 616,
    "species": "Snail Pokémon",
    "description": "It evolves when bathed in an electric-like energy\nalong with Karrablast. The reason is still unknown.",
    "name": "shelmet",
    "abilities": [
      "overcoat",
      "shell-armor",
      "hydration"
    ],
    "types": [
      "bug"
    ],
    "height": 0.4,
    "weight": 7.7,
    "imgId": "616"
  },
  {
    "id": 617,
    "species": "Shell Out Pokémon",
    "description": "When its body dries out, it weakens. So, to prevent\ndehydration, it wraps itself in many layers of\nthin membrane.",
    "name": "accelgor",
    "abilities": [
      "unburden",
      "sticky-hold",
      "hydration"
    ],
    "types": [
      "bug"
    ],
    "height": 0.8,
    "weight": 25.3,
    "imgId": "617"
  },
  {
    "id": 618,
    "species": "Trap Pokémon",
    "description": "It conceals itself in the mud of the seashore.\nThen it waits. When prey touch it, it delivers a jolt\nof electricity.",
    "name": "stunfisk",
    "abilities": [
      "sand-veil",
      "limber",
      "static"
    ],
    "types": [
      "electric",
      "ground"
    ],
    "height": 0.7,
    "weight": 11,
    "imgId": "618"
  },
  {
    "id": 619,
    "species": "Martial Arts Pokémon",
    "description": "In fights, they dominate with onslaughts of flowing,\ncontinuous attacks. With their sharp claws, they\ncut enemies.",
    "name": "mienfoo",
    "abilities": [
      "reckless",
      "regenerator",
      "inner-focus"
    ],
    "types": [
      "fighting"
    ],
    "height": 0.9,
    "weight": 20,
    "imgId": "619"
  },
  {
    "id": 620,
    "species": "Martial Arts Pokémon",
    "description": "Using the long fur on its arms like whips, it\nlaunches into combo attacks that, once started,\nno one can stop.",
    "name": "mienshao",
    "abilities": [
      "reckless",
      "regenerator",
      "inner-focus"
    ],
    "types": [
      "fighting"
    ],
    "height": 1.4,
    "weight": 35.5,
    "imgId": "620"
  },
  {
    "id": 621,
    "species": "Cave Pokémon",
    "description": "It warms its body by absorbing sunlight with its\nwings. When its body temperature falls, it can no\nlonger move.",
    "name": "druddigon",
    "abilities": [
      "mold-breaker",
      "sheer-force",
      "rough-skin"
    ],
    "types": [
      "dragon"
    ],
    "height": 1.6,
    "weight": 139,
    "imgId": "621"
  },
  {
    "id": 622,
    "species": "Automaton Pokémon",
    "description": "Ancient science fashioned this Pokémon from clay.\nIt’s been active for thousands of years.",
    "name": "golett",
    "abilities": [
      "no-guard",
      "klutz",
      "iron-fist"
    ],
    "types": [
      "ghost",
      "ground"
    ],
    "height": 1,
    "weight": 92,
    "imgId": "622"
  },
  {
    "id": 623,
    "species": "Automaton Pokémon",
    "description": "It flies across the sky at Mach speeds. Removing\nthe seal on its chest makes its internal energy go\nout of control.",
    "name": "golurk",
    "abilities": [
      "no-guard",
      "klutz",
      "iron-fist"
    ],
    "types": [
      "ghost",
      "ground"
    ],
    "height": 2.8,
    "weight": 330,
    "imgId": "623"
  },
  {
    "id": 624,
    "species": "Sharp Blade Pokémon",
    "description": "Ignoring their injuries, groups attack by sinking\nthe blades that cover their bodies into their prey.",
    "name": "pawniard",
    "abilities": [
      "pressure",
      "inner-focus",
      "defiant"
    ],
    "types": [
      "steel",
      "dark"
    ],
    "height": 0.5,
    "weight": 10.2,
    "imgId": "624"
  },
  {
    "id": 625,
    "species": "Sword Blade Pokémon",
    "description": "Bisharp pursues prey in the company of a large\ngroup of Pawniard. Then Bisharp finishes off\nthe prey.",
    "name": "bisharp",
    "abilities": [
      "pressure",
      "inner-focus",
      "defiant"
    ],
    "types": [
      "steel",
      "dark"
    ],
    "height": 1.6,
    "weight": 70,
    "imgId": "625"
  },
  {
    "id": 626,
    "species": "Bash Buffalo Pokémon",
    "description": "Their fluffy fur absorbs damage, even if they strike\nfoes with a fierce headbutt.",
    "name": "bouffalant",
    "abilities": [
      "soundproof",
      "sap-sipper",
      "reckless"
    ],
    "types": [
      "normal"
    ],
    "height": 1.6,
    "weight": 94.6,
    "imgId": "626"
  },
  {
    "id": 627,
    "species": "Eaglet Pokémon",
    "description": "With its sharp claws, this Pokémon pierces its\nprey, and then it pecks at them. Although it also\nconsumes berries, it’s a carnivore at heart.",
    "name": "rufflet",
    "abilities": [
      "hustle",
      "sheer-force",
      "keen-eye"
    ],
    "types": [
      "flying",
      "normal"
    ],
    "height": 0.5,
    "weight": 10.5,
    "imgId": "627"
  },
  {
    "id": 628,
    "species": "Valiant Pokémon",
    "description": "It’s thought that people disturbed their habitats\nin the past, so Braviary banded together to\nfight back.",
    "name": "braviary",
    "abilities": [
      "defiant",
      "sheer-force",
      "keen-eye"
    ],
    "types": [
      "flying",
      "normal"
    ],
    "height": 1.5,
    "weight": 41,
    "imgId": "628"
  },
  {
    "id": 629,
    "species": "Diapered Pokémon",
    "description": "It can’t fly yet and must wait until its wings have\ndeveloped more. Since it’s still at a playful age,\nit hops around friskily.",
    "name": "vullaby",
    "abilities": [
      "weak-armor",
      "overcoat",
      "big-pecks"
    ],
    "types": [
      "flying",
      "dark"
    ],
    "height": 0.5,
    "weight": 9,
    "imgId": "629"
  },
  {
    "id": 630,
    "species": "Bone Vulture Pokémon",
    "description": "It circles in the sky, keeping a keen eye out for\nPokémon in a weakened state. Its choicest food\nis Cubone.",
    "name": "mandibuzz",
    "abilities": [
      "weak-armor",
      "overcoat",
      "big-pecks"
    ],
    "types": [
      "flying",
      "dark"
    ],
    "height": 1.2,
    "weight": 39.5,
    "imgId": "630"
  },
  {
    "id": 631,
    "species": "Anteater Pokémon",
    "description": "It draws in air through its tail, transforms it into fire,\nand uses it like a tongue. It melts Durant and\neats them.",
    "name": "heatmor",
    "abilities": [
      "white-smoke",
      "flash-fire",
      "gluttony"
    ],
    "types": [
      "fire"
    ],
    "height": 1.4,
    "weight": 58,
    "imgId": "631"
  },
  {
    "id": 632,
    "species": "Iron Ant Pokémon",
    "description": "They attack in groups, covering themselves in steel\narmor to protect themselves from Heatmor.",
    "name": "durant",
    "abilities": [
      "truant",
      "hustle",
      "swarm"
    ],
    "types": [
      "steel",
      "bug"
    ],
    "height": 0.3,
    "weight": 33,
    "imgId": "632"
  },
  {
    "id": 633,
    "species": "Irate Pokémon",
    "description": "Lacking sight, it’s unaware of its surroundings,\nso it bumps into things and eats anything\nthat moves.",
    "name": "deino",
    "abilities": [
      "hustle"
    ],
    "types": [
      "dragon",
      "dark"
    ],
    "height": 0.8,
    "weight": 17.3,
    "imgId": "633"
  },
  {
    "id": 634,
    "species": "Hostile Pokémon",
    "description": "After it has eaten up all the food in its territory,\nit moves to another area. Its two heads do not\nget along.",
    "name": "zweilous",
    "abilities": [
      "hustle"
    ],
    "types": [
      "dragon",
      "dark"
    ],
    "height": 1.4,
    "weight": 50,
    "imgId": "634"
  },
  {
    "id": 635,
    "species": "Brutal Pokémon",
    "description": "It responds to movement by attacking. This scary,\nthree-headed Pokémon devours everything in\nits path!",
    "name": "hydreigon",
    "abilities": [
      "levitate"
    ],
    "types": [
      "dragon",
      "dark"
    ],
    "height": 1.8,
    "weight": 160,
    "imgId": "635"
  },
  {
    "id": 636,
    "species": "Torch Pokémon",
    "description": "The base of volcanoes is where they make their\nhomes. They shoot fire from their five horns to repel\nattacking enemies.",
    "name": "larvesta",
    "abilities": [
      "swarm",
      "flame-body"
    ],
    "types": [
      "fire",
      "bug"
    ],
    "height": 1.1,
    "weight": 28.8,
    "imgId": "636"
  },
  {
    "id": 637,
    "species": "Sun Pokémon",
    "description": "When volcanic ash darkened the atmosphere, it is\nsaid that Volcarona’s fire provided a replacement\nfor the sun.",
    "name": "volcarona",
    "abilities": [
      "swarm",
      "flame-body"
    ],
    "types": [
      "fire",
      "bug"
    ],
    "height": 1.6,
    "weight": 46,
    "imgId": "637"
  },
  {
    "id": 638,
    "species": "Iron Will Pokémon",
    "description": "It has a body and heart of steel. It worked with its\nallies to punish people when they hurt Pokémon.",
    "name": "cobalion",
    "abilities": [
      "justified"
    ],
    "types": [
      "fighting",
      "steel"
    ],
    "height": 2.1,
    "weight": 250,
    "imgId": "638"
  },
  {
    "id": 639,
    "species": "Cavern Pokémon",
    "description": "Spoken of in legend, this Pokémon used its\nphenomenal power to destroy a castle in its effort\nto protect Pokémon.",
    "name": "terrakion",
    "abilities": [
      "justified"
    ],
    "types": [
      "fighting",
      "rock"
    ],
    "height": 1.9,
    "weight": 260,
    "imgId": "639"
  },
  {
    "id": 640,
    "species": "Grassland Pokémon",
    "description": "Legends say this Pokémon confounded opponents\nwith its swift movements.",
    "name": "virizion",
    "abilities": [
      "justified"
    ],
    "types": [
      "fighting",
      "grass"
    ],
    "height": 2,
    "weight": 200,
    "imgId": "640"
  },
  {
    "id": 641,
    "species": "Cyclone Pokémon",
    "description": "Tornadus expels massive energy from its tail,\ncausing severe storms. Its power is great enough\nto blow houses away.",
    "name": "tornadus-incarnate",
    "abilities": [
      "defiant",
      "prankster"
    ],
    "types": [
      "flying"
    ],
    "height": 1.5,
    "weight": 63,
    "imgId": "641"
  },
  {
    "id": 642,
    "species": "Bolt Strike Pokémon",
    "description": "As it flies around, it shoots lightning all over\nthe place and causes forest fires. It is\ntherefore disliked.",
    "name": "thundurus-incarnate",
    "abilities": [
      "defiant",
      "prankster"
    ],
    "types": [
      "flying",
      "electric"
    ],
    "height": 1.5,
    "weight": 61,
    "imgId": "642"
  },
  {
    "id": 643,
    "species": "Vast White Pokémon",
    "description": "When Reshiram’s tail flares, the heat energy moves\nthe atmosphere and changes the world’s weather.",
    "name": "reshiram",
    "abilities": [
      "turboblaze"
    ],
    "types": [
      "fire",
      "dragon"
    ],
    "height": 3.2,
    "weight": 330,
    "imgId": "643"
  },
  {
    "id": 644,
    "species": "Deep Black Pokémon",
    "description": "Concealing itself in lightning clouds, it flies\nthroughout the Unova region. It creates electricity\nin its tail.",
    "name": "zekrom",
    "abilities": [
      "teravolt"
    ],
    "types": [
      "electric",
      "dragon"
    ],
    "height": 2.9,
    "weight": 345,
    "imgId": "644"
  },
  {
    "id": 645,
    "species": "Abundance Pokémon",
    "description": "From the forces of lightning and wind, it creates\nenergy to give nutrients to the soil and make the\nland abundant.",
    "name": "landorus-incarnate",
    "abilities": [
      "sheer-force",
      "sand-force"
    ],
    "types": [
      "flying",
      "ground"
    ],
    "height": 1.5,
    "weight": 68,
    "imgId": "645"
  },
  {
    "id": 646,
    "species": "Boundary Pokémon",
    "description": "It generates a powerful, freezing energy inside\nitself, but its body became frozen when the energy\nleaked out.",
    "name": "kyurem",
    "abilities": [
      "pressure"
    ],
    "types": [
      "ice",
      "dragon"
    ],
    "height": 3,
    "weight": 325,
    "imgId": "646"
  },
  {
    "id": 647,
    "species": "Colt Pokémon",
    "description": "When it is resolute, its body fills with power and it\nbecomes swifter. Its jumps are then too fast\nto follow.",
    "name": "keldeo-ordinary",
    "abilities": [
      "justified"
    ],
    "types": [
      "fighting",
      "water"
    ],
    "height": 1.4,
    "weight": 48.5,
    "imgId": "647"
  },
  {
    "id": 648,
    "species": "Melody Pokémon",
    "description": "Its melodies are sung with a special vocalization\nmethod that can control the feelings of those who\nhear it.",
    "name": "meloetta-aria",
    "abilities": [
      "serene-grace"
    ],
    "types": [
      "psychic",
      "normal"
    ],
    "height": 0.6,
    "weight": 6.5,
    "imgId": "648"
  },
  {
    "id": 649,
    "species": "Paleozoic Pokémon",
    "description": "This Pokémon existed 300 million years ago. Team\nPlasma altered it and attached a cannon to its back.",
    "name": "genesect",
    "abilities": [
      "download"
    ],
    "types": [
      "steel",
      "bug"
    ],
    "height": 1.5,
    "weight": 82.5,
    "imgId": "649"
  },
  {
    "id": 650,
    "species": "Spiny Nut Pokémon",
    "description": "Such a thick shell of wood covers its head and back\nthat even a direct hit from a truck wouldn’t faze it.",
    "name": "chespin",
    "abilities": [
      "bulletproof",
      "overgrow"
    ],
    "types": [
      "grass"
    ],
    "height": 0.4,
    "weight": 9,
    "imgId": "650"
  },
  {
    "id": 651,
    "species": "Spiny Armor Pokémon",
    "description": "They strengthen their lower bodies by\nrunning into one another. They are very\nkind and won’t start fights.",
    "name": "quilladin",
    "abilities": [
      "bulletproof",
      "overgrow"
    ],
    "types": [
      "grass"
    ],
    "height": 0.7,
    "weight": 29,
    "imgId": "651"
  },
  {
    "id": 652,
    "species": "Spiny Armor Pokémon",
    "description": "When it takes a defensive posture with its fists\nguarding its face, it could withstand a bomb blast.",
    "name": "chesnaught",
    "abilities": [
      "bulletproof",
      "overgrow"
    ],
    "types": [
      "fighting",
      "grass"
    ],
    "height": 1.6,
    "weight": 90,
    "imgId": "652"
  },
  {
    "id": 653,
    "species": "Fox Pokémon",
    "description": "As it walks, it munches on a twig in place\nof a snack. It intimidates opponents\nby puffing hot air out of its ears.",
    "name": "fennekin",
    "abilities": [
      "magician",
      "blaze"
    ],
    "types": [
      "fire"
    ],
    "height": 0.4,
    "weight": 9.4,
    "imgId": "653"
  },
  {
    "id": 654,
    "species": "Fox Pokémon",
    "description": "When the twig is plucked from its tail,\nfriction sets the twig alight. The flame\nis used to send signals to its allies.",
    "name": "braixen",
    "abilities": [
      "magician",
      "blaze"
    ],
    "types": [
      "fire"
    ],
    "height": 1,
    "weight": 14.5,
    "imgId": "654"
  },
  {
    "id": 655,
    "species": "Fox Pokémon",
    "description": "Using psychic power, it generates a\nfiery vortex of 5,400 degrees Fahrenheit,\nincinerating foes swept into this whirl of flame.",
    "name": "delphox",
    "abilities": [
      "magician",
      "blaze"
    ],
    "types": [
      "psychic",
      "fire"
    ],
    "height": 1.5,
    "weight": 39,
    "imgId": "655"
  },
  {
    "id": 656,
    "species": "Bubble Frog Pokémon",
    "description": "It protects its skin by covering its body in\ndelicate bubbles. Beneath its happy-go-lucky air,\nit keeps a watchful eye on its surroundings.",
    "name": "froakie",
    "abilities": [
      "protean",
      "torrent"
    ],
    "types": [
      "water"
    ],
    "height": 0.3,
    "weight": 7,
    "imgId": "656"
  },
  {
    "id": 657,
    "species": "Bubble Frog Pokémon",
    "description": "Its swiftness is unparalleled.\nIt can scale a tower of more\nthan 2,000 feet in a minute’s time.",
    "name": "frogadier",
    "abilities": [
      "protean",
      "torrent"
    ],
    "types": [
      "water"
    ],
    "height": 0.6,
    "weight": 10.9,
    "imgId": "657"
  },
  {
    "id": 658,
    "species": "Ninja Pokémon",
    "description": "It appears and vanishes with a ninja’s grace.\nIt toys with its enemies using swift movements, while\nslicing them with throwing stars of sharpest water.",
    "name": "greninja",
    "abilities": [
      "protean",
      "torrent"
    ],
    "types": [
      "dark",
      "water"
    ],
    "height": 1.5,
    "weight": 40,
    "imgId": "658"
  },
  {
    "id": 659,
    "species": "Digging Pokémon",
    "description": "It has ears like shovels. Digging holes\nstrengthens its ears so much that they\ncan sever thick roots effortlessly.",
    "name": "bunnelby",
    "abilities": [
      "huge-power",
      "cheek-pouch",
      "pickup"
    ],
    "types": [
      "normal"
    ],
    "height": 0.4,
    "weight": 5,
    "imgId": "659"
  },
  {
    "id": 660,
    "species": "Digging Pokémon",
    "description": "As powerful as an excavator, its ears\ncan reduce dense bedrock to rubble.\nWhen it’s finished digging, it lounges lazily.",
    "name": "diggersby",
    "abilities": [
      "huge-power",
      "cheek-pouch",
      "pickup"
    ],
    "types": [
      "ground",
      "normal"
    ],
    "height": 1,
    "weight": 42.4,
    "imgId": "660"
  },
  {
    "id": 661,
    "species": "Tiny Robin Pokémon",
    "description": "When it’s excited, its temperature can double,\nspiking hormone production in its body.",
    "name": "fletchling",
    "abilities": [
      "gale-wings",
      "big-pecks"
    ],
    "types": [
      "flying",
      "normal"
    ],
    "height": 0.3,
    "weight": 1.7,
    "imgId": "661"
  },
  {
    "id": 662,
    "species": "Ember Pokémon",
    "description": "It will not tolerate other Fletchinder entering its\nterritory, which has a radius of several miles.",
    "name": "fletchinder",
    "abilities": [
      "gale-wings",
      "flame-body"
    ],
    "types": [
      "flying",
      "fire"
    ],
    "height": 0.7,
    "weight": 16,
    "imgId": "662"
  },
  {
    "id": 663,
    "species": "Scorching Pokémon",
    "description": "It zooms directly at its prey at flight speeds of\nclose to 310 mph, while fiery embers scatter\nfrom gaps in its feathers.",
    "name": "talonflame",
    "abilities": [
      "gale-wings",
      "flame-body"
    ],
    "types": [
      "flying",
      "fire"
    ],
    "height": 1.2,
    "weight": 24.5,
    "imgId": "663"
  },
  {
    "id": 664,
    "species": "Scatterdust Pokémon",
    "description": "The powder that covers its body\nregulates its temperature, so it\ncan live in any region or climate.",
    "name": "scatterbug",
    "abilities": [
      "friend-guard",
      "compound-eyes",
      "shield-dust"
    ],
    "types": [
      "bug"
    ],
    "height": 0.3,
    "weight": 2.5,
    "imgId": "664"
  },
  {
    "id": 665,
    "species": "Scatterdust Pokémon",
    "description": "The beaks of bird Pokémon can’t begin\nto scratch its stalwart body.\nTo defend itself, it spews powder.",
    "name": "spewpa",
    "abilities": [
      "friend-guard",
      "shed-skin"
    ],
    "types": [
      "bug"
    ],
    "height": 0.3,
    "weight": 8.4,
    "imgId": "665"
  },
  {
    "id": 666,
    "species": "Scale Pokémon",
    "description": "The patterns on this Pokémon’s wings\ndepend on the climate and topography\nof its habitat. It scatters colorful scales.",
    "name": "vivillon",
    "abilities": [
      "friend-guard",
      "compound-eyes",
      "shield-dust"
    ],
    "types": [
      "flying",
      "bug"
    ],
    "height": 1.2,
    "weight": 17,
    "imgId": "666"
  },
  {
    "id": 667,
    "species": "Lion Cub Pokémon",
    "description": "They set off on their own from their pride\nand live by themselves to become stronger.\nThese hot-blooded Pokémon are quick to fight.",
    "name": "litleo",
    "abilities": [
      "moxie",
      "unnerve",
      "rivalry"
    ],
    "types": [
      "normal",
      "fire"
    ],
    "height": 0.6,
    "weight": 13.5,
    "imgId": "667"
  },
  {
    "id": 668,
    "species": "Royal Pokémon",
    "description": "With fiery breath of more than 10,000 degrees\nFahrenheit, they viciously threaten any challenger.\nThe females protect the pride’s cubs.",
    "name": "pyroar",
    "abilities": [
      "moxie",
      "unnerve",
      "rivalry"
    ],
    "types": [
      "normal",
      "fire"
    ],
    "height": 1.5,
    "weight": 81.5,
    "imgId": "668"
  },
  {
    "id": 669,
    "species": "Single Bloom Pokémon",
    "description": "When it finds a flower it likes, it dwells on\nthat flower its whole life long. It floats in the\nwind’s embrace with an untroubled heart.",
    "name": "flabebe",
    "abilities": [
      "symbiosis",
      "flower-veil"
    ],
    "types": [
      "fairy"
    ],
    "height": 0.1,
    "weight": 0.1,
    "imgId": "669"
  },
  {
    "id": 670,
    "species": "Single Bloom Pokémon",
    "description": "When the flowers of a well-tended flower bed bloom,\nit appears and celebrates with an elegant dance.",
    "name": "floette",
    "abilities": [
      "symbiosis",
      "flower-veil"
    ],
    "types": [
      "fairy"
    ],
    "height": 0.2,
    "weight": 0.9,
    "imgId": "670"
  },
  {
    "id": 671,
    "species": "Garden Pokémon",
    "description": "In times long past, governors of castles\nwould invite Florges to create flower gardens\nto embellish the castle domains.",
    "name": "florges",
    "abilities": [
      "symbiosis",
      "flower-veil"
    ],
    "types": [
      "fairy"
    ],
    "height": 1.1,
    "weight": 10,
    "imgId": "671"
  },
  {
    "id": 672,
    "species": "Mount Pokémon",
    "description": "If it has sunshine and water, it doesn’t\nneed to eat, because it can generate\nenergy from the leaves on its back.",
    "name": "skiddo",
    "abilities": [
      "grass-pelt",
      "sap-sipper"
    ],
    "types": [
      "grass"
    ],
    "height": 0.9,
    "weight": 31,
    "imgId": "672"
  },
  {
    "id": 673,
    "species": "Mount Pokémon",
    "description": "They inhabit mountainous regions.\nThe leader of the herd is decided by\na battle of clashing horns.",
    "name": "gogoat",
    "abilities": [
      "grass-pelt",
      "sap-sipper"
    ],
    "types": [
      "grass"
    ],
    "height": 1.7,
    "weight": 91,
    "imgId": "673"
  },
  {
    "id": 674,
    "species": "Playful Pokémon",
    "description": "There’s no point to the leaf in its mouth, aside\nfrom an effort to look cool. It’s mischievous,\nso it’s not well suited to inexperienced Trainers.",
    "name": "pancham",
    "abilities": [
      "scrappy",
      "mold-breaker",
      "iron-fist"
    ],
    "types": [
      "fighting"
    ],
    "height": 0.6,
    "weight": 8,
    "imgId": "674"
  },
  {
    "id": 675,
    "species": "Daunting Pokémon",
    "description": "From the slight twitches of its bamboo leaf, it\ndeduces its opponent’s movements. It’s eager to\ntussle but kindhearted toward its companions.",
    "name": "pangoro",
    "abilities": [
      "scrappy",
      "mold-breaker",
      "iron-fist"
    ],
    "types": [
      "dark",
      "fighting"
    ],
    "height": 2.1,
    "weight": 136,
    "imgId": "675"
  },
  {
    "id": 676,
    "species": "Poodle Pokémon",
    "description": "Historically, in the Kalos region, these Pokémon\nwere the designated guardians of the king.",
    "name": "furfrou",
    "abilities": [
      "fur-coat"
    ],
    "types": [
      "normal"
    ],
    "height": 1.2,
    "weight": 28,
    "imgId": "676"
  },
  {
    "id": 677,
    "species": "Restraint Pokémon",
    "description": "It has enough psychic energy to blast\neverything within 300 feet of itself,\nbut it has no control over its power.",
    "name": "espurr",
    "abilities": [
      "own-tempo",
      "infiltrator",
      "keen-eye"
    ],
    "types": [
      "psychic"
    ],
    "height": 0.3,
    "weight": 3.5,
    "imgId": "677"
  },
  {
    "id": 678,
    "species": "Constraint Pokémon",
    "description": "The eyeball patterns on the interior of its ears\nemit psychic energy. It keeps the patterns tightly\ncovered because that power is too immense.",
    "name": "meowstic-male",
    "abilities": [
      "prankster",
      "infiltrator",
      "keen-eye"
    ],
    "types": [
      "psychic"
    ],
    "height": 0.6,
    "weight": 8.5,
    "imgId": "678"
  },
  {
    "id": 679,
    "species": "Sword Pokémon",
    "description": "If anyone dares to grab its hilt, it wraps\na blue cloth around that person’s arm and\ndrains that person’s life energy completely.",
    "name": "honedge",
    "abilities": [
      "no-guard"
    ],
    "types": [
      "ghost",
      "steel"
    ],
    "height": 0.8,
    "weight": 2,
    "imgId": "679"
  },
  {
    "id": 680,
    "species": "Sword Pokémon",
    "description": "The complex attack patterns of its two swords\nare unstoppable, even for an opponent\ngreatly accomplished at swordplay.",
    "name": "doublade",
    "abilities": [
      "no-guard"
    ],
    "types": [
      "ghost",
      "steel"
    ],
    "height": 0.8,
    "weight": 4.5,
    "imgId": "680"
  },
  {
    "id": 681,
    "species": "Royal Sword Pokémon",
    "description": "Apparently, it can detect the innate qualities\nof leadership. According to legend, whoever it\nrecognizes is destined to become king.",
    "name": "aegislash-shield",
    "abilities": [
      "stance-change"
    ],
    "types": [
      "ghost",
      "steel"
    ],
    "height": 1.7,
    "weight": 53,
    "imgId": "681"
  },
  {
    "id": 682,
    "species": "Perfume Pokémon",
    "description": "In the past, rather than using perfume,\nroyal ladies carried a Spritzee\nthat would waft a fragrance they liked.",
    "name": "spritzee",
    "abilities": [
      "aroma-veil",
      "healer"
    ],
    "types": [
      "fairy"
    ],
    "height": 0.2,
    "weight": 0.5,
    "imgId": "682"
  },
  {
    "id": 683,
    "species": "Fragrance Pokémon",
    "description": "Its scent is so overpowering that, unless a Trainer\nhappens to really enjoy the smell, he or she will\nhave a hard time walking alongside it.",
    "name": "aromatisse",
    "abilities": [
      "aroma-veil",
      "healer"
    ],
    "types": [
      "fairy"
    ],
    "height": 0.8,
    "weight": 15.5,
    "imgId": "683"
  },
  {
    "id": 684,
    "species": "Cotton Candy Pokémon",
    "description": "Because it eats nothing but sweets,\nits fur is as sticky sweet as cotton candy.",
    "name": "swirlix",
    "abilities": [
      "unburden",
      "sweet-veil"
    ],
    "types": [
      "fairy"
    ],
    "height": 0.4,
    "weight": 3.5,
    "imgId": "684"
  },
  {
    "id": 685,
    "species": "Meringue Pokémon",
    "description": "Its sense of smell is 100 million times better than\na human’s, so even the faintest scent tells it about\neverything in the area. It’s like it can see with its nose!",
    "name": "slurpuff",
    "abilities": [
      "unburden",
      "sweet-veil"
    ],
    "types": [
      "fairy"
    ],
    "height": 0.8,
    "weight": 5,
    "imgId": "685"
  },
  {
    "id": 686,
    "species": "Revolving Pokémon",
    "description": "It flashes the light-emitting spots on its body,\nwhich drains its opponent’s will to fight.\nIt takes the opportunity to scuttle away and hide.",
    "name": "inkay",
    "abilities": [
      "infiltrator",
      "suction-cups",
      "contrary"
    ],
    "types": [
      "psychic",
      "dark"
    ],
    "height": 0.4,
    "weight": 3.5,
    "imgId": "686"
  },
  {
    "id": 687,
    "species": "Overturning Pokémon",
    "description": "It lures its prey close with hypnotic motions,\nthen wraps its tentacles around it before\nfinishing it off with digestive fluids.",
    "name": "malamar",
    "abilities": [
      "infiltrator",
      "suction-cups",
      "contrary"
    ],
    "types": [
      "psychic",
      "dark"
    ],
    "height": 1.5,
    "weight": 47,
    "imgId": "687"
  },
  {
    "id": 688,
    "species": "Two-Handed Pokémon",
    "description": "They stretch and then contract, yanking their\nrocks along with them in bold hops. They eat\nseaweed that washes up on the shoreline.",
    "name": "binacle",
    "abilities": [
      "pickpocket",
      "sniper",
      "tough-claws"
    ],
    "types": [
      "water",
      "rock"
    ],
    "height": 0.5,
    "weight": 31,
    "imgId": "688"
  },
  {
    "id": 689,
    "species": "Collective Pokémon",
    "description": "Barbaracle’s legs and hands have minds\nof their own, and they will move independently.\nBut they usually follow the head’s orders.",
    "name": "barbaracle",
    "abilities": [
      "pickpocket",
      "sniper",
      "tough-claws"
    ],
    "types": [
      "water",
      "rock"
    ],
    "height": 1.3,
    "weight": 96,
    "imgId": "689"
  },
  {
    "id": 690,
    "species": "Mock Kelp Pokémon",
    "description": "It looks just like rotten kelp. It hides from foes\nwhile storing up power for its evolution.",
    "name": "skrelp",
    "abilities": [
      "adaptability",
      "poison-touch",
      "poison-point"
    ],
    "types": [
      "water",
      "poison"
    ],
    "height": 0.5,
    "weight": 7.3,
    "imgId": "690"
  },
  {
    "id": 691,
    "species": "Mock Kelp Pokémon",
    "description": "Tales are told of ships that wander into\nseas where Dragalge live, never to return.",
    "name": "dragalge",
    "abilities": [
      "adaptability",
      "poison-touch",
      "poison-point"
    ],
    "types": [
      "dragon",
      "poison"
    ],
    "height": 1.8,
    "weight": 81.5,
    "imgId": "691"
  },
  {
    "id": 692,
    "species": "Water Gun Pokémon",
    "description": "Through controlled explosions of internal gas,\nit can expel water like a pistol shot.\nAt close distances, it can shatter rock.",
    "name": "clauncher",
    "abilities": [
      "mega-launcher"
    ],
    "types": [
      "water"
    ],
    "height": 0.5,
    "weight": 8.3,
    "imgId": "692"
  },
  {
    "id": 693,
    "species": "Howitzer Pokémon",
    "description": "By expelling water from the nozzle in the back\nof its claw, it can move at a speed of 60 knots.",
    "name": "clawitzer",
    "abilities": [
      "mega-launcher"
    ],
    "types": [
      "water"
    ],
    "height": 1.3,
    "weight": 35.3,
    "imgId": "693"
  },
  {
    "id": 694,
    "species": "Generator Pokémon",
    "description": "The frills on either side of its head have cells\nthat generate electricity when exposed to sunlight.",
    "name": "helioptile",
    "abilities": [
      "solar-power",
      "sand-veil",
      "dry-skin"
    ],
    "types": [
      "normal",
      "electric"
    ],
    "height": 0.5,
    "weight": 6,
    "imgId": "694"
  },
  {
    "id": 695,
    "species": "Generator Pokémon",
    "description": "It stimulates its muscles with electricity,\nboosting the strength in its legs and enabling\nit to run 100 yards in five seconds.",
    "name": "heliolisk",
    "abilities": [
      "solar-power",
      "sand-veil",
      "dry-skin"
    ],
    "types": [
      "normal",
      "electric"
    ],
    "height": 1,
    "weight": 21,
    "imgId": "695"
  },
  {
    "id": 696,
    "species": "Royal Heir Pokémon",
    "description": "Its immense jaws have enough destructive\nforce that it can chew up an automobile.\nIt lived 100 million years ago.",
    "name": "tyrunt",
    "abilities": [
      "sturdy",
      "strong-jaw"
    ],
    "types": [
      "dragon",
      "rock"
    ],
    "height": 0.8,
    "weight": 26,
    "imgId": "696"
  },
  {
    "id": 697,
    "species": "Despot Pokémon",
    "description": "Nothing could stop this Pokémon\n100 million years ago,\nso it behaved like a king.",
    "name": "tyrantrum",
    "abilities": [
      "rock-head",
      "strong-jaw"
    ],
    "types": [
      "dragon",
      "rock"
    ],
    "height": 2.5,
    "weight": 270,
    "imgId": "697"
  },
  {
    "id": 698,
    "species": "Tundra Pokémon",
    "description": "This calm Pokémon lived in a cold land where\nthere were no violent predators like Tyrantrum.",
    "name": "amaura",
    "abilities": [
      "snow-warning",
      "refrigerate"
    ],
    "types": [
      "ice",
      "rock"
    ],
    "height": 1.3,
    "weight": 25.2,
    "imgId": "698"
  },
  {
    "id": 699,
    "species": "Tundra Pokémon",
    "description": "Using its diamond-shaped crystals,\nit can instantly create a wall of\nice to block an opponent’s attack.",
    "name": "aurorus",
    "abilities": [
      "snow-warning",
      "refrigerate"
    ],
    "types": [
      "ice",
      "rock"
    ],
    "height": 2.7,
    "weight": 225,
    "imgId": "699"
  },
  {
    "id": 700,
    "species": "Intertwining Pokémon",
    "description": "When this Pokémon sights its prey, it swirls its\nribbonlike feelers as a distraction. A moment\nlater, it pounces.",
    "name": "sylveon",
    "abilities": [
      "pixilate",
      "cute-charm"
    ],
    "types": [
      "fairy"
    ],
    "height": 1,
    "weight": 23.5,
    "imgId": "700"
  },
  {
    "id": 701,
    "species": "Wrestling Pokémon",
    "description": "With its wings, it controls its position in the air.\nIt likes to attack from above, a maneuver that\nis difficult to defend against.",
    "name": "hawlucha",
    "abilities": [
      "mold-breaker",
      "unburden",
      "limber"
    ],
    "types": [
      "flying",
      "fighting"
    ],
    "height": 0.8,
    "weight": 21.5,
    "imgId": "701"
  },
  {
    "id": 702,
    "species": "Antenna Pokémon",
    "description": "It uses its tail to absorb electricity from\npower plants or from outlets in houses,\nand then it fires the electricity from its whiskers.",
    "name": "dedenne",
    "abilities": [
      "plus",
      "pickup",
      "cheek-pouch"
    ],
    "types": [
      "fairy",
      "electric"
    ],
    "height": 0.2,
    "weight": 2.2,
    "imgId": "702"
  },
  {
    "id": 703,
    "species": "Jewel Pokémon",
    "description": "Although this Pokémon is not especially rare,\nits glittering, jewel-draped body draws\nattention from people.",
    "name": "carbink",
    "abilities": [
      "sturdy",
      "clear-body"
    ],
    "types": [
      "fairy",
      "rock"
    ],
    "height": 0.3,
    "weight": 5.7,
    "imgId": "703"
  },
  {
    "id": 704,
    "species": "Soft Tissue Pokémon",
    "description": "Its source of protection is its slimy, germ-laden\nmucous membrane. Anyone who touches it\nneeds some thorough hand-washing.",
    "name": "goomy",
    "abilities": [
      "gooey",
      "hydration",
      "sap-sipper"
    ],
    "types": [
      "dragon"
    ],
    "height": 0.3,
    "weight": 2.8,
    "imgId": "704"
  },
  {
    "id": 705,
    "species": "Soft Tissue Pokémon",
    "description": "This Pokémon’s mucous can dissolve anything.\nToothless, it sprays mucous on its prey. Once\nthey’re nicely dissolved, it slurps them up.",
    "name": "sliggoo",
    "abilities": [
      "gooey",
      "hydration",
      "sap-sipper"
    ],
    "types": [
      "dragon"
    ],
    "height": 0.8,
    "weight": 17.5,
    "imgId": "705"
  },
  {
    "id": 706,
    "species": "Dragon Pokémon",
    "description": "It gets picked on because it’s meek. But then,\nwhoever teased it gets to feel the full force of\nits horns and a good swatting from its thick tail.",
    "name": "goodra",
    "abilities": [
      "gooey",
      "hydration",
      "sap-sipper"
    ],
    "types": [
      "dragon"
    ],
    "height": 2,
    "weight": 150.5,
    "imgId": "706"
  },
  {
    "id": 707,
    "species": "Key Ring Pokémon",
    "description": "It inserts its horn into chinks in metal, absorbing\nmetal ions. For some reason, it collects keys.",
    "name": "klefki",
    "abilities": [
      "magician",
      "prankster"
    ],
    "types": [
      "fairy",
      "steel"
    ],
    "height": 0.2,
    "weight": 3,
    "imgId": "707"
  },
  {
    "id": 708,
    "species": "Stump Pokémon",
    "description": "According to legend, medicine to cure any illness\ncan be made by plucking the green leaves on its\nhead, brewing them, and boiling down the liquid.",
    "name": "phantump",
    "abilities": [
      "harvest",
      "frisk",
      "natural-cure"
    ],
    "types": [
      "grass",
      "ghost"
    ],
    "height": 0.4,
    "weight": 7,
    "imgId": "708"
  },
  {
    "id": 709,
    "species": "Elder Tree Pokémon",
    "description": "Through its roots, it exerts control over other\ntrees. A deadly curse falls upon anyone cutting\ndown trees in forests where Trevenant dwell.",
    "name": "trevenant",
    "abilities": [
      "harvest",
      "frisk",
      "natural-cure"
    ],
    "types": [
      "grass",
      "ghost"
    ],
    "height": 1.5,
    "weight": 71,
    "imgId": "709"
  },
  {
    "id": 710,
    "species": "Pumpkin Pokémon",
    "description": "It is said to carry wandering spirits\nto the place where they belong\nso they can move on.",
    "name": "pumpkaboo-average",
    "abilities": [
      "insomnia",
      "frisk",
      "pickup"
    ],
    "types": [
      "grass",
      "ghost"
    ],
    "height": 0.4,
    "weight": 5,
    "imgId": "710"
  },
  {
    "id": 711,
    "species": "Pumpkin Pokémon",
    "description": "It enwraps its prey in its hairlike arms.\nIt sings joyfully as it observes the\nsuffering of its prey.",
    "name": "gourgeist-average",
    "abilities": [
      "insomnia",
      "frisk",
      "pickup"
    ],
    "types": [
      "grass",
      "ghost"
    ],
    "height": 0.9,
    "weight": 12.5,
    "imgId": "711"
  },
  {
    "id": 712,
    "species": "Ice Chunk Pokémon",
    "description": "Using air of -150 degrees Fahrenheit, they\nfreeze opponents solid. They live in herds\nabove the snow line on mountains.",
    "name": "bergmite",
    "abilities": [
      "sturdy",
      "ice-body",
      "own-tempo"
    ],
    "types": [
      "ice"
    ],
    "height": 1,
    "weight": 99.5,
    "imgId": "712"
  },
  {
    "id": 713,
    "species": "Iceberg Pokémon",
    "description": "The way several Bergmite huddle\non its back makes it look like\nan aircraft carrier made of ice.",
    "name": "avalugg",
    "abilities": [
      "sturdy",
      "ice-body",
      "own-tempo"
    ],
    "types": [
      "ice"
    ],
    "height": 2,
    "weight": 505,
    "imgId": "713"
  },
  {
    "id": 714,
    "species": "Sound Wave Pokémon",
    "description": "Even a robust wrestler will become\ndizzy and unable to stand when exposed\nto its 200,000-hertz ultrasonic waves.",
    "name": "noibat",
    "abilities": [
      "telepathy",
      "infiltrator",
      "frisk"
    ],
    "types": [
      "dragon",
      "flying"
    ],
    "height": 0.5,
    "weight": 8,
    "imgId": "714"
  },
  {
    "id": 715,
    "species": "Sound Wave Pokémon",
    "description": "The ultrasonic waves it emits from its ears\ncan reduce a large boulder to pebbles.\nIt swoops out of the dark to attack.",
    "name": "noivern",
    "abilities": [
      "telepathy",
      "infiltrator",
      "frisk"
    ],
    "types": [
      "dragon",
      "flying"
    ],
    "height": 1.5,
    "weight": 85,
    "imgId": "715"
  },
  {
    "id": 716,
    "species": "Life Pokémon",
    "description": "When the horns on its head shine\nin seven colors, it is said to be\nsharing everlasting life.",
    "name": "xerneas",
    "abilities": [
      "fairy-aura"
    ],
    "types": [
      "fairy"
    ],
    "height": 3,
    "weight": 215,
    "imgId": "716"
  },
  {
    "id": 717,
    "species": "Destruction Pokémon",
    "description": "When its life comes to an end, it absorbs\nthe life energy of every living thing\nand turns into a cocoon once more.",
    "name": "yveltal",
    "abilities": [
      "dark-aura"
    ],
    "types": [
      "flying",
      "dark"
    ],
    "height": 5.8,
    "weight": 203,
    "imgId": "717"
  },
  {
    "id": 718,
    "species": "Order Pokémon",
    "description": "It’s thought to be monitoring the ecosystem.\nThere are rumors that even greater power lies\nhidden within it.",
    "name": "zygarde",
    "abilities": [
      "aura-break"
    ],
    "types": [
      "ground",
      "dragon"
    ],
    "height": 5,
    "weight": 305,
    "imgId": "718"
  },
  {
    "id": 719,
    "species": "Jewel Pokémon",
    "description": "It can instantly create many diamonds\nby compressing the carbon in the air\nbetween its hands.",
    "name": "diancie",
    "abilities": [
      "clear-body"
    ],
    "types": [
      "fairy",
      "rock"
    ],
    "height": 0.7,
    "weight": 8.8,
    "imgId": "719"
  },
  {
    "id": 720,
    "species": "Mischief Pokémon",
    "description": "It is said to be able to seize anything it desires\nwith its six rings and six huge arms. With its power\nsealed, it is transformed into a much smaller form.",
    "name": "hoopa",
    "abilities": [
      "magician"
    ],
    "types": [
      "ghost",
      "psychic"
    ],
    "height": 0.5,
    "weight": 9,
    "imgId": "720"
  },
  {
    "id": 721,
    "species": "Steam Pokémon",
    "description": "It expels its internal steam from the\narms on its back. It has enough\npower to blow away a mountain.",
    "name": "volcanion",
    "abilities": [
      "water-absorb"
    ],
    "types": [
      "water",
      "fire"
    ],
    "height": 1.7,
    "weight": 195,
    "imgId": "721"
  },
  {
    "id": 722,
    "species": "Grass Quill Pokémon",
    "description": "Silently it glides, drawing near its targets. Before\nthey even notice it, it begins to pelt them with\nvicious kicks.",
    "name": "rowlet",
    "abilities": [
      "long-reach",
      "overgrow"
    ],
    "types": [
      "flying",
      "grass"
    ],
    "height": 0.3,
    "weight": 1.5,
    "imgId": "722"
  },
  {
    "id": 723,
    "species": "Blade Quill Pokémon",
    "description": "It throws sharp feathers called blade quills\nat enemies or prey. It seldom misses.",
    "name": "dartrix",
    "abilities": [
      "long-reach",
      "overgrow"
    ],
    "types": [
      "flying",
      "grass"
    ],
    "height": 0.7,
    "weight": 16,
    "imgId": "723"
  },
  {
    "id": 724,
    "species": "Arrow Quill Pokémon",
    "description": "Although basically cool and cautious, when it’s\ncaught by surprise, it’s seized by panic.",
    "name": "decidueye",
    "abilities": [
      "long-reach",
      "overgrow"
    ],
    "types": [
      "ghost",
      "grass"
    ],
    "height": 1.6,
    "weight": 36.6,
    "imgId": "724"
  },
  {
    "id": 725,
    "species": "Fire Cat Pokémon",
    "description": "It doesn’t allow its emotions to be easily seen.\nEarning its trust takes time. It prefers solitude.",
    "name": "litten",
    "abilities": [
      "intimidate",
      "blaze"
    ],
    "types": [
      "fire"
    ],
    "height": 0.4,
    "weight": 4.3,
    "imgId": "725"
  },
  {
    "id": 726,
    "species": "Fire Cat Pokémon",
    "description": "It boasts powerful front legs. With a single\npunch, it can bend an iron bar right over.",
    "name": "torracat",
    "abilities": [
      "intimidate",
      "blaze"
    ],
    "types": [
      "fire"
    ],
    "height": 0.7,
    "weight": 25,
    "imgId": "726"
  },
  {
    "id": 727,
    "species": "Heel Pokémon",
    "description": "After hurling ferocious punches and flinging\nfurious kicks, it finishes opponents off by\nspewing fire from around its navel.",
    "name": "incineroar",
    "abilities": [
      "intimidate",
      "blaze"
    ],
    "types": [
      "dark",
      "fire"
    ],
    "height": 1.8,
    "weight": 83,
    "imgId": "727"
  },
  {
    "id": 728,
    "species": "Sea Lion Pokémon",
    "description": "This Pokémon can control water bubbles. It\npractices diligently so it can learn to make\nbig bubbles.",
    "name": "popplio",
    "abilities": [
      "liquid-voice",
      "torrent"
    ],
    "types": [
      "water"
    ],
    "height": 0.4,
    "weight": 7.5,
    "imgId": "728"
  },
  {
    "id": 729,
    "species": "Pop Star Pokémon",
    "description": "It cares deeply for its companions. When its\nTrainer is feeling down, it performs a cheery\ndance to try and help.",
    "name": "brionne",
    "abilities": [
      "liquid-voice",
      "torrent"
    ],
    "types": [
      "water"
    ],
    "height": 0.6,
    "weight": 17.5,
    "imgId": "729"
  },
  {
    "id": 730,
    "species": "Soloist Pokémon",
    "description": "Its singing voice is its chief weapon in battle.\nThis Pokémon’s Trainer must prioritize the daily\nmaintenance of its throat at all costs.",
    "name": "primarina",
    "abilities": [
      "liquid-voice",
      "torrent"
    ],
    "types": [
      "fairy",
      "water"
    ],
    "height": 1.8,
    "weight": 44,
    "imgId": "730"
  },
  {
    "id": 731,
    "species": "Woodpecker Pokémon",
    "description": "This Pokémon feeds on berries, whose leftover\nseeds become the ammunition for the attacks it\nfires off from its mouth.",
    "name": "pikipek",
    "abilities": [
      "pickup",
      "skill-link",
      "keen-eye"
    ],
    "types": [
      "flying",
      "normal"
    ],
    "height": 0.3,
    "weight": 1.2,
    "imgId": "731"
  },
  {
    "id": 732,
    "species": "Bugle Beak Pokémon",
    "description": "By bending its beak, it can produce a variety of\ncalls and brand itself a noisy nuisance for\nits neighbors.",
    "name": "trumbeak",
    "abilities": [
      "pickup",
      "skill-link",
      "keen-eye"
    ],
    "types": [
      "flying",
      "normal"
    ],
    "height": 0.6,
    "weight": 14.8,
    "imgId": "732"
  },
  {
    "id": 733,
    "species": "Cannon Pokémon",
    "description": "Within its beak, its internal gas ignites,\nexplosively launching seeds with enough power\nto pulverize boulders.",
    "name": "toucannon",
    "abilities": [
      "sheer-force",
      "skill-link",
      "keen-eye"
    ],
    "types": [
      "flying",
      "normal"
    ],
    "height": 1.1,
    "weight": 26,
    "imgId": "733"
  },
  {
    "id": 734,
    "species": "Loitering Pokémon",
    "description": "It wanders around in a never-ending search for\nfood. At dusk, it collapses from exhaustion and\nfalls asleep on the spot.",
    "name": "yungoos",
    "abilities": [
      "adaptability",
      "strong-jaw",
      "stakeout"
    ],
    "types": [
      "normal"
    ],
    "height": 0.4,
    "weight": 6,
    "imgId": "734"
  },
  {
    "id": 735,
    "species": "Stakeout Pokémon",
    "description": "It adores having Rattata and Raticate for dinner,\nbut as it’s diurnal, it never encounters them.\nThis Pokémon boasts incredible patience.",
    "name": "gumshoos",
    "abilities": [
      "adaptability",
      "strong-jaw",
      "stakeout"
    ],
    "types": [
      "normal"
    ],
    "height": 0.7,
    "weight": 14.2,
    "imgId": "735"
  },
  {
    "id": 736,
    "species": "Larva Pokémon",
    "description": "They often gather near places frequented by\nelectric Pokémon in order to avoid being\nattacked by bird Pokémon.",
    "name": "grubbin",
    "abilities": [
      "swarm"
    ],
    "types": [
      "bug"
    ],
    "height": 0.4,
    "weight": 4.4,
    "imgId": "736"
  },
  {
    "id": 737,
    "species": "Battery Pokémon",
    "description": "From the food it digests, it generates electricity,\nand it stores this energy in its electric sac.",
    "name": "charjabug",
    "abilities": [
      "battery"
    ],
    "types": [
      "electric",
      "bug"
    ],
    "height": 0.5,
    "weight": 10.5,
    "imgId": "737"
  },
  {
    "id": 738,
    "species": "Stag Beetle Pokémon",
    "description": "It produces electricity via an electrical organ in\nits abdomen. It overwhelms bird Pokémon with\nshocking beams of electrical energy.",
    "name": "vikavolt",
    "abilities": [
      "levitate"
    ],
    "types": [
      "electric",
      "bug"
    ],
    "height": 1.5,
    "weight": 45,
    "imgId": "738"
  },
  {
    "id": 739,
    "species": "Boxing Pokémon",
    "description": "It punches so much, its pincers often come off\nfrom overuse, but they grow back quickly. What\nlittle meat they contain is rich and delicious.",
    "name": "crabrawler",
    "abilities": [
      "anger-point",
      "iron-fist",
      "hyper-cutter"
    ],
    "types": [
      "fighting"
    ],
    "height": 0.6,
    "weight": 7,
    "imgId": "739"
  },
  {
    "id": 740,
    "species": "Woolly Crab Pokémon",
    "description": "It just throws punches indiscriminately. In times\nof desperation, it can lop off its own pincers\nand fire them like rockets.",
    "name": "crabominable",
    "abilities": [
      "anger-point",
      "iron-fist",
      "hyper-cutter"
    ],
    "types": [
      "ice",
      "fighting"
    ],
    "height": 1.7,
    "weight": 180,
    "imgId": "740"
  },
  {
    "id": 741,
    "species": "Dancing Pokémon",
    "description": "This Oricorio has sipped red nectar. Its\npassionate dance moves cause its enemies\nto combust in both body and mind.",
    "name": "oricorio-baile",
    "abilities": [
      "dancer"
    ],
    "types": [
      "flying",
      "fire"
    ],
    "height": 0.6,
    "weight": 3.4,
    "imgId": "741"
  },
  {
    "id": 742,
    "species": "Bee Fly Pokémon",
    "description": "Myriads of Cutiefly flutter above the heads of\npeople who have auras resembling those\nof flowers.",
    "name": "cutiefly",
    "abilities": [
      "sweet-veil",
      "shield-dust",
      "honey-gather"
    ],
    "types": [
      "fairy",
      "bug"
    ],
    "height": 0.1,
    "weight": 0.2,
    "imgId": "742"
  },
  {
    "id": 743,
    "species": "Bee Fly Pokémon",
    "description": "Some of Ribombee’s pollen puffs are highly\nnutritious. They are sometimes sold\nas supplements.",
    "name": "ribombee",
    "abilities": [
      "sweet-veil",
      "shield-dust",
      "honey-gather"
    ],
    "types": [
      "fairy",
      "bug"
    ],
    "height": 0.2,
    "weight": 0.5,
    "imgId": "743"
  },
  {
    "id": 744,
    "species": "Puppy Pokémon",
    "description": "This Pokémon has lived with people since times\nlong ago. It can sense when its Trainer is in the\ndumps and will stick close by its Trainer’s side.",
    "name": "rockruff",
    "abilities": [
      "steadfast",
      "vital-spirit",
      "keen-eye"
    ],
    "types": [
      "rock"
    ],
    "height": 0.5,
    "weight": 9.2,
    "imgId": "744"
  },
  {
    "id": 745,
    "species": "Wolf Pokémon",
    "description": "When properly raised from a young age, it will\nbecome a trustworthy partner that will\nabsolutely never betray its Trainer.",
    "name": "lycanroc-midday",
    "abilities": [
      "steadfast",
      "sand-rush",
      "keen-eye"
    ],
    "types": [
      "rock"
    ],
    "height": 0.8,
    "weight": 25,
    "imgId": "745"
  },
  {
    "id": 746,
    "species": "Small Fry Pokémon",
    "description": "It’s awfully weak and notably tasty, so everyone\nis always out to get it. As it happens, anyone\ntrying to bully it receives a painful lesson.",
    "name": "wishiwashi-solo",
    "abilities": [
      "schooling"
    ],
    "types": [
      "water"
    ],
    "height": 0.2,
    "weight": 0.3,
    "imgId": "746"
  },
  {
    "id": 747,
    "species": "Brutal Star Pokémon",
    "description": "It’s found crawling on beaches and seafloors.\nThe coral that grows on Corsola’s head is as\ngood as a five-star banquet to this Pokémon.",
    "name": "mareanie",
    "abilities": [
      "regenerator",
      "limber",
      "merciless"
    ],
    "types": [
      "water",
      "poison"
    ],
    "height": 0.4,
    "weight": 8,
    "imgId": "747"
  },
  {
    "id": 748,
    "species": "Brutal Star Pokémon",
    "description": "Those attacked by Toxapex’s poison will suffer\nintense pain for three days and three nights.\nPost-recovery, there will be some aftereffects.",
    "name": "toxapex",
    "abilities": [
      "regenerator",
      "limber",
      "merciless"
    ],
    "types": [
      "water",
      "poison"
    ],
    "height": 0.7,
    "weight": 14.5,
    "imgId": "748"
  },
  {
    "id": 749,
    "species": "Donkey Pokémon",
    "description": "It has a stubborn, individualistic disposition.\nEating dirt, making mud, and playing in the mire\nall form part of its daily routine.",
    "name": "mudbray",
    "abilities": [
      "inner-focus",
      "stamina",
      "own-tempo"
    ],
    "types": [
      "ground"
    ],
    "height": 1,
    "weight": 110,
    "imgId": "749"
  },
  {
    "id": 750,
    "species": "Draft Horse Pokémon",
    "description": "Its heavy, mud-covered kicks are its best\nmeans of attack, and it can reduce large trucks\nto scrap without breaking a sweat.",
    "name": "mudsdale",
    "abilities": [
      "inner-focus",
      "stamina",
      "own-tempo"
    ],
    "types": [
      "ground"
    ],
    "height": 2.5,
    "weight": 920,
    "imgId": "750"
  },
  {
    "id": 751,
    "species": "Water Bubble Pokémon",
    "description": "When it comes across enemies or potential prey,\nthis Pokémon smashes its\nwater-bubble-covered head into them.",
    "name": "dewpider",
    "abilities": [
      "water-absorb",
      "water-bubble"
    ],
    "types": [
      "bug",
      "water"
    ],
    "height": 0.3,
    "weight": 4,
    "imgId": "751"
  },
  {
    "id": 752,
    "species": "Water Bubble Pokémon",
    "description": "Despite what its appearance suggests, it cares\nfor others. If it finds vulnerable, weak Pokémon,\nit protectively brings them into its water bubble.",
    "name": "araquanid",
    "abilities": [
      "water-absorb",
      "water-bubble"
    ],
    "types": [
      "bug",
      "water"
    ],
    "height": 1.8,
    "weight": 82,
    "imgId": "752"
  },
  {
    "id": 753,
    "species": "Sickle Grass Pokémon",
    "description": "They give off a sweet and refreshing scent.\nCutiefly often gather near the tall grass where\nFomantis are hiding.",
    "name": "fomantis",
    "abilities": [
      "contrary",
      "leaf-guard"
    ],
    "types": [
      "grass"
    ],
    "height": 0.3,
    "weight": 1.5,
    "imgId": "753"
  },
  {
    "id": 754,
    "species": "Bloom Sickle Pokémon",
    "description": "It fires beams from its sickle-shaped petals.\nThese beams are powerful enough to cleave\nthrough thick metal plates.",
    "name": "lurantis",
    "abilities": [
      "contrary",
      "leaf-guard"
    ],
    "types": [
      "grass"
    ],
    "height": 0.9,
    "weight": 18.5,
    "imgId": "754"
  },
  {
    "id": 755,
    "species": "Illuminating Pokémon",
    "description": "As it drowses the day away, it nourishes itself\nby sucking from tree roots. It wakens at the fall\nof night, wandering off in search of a new tree.",
    "name": "morelull",
    "abilities": [
      "rain-dish",
      "effect-spore",
      "illuminate"
    ],
    "types": [
      "fairy",
      "grass"
    ],
    "height": 0.2,
    "weight": 1.5,
    "imgId": "755"
  },
  {
    "id": 756,
    "species": "Illuminating Pokémon",
    "description": "It emits flickering spores that cause drowsiness.\nWhen its prey succumb to sleep, this Pokémon\nfeeds on them by sucking in their energy.",
    "name": "shiinotic",
    "abilities": [
      "rain-dish",
      "effect-spore",
      "illuminate"
    ],
    "types": [
      "fairy",
      "grass"
    ],
    "height": 1,
    "weight": 11.5,
    "imgId": "756"
  },
  {
    "id": 757,
    "species": "Toxic Lizard Pokémon",
    "description": "Volcanoes or dry, craggy places are its home.\nIt emanates a sweet-smelling poisonous gas\nthat attracts bug Pokémon, then attacks them.",
    "name": "salandit",
    "abilities": [
      "oblivious",
      "corrosion"
    ],
    "types": [
      "fire",
      "poison"
    ],
    "height": 0.6,
    "weight": 4.8,
    "imgId": "757"
  },
  {
    "id": 758,
    "species": "Toxic Lizard Pokémon",
    "description": "Filled with pheromones, its poisonous gas can\nbe diluted to use in the production of\nluscious perfumes.",
    "name": "salazzle",
    "abilities": [
      "oblivious",
      "corrosion"
    ],
    "types": [
      "fire",
      "poison"
    ],
    "height": 1.2,
    "weight": 22.2,
    "imgId": "758"
  },
  {
    "id": 759,
    "species": "Flailing Pokémon",
    "description": "A touch from anyone except a known friend\nsends it into a surging frenzy. It’s an incredibly\ndangerous Pokémon.",
    "name": "stufful",
    "abilities": [
      "cute-charm",
      "klutz",
      "fluffy"
    ],
    "types": [
      "fighting",
      "normal"
    ],
    "height": 0.5,
    "weight": 6.8,
    "imgId": "759"
  },
  {
    "id": 760,
    "species": "Strong Arm Pokémon",
    "description": "This Pokémon has the habit of hugging its\ncompanions. Many Trainers have left this world\nafter their spines were squashed by its hug.",
    "name": "bewear",
    "abilities": [
      "unnerve",
      "klutz",
      "fluffy"
    ],
    "types": [
      "fighting",
      "normal"
    ],
    "height": 2.1,
    "weight": 135,
    "imgId": "760"
  },
  {
    "id": 761,
    "species": "Fruit Pokémon",
    "description": "Although it’s too sugary for human consumption,\nBounsweet’s sweat can be watered down into a\njuice with just the right amount of sweetness.",
    "name": "bounsweet",
    "abilities": [
      "sweet-veil",
      "oblivious",
      "leaf-guard"
    ],
    "types": [
      "grass"
    ],
    "height": 0.3,
    "weight": 3.2,
    "imgId": "761"
  },
  {
    "id": 762,
    "species": "Fruit Pokémon",
    "description": "This Pokémon is always bouncing around\nenergetically. Other Pokémon are attracted by\nits lively appearance and pleasant aroma.",
    "name": "steenee",
    "abilities": [
      "sweet-veil",
      "oblivious",
      "leaf-guard"
    ],
    "types": [
      "grass"
    ],
    "height": 0.7,
    "weight": 8.2,
    "imgId": "762"
  },
  {
    "id": 763,
    "species": "Fruit Pokémon",
    "description": "A Pokémon known for the beauty of its\nwell-shaped legs, it sometimes appears as a\nmascot in advertisements for beauty salons.",
    "name": "tsareena",
    "abilities": [
      "sweet-veil",
      "queenly-majesty",
      "leaf-guard"
    ],
    "types": [
      "grass"
    ],
    "height": 1.2,
    "weight": 21.4,
    "imgId": "763"
  },
  {
    "id": 764,
    "species": "Posy Picker Pokémon",
    "description": "Baths prepared with the flowers from its vine\nhave a relaxing effect, so this Pokémon\nis a hit with many people.",
    "name": "comfey",
    "abilities": [
      "natural-cure",
      "triage",
      "flower-veil"
    ],
    "types": [
      "fairy"
    ],
    "height": 0.1,
    "weight": 0.3,
    "imgId": "764"
  },
  {
    "id": 765,
    "species": "Sage Pokémon",
    "description": "Deep in the jungle, high in the lofty canopy, this\nPokémon abides. On rare occasions, it shows up\nat the beach to match wits with Slowking.",
    "name": "oranguru",
    "abilities": [
      "symbiosis",
      "telepathy",
      "inner-focus"
    ],
    "types": [
      "psychic",
      "normal"
    ],
    "height": 1.5,
    "weight": 76,
    "imgId": "765"
  },
  {
    "id": 766,
    "species": "Teamwork Pokémon",
    "description": "They battle with hard berries for weapons.\nTheir techniques are passed from the boss to\nthe group, generation upon generation.",
    "name": "passimian",
    "abilities": [
      "defiant",
      "receiver"
    ],
    "types": [
      "fighting"
    ],
    "height": 2,
    "weight": 82.8,
    "imgId": "766"
  },
  {
    "id": 767,
    "species": "Turn Tail Pokémon",
    "description": "Its habitat varies from beaches to seabeds.\nA natural scavenger, it will gleefully chow down\non anything edible, no matter how rotten.",
    "name": "wimpod",
    "abilities": [
      "wimp-out"
    ],
    "types": [
      "water",
      "bug"
    ],
    "height": 0.5,
    "weight": 12,
    "imgId": "767"
  },
  {
    "id": 768,
    "species": "Hard Scale Pokémon",
    "description": "It battles skillfully with its six arms, but spends\nmost of its time peacefully meditating in caves\ndeep beneath the sea.",
    "name": "golisopod",
    "abilities": [
      "emergency-exit"
    ],
    "types": [
      "water",
      "bug"
    ],
    "height": 2,
    "weight": 108,
    "imgId": "768"
  },
  {
    "id": 769,
    "species": "Sand Heap Pokémon",
    "description": "It takes control of anyone who puts a hand in its\nmouth. And so it adds to the accumulation of\nits sand-mound body.",
    "name": "sandygast",
    "abilities": [
      "sand-veil",
      "water-compaction"
    ],
    "types": [
      "ground",
      "ghost"
    ],
    "height": 0.5,
    "weight": 70,
    "imgId": "769"
  },
  {
    "id": 770,
    "species": "Sand Castle Pokémon",
    "description": "Buried beneath the castle are masses of\ndried-up bones from those whose vitality\nit has drained.",
    "name": "palossand",
    "abilities": [
      "sand-veil",
      "water-compaction"
    ],
    "types": [
      "ground",
      "ghost"
    ],
    "height": 1.3,
    "weight": 250,
    "imgId": "770"
  },
  {
    "id": 771,
    "species": "Sea Cucumber Pokémon",
    "description": "These Pokémon line the beaches. The sticky\nmucous that covers their bodies can be used to\nsoothe sunburned skin. How convenient!",
    "name": "pyukumuku",
    "abilities": [
      "unaware",
      "innards-out"
    ],
    "types": [
      "water"
    ],
    "height": 0.3,
    "weight": 1.2,
    "imgId": "771"
  },
  {
    "id": 772,
    "species": "Synthetic Pokémon",
    "description": "Due to the danger that this synthetic Pokémon\nmay go on a rampage, it wears a control mask\nto restrain its power.",
    "name": "type-null",
    "abilities": [
      "battle-armor"
    ],
    "types": [
      "normal"
    ],
    "height": 1.9,
    "weight": 120.5,
    "imgId": "772"
  },
  {
    "id": 773,
    "species": "Synthetic Pokémon",
    "description": "Although its name was Type: Null at first, the\nboy who evolved it into this form gave it the\nname by which it is now known.",
    "name": "silvally",
    "abilities": [
      "rks-system"
    ],
    "types": [
      "normal"
    ],
    "height": 2.3,
    "weight": 100.5,
    "imgId": "773"
  },
  {
    "id": 774,
    "species": "Meteor Pokémon",
    "description": "Strong impacts can knock it out of its shell. This\nPokémon was born from mutated nanoparticles.",
    "name": "minior-red-meteor",
    "abilities": [
      "shields-down"
    ],
    "types": [
      "flying",
      "rock"
    ],
    "height": 0.3,
    "weight": 40,
    "imgId": "774"
  },
  {
    "id": 775,
    "species": "Drowsing Pokémon",
    "description": "The log it holds was given to it by its parents at\nbirth. It has also been known to cling to the arm\nof a friendly Trainer.",
    "name": "komala",
    "abilities": [
      "comatose"
    ],
    "types": [
      "normal"
    ],
    "height": 0.4,
    "weight": 19.9,
    "imgId": "775"
  },
  {
    "id": 776,
    "species": "Blast Turtle Pokémon",
    "description": "It gushes fire and poisonous gases from its\nnostrils. Its dung is an explosive substance and\ncan be put to various uses.",
    "name": "turtonator",
    "abilities": [
      "shell-armor"
    ],
    "types": [
      "dragon",
      "fire"
    ],
    "height": 2,
    "weight": 212,
    "imgId": "776"
  },
  {
    "id": 777,
    "species": "Roly-Poly Pokémon",
    "description": "The long hairs on its back act as lightning rods.\nThe bolts of lightning it attracts are stored as\nenergy in its electric sac.",
    "name": "togedemaru",
    "abilities": [
      "sturdy",
      "lightning-rod",
      "iron-barbs"
    ],
    "types": [
      "steel",
      "electric"
    ],
    "height": 0.3,
    "weight": 3.3,
    "imgId": "777"
  },
  {
    "id": 778,
    "species": "Disguise Pokémon",
    "description": "A lonely Pokémon, it conceals its terrifying\nappearance beneath an old rag so it can get\ncloser to people and other Pokémon.",
    "name": "mimikyu-disguised",
    "abilities": [
      "disguise"
    ],
    "types": [
      "fairy",
      "ghost"
    ],
    "height": 0.2,
    "weight": 0.7,
    "imgId": "778"
  },
  {
    "id": 779,
    "species": "Gnash Teeth Pokémon",
    "description": "It stuns its prey with psychokinesis and then\ngrinds them to mush with its strong teeth.\nEven Shellder’s shell is no match for it.",
    "name": "bruxish",
    "abilities": [
      "wonder-skin",
      "strong-jaw",
      "dazzling"
    ],
    "types": [
      "psychic",
      "water"
    ],
    "height": 0.9,
    "weight": 19,
    "imgId": "779"
  },
  {
    "id": 780,
    "species": "Placid Pokémon",
    "description": "This Pokémon is friendly to people and loves\nchildren most of all. It comes from deep in the\nmountains to play with children it likes in town.",
    "name": "drampa",
    "abilities": [
      "cloud-nine",
      "sap-sipper",
      "berserk"
    ],
    "types": [
      "dragon",
      "normal"
    ],
    "height": 3,
    "weight": 185,
    "imgId": "780"
  },
  {
    "id": 781,
    "species": "Sea Creeper Pokémon",
    "description": "The soul of seaweed adrift in the waves became\nreborn as this Pokémon. It maintains itself with\nnew infusions of seabed detritus and seaweed.",
    "name": "dhelmise",
    "abilities": [
      "steelworker"
    ],
    "types": [
      "grass",
      "ghost"
    ],
    "height": 3.9,
    "weight": 210,
    "imgId": "781"
  },
  {
    "id": 782,
    "species": "Scaly Pokémon",
    "description": "They live in mountains where no trace of\nhumans can be detected. Jangmo-o grow\nlittle by little as they battle one another.",
    "name": "jangmo-o",
    "abilities": [
      "overcoat",
      "soundproof",
      "bulletproof"
    ],
    "types": [
      "dragon"
    ],
    "height": 0.6,
    "weight": 29.7,
    "imgId": "782"
  },
  {
    "id": 783,
    "species": "Scaly Pokémon",
    "description": "It sheds and regrows its scales on a continuous\nbasis. The scales become harder and sharper\neach time they’re regrown.",
    "name": "hakamo-o",
    "abilities": [
      "overcoat",
      "soundproof",
      "bulletproof"
    ],
    "types": [
      "fighting",
      "dragon"
    ],
    "height": 1.2,
    "weight": 47,
    "imgId": "783"
  },
  {
    "id": 784,
    "species": "Scaly Pokémon",
    "description": "Its rigid scales function as offense and defense.\nIn the past, its scales were processed and used\nto make weapons and other commodities.",
    "name": "kommo-o",
    "abilities": [
      "overcoat",
      "soundproof",
      "bulletproof"
    ],
    "types": [
      "fighting",
      "dragon"
    ],
    "height": 1.6,
    "weight": 78.2,
    "imgId": "784"
  },
  {
    "id": 785,
    "species": "Land Spirit Pokémon",
    "description": "It confuses its enemies by flying too quickly for\nthe eye to follow. It has a hair-trigger temper\nbut forgets what made it angry an instant later.",
    "name": "tapu-koko",
    "abilities": [
      "telepathy",
      "electric-surge"
    ],
    "types": [
      "fairy",
      "electric"
    ],
    "height": 1.8,
    "weight": 20.5,
    "imgId": "785"
  },
  {
    "id": 786,
    "species": "Land Spirit Pokémon",
    "description": "As it flutters about, it scatters its strangely\nglowing scales. Touching them is said to restore\ngood health on the spot.",
    "name": "tapu-lele",
    "abilities": [
      "telepathy",
      "psychic-surge"
    ],
    "types": [
      "fairy",
      "psychic"
    ],
    "height": 1.2,
    "weight": 18.6,
    "imgId": "786"
  },
  {
    "id": 787,
    "species": "Land Spirit Pokémon",
    "description": "The guardian deity of Ula’ula is a lazy Pokémon.\nIt commands plants to immobilize its foes and\nthen deals them a savage blow with its horns.",
    "name": "tapu-bulu",
    "abilities": [
      "telepathy",
      "grassy-surge"
    ],
    "types": [
      "fairy",
      "grass"
    ],
    "height": 1.9,
    "weight": 45.5,
    "imgId": "787"
  },
  {
    "id": 788,
    "species": "Land Spirit Pokémon",
    "description": "The guardian deity of Poni, it can control water.\nPeople say it can create pure water that will\nwash away any uncleanness.",
    "name": "tapu-fini",
    "abilities": [
      "telepathy",
      "misty-surge"
    ],
    "types": [
      "fairy",
      "water"
    ],
    "height": 1.3,
    "weight": 21.2,
    "imgId": "788"
  },
  {
    "id": 789,
    "species": "Nebula Pokémon",
    "description": "In ages past, it was called the child of the stars.\nIt’s said to be a Pokémon from another world,\nbut no specific details are known.",
    "name": "cosmog",
    "abilities": [
      "unaware"
    ],
    "types": [
      "psychic"
    ],
    "height": 0.2,
    "weight": 0.1,
    "imgId": "789"
  },
  {
    "id": 790,
    "species": "Protostar Pokémon",
    "description": "There’s something accumulating around the\nblack core within its hard shell. People think\nthis Pokémon may come from another world.",
    "name": "cosmoem",
    "abilities": [
      "sturdy"
    ],
    "types": [
      "psychic"
    ],
    "height": 0.1,
    "weight": 999.9,
    "imgId": "790"
  },
  {
    "id": 791,
    "species": "Sunne Pokémon",
    "description": "This Pokémon is said to be a male evolution of\nCosmog. At the activation of its third eye, it\ndeparts for another world.",
    "name": "solgaleo",
    "abilities": [
      "full-metal-body"
    ],
    "types": [
      "steel",
      "psychic"
    ],
    "height": 3.4,
    "weight": 230,
    "imgId": "791"
  },
  {
    "id": 792,
    "species": "Moone Pokémon",
    "description": "Said to live in another world, this Pokémon\ndevours light, drawing the moonless dark veil of\nnight over the brightness of day.",
    "name": "lunala",
    "abilities": [
      "shadow-shield"
    ],
    "types": [
      "ghost",
      "psychic"
    ],
    "height": 4,
    "weight": 120,
    "imgId": "792"
  },
  {
    "id": 793,
    "species": "Parasite Pokémon",
    "description": "One of the Ultra Beasts. It’s unclear whether or\nnot this Pokémon is sentient, but sometimes it\ncan be observed behaving like a young girl.",
    "name": "nihilego",
    "abilities": [
      "beast-boost"
    ],
    "types": [
      "poison",
      "rock"
    ],
    "height": 1.2,
    "weight": 55.5,
    "imgId": "793"
  },
  {
    "id": 794,
    "species": "Swollen Pokémon",
    "description": "A mysterious life-form called an Ultra Beast.\nWitnesses saw it pulverize a dump truck with a\nsingle punch.",
    "name": "buzzwole",
    "abilities": [
      "beast-boost"
    ],
    "types": [
      "fighting",
      "bug"
    ],
    "height": 2.4,
    "weight": 333.6,
    "imgId": "794"
  },
  {
    "id": 795,
    "species": "Lissome Pokémon",
    "description": "One of the Ultra Beasts. It refuses to touch\nanything, perhaps because it senses some\nuncleanness in this world.",
    "name": "pheromosa",
    "abilities": [
      "beast-boost"
    ],
    "types": [
      "fighting",
      "bug"
    ],
    "height": 1.8,
    "weight": 25,
    "imgId": "795"
  },
  {
    "id": 796,
    "species": "Glowing Pokémon",
    "description": "It appeared from the Ultra Wormhole. It raided a\npower plant, so people think it energizes itself\nwith electricity.",
    "name": "xurkitree",
    "abilities": [
      "beast-boost"
    ],
    "types": [
      "electric"
    ],
    "height": 3.8,
    "weight": 100,
    "imgId": "796"
  },
  {
    "id": 797,
    "species": "Launch Pokémon",
    "description": "One kind of Ultra Beast. Witnesses have seen it\nburn down a forest by expelling gas from its\ntwo arms.",
    "name": "celesteela",
    "abilities": [
      "beast-boost"
    ],
    "types": [
      "flying",
      "steel"
    ],
    "height": 9.2,
    "weight": 999.9,
    "imgId": "797"
  },
  {
    "id": 798,
    "species": "Drawn Sword Pokémon",
    "description": "One of the Ultra Beast life-forms, it was\nobserved cutting down a gigantic steel tower\nwith one stroke of its blade.",
    "name": "kartana",
    "abilities": [
      "beast-boost"
    ],
    "types": [
      "steel",
      "grass"
    ],
    "height": 0.3,
    "weight": 0.1,
    "imgId": "798"
  },
  {
    "id": 799,
    "species": "Junkivore Pokémon",
    "description": "A dangerous Ultra Beast, it appears to be eating\nconstantly, but for some reason its droppings\nhave never been found.",
    "name": "guzzlord",
    "abilities": [
      "beast-boost"
    ],
    "types": [
      "dragon",
      "dark"
    ],
    "height": 5.5,
    "weight": 888,
    "imgId": "799"
  },
  {
    "id": 800,
    "species": "Prism Pokémon",
    "description": "Light is apparently the source of its energy.\nIt has an extraordinarily vicious disposition\nand is constantly firing off laser beams.",
    "name": "necrozma",
    "abilities": [
      "prism-armor"
    ],
    "types": [
      "psychic"
    ],
    "height": 2.4,
    "weight": 230,
    "imgId": "800"
  },
  {
    "id": 801,
    "species": "Artificial Pokémon",
    "description": "Its mechanized body is merely a vessel. Its true\nself is its Soul-Heart, an artificial soul.",
    "name": "magearna",
    "abilities": [
      "soul-heart"
    ],
    "types": [
      "fairy",
      "steel"
    ],
    "height": 1,
    "weight": 80.5,
    "imgId": "801"
  },
  {
    "id": 802,
    "species": "Gloomdweller Pokémon",
    "description": "It lurks in the shadows of others, copying their\nmovements and powers. This Pokémon is craven\nand cowering.",
    "name": "marshadow",
    "abilities": [
      "technician"
    ],
    "types": [
      "ghost",
      "fighting"
    ],
    "height": 0.7,
    "weight": 22.2,
    "imgId": "802"
  }
]

const evolution = [{
    "1": "bulbasaur",
    "2": "ivysaur",
    "3": "venusaur",
    "id": 1
  },
  {
    "1": "charmander",
    "2": "charmeleon",
    "3": "charizard",
    "id": 2
  },
  {
    "1": "squirtle",
    "2": "wartortle",
    "3": "blastoise",
    "id": 3
  },
  {
    "1": "caterpie",
    "2": "metapod",
    "3": "butterfree",
    "id": 4
  },
  {
    "1": "weedle",
    "2": "kakuna",
    "3": "beedrill",
    "id": 5
  },
  {
    "1": "pidgey",
    "2": "pidgeotto",
    "3": "pidgeot",
    "id": 6
  },
  {
    "1": "rattata",
    "2": "raticate",
    "id": 7
  },
  {
    "1": "spearow",
    "2": "fearow",
    "id": 8
  },
  {
    "1": "ekans",
    "2": "arbok",
    "id": 9
  },
  {
    "1": "pichu",
    "2": "pikachu",
    "3": "raichu",
    "id": 10
  },
  {
    "1": "sandshrew",
    "2": "sandslash",
    "id": 11
  },
  {
    "1": "nidoran-f",
    "2": "nidorina",
    "3": "nidoqueen",
    "id": 12
  },
  {
    "1": "nidoran-m",
    "2": "nidorino",
    "3": "nidoking",
    "id": 13
  },
  {
    "1": "cleffa",
    "2": "clefairy",
    "3": "clefable",
    "id": 14
  },
  {
    "1": "vulpix",
    "2": "ninetales",
    "id": 15
  },
  {
    "1": "igglybuff",
    "2": "jigglypuff",
    "3": "wigglytuff",
    "id": 16
  },
  {
    "1": "zubat",
    "2": "golbat",
    "3": "crobat",
    "id": 17
  },
  {
    "1": "oddish",
    "2": "gloom",
    "3": "vileplume",
    "id": 18
  },
  {
    "1": "paras",
    "2": "parasect",
    "id": 19
  },
  {
    "1": "venonat",
    "2": "venomoth",
    "id": 20
  },
  {
    "1": "diglett",
    "2": "dugtrio",
    "id": 21
  },
  {
    "1": "meowth",
    "2": "persian",
    "id": 22
  },
  {
    "1": "psyduck",
    "2": "golduck",
    "id": 23
  },
  {
    "1": "mankey",
    "2": "primeape",
    "id": 24
  },
  {
    "1": "growlithe",
    "2": "arcanine",
    "id": 25
  },
  {
    "1": "poliwag",
    "2": "poliwhirl",
    "3": "poliwrath",
    "id": 26
  },
  {
    "1": "abra",
    "2": "kadabra",
    "3": "alakazam",
    "id": 27
  },
  {
    "1": "machop",
    "2": "machoke",
    "3": "machamp",
    "id": 28
  },
  {
    "1": "bellsprout",
    "2": "weepinbell",
    "3": "victreebel",
    "id": 29
  },
  {
    "1": "tentacool",
    "2": "tentacruel",
    "id": 30
  },
  {
    "1": "geodude",
    "2": "graveler",
    "3": "golem",
    "id": 31
  },
  {
    "1": "ponyta",
    "2": "rapidash",
    "id": 32
  },
  {
    "1": "slowpoke",
    "2": "slowbro",
    "id": 33
  },
  {
    "1": "magnemite",
    "2": "magneton",
    "3": "magnezone",
    "id": 34
  },
  {
    "1": "farfetchd",
    "id": 35
  },
  {
    "1": "doduo",
    "2": "dodrio",
    "id": 36
  },
  {
    "1": "seel",
    "2": "dewgong",
    "id": 37
  },
  {
    "1": "grimer",
    "2": "muk",
    "id": 38
  },
  {
    "1": "shellder",
    "2": "cloyster",
    "id": 39
  },
  {
    "1": "gastly",
    "2": "haunter",
    "3": "gengar",
    "id": 40
  },
  {
    "1": "onix",
    "2": "steelix",
    "id": 41
  },
  {
    "1": "drowzee",
    "2": "hypno",
    "id": 42
  },
  {
    "1": "krabby",
    "2": "kingler",
    "id": 43
  },
  {
    "1": "voltorb",
    "2": "electrode",
    "id": 44
  },
  {
    "1": "exeggcute",
    "2": "exeggutor",
    "id": 45
  },
  {
    "1": "cubone",
    "2": "marowak",
    "id": 46
  },
  {
    "1": "tyrogue",
    "2": "hitmonlee",
    "id": 47
  },
  {
    "1": "lickitung",
    "2": "lickilicky",
    "id": 48
  },
  {
    "1": "koffing",
    "2": "weezing",
    "id": 49
  },
  {
    "1": "rhyhorn",
    "2": "rhydon",
    "3": "rhyperior",
    "id": 50
  },
  {
    "1": "happiny",
    "2": "chansey",
    "3": "blissey",
    "id": 51
  },
  {
    "1": "tangela",
    "2": "tangrowth",
    "id": 52
  },
  {
    "1": "kangaskhan",
    "id": 53
  },
  {
    "1": "horsea",
    "2": "seadra",
    "3": "kingdra",
    "id": 54
  },
  {
    "1": "goldeen",
    "2": "seaking",
    "id": 55
  },
  {
    "1": "staryu",
    "2": "starmie",
    "id": 56
  },
  {
    "1": "mime-jr",
    "2": "mr-mime",
    "id": 57
  },
  {
    "1": "scyther",
    "2": "scizor",
    "id": 58
  },
  {
    "1": "smoochum",
    "2": "jynx",
    "id": 59
  },
  {
    "1": "elekid",
    "2": "electabuzz",
    "3": "electivire",
    "id": 60
  },
  {
    "1": "magby",
    "2": "magmar",
    "3": "magmortar",
    "id": 61
  },
  {
    "1": "pinsir",
    "id": 62
  },
  {
    "1": "tauros",
    "id": 63
  },
  {
    "1": "magikarp",
    "2": "gyarados",
    "id": 64
  },
  {
    "1": "lapras",
    "id": 65
  },
  {
    "1": "ditto",
    "id": 66
  },
  {
    "1": "eevee",
    "2": "vaporeon",
    "id": 67
  },
  {
    "1": "porygon",
    "2": "porygon2",
    "3": "porygon-z",
    "id": 68
  },
  {
    "1": "omanyte",
    "2": "omastar",
    "id": 69
  },
  {
    "1": "kabuto",
    "2": "kabutops",
    "id": 70
  },
  {
    "1": "aerodactyl",
    "id": 71
  },
  {
    "1": "munchlax",
    "2": "snorlax",
    "id": 72
  },
  {
    "1": "articuno",
    "id": 73
  },
  {
    "1": "zapdos",
    "id": 74
  },
  {
    "1": "moltres",
    "id": 75
  },
  {
    "1": "dratini",
    "2": "dragonair",
    "3": "dragonite",
    "id": 76
  },
  {
    "1": "mewtwo",
    "id": 77
  },
  {
    "1": "mew",
    "id": 78
  },
  {
    "1": "chikorita",
    "2": "bayleef",
    "3": "meganium",
    "id": 79
  },
  {
    "1": "cyndaquil",
    "2": "quilava",
    "3": "typhlosion",
    "id": 80
  },
  {
    "1": "totodile",
    "2": "croconaw",
    "3": "feraligatr",
    "id": 81
  },
  {
    "1": "sentret",
    "2": "furret",
    "id": 82
  },
  {
    "1": "hoothoot",
    "2": "noctowl",
    "id": 83
  },
  {
    "1": "ledyba",
    "2": "ledian",
    "id": 84
  },
  {
    "1": "spinarak",
    "2": "ariados",
    "id": 85
  },
  {
    "1": "togepi",
    "2": "togetic",
    "3": "togekiss",
    "id": 87
  },
  {
    "1": "chinchou",
    "2": "lanturn",
    "id": 86
  },
  {
    "1": "natu",
    "2": "xatu",
    "id": 88
  },
  {
    "1": "mareep",
    "2": "flaaffy",
    "3": "ampharos",
    "id": 89
  },
  {
    "1": "azurill",
    "2": "marill",
    "3": "azumarill",
    "id": 90
  },
  {
    "1": "bonsly",
    "2": "sudowoodo",
    "id": 91
  },
  {
    "1": "hoppip",
    "2": "skiploom",
    "3": "jumpluff",
    "id": 92
  },
  {
    "1": "aipom",
    "2": "ambipom",
    "id": 93
  },
  {
    "1": "sunkern",
    "2": "sunflora",
    "id": 94
  },
  {
    "1": "yanma",
    "2": "yanmega",
    "id": 95
  },
  {
    "1": "wooper",
    "2": "quagsire",
    "id": 96
  },
  {
    "1": "murkrow",
    "2": "honchkrow",
    "id": 97
  },
  {
    "1": "misdreavus",
    "2": "mismagius",
    "id": 98
  },
  {
    "1": "unown",
    "id": 99
  },
  {
    "1": "wynaut",
    "2": "wobbuffet",
    "id": 100
  },
  {
    "1": "girafarig",
    "id": 101
  },
  {
    "1": "pineco",
    "2": "forretress",
    "id": 102
  },
  {
    "1": "dunsparce",
    "id": 103
  },
  {
    "1": "gligar",
    "2": "gliscor",
    "id": 104
  },
  {
    "1": "snubbull",
    "2": "granbull",
    "id": 105
  },
  {
    "1": "shuckle",
    "id": 107
  },
  {
    "1": "qwilfish",
    "id": 106
  },
  {
    "1": "heracross",
    "id": 108
  },
  {
    "1": "sneasel",
    "2": "weavile",
    "id": 109
  },
  {
    "1": "teddiursa",
    "2": "ursaring",
    "id": 110
  },
  {
    "1": "slugma",
    "2": "magcargo",
    "id": 111
  },
  {
    "1": "swinub",
    "2": "piloswine",
    "3": "mamoswine",
    "id": 112
  },
  {
    "1": "corsola",
    "id": 113
  },
  {
    "1": "remoraid",
    "2": "octillery",
    "id": 114
  },
  {
    "1": "delibird",
    "id": 115
  },
  {
    "1": "mantyke",
    "2": "mantine",
    "id": 116
  },
  {
    "1": "skarmory",
    "id": 117
  },
  {
    "1": "houndour",
    "2": "houndoom",
    "id": 118
  },
  {
    "1": "phanpy",
    "2": "donphan",
    "id": 119
  },
  {
    "1": "stantler",
    "id": 120
  },
  {
    "1": "smeargle",
    "id": 121
  },
  {
    "1": "miltank",
    "id": 122
  },
  {
    "1": "raikou",
    "id": 123
  },
  {
    "1": "entei",
    "id": 124
  },
  {
    "1": "suicune",
    "id": 125
  },
  {
    "1": "larvitar",
    "2": "pupitar",
    "3": "tyranitar",
    "id": 126
  },
  {
    "1": "lugia",
    "id": 127
  },
  {
    "1": "ho-oh",
    "id": 128
  },
  {
    "1": "celebi",
    "id": 129
  },
  {
    "1": "treecko",
    "2": "grovyle",
    "3": "sceptile",
    "id": 130
  },
  {
    "1": "torchic",
    "2": "combusken",
    "3": "blaziken",
    "id": 131
  },
  {
    "1": "mudkip",
    "2": "marshtomp",
    "3": "swampert",
    "id": 132
  },
  {
    "1": "poochyena",
    "2": "mightyena",
    "id": 133
  },
  {
    "1": "zigzagoon",
    "2": "linoone",
    "id": 134
  },
  {
    "1": "wurmple",
    "2": "silcoon",
    "3": "beautifly",
    "id": 135
  },
  {
    "1": "lotad",
    "2": "lombre",
    "3": "ludicolo",
    "id": 136
  },
  {
    "1": "seedot",
    "2": "nuzleaf",
    "3": "shiftry",
    "id": 137
  },
  {
    "1": "taillow",
    "2": "swellow",
    "id": 138
  },
  {
    "1": "wingull",
    "2": "pelipper",
    "id": 139
  },
  {
    "1": "ralts",
    "2": "kirlia",
    "3": "gardevoir",
    "id": 140
  },
  {
    "1": "surskit",
    "2": "masquerain",
    "id": 141
  },
  {
    "1": "shroomish",
    "2": "breloom",
    "id": 142
  },
  {
    "1": "nincada",
    "2": "ninjask",
    "id": 144
  },
  {
    "1": "whismur",
    "2": "loudred",
    "3": "exploud",
    "id": 145
  },
  {
    "1": "makuhita",
    "2": "hariyama",
    "id": 146
  },
  {
    "1": "nosepass",
    "2": "probopass",
    "id": 147
  },
  {
    "1": "skitty",
    "2": "delcatty",
    "id": 148
  },
  {
    "1": "sableye",
    "id": 149
  },
  {
    "1": "mawile",
    "id": 150
  },
  {
    "1": "aron",
    "2": "lairon",
    "3": "aggron",
    "id": 151
  },
  {
    "1": "meditite",
    "2": "medicham",
    "id": 152
  },
  {
    "1": "electrike",
    "2": "manectric",
    "id": 153
  },
  {
    "1": "plusle",
    "id": 154
  },
  {
    "1": "minun",
    "id": 155
  },
  {
    "1": "volbeat",
    "id": 156
  },
  {
    "1": "illumise",
    "id": 157
  },
  {
    "1": "budew",
    "2": "roselia",
    "3": "roserade",
    "id": 158
  },
  {
    "1": "gulpin",
    "2": "swalot",
    "id": 159
  },
  {
    "1": "carvanha",
    "2": "sharpedo",
    "id": 160
  },
  {
    "1": "wailmer",
    "2": "wailord",
    "id": 161
  },
  {
    "1": "numel",
    "2": "camerupt",
    "id": 162
  },
  {
    "1": "torkoal",
    "id": 163
  },
  {
    "1": "spoink",
    "2": "grumpig",
    "id": 164
  },
  {
    "1": "spinda",
    "id": 165
  },
  {
    "1": "trapinch",
    "2": "vibrava",
    "3": "flygon",
    "id": 166
  },
  {
    "1": "cacnea",
    "2": "cacturne",
    "id": 167
  },
  {
    "1": "swablu",
    "2": "altaria",
    "id": 168
  },
  {
    "1": "zangoose",
    "id": 169
  },
  {
    "1": "seviper",
    "id": 170
  },
  {
    "1": "lunatone",
    "id": 171
  },
  {
    "1": "solrock",
    "id": 172
  },
  {
    "1": "barboach",
    "2": "whiscash",
    "id": 173
  },
  {
    "1": "corphish",
    "2": "crawdaunt",
    "id": 174
  },
  {
    "1": "baltoy",
    "2": "claydol",
    "id": 175
  },
  {
    "1": "lileep",
    "2": "cradily",
    "id": 176
  },
  {
    "1": "anorith",
    "2": "armaldo",
    "id": 177
  },
  {
    "1": "feebas",
    "2": "milotic",
    "id": 178
  },
  {
    "1": "castform",
    "id": 179
  },
  {
    "1": "kecleon",
    "id": 180
  },
  {
    "1": "shuppet",
    "2": "banette",
    "id": 181
  },
  {
    "1": "duskull",
    "2": "dusclops",
    "3": "dusknoir",
    "id": 182
  },
  {
    "1": "tropius",
    "id": 183
  },
  {
    "1": "chingling",
    "2": "chimecho",
    "id": 184
  },
  {
    "1": "absol",
    "id": 185
  },
  {
    "1": "snorunt",
    "2": "glalie",
    "id": 186
  },
  {
    "1": "spheal",
    "2": "sealeo",
    "3": "walrein",
    "id": 187
  },
  {
    "1": "clamperl",
    "2": "huntail",
    "id": 188
  },
  {
    "1": "luvdisc",
    "id": 190
  },
  {
    "1": "bagon",
    "2": "shelgon",
    "3": "salamence",
    "id": 191
  },
  {
    "1": "beldum",
    "2": "metang",
    "3": "metagross",
    "id": 192
  },
  {
    "1": "regirock",
    "id": 193
  },
  {
    "1": "regice",
    "id": 194
  },
  {
    "1": "registeel",
    "id": 195
  },
  {
    "1": "latias",
    "id": 196
  },
  {
    "1": "latios",
    "id": 197
  },
  {
    "1": "kyogre",
    "id": 198
  },
  {
    "1": "groudon",
    "id": 199
  },
  {
    "1": "rayquaza",
    "id": 200
  },
  {
    "1": "jirachi",
    "id": 201
  },
  {
    "1": "deoxys",
    "id": 202
  },
  {
    "1": "turtwig",
    "2": "grotle",
    "3": "torterra",
    "id": 203
  },
  {
    "1": "chimchar",
    "2": "monferno",
    "3": "infernape",
    "id": 204
  },
  {
    "1": "piplup",
    "2": "prinplup",
    "3": "empoleon",
    "id": 205
  },
  {
    "1": "starly",
    "2": "staravia",
    "3": "staraptor",
    "id": 206
  },
  {
    "1": "bidoof",
    "2": "bibarel",
    "id": 207
  },
  {
    "1": "kricketot",
    "2": "kricketune",
    "id": 208
  },
  {
    "1": "shinx",
    "2": "luxio",
    "3": "luxray",
    "id": 209
  },

  {
    "1": "cranidos",
    "2": "rampardos",
    "id": 211
  },
  {
    "1": "shieldon",
    "2": "bastiodon",
    "id": 212
  },
  {
    "1": "burmy",
    "2": "wormadam",
    "id": 213
  },
  {
    "1": "combee",
    "2": "vespiquen",
    "id": 214
  },
  {
    "1": "pachirisu",
    "id": 215
  },
  {
    "1": "buizel",
    "2": "floatzel",
    "id": 216
  },
  {
    "1": "cherubi",
    "2": "cherrim",
    "id": 217
  },
  {
    "1": "shellos",
    "2": "gastrodon",
    "id": 218
  },
  {
    "1": "drifloon",
    "2": "drifblim",
    "id": 219
  },
  {
    "1": "buneary",
    "2": "lopunny",
    "id": 220
  },
  {
    "1": "glameow",
    "2": "purugly",
    "id": 221
  },

  {
    "1": "glameow",
    "2": "purugly",
    "id": 221
  },
  {
    "1": "stunky",
    "2": "skuntank",
    "id": 223
  },
  {
    "1": "bronzor",
    "2": "bronzong",
    "id": 224
  },
  {
    "1": "chatot",
    "id": 228
  },
  {
    "1": "spiritomb",
    "id": 229
  },
  {
    "1": "gible",
    "2": "gabite",
    "3": "garchomp",
    "id": 230
  },
  {
    "1": "riolu",
    "2": "lucario",
    "id": 232
  },
  {
    "1": "hippopotas",
    "2": "hippowdon",
    "id": 233
  },
  {
    "1": "skorupi",
    "2": "drapion",
    "id": 234
  },
  {
    "1": "croagunk",
    "2": "toxicroak",
    "id": 235
  },
  {
    "1": "carnivine",
    "id": 236
  },
  {
    "1": "finneon",
    "2": "lumineon",
    "id": 237
  },
  {
    "1": "snover",
    "2": "abomasnow",
    "id": 239
  },
  {
    "1": "rotom",
    "id": 240
  },
  {
    "1": "uxie",
    "id": 241
  },
  {
    "1": "mesprit",
    "id": 242
  },
  {
    "1": "azelf",
    "id": 243
  },
  {
    "1": "dialga",
    "id": 244
  },
  {
    "1": "palkia",
    "id": 245
  },
  {
    "1": "heatran",
    "id": 246
  },
  {
    "1": "regigigas",
    "id": 247
  },
  {
    "1": "giratina",
    "id": 248
  },
  {
    "1": "cresselia",
    "id": 249
  },
  {
    "1": "manaphy",
    "id": 250
  },
  {
    "1": "darkrai",
    "id": 252
  },
  {
    "1": "shaymin",
    "id": 253
  },
  {
    "1": "arceus",
    "id": 254
  },
  {
    "1": "victini",
    "id": 255
  },
  {
    "1": "snivy",
    "2": "servine",
    "3": "serperior",
    "id": 256
  },
  {
    "1": "tepig",
    "2": "pignite",
    "3": "emboar",
    "id": 257
  },
  {
    "1": "oshawott",
    "2": "dewott",
    "3": "samurott",
    "id": 258
  },
  {
    "1": "patrat",
    "2": "watchog",
    "id": 259
  },
  {
    "1": "lillipup",
    "2": "herdier",
    "3": "stoutland",
    "id": 260
  },
  {
    "1": "purrloin",
    "2": "liepard",
    "id": 261
  },
  {
    "1": "pansage",
    "2": "simisage",
    "id": 262
  },
  {
    "1": "pansear",
    "2": "simisear",
    "id": 263
  },
  {
    "1": "panpour",
    "2": "simipour",
    "id": 264
  },
  {
    "1": "munna",
    "2": "musharna",
    "id": 265
  },
  {
    "1": "pidove",
    "2": "tranquill",
    "3": "unfezant",
    "id": 266
  },
  {
    "1": "blitzle",
    "2": "zebstrika",
    "id": 267
  },
  {
    "1": "roggenrola",
    "2": "boldore",
    "3": "gigalith",
    "id": 268
  },
  {
    "1": "woobat",
    "2": "swoobat",
    "id": 269
  },
  {
    "1": "drilbur",
    "2": "excadrill",
    "id": 270
  },
  {
    "1": "audino",
    "id": 271
  },
  {
    "1": "timburr",
    "2": "gurdurr",
    "3": "conkeldurr",
    "id": 272
  },
  {
    "1": "tympole",
    "2": "palpitoad",
    "3": "seismitoad",
    "id": 273
  },
  {
    "1": "throh",
    "id": 274
  },
  {
    "1": "sawk",
    "id": 275
  },
  {
    "1": "sewaddle",
    "2": "swadloon",
    "3": "leavanny",
    "id": 276
  },
  {
    "1": "venipede",
    "2": "whirlipede",
    "3": "scolipede",
    "id": 277
  },
  {
    "1": "cottonee",
    "2": "whimsicott",
    "id": 278
  },
  {
    "1": "petilil",
    "2": "lilligant",
    "id": 279
  },
  {
    "1": "basculin",
    "id": 280
  },
  {
    "1": "sandile",
    "2": "krokorok",
    "3": "krookodile",
    "id": 281
  },
  {
    "1": "darumaka",
    "2": "darmanitan",
    "id": 282
  },
  {
    "1": "maractus",
    "id": 283
  },
  {
    "1": "dwebble",
    "2": "crustle",
    "id": 284
  },
  {
    "1": "scraggy",
    "2": "scrafty",
    "id": 285
  },
  {
    "1": "sigilyph",
    "id": 286
  },
  {
    "1": "yamask",
    "2": "cofagrigus",
    "id": 287
  },
  {
    "1": "tirtouga",
    "2": "carracosta",
    "id": 288
  },
  {
    "1": "archen",
    "2": "archeops",
    "id": 289
  },
  {
    "1": "trubbish",
    "2": "garbodor",
    "id": 290
  },
  {
    "1": "zorua",
    "2": "zoroark",
    "id": 291
  },
  {
    "1": "minccino",
    "2": "cinccino",
    "id": 292
  },
  {
    "1": "gothita",
    "2": "gothorita",
    "3": "gothitelle",
    "id": 293
  },
  {
    "1": "solosis",
    "2": "duosion",
    "3": "reuniclus",
    "id": 294
  },
  {
    "1": "ducklett",
    "2": "swanna",
    "id": 295
  },
  {
    "1": "vanillite",
    "2": "vanillish",
    "3": "vanilluxe",
    "id": 296
  },
  {
    "1": "deerling",
    "2": "sawsbuck",
    "id": 297
  },
  {
    "1": "emolga",
    "id": 298
  },
  {
    "1": "karrablast",
    "2": "escavalier",
    "id": 299
  },
  {
    "1": "foongus",
    "2": "amoonguss",
    "id": 300
  },
  {
    "1": "frillish",
    "2": "jellicent",
    "id": 301
  },
  {
    "1": "alomomola",
    "id": 302
  },
  {
    "1": "joltik",
    "2": "galvantula",
    "id": 303
  },
  {
    "1": "ferroseed",
    "2": "ferrothorn",
    "id": 304
  },
  {
    "1": "klink",
    "2": "klang",
    "3": "klinklang",
    "id": 305
  },
  {
    "1": "tynamo",
    "2": "eelektrik",
    "3": "eelektross",
    "id": 306
  },
  {
    "1": "elgyem",
    "2": "beheeyem",
    "id": 307
  },
  {
    "1": "litwick",
    "2": "lampent",
    "3": "chandelure",
    "id": 308
  },
  {
    "1": "axew",
    "2": "fraxure",
    "3": "haxorus",
    "id": 309
  },
  {
    "1": "cubchoo",
    "2": "beartic",
    "id": 310
  },
  {
    "1": "cryogonal",
    "id": 311
  },
  {
    "1": "shelmet",
    "2": "accelgor",
    "id": 312
  },
  {
    "1": "stunfisk",
    "id": 313
  },
  {
    "1": "mienfoo",
    "2": "mienshao",
    "id": 314
  },
  {
    "1": "druddigon",
    "id": 315
  },
  {
    "1": "golett",
    "2": "golurk",
    "id": 316
  },
  {
    "1": "pawniard",
    "2": "bisharp",
    "id": 317
  },
  {
    "1": "bouffalant",
    "id": 318
  },
  {
    "1": "rufflet",
    "2": "braviary",
    "id": 319
  },
  {
    "1": "vullaby",
    "2": "mandibuzz",
    "id": 320
  },
  {
    "1": "heatmor",
    "id": 321
  },
  {
    "1": "durant",
    "id": 322
  },
  {
    "1": "deino",
    "2": "zweilous",
    "3": "hydreigon",
    "id": 323
  },
  {
    "1": "larvesta",
    "2": "volcarona",
    "id": 324
  },
  {
    "1": "cobalion",
    "id": 325
  },
  {
    "1": "terrakion",
    "id": 326
  },
  {
    "1": "virizion",
    "id": 327
  },
  {
    "1": "tornadus",
    "id": 328
  },
  {
    "1": "thundurus",
    "id": 329
  },
  {
    "1": "reshiram",
    "id": 330
  },
  {
    "1": "zekrom",
    "id": 331
  },
  {
    "1": "landorus",
    "id": 332
  },
  {
    "1": "kyurem",
    "id": 333
  },
  {
    "1": "keldeo",
    "id": 334
  },
  {
    "1": "meloetta",
    "id": 335
  },
  {
    "1": "genesect",
    "id": 336
  },
  {
    "1": "chespin",
    "2": "quilladin",
    "3": "chesnaught",
    "id": 337
  },
  {
    "1": "fennekin",
    "2": "braixen",
    "3": "delphox",
    "id": 338
  },
  {
    "1": "froakie",
    "2": "frogadier",
    "3": "greninja",
    "id": 339
  },
  {
    "1": "bunnelby",
    "2": "diggersby",
    "id": 340
  },
  {
    "1": "fletchling",
    "2": "fletchinder",
    "3": "talonflame",
    "id": 341
  },
  {
    "1": "scatterbug",
    "2": "spewpa",
    "3": "vivillon",
    "id": 342
  },
  {
    "1": "litleo",
    "2": "pyroar",
    "id": 343
  },
  {
    "1": "flabebe",
    "2": "floette",
    "3": "florges",
    "id": 344
  },
  {
    "1": "skiddo",
    "2": "gogoat",
    "id": 345
  },
  {
    "1": "pancham",
    "2": "pangoro",
    "id": 346
  },
  {
    "1": "furfrou",
    "id": 347
  },
  {
    "1": "espurr",
    "2": "meowstic",
    "id": 348
  },
  {
    "1": "honedge",
    "2": "doublade",
    "3": "aegislash",
    "id": 349
  },
  {
    "1": "spritzee",
    "2": "aromatisse",
    "id": 350
  },
  {
    "1": "swirlix",
    "2": "slurpuff",
    "id": 351
  },
  {
    "1": "inkay",
    "2": "malamar",
    "id": 352
  },
  {
    "1": "binacle",
    "2": "barbaracle",
    "id": 353
  },
  {
    "1": "skrelp",
    "2": "dragalge",
    "id": 354
  },
  {
    "1": "clauncher",
    "2": "clawitzer",
    "id": 355
  },
  {
    "1": "helioptile",
    "2": "heliolisk",
    "id": 356
  },
  {
    "1": "tyrunt",
    "2": "tyrantrum",
    "id": 357
  },
  {
    "1": "amaura",
    "2": "aurorus",
    "id": 358
  },
  {
    "1": "hawlucha",
    "id": 359
  },
  {
    "1": "dedenne",
    "id": 360
  },
  {
    "1": "carbink",
    "id": 361
  },
  {
    "1": "goomy",
    "2": "sliggoo",
    "3": "goodra",
    "id": 362
  },
  {
    "1": "klefki",
    "id": 363
  },
  {
    "1": "phantump",
    "2": "trevenant",
    "id": 364
  },
  {
    "1": "pumpkaboo",
    "2": "gourgeist",
    "id": 365
  },
  {
    "1": "bergmite",
    "2": "avalugg",
    "id": 366
  },
  {
    "1": "noibat",
    "2": "noivern",
    "id": 367
  },
  {
    "1": "xerneas",
    "id": 368
  },
  {
    "1": "yveltal",
    "id": 369
  },
  {
    "1": "zygarde",
    "id": 370
  },
  {
    "1": "diancie",
    "id": 371
  },
  {
    "1": "hoopa",
    "id": 372
  },
  {
    "1": "volcanion",
    "id": 373
  },
  {
    "1": "rowlet",
    "2": "dartrix",
    "3": "decidueye",
    "id": 374
  },
  {
    "1": "litten",
    "2": "torracat",
    "3": "incineroar",
    "id": 375
  },
  {
    "1": "popplio",
    "2": "brionne",
    "3": "primarina",
    "id": 376
  },
  {
    "1": "pikipek",
    "2": "trumbeak",
    "3": "toucannon",
    "id": 377
  },
  {
    "1": "yungoos",
    "2": "gumshoos",
    "id": 378
  },
  {
    "1": "grubbin",
    "2": "charjabug",
    "3": "vikavolt",
    "id": 379
  },
  {
    "1": "crabrawler",
    "2": "crabominable",
    "id": 380
  },
  {
    "1": "oricorio",
    "id": 381
  },
  {
    "1": "cutiefly",
    "2": "ribombee",
    "id": 382
  },
  {
    "1": "rockruff",
    "2": "lycanroc",
    "id": 383
  },
  {
    "1": "wishiwashi",
    "id": 384
  },
  {
    "1": "mareanie",
    "2": "toxapex",
    "id": 385
  },
  {
    "1": "mudbray",
    "2": "mudsdale",
    "id": 386
  },
  {
    "1": "dewpider",
    "2": "araquanid",
    "id": 387
  },
  {
    "1": "fomantis",
    "2": "lurantis",
    "id": 388
  },
  {
    "1": "morelull",
    "2": "shiinotic",
    "id": 389
  },
  {
    "1": "salandit",
    "2": "salazzle",
    "id": 390
  },
  {
    "1": "stufful",
    "2": "bewear",
    "id": 391
  },
  {
    "1": "bounsweet",
    "2": "steenee",
    "3": "tsareena",
    "id": 392
  },
  {
    "1": "comfey",
    "id": 393
  },
  {
    "1": "oranguru",
    "id": 394
  },
  {
    "1": "passimian",
    "id": 395
  },
  {
    "1": "wimpod",
    "2": "golisopod",
    "id": 396
  },
  {
    "1": "sandygast",
    "2": "palossand",
    "id": 397
  },
  {
    "1": "pyukumuku",
    "id": 398
  },
  {
    "1": "type-null",
    "2": "silvally",
    "id": 399
  },
  {
    "1": "minior",
    "id": 400
  },
  {
    "1": "komala",
    "id": 401
  },
  {
    "1": "turtonator",
    "id": 402
  },
  {
    "1": "togedemaru",
    "id": 403
  },
  {
    "1": "mimikyu",
    "id": 404
  },
  {
    "1": "bruxish",
    "id": 405
  },
  {
    "1": "drampa",
    "id": 406
  },
  {
    "1": "dhelmise",
    "id": 407
  },
  {
    "1": "jangmo-o",
    "2": "hakamo-o",
    "3": "kommo-o",
    "id": 408
  },
  {
    "1": "tapu-lele",
    "id": 410
  },
  {
    "1": "tapu-koko",
    "id": 409
  },
  {
    "1": "tapu-bulu",
    "id": 411
  },
  {
    "1": "tapu-fini",
    "id": 412
  },
  {
    "1": "cosmog",
    "2": "cosmoem",
    "3": "solgaleo",
    "id": 413
  },
  {
    "1": "nihilego",
    "id": 414
  },
  {
    "1": "buzzwole",
    "id": 415
  },
  {
    "1": "pheromosa",
    "id": 416
  },
  {
    "1": "xurkitree",
    "id": 417
  },
  {
    "1": "celesteela",
    "id": 418
  },
  {
    "1": "kartana",
    "id": 419
  },
  {
    "1": "guzzlord",
    "id": 420
  },
  {
    "1": "necrozma",
    "id": 421
  },
  {
    "1": "magearna",
    "id": 422
  },
  {
    "1": "marshadow",
    "id": 423
  },
  {
    "1": "poipole",
    "2": "naganadel",
    "id": 424
  },
  {
    "1": "stakataka",
    "id": 425
  },
  {
    "1": "blacephalon",
    "id": 426
  },
  {
    "1": "zeraora",
    "id": 427
  },
  {
    "1": "tyrogue",
    "2": "hitmonchan"
  }
]