import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdZUrawbtmoFOb9C4xooVoPQxAN-bpBNM",
  authDomain: "finalproj-1ceaa.firebaseapp.com",
  projectId: "finalproj-1ceaa",
  storageBucket: "finalproj-1ceaa.appspot.com",
  messagingSenderId: "125347913950",
  appId: "1:125347913950:web:e62ccd4e69e6bd6831624f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

loadFonts();



createApp(App)
.use(router)
.use(vuetify)
.mount('#app')