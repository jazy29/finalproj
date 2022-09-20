<template>
      <body>
    <v-container>
     
  <v-card class="vcard">
    <v-card-title class="title"><h1>Score Board</h1></v-card-title>
        <table>   
  <thead class="thead">
    <tr>
        <th scope="col">Email</th>
        <th scope="col">Score</th>
        <th scope="col">Remark</th>
    </tr>
  </thead>
  <tbody class="tbody">
    <tr v-for="quiz in quizData " :key="quiz" >
                   <td>{{quiz.user  }}</td>
                    <td>{{ quiz.scores }}</td>      
                    <td>{{ quiz.remarks }}</td>   
                    </tr>

  </tbody>
  
</table>
</v-card>
</v-container>
</body>
  </template>


  <script>
 import db from '@/firebase'
  import { collection, getDocs, orderBy, query } from '@firebase/firestore';
  
    export default {
      name: "Quiz",
      // data() function stores state variables
      data() {
        return {
          
          quizData:[],

          
        };
      },


      // Custom methods of the Vue Component
      methods: {
    
        async fetchLeaderBoards() {
      const scoreRef = collection(db, "userScore");
      const q = query(scoreRef, orderBy("scores", "desc"));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        //console.log(doc.data())
        this.quizData.push(doc.data());
        console.log(this.quizData);
      });
    },
        
 

  
      },
      
      // Code inside mounted() runs after the Component has mounted
      mounted() {

        this.fetchLeaderBoards();
      },
    };
  
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
    
    .vcard{
            position: fixed;
          left: 26%;
          top: 14%;

          padding-right: 30px;
          padding-left: 30px;
          padding-bottom: 30px;
          text-align: justify;
          background: linear-gradient(rgba(255, 255, 255, 0.5), rgb(44, 44, 44));
          color:#061837;
          font-size: 115%;
          border-radius: 20px;
          width: 50%;
          height: auto;
          text-align:center;
        }
   
.thead{
    background-color: rgb(36, 36, 36);
    color:rgb(255, 193, 6);
    padding-left: 10px;
    font-family: 'Times New Roman', Times, serif;
}
.tbody{
    background-color: rgba(226, 226, 226, 0.358);
    color:rgb(16, 16, 16);
    padding-left: 10px;
    font-family: 'Times New Roman', Times, serif;
}
table{
    width: 100%;
}
.title h1 {
      color:#312b0a;
      text-align: center;
      font-size: 130%;
      font-family:Georgia, 'Times New Roman', Times, serif
    }
  </style>