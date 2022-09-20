<template>

  <body>
                        

    <v-row class="vrow">
        <v-col
            cols="5"
            sm="10"
            md="8"
            lg="6"
        >
            <v-card     class="vcard">
                <v-card-text>
                  <section class="quiz" v-if="!squiz">
                    <center><v-card-title class="vtitle"><h1> MYTHOLOGY QUIZ</h1></v-card-title></center>
                    <v-img class="logo-crown" 
                    gradient="to bottom left, rgba(150,150,150,.2), rgba(0,0,0,.5)"
                    src="https://i.postimg.cc/gcK312xW/3b52b348-ea8e-4e44-b065-6a085d671661.jpg"  /> 
                    <v-card-text class="startquizcard">
                      <v-btn class="btn" depressed outlined  @click="startQuiz">Start</v-btn>
                    </v-card-text>
                  </section>
                  <section v-else>
                  <section class="quiz" v-if="!quizCompleted">
   
                  <v-card-title class="vtitle"><h1> MYTHOLOGY QUIZ</h1></v-card-title>
                    
                    <!-- div#correctAnswers -->
                    <h4 >Question: {{questionCurrentNumber}}/{{questions.length}}</h4>
                        <span>
                         
                          <hr class="divider" />
                          <br/>
                            <h2 class="hehe" v-html="loading ? 'Loading...' : currentQuestion.question"></h2>
                            <br/>
                            <form v-if="currentQuestion">
                                <button
                                    v-for="answer in currentQuestion.answers"
                                    :index="currentQuestion.key"
                                    :key="answer"
                                    v-html="answer"
                                    @click.prevent="handleButtonClick"
                                ></button>
                            </form>
                            <h3>SCORE: {{score}}/{{questions.length}} <br/> <br/>
                                High Score:{{hiscore}}/{{questions.length}}
                            </h3>
             
                            <v-spacer></v-spacer>
                            
                        </span>
                        
                    </section>
                    <section v-else>
                      <v-card-title class="vtitle"><h1 >Quiz Result:</h1></v-card-title>
           
                        <v-card-text v-if="!pass">
                          <v-img class="logo-crown2" 
                    gradient="to bottom left, rgba(255,13,0,.2), rgba(0,0,0,.5)"
                    src="https://i.postimg.cc/gcK312xW/3b52b348-ea8e-4e44-b065-6a085d671661.jpg"  /> 
                          <v-card-title class="vtitle"><h1 id="quizfailed">{{result}} {{score}}/{{questions.length}}</h1></v-card-title>
                          <v-btn class="btn2" depressed outlined @click="tryAgain" >Try Again</v-btn>
                        </v-card-text>

                        <v-card-text v-else>
                          <v-img class="logo-crown2" 
                    gradient="to bottom left, rgba(0,255,15,.2), rgba(0,0,0,.5)"
                    src="https://i.postimg.cc/gcK312xW/3b52b348-ea8e-4e44-b065-6a085d671661.jpg"  /> 
                    <v-card-title class="vtitle"><h1 id="quizpassed">{{result}} {{score}}/{{questions.length}}</h1></v-card-title>
                          <v-btn class="btn2" depressed outlined @click="tryAgain" >Try Again</v-btn>
                        </v-card-text>
                        
                    </section>
                  </section>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
  </body>
  </template>
    
    <script>
      
  import { useRouter } from 'vue-router';
  import { getAuth } from "firebase/auth";
  import db from '@/firebase'
