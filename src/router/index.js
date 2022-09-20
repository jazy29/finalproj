import { createRouter, createWebHistory } from 'vue-router';
import{getAuth, onAuthStateChanged}  from "@firebase/auth";
import { awaitExpression } from '@babel/types';
import { async } from '@firebase/util';
const router = createRouter({
  history: createWebHistory(),
  routes: [
     {
          path: '/',
          name: 'Home',
          component: () => import('@/views/HomeView.vue'),
    
        },
        {
          path: '/Login',
          name: 'Login',
          component: () => import('@/views/LoginViews.vue')
        },
        {
          path: '/signup',
          name: 'Signup',
          component: () => import('@/views/SignupViews.vue')
          
        },
        {
          path: '/index',
          name: 'Index',
          component: () => import('@/views/IndexViews.vue'),
          meta: {
            requiresAuth:true,
          },
        },
        {
          path: '/axiosQuiz',
          name: 'axiosQuiz',
          component:  () => import('@/views/AxiosTriviaQuiz.vue'),
          meta:{
            requiresAuths: true,
          },
        },
        {
          path: '/about',
          name: 'About',
          component:  () => import('@/views/AboutView.vue'),
          meta:{
            requiresAuths: true,
          },
        },
        {
          path: '/score',
          name: 'Score',
          component:  () => import('@/views/ScoreBoard.vue'),
          meta:{
            requiresAuths: true,
          },
        },
        
        
        
    
  ],
});
const getCurrentUser = () => {
  return new Promise((resolve, reject)=>{
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) =>{
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};


router.beforeEach(async(to, from, next)=>{
  if (to.matched.some((record)=> record.meta.requiresAuths)) {

    if(await getCurrentUser()) {
      next();
      }  else {
        alert("no access");
        next("/");
      }
    } else {
      next();
    }
  });

export default router
