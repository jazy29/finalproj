<template>
  <body>
<nav>
    <v-toolbar  app class="nav">
      <v-toolbar-title class="v-toolbar__title">Mythology
     
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items   class="hidden-sm-and-down">
        <v-btn v-if="isLoggedIn==true" flat to="/index">Home</v-btn>
        <v-btn v-if="isLoggedIn==false" flat to="/">Home</v-btn>
        <v-btn v-if="isLoggedIn==true" to="/axiosQuiz" flat>Quiz</v-btn>
        <v-btn v-if="isLoggedIn==true" to="/score" flat>Score Board</v-btn>
        <v-btn v-if="isLoggedIn==true" flat to="/about">About</v-btn>
        <v-btn v-if="isLoggedIn==true" flat @click="handleSignOut">Logout</v-btn>
        <v-btn v-if="isLoggedIn==false" to="/Login" flat>Login</v-btn>
        <v-btn v-if="isLoggedIn==false" to="/signup" flat>Register</v-btn>
        
      </v-toolbar-items>

    </v-toolbar>

      </nav>
  </body>
     </template>
  
  <script setup>

   import { onMounted, ref } from 'vue';
   import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth"
   import { useRouter } from 'vue-router';

  
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

<style scoped>


.nav {
    background-color: rgb(0, 0, 0);
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(69, 60, 60, 0.5)), url(../assets/bgnav.jpg);
    color:aliceblue;
}
  .v-toolbar__title {
    text-decoration: none;
    color: rgb(247, 181, 15);
    font-size: 1.5em;
  }
  

  </style>
  
  
  