import { collection, getDocs } from '@firebase/firestore';

  export default {
    name: "Quiz",
    // data() function stores state variables
    data() {
      return {
        questions: [],
        loading: true,
        index: 0,
        score: 0,
        scorel: [],
        quizData:[],
        hiscore:0,
        questionCurrentNumber: 1,
        quizCompleted: false,
        result: "",
        passingScore:"",
        pass:false,
        squiz:false,
        
      };
    },
    computed: {
      currentQuestion() {
        if (this.questions !== []) {
          return this.questions[this.index];
        }
        return null;
      },
    },

    // Custom methods of the Vue Component
    methods: {
      async fetchQuestions() {
        this.loading = true;
        let response = await fetch(
          "https://opentdb.com/api.php?amount=10&category=20&difficulty=easy"
        );
        let jsonResponse = await response.json();
        let index = 0; // index is used to identify single answer
        let data = jsonResponse.results.map((question) => {
          // put answers on question into single array
          question.answers = [
            question.correct_answer,
            ...question.incorrect_answers,
          ];
          // Shuffle question.answers array
          for (let i = question.answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [question.answers[i], question.answers[j]] = [
              question.answers[j],
              question.answers[i],
            ];
          }
          // add rightAnswer and key property to each question
          question.rightAnswer = null;
          question.key = index;
          index++;
          return question;
        });
        this.questions = data;
        this.loading = false;
      },
      startQuiz(){
          this.squiz=true;
          const auth = getAuth();
          db.collection('userScore').get().then((snapshot)=>{
              snapshot.docs.forEach(doc=>{
                  if(doc.data().user == auth.currentUser.email){
                        this.scorel.push(doc.data().scores);
                           this.hiscore = this.scorel[0];
                          for ( var i = 0; i < this.scorel.length; i++) {  
            //Compare elements of array with max  
                   if(this.scorel[i] >    this.hiscore)  
                   this.hiscore = this.scorel[i];  
                     }  
                    
                     
     
                    }
                     else{
                      
                     }
              })
            })
          
          
      },

  
      handleButtonClick: function (event) {
        /* Find index to identiy question object in data */
        let index = event.target.getAttribute("index");
  
        let pollutedUserAnswer = event.target.innerHTML; // innerHTML is polluted with decoded HTML entities e.g ' from &#039;
        /* Clear from pollution with ' */
        let userAnswer = pollutedUserAnswer.replace(/'/, "&#039;");
  
        /* Set userAnswer on question object in data */
        this.questions[index].userAnswer = userAnswer;
  
        /* Set class "clicked" on button with userAnswer -> for CSS Styles; Disable other sibling buttons */
        event.target.classList.add("clicked");
        let allButtons = document.querySelectorAll(`[index="${index}"]`);
  
        for (let i = 0; i < allButtons.length; i++) {
          if (allButtons[i] === event.target) continue;
  
          allButtons[i].setAttribute("disabled", "");
        }
  
        /* Invoke checkAnswer to check Answer */
        this.checkAnswer(event, index);
      },
      checkAnswer: function (event, index) {
        let question = this.questions[index];
  
        if (question.userAnswer) {
          if (this.index < this.questions.length - 1) {
            setTimeout(
              function () {
                this.index += 1;
              }.bind(this),
              500
            );
          }
          if (question.userAnswer === question.correct_answer) {
            /* Set class on Button if user answered right, to celebrate right answer with animation joyfulButton */
            event.target.classList.add("rightAnswer");
            /* Set rightAnswer on question to true, computed property can track a streak out of 10 questions */
            this.questions[index].rightAnswer = true;
            this.score++;
          } else {
            /* Mark users answer as wrong answer */
            event.target.classList.add("wrongAnswer");
            this.questions[index].rightAnswer = false;
            /* Show right Answer */
            let correctAnswer = this.questions[index].correct_answer;
            let allButtons = document.querySelectorAll(`[index="${index}"]`);
            allButtons.forEach(function (button) {
              if (button.innerHTML === correctAnswer) {
                button.classList.add("showRightAnswer");
              }
            });
          }
          
          if(this.questionCurrentNumber<this.questions.length){
            this.questionCurrentNumber++;
          }
          else{
            this.quizCompleted= true
        
            if(this.quizCompleted=true){
            this.passingScore= (0.5*this.questions.length);
            if(this.score>=this.passingScore){
              this.result= "Passed"
              this.pass=true
            }
            else{
              this.result= "Failed"              
            }
          }

          const auth = getAuth();
          const project = {
              user: auth.currentUser.email,
              remarks: this.result,
              scores: this.score,
       
            }
            db.collection('userScore').add(project).then(() => {
              console.log("Added")
            })
            
 
          }
            
        }
        
      },
      tryAgain(){
        this.squiz=false;
        this.quizCompleted=false;
        this.index= 0;
        this.score= 0;
        this.questionCurrentNumber= 1;
        console.log("tryagain")
        const auth = getAuth();
        //record new high  score
          db.collection('userScore').get().then((snapshot)=>{
              snapshot.docs.forEach(doc=>{
                  if(doc.data().user == auth.currentUser.email){
                        this.scorel.push(doc.data().scores);
                           this.hiscore = this.scorel[0];
                          for ( var i = 0; i < this.scorel.length; i++) {  
            //Compare elements of array with max  
                   if(this.scorel[i] >    this.hiscore)  
                   this.hiscore = this.scorel[i];  
                     }  
                    
                     
     
                    }
                     else{
                      
                     }
              })
            })

      },
    },
    
    // Code inside mounted() runs after the Component has mounted
    mounted() {
      this.fetchQuestions();
    },
  };

  
  
  </script>
    
    <style scoped>
  .quiz-container {
    margin: 1rem auto;
    padding: 1rem;
    max-width: 750px;
  }
  #resultscore{
    font-size: 2rem;
    padding: 0.5rem;
    color: #7eb2ff;
    text-align: center;
  }
  #quizresult{
    font-size: 2rem;
    color: #202020;    
  }
  #quizpassed{
    font-size: 2rem;
    font-weight: bold;
    padding: 0.5rem;
    color: #ffffff;
    text-align: center;
    border: 1px;
    background: -webkit-linear-gradient(rgb(60, 255, 0), rgb(17, 17, 17));
    font-family:Arial, Helvetica, sans-serif;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  #quizfailed{
    font-size: 2rem;
    font-weight: bold;
    padding: 0.5rem;
    color: #ffffff;
    text-align: center;
    border: 1px;
    background: -webkit-linear-gradient(rgb(255, 6, 6), rgb(17, 17, 17));
    font-family:Arial, Helvetica, sans-serif;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  #logo-headline {
    font-size: 2rem;
    padding: 0.5rem;
    color: #7eb2ff;
    text-align: center;
  }
  
  .logo-crown2 {
    display: block;
    width: 30%;
    margin:  auto;
    border-radius: 3em;
    padding-right: 40;
    
  }
  .logo-crown{
    display: block;
    width: 50%;
    margin: 0 auto;
    border-radius: 3em;
    padding-right: 40;

  }
  
  @media only screen and (max-width: 500px) {
    #logo-crown {
      width: 40%;
      border-radius: 3em;
      opacity: 0.5;
    }
  
    #logo-headline {
      font-size: 1.8rem;
    }
  }

