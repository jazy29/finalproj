<template>
  <body>
  
      <v-main>
      
        <v-container>
          <v-img src="https://i.postimg.cc/3RdyQrPP/pngwing-com.png" class="img" 
            ></v-img>
          <v-card class="vcard">
      
            <v-card-title class="title"><h1> Discover And Learn</h1></v-card-title>
      <div class="sub">
    
         <p>
          
          A mythology is a collection of myths or stories about a specific person, culture, religion, or any group with shared beliefs.
           Most people don’t consider mythology to be entirely true, but they still take it seriously.
          </p>
           <p>
           Myth stories usually address the origins of a people or culture or explain events. In many instances, myths are built around the lives of gods and goddesses. If humans were involved, they were usually larger than life with tremendous heroic prowess.
           There are four basic theories of myth. Those theories are: the rational myth theory, functional myth theory, structural myth theory, and the psychological myth theory. 
        </p>
        <center>
        <p ><strong> ARE YOU UP TO TEST YOUR KNOWLEDGE ABOUT MYTHOLOGY?</strong></p></center>
      </div>
       <center>
        <v-btn class="btn" @click="Quiz">Answer Now!</v-btn> </center>
          </v-card>
        </v-container>
      </v-main>
    </body>
       </template>
    
    <script setup>
  import NavBar from '@/components/NavBar.vue';
  
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const Quiz = () => {
    router.push('/login');
  }
    </script>
    
  <style scoped>
  body {
    background-color: rgb(51, 51, 51);
    background-image:url("https://i.postimg.cc/fRQGQtQ9/a.jpg");
    background-repeat: no-repeat;
       background-attachment: fixed;
       background-size: cover;
       min-height: 100vh;
  }
  
  .btn {
    font-size: 1.1rem;
      box-sizing: border-box;
      font-family:Georgia, 'Times New Roman', Times, serif;
      margin: 0.3rem;
      width: 47%;
      background-color: rgba(255, 217, 0, 0.556);
      border: none;
      border-radius: 0.4rem;
      color:#181815;
      font-weight: bold;
      box-shadow: 1px 2px 5px 5px rgba(82, 88, 88, 0.551);
  }
  
  .title h1 {
    color:#ffd000;
    text-align: center;
    font-size: 170%;
    font-family:Georgia, 'Times New Roman', Times, serif
  }
  .img{
    position:fixed;
    right: 45%;
    width: 90%;
    height: 80%;
    top:15%;
  
  }
  .vcard {
        position: fixed;
        left: 26%;
        top: 12%;
        padding-top: 25px;
  
        text-align: justify;
        background: linear-gradient(rgb(147, 147, 147,0.5), rgb(44, 44, 44));
        color:#061837;
        font-size: 115%;
        border-radius: 20px;
        width: 50%;
        height: 85%;
      }
  
  .sub p{
    padding-top: 10px;
    color: #ffe1e1c1;
    font-size: 130%;
    line-height: 1.5;
    margin-left: 80px;
    margin-right: 80px;
    font-family:Georgia, 'Times New Roman', Times, serif;
  }
  
  .sub p strong{
    padding-top: 10px;
    color: #808a8b;
    font-size: 70%;
    font-family:Georgia, 'Times New Roman', Times, serif;
  }
  
  
  </style>
    