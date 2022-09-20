<template>
    <body>
    
        <v-main>
        
          <v-container>
       
            <v-card class="vcard">
        
              <v-card-title class="title"><h1>  About The Developer</h1></v-card-title>
        <div class="sub">
      
           <p>
            
            The owner of this website is Jonathan Bucat an IT student, I am 20 years 
             and He lives at Pasig  City. He aims to be good  web designer and game devloper.
            The program that he partake in Technological Institute of the Philippines is BSIT.
          </p>
        </div>
        <img  src="../assets/jonathan.png"  class="img" />
            </v-card>
          </v-container>
        </v-main>
      </body>
         </template>
      
      <script setup>
    import NavBar from '@/components/NavBar.vue';
    
    
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
        border-radius:500px;
        display: block;
        margin-top: 3%;
         margin-left: auto;
        margin-right: auto;
        width: 30%;
        height: auto;
    }
    .vcard {
          position: fixed;
          left: 26%;
          top: 14%;
          padding-top: 25px;
    
          text-align: justify;
          background: linear-gradient(rgb(147, 147, 147,0.5), rgb(44, 44, 44));
          color:#061837;
          font-size: 115%;
          border-radius: 20px;
          width: 50%;
          height: 75%;
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
      