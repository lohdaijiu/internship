import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index.js";
import firebase from 'firebase/compat/app';

createApp(App).use(router).mount('#app')

app.mount("#app");

const firebaseConfig = {
    apiKey: "AIzaSyB9kuUTDuvy3-S49MPlF22y9NNvFrtDLJg",
    authDomain: "internship-433c3.firebaseapp.com",
    projectId: "internship-433c3",
    storageBucket: "internship-433c3.appspot.com",
    messagingSenderId: "674179049290",
    appId: "1:674179049290:web:efa98ea8256771509603b3",
    measurementId: "G-X3EZ6VJ8LX"
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const app = createApp(App);

