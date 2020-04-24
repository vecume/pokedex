

const elBackBtn = document.querySelector('.back-btn');
const elWaveWrapper = document.querySelector('.wave-wrapper');
const URL = 'http://pokeapi.glitch.me/v1/pokemon/';


AOS.init()
const P = new Pokedex.Pokedex();

showPokemons(data,true) 
animatePosts();

/////////SEARCH////////

elForm.addEventListener('keyup', (evt) => {
  if (elSearchInput.value.length >= 2) {
    const nameQuery = new RegExp(elSearchInput.value, 'gi');

    const results = data.filter(x =>{
      return x.name.match(nameQuery);
    });
    showPokemons(results)
    animatePosts();
  }
});

//////////////////////////////

window.addEventListener('mousedown', (evt) => {
  if(evt.button === 3 && elAllPokemonsBox.style.display === 'none') {
    elDetailsBox.classList.add('details--deactive');
    elAllPokemonsBox.style.display = 'block';
    setTimeout(function() {
      document.querySelector('.details__pokemon-img').src = 'img/pokeball.png';
    },1000);
  }
});

// console.log(event)s

///LOAD MORE////////////
var counter = 0;
elLoadMoreBtn.addEventListener('click', () => {
  counter += 36;
  showPokemons(data, true, counter);
  animatePosts();
});


//////////////////

elBackBtn.addEventListener('click', () => {
  elDetailsBox.classList.add('details--deactive');
  elAllPokemonsBox.style.display = 'block';
  setTimeout(function() {
    document.querySelector('.details__pokemon-img').src = 'img/pokeball.png';
  },1000);
}); 


elAllPokemonsList.addEventListener('click', (evt) => {
  
  const idTarget = evt.target.offsetParent;
  if (evt.target.offsetParent.matches('li')) {
    elAllPokemonsBox.style.display = 'none';
    elDetailsBox.classList.remove('details--deactive');
    elDetailsBox.classList.add('details--active');
    const id = idTarget.dataset.id;
    let types = data[id - 1].types;
    let colorArr = [];
    let colorNames = colors.map( a => a.split('#')[0]);
    types.forEach(t => {
      if (colorNames.includes(t)) {
        let colorId = colorNames.indexOf(t);
        let colorCode = colors[colorId].split('#')[1];
        colorArr.push(colorCode);
      }
    });
    if (colorArr.length === 1) {
      colorArr.unshift(colorArr[0]);
    }
    elWaveWrapper.style.backgroundColor = `#${colorArr[1]}`;
    const elWaves = document.querySelectorAll('.wave');
    let rocketSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="198"><defs><linearGradient id="a" x1="50%" x2="50%" y1="-10.959%" y2="100%"><stop stop-color="#${colorArr[0]}" stop-opacity=".25" offset="0%"/><stop stop-color="#${colorArr[1]}" offset="100%"/></linearGradient></defs><path fill="url(#a)" fill-rule="evenodd" d="M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z" transform="matrix(-1 0 0 1 1600 0)"/></svg>
    `;
    let encodedSVG = encodeURIComponent(rocketSVG)
    elWaves[0].style.backgroundImage = `url("data:image/svg+xml,${encodedSVG}")`;
    elWaves[1].style.backgroundImage = `url("data:image/svg+xml,${encodedSVG}")`;
    document.querySelector('.details__pokemon-img').src = `https://www.serebii.net/pokemon/art/${data[id - 1].imgId}.png`;
    document.querySelector('.details__pokemon-img').alt = data[id - 1].name;
    document.querySelector('.pokemon-name').textContent = data[id - 1].name;
    document.querySelectorAll('.header__title')[0].style = `border-image-source:linear-gradient(to right,#${colorArr[0]}, #${colorArr[1]});`;
    document.querySelectorAll('.header__title')[1].style = `border-image-source:linear-gradient(to right,#${colorArr[0]}, #${colorArr[1]});`;
    document.querySelectorAll('.header__title')[2].style = `border-image-source:linear-gradient(to right,#${colorArr[0]}, #${colorArr[1]});`;
    document.querySelector('.description__text').textContent = data[id - 1].description;
    const elEvolutionsList = document.querySelector('.evolutions__list');
    elEvolutionsList.innerHTML = '';
    if (getEvolutionList(data[id - 1].name)) {
      const evolutions = getEvolutionList(data[id - 1].name);
      evolutions.forEach(e => {
        if (typeof e !== 'number') {
          const elLi = document.createElement('li');
          const elImg = document.createElement('img');
          const elH3 = document.createElement('h3');
          elH3.textContent = e;
          elImg.src = `https://www.serebii.net/art/th/${getPokemonIdByName(e)}.png`;
          elImg.alt = e;
          elLi.appendChild(elImg);
          elLi.appendChild(elH3);
          elEvolutionsList.appendChild(elLi);
        }
      });
    } else {
      const elH3 = document.createElement('h3');
      elH3.textContent = 'The Pokemon does not evolve!!!';
      elH3.setAttribute('style', 'text-align:center;fonst-size:16px;font-weight:bold;');
      elEvolutionsList.appendChild(elH3);
    }
    
    
    P.getPokemonByName(id)
    .then(function(response) {  
      const elsStats = document.querySelectorAll('.stat__progress span');
      const elsAmounts = document.querySelectorAll('.stat__amount');
      const stats = response.stats.reverse();
      for (let i = 0; i < stats.length; i++) {
        let percent = stats[i].base_stat / 200 * 100;
        elsStats[i].setAttribute('style', `width: ${percent}%; background: linear-gradient(to right, #${colorArr[1]}, #${colorArr[0]});`);
        elsAmounts[i].textContent = stats[i].base_stat;
      }
    });
  }
});

///////TYPES CONTROLLER/////////////
elsAllTypeBtn.forEach( btn => {
  btn.addEventListener('click', (evt) => {
    elsAllTypeBtn.forEach( btn => {
      btn.classList.remove('--active');
      btn.disabled = false;
    });
    btn.classList.add('--active');
    btn.disabled = true;
    let type = evt.target.dataset.type;
    if(type === 'all') {
      showPokemons(data,true, 0, true);
      animatePosts();
      return;
    }
    const sortedByTypeData = data.filter(d => {
      return d.types[0] === type || d.types[1] === type;
    });
    showPokemons(sortedByTypeData);
    animatePosts();
    
  });
});
///////////////////////////////////////


////SHOW POKEMONS LIST//////