.btn{
     color: white;
     position: relative;
     right: 25.5%;
     height: auto;
     font-family:Georgia, 'Times New Roman', Times, serif;
     background-color: rgba(255, 140, 0, 0.556);

}
.btn2{
     color: white;
     position: relative;
     height: auto;
     font-family:Georgia, 'Times New Roman', Times, serif;
     background-color: rgba(85, 60, 29, 0.556);

}
.startquizcard{
  justify-content: center;
  padding-left: 35%;
}
  .divider {
    margin: 0.5rem 0;
    border: 2px solid rgba(8, 8, 8, 0.986);
    border-radius: 2px;
    box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.3);
  }
  
  form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  .vcard h3{
  margin-top:5%;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(../assets/bgnav.jpg);
  padding-top:6%;
  padding-bottom: 6%;
  font-size: 130%;
  font-family:Georgia, 'Times New Roman', Times, serif
}
  
  button {
    font-size: 1.1rem;

    padding: 1rem;
    margin: 0.3rem;
    width: 47%;
    background-color: rgba(100, 100, 100, 0.3);


    box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.2);
  }
  
  button:hover:enabled {
    transform: scale(1.02);
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 7px 0 rgba(0, 0, 0, 0.12),
      0 3px 1px -1px rgba(0, 0, 0, 0.2);
  }
  
  button:focus {
    outline: none;
  }
  
  button:active:enabled {
    transform: scale(1.05);
  }
  
  @keyframes flashButton {
    0% {
      opacity: 1;
      transform: scale(1.01);
    }
    50% {
      opacity: 0.7;
      transform: scale(1.02);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  button.clicked {
    pointer-events: none;
  }
  
  button.rightAnswer {
    animation: flashButton;
    animation-duration: 700ms;
    animation-delay: 200ms;
    animation-iteration-count: 3;
    animation-timing-function: ease-in-out;
    color: black;
    background: linear-gradient(
      210deg,
      rgba(0, 178, 72, 0.25),
      rgba(0, 178, 72, 0.5)
    );
  }
  
 
  button.wrongAnswer {
    color: black;
    background: linear-gradient(
      210deg,
      rgba(245, 0, 87, 0.25),
      rgba(245, 0, 87, 0.5)
    );
  }
  .vrow {
     justify-content: center;
     margin-right: 50% auto;
     padding-left: 5% auto;
     height: 100% auto;
     width: 100% auto;


}
.vcard{
  border-radius:5px;
  margin-top:3%;

}
.vcardaction {
  display: flex;
  justify-content: center;
  align-items: center;
}
.ma-15{
  padding-top: 10px;
}
.vtitle h1 {
  color:#e2e2e2;
  text-align: center;
  font-size: 180%;
  font-family:Georgia, 'Times New Roman', Times, serif
}

.hehe{
  font-family:Georgia, 'Times New Roman', Times, serif;
  text-align: left;
  margin-left:3%;
  }
  button.showRightAnswer {
    animation: flashButton;
    animation-duration: 700ms;
    animation-delay: 200ms;
    animation-iteration-count: 2;
    animation-timing-function: ease-in-out;
    color: black;
    background: linear-gradient(
      210deg,
      rgba(0, 178, 72, 0.25),
      rgba(0, 178, 72, 0.5)
    );
  }

   body {
     background-image: url('https://i.postimg.cc/fRQGQtQ9/a.jpg');
     background-repeat: no-repeat;
     background-attachment: fixed;
     background-size: cover;
}

.divider{
  margin: 0.5rem 0;
   border-radius: 2px;
   box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.3);
}


.vcard {
  top: 2em;
  color:rgb(225, 225, 225);
  text-align: center;
  background: linear-gradient(rgba(31, 31, 31, 0.24), rgb(22, 22, 22)),url("../assets/bgnav.jpg");
  background-repeat: no-repeat;
     background-attachment: fixed;
     background-size: cover;
}
  </style>