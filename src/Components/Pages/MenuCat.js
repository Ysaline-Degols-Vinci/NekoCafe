import backgroundImg from '../../img/background_clouds.png';
import buddyImg from '../../img/cat_buddy.png';
import whiskersImg from '../../img/cat_whiskers.png';
import miaouImg from '../../img/cat_miaou.png';
import quitImg from '../../img/close_button.png';
import catPinkButton from '../../img/chatspinkbutton.png';
import coffeePinkButton from '../../img/cafespinkbutton.png';
import catPurpleButton from '../../img/chatspurplebutton.png';
import coffeePurpleButton from '../../img/cafespurplebutton.png';

import Navigate from '../Router/Navigate';

const catsToCreate = [
createCat('Salem', 0, 0, buddyImg, true, 0),
createCat(null, 2, 0, whiskersImg, false, 100),
createCat(null, 0, 2, miaouImg, false, 400),
createCat(null, 2, 2, whiskersImg, false, 1000),
createCat(null, 5, 0, whiskersImg, false, 5000),
createCat(null, 0, 5, whiskersImg, false, 10000),
]


function createCat(name, bonusAppearing, bonusClick, photo, isAdopted, price){
  return{
    name,
    bonusAppearing,
    bonusClick,
    photo,
    isAdopted,
    price,
  }
}



const cats = []

for (let i = 0; i < catsToCreate.length; i += 1) {
  cats.push(catsToCreate[i]);
}

const catHTML = cats
  .map(
    (cat) => `
    <div style="display: inline-block; text-align: center; margin: 10px;">
        <img src="${cat.photo}" alt="Photo de ${cat.name}" style="width: 100px; height: 100px;">
        <h2>${cat.name}</h2>
        <p>Bonus apparition clients: ${cat.bonusAppearing} %</p>
        <p>Bonus CatCoins: ${cat.bonusClick} CatCoins/click</p>

    </div>
`,
  )
  .join('');

const MenuCat = () => {
  const main = document.querySelector('main');
  document.title = 'Neko café';

  const menuCat = `
        <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background-image: url('${backgroundImg}'); background-size: cover; background-repeat: no-repeat; background-position: center;">
          <div style="height:100%; width:100%;">
          <div class="container mt-5">
          <div class="row justify-content-center">
          <div class="col-md-3">
            <img src="${catPinkButton}" alt="Bouton 1" id="cat-button">
          </div>
          <div class="col-md-3">
            <img src="${coffeePinkButton}" alt="Bouton 2" id="coffee-button">
          </div>
          </div>
          </div>
            <div style="position: absolute; top: 5%; right: 0; transform: translateY(-50%);">
              <img src="${quitImg}" alt="Bouton quitter" id="quit-button" style="width: 50px">
            </div>
            <div style="display: flex; justify-content: center;"> 
              ${catHTML}
            </div>
          </div>  
        </div>`;
  main.innerHTML = menuCat;

  const coffeeButton = document.querySelector('#coffee-button');
  coffeeButton?.addEventListener('click', redirectToMenuCoffee);
  coffeeButton?.addEventListener('mouseover', () => {
    coffeeButton.src = coffeePurpleButton;
  });
  coffeeButton?.addEventListener('mouseout', () => {
    coffeeButton.src = coffeePinkButton;
  });
  const catButton = document.querySelector('#cat-button');
  catButton?.addEventListener('click', redirectToMenuCat);
  catButton.src = catPurpleButton;
  
  const quitButton = document.querySelector('#quit-button');
  quitButton?.addEventListener('click',redirectToMenu);
};

function redirectToMenuCat() {
  Navigate('/menucat');
}
function redirectToMenuCoffee() {
  Navigate('/menucoffee');
}
function redirectToMenu() {
  Navigate('/game');
}

export default MenuCat;
