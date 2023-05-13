import { DataFirebase } from './firebaseInteraction.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

//======================================================================
const buttonAutnSing = document.querySelector('.button-sing-auth-js');
buttonAutnSing.addEventListener('click', modalSignIn);
// =====================================================================

const dataFirebase = new DataFirebase();

// ========================================================
async function onAuthGoogle() {
  await dataFirebase.authGoogle();
  modalBox.innerHTML = '';
  authUserMarkUp();
}
// =========================================================
const auth = dataFirebase.auth;
const modalBox = document.querySelector('.modalWindow');
function modalSignIn() {
  const formHtml = `
    <div class="modal-bakc">
    <form class="modal-form-auth"">
    <div class='clousModalAuth'>&times;</div>
    <input
      type="email"
      name="email"
      placeholder="email"
    />
    <input
      type="password"
      name="password"
      placeholder="password"
    />
    <button type="submit">Sign in</button>
    <div class='button-sing-group'>
    <p class="button-sign-up">Sing up</p>
    <p class='button-sing'>Sing in</p>
    <p class='button-google'>google</p>
    </div>
  </form>
  </div>`;
  modalBox.innerHTML = formHtml;
  // ======================================================
  const modalForm = modalBox.querySelector('.modal-form-auth');
  const buttonSingUp = modalForm.querySelector('.button-sign-up');
  const buttonSingGoogle = modalForm.querySelector('.button-google');
  const clousButton = modalForm.querySelector('.clousModalAuth');
  // ========================================================
  buttonSingUp.addEventListener('click', modalAuth);
  buttonSingGoogle.addEventListener('click', onAuthGoogle);
  modalForm.addEventListener('submit', onDataFormIn);

  clousButton.addEventListener('click', onCloseModalAuth);
  modalBox.classList.add('trans-modal');
  document.body.classList.add('scroll-off');
}

async function onDataFormIn(e) {
  e.preventDefault();
  const email = e.currentTarget.elements.email.value;
  const password = e.currentTarget.elements.password.value;
  try {
    const fire = await signInWithEmailAndPassword(auth, email, password);

    localStorage.setItem('tokenResponse', fire._tokenResponse.idToken);
    localStorage.setItem('email', email);
    modalBox.innerHTML = '';
    const basketFire = await dataFirebase.getRequest(email);
    if (basketFire) {
      const bookJson = JSON.stringify(basketFire);
      localStorage.setItem('shopingList', bookJson);
    }
  } catch (error) {
    console.error('fire.data-error', error);
    alert(error.message);
  }
  authUserMarkUp();
}
// =========================================================
function modalAuth() {
  const formHtml = `
    <div class="modal-bakc">
    <form class="modal-form-auth">
    <div class='clousModalAuth'>&times;</div>
    <input
      type="email"
      name="email"
      placeholder="email"
    />
    <input
      type="password"
      name="password"
      placeholder="password"
    />
    <input
      type="password"
      name="passwordConfirmation"
      placeholder="password"
    />
    <button type="submit">sign up</button>
    <div class='button-sing-group'>
    <p class='button-sing'>Sing up</p>
    <p class="button-sign-in">Sing in</p>
    <p class='button-google'>google</p>
    </div>
  </form>
  </div>`;
  modalBox.innerHTML = formHtml;
  const modalForm = modalBox.querySelector('.modal-form-auth');
  const buttonSingIn = modalForm.querySelector('.button-sign-in');
  const buttonSingGoogle = modalForm.querySelector('.button-google');
  const clousButton = modalForm.querySelector('.clousModalAuth');
  // ====================================================================
  modalBox.classList.add('trans-modal');
  buttonSingIn.addEventListener('click', modalSignIn);
  modalForm.addEventListener('submit', onDataFormAuth);
  buttonSingGoogle.addEventListener('click', onAuthGoogle);
  clousButton.addEventListener('click', onCloseModalAuth);
  document.body.classList.add('scroll-off');
}

function onCloseModalAuth() {
  modalBox.classList.remove('trans-modal');
  modalBox.innerHTML = '';
  document.body.classList.remove('scroll-off');
}

async function onDataFormAuth(e) {
  e.preventDefault();
  const email = e.currentTarget.elements.email.value;
  const password = e.currentTarget.elements.password.value;
  const passwordConfirmation =
    e.currentTarget.elements.passwordConfirmation.value;
  if (password && password === passwordConfirmation) {
    console.log(email, password);
    modalBox.innerHTML = '';
    try {
      const fire = await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem('tokenResponse', fire._tokenResponse.idToken);
      localStorage.setItem('email', email);
    } catch (error) {
      console.error('jjjjjjjj-error', error);
      const errorMessage = error.message;
      alert(errorMessage);
    }
  } else {
    alert('Check the password');
  }
  authUserMarkUp();
}
const authInterfase = document.querySelector('.button-sing-auth-js');
function authUserMarkUp() {
  if (localStorage.getItem('tokenResponse')) {
    authInterfase.innerHTML = '';
  }
}
authUserMarkUp();
