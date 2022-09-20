<template>
  <body>
     <v-app>
      <v-main>
         <NavBar/>
         <router-view></router-view>
        
      </v-main>
     </v-app>
  </body>
     </template>
  
  <script setup>

   import { onMounted, ref } from 'vue';
   import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth"
   import { useRouter } from 'vue-router';
import NavBar from './components/NavBar.vue';

   const accountDetails = document.querySelector('.account-det')
   const router = useRouter();
   const isLoggedIn = ref(false);

   let auth;
   onMounted(() =>{
      auth = getAuth();
      onAuthStateChanged(auth,(user)=>{
         if(user){
            isLoggedIn.value = true;
     
           
         } else {
            isLoggedIn.value = false;
       
         }

      });
   });

 
const handleSignOut = () => {
      signOut(auth).then(()=>{
         router.push("/");
      });
   };
  </script>
  
  
  