import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import { initializeApp } from 'firebase/app';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
//import VueChartkick from 'vue-chartkick';
//import 'chartkick/chart.js';

// import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap"

const firebaseConfig = {
  apiKey: 'AIzaSyB9kuUTDuvy3-S49MPlF22y9NNvFrtDLJg',
  authDomain: 'internship-433c3.firebaseapp.com',
  projectId: 'internship-433c3',
  storageBucket: 'internship-433c3.appspot.com',
  messagingSenderId: '674179049290',
  appId: '1:674179049290:web:efa98ea8256771509603b3',
  measurementId: 'G-X3EZ6VJ8LX'
};

const firebaseApp = initializeApp(firebaseConfig);

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
//app.use(VueChartkick);
app.mount('#app');

export default firebaseApp;
