import _ from 'lodash';
/* asset management
import './style.css';
import Logo from './logo.png';
*/
import printMe from './print.js';

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  element.innerHTML = _.join(['Helolo', 'webpack'], ' ');

  btn.innerHTML = 'Click me and check the console log!';
  btn.onclick = printMe;

  element.appendChild(btn);

  /* Asset management
  element.classList.add('hello');

  Add the image to our existing div.
  const myLogo = new Image();
  myLogo.src = Logo;
  
  element.appendChild(myLogo);
  */
  return element;
}

document.body.appendChild(component());