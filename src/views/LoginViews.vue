<template>
  <body>
    <br> 
    <v-container fill-height fluid>
      <v-card>
        <v-row class="card">
           
          <v-col class="pa-5 align-self-center" >
            <v-container class="border">
            <v-carousel  hide-delimiters cycle :show-arrows="false">
              <v-carousel-item
                v-for="(item, i) in items"
                :key="i"
                :src="item.src"
              ></v-carousel-item>
            </v-carousel>
        </v-container>
          </v-col>
          <v-col>
            <v-container class="bg">
            <v-container class="logo">
                <v-row>
                <v-col>
                <v-img  aspect-ratio="3" class="img"
              src="https://i.postimg.cc/gcK312xW/3b52b348-ea8e-4e44-b065-6a085d671661.jpg"
              >
            </v-img>
        </v-col>
            <v-col>
            <v-title class="title" ><h1>Mythology Quiz</h1></v-title>
      
            </v-col>
            
        </v-row>
            </v-container>
            <v-container class="contain">
        
      <v-title class="sub"><h2>Sign In To Access Quiz</h2></v-title>
     <v-container class="form">
      <v-text-field
                class="tfcolor"
                label="Enter Email"
                v-model="email"
              ></v-text-field>
              <v-text-field
                class="tfcolor"
                label="Enter Password"
                v-model="password"
                type="password"
              ></v-text-field>
              <v-btn dark class="btn" color="#302A2A" @click="Login"
                >Sign In</v-btn
              >
              <v-card-subtitle class="v-card-subtitle "
                ><a href="/signup">Does not have an account yet? Click Here!</a></v-card-subtitle
              >
              <v-card-subtitle class="err"
                v-if="errMsg">{{errMsg}}</v-card-subtitle
              >
            </v-container>
            </v-container>
        </v-container>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </body>
</template>

<script>
     export default {
    data () {
      return {
        items: [
          {
            src: 'https://i.postimg.cc/WbMCBrM4/frost.jpg',
          },
       
          {
            src: 'https://i.postimg.cc/59QZmDyL/cerb.jpg',
          },
          {
            src: 'https://i.postimg.cc/N00n2zZy/giants.jpg',
          },
        ],
      }
    },
  }
</script>

<script setup>
  import {ref} from "vue"
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router';
  const email = ref("");
  const password = ref("");
  const errMsg = ref();
  const router = useRouter();

  const Login = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
      .then((data)=>{

        console.log("Sign in Success");
        console.log(auth.currentUser);
        router.push('/index');
      })
      .catch((error)=>{
        console.log(error.code)
        switch (error.code){
           case "auth/invalid-email":
           errMsg.value = "Invalid emial";
           break;
           case "auth/user-not-found":
           errMsg.value = "No account with that email was found";
           break;
           case "auth/wrong-password":
           errMsg.value = "Incorrect password";
           break;
           default:
            errMsg.value = "Email or password was incorrect";
            break;
        }
      })
  }
</script>


<style scoped>
body {
  background-color: rgb(51, 51, 51);
  background-image: linear-gradient(rgb(36, 55, 84), rgb(26, 25, 25));
  color: rgb(13, 13, 8);
  text-align: center;
  min-height: 100vh;
}
.v-card-subtitle  a{
    text-decoration: none;
    color: rgb(80, 0, 106);
 
  }
.sub{
    position: relative;
    right:20%;
}
.btn {
  left: 2%;
  margin-left: 20px;
  margin-right: 20px;
  width: 70%;
  margin-bottom: 2%;
  color: white;
}
.img{
        position:relative;
        right:15%;
      
}
.logo{
    position: relative;
    right:6%
}
.bg{
    background-color:rgba(234, 229, 229, 0.879) ;
    margin-top:5% ;
    margin-bottom: 5%;
    width: 75%;
   
}
.err{
  color:rgb(255, 0, 0);
  font-weight: bold;
}
.title{
    position:relative;
    right:55%;
    top:19%;
    text-align:center;
    color:rgb(10, 44, 96);
  
}
.form{
    margin-top:1%;
    
}
.contain {
  margin-top:-2%;
}
.tfcolor {
  color: rgb(3, 44, 16) !important;
  width: 90%;
  
  position: relative;
  left:3%;
  font-size: 24px;
  margin-bottom: 2%;
}
.card {
  height: 100%;
  background-image: url("https://i.postimg.cc/HLCn9FQL/bg.jpg") ;
  background-size: cover;

  
}
.border{
    background-color: rgba(16, 17, 18, 0.529);
    margin-left:2em;

}
</style>
