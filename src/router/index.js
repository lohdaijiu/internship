import { createRouter, createWebHistory } from "vue-router";
import EmployerRegister from '@/views/EmployerRegister.vue';
import StudentRegister from '@/views/StudentRegister.vue';
import Feed from '@/views/Feed.vue';
import LoginSuccess from '@/views/LoginSuccess.vue';
import EmployerLogin from '@/views/employerLogin.vue';
import StudentLogin from '@/views/studentLogin.vue';
import LandingPage from '@/views/LandingPage.vue';
import StudentProfile from '@/views/StudentProfile.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/studentregister",
      name: "StudentRegister",
      component: StudentRegister
    },
    {
      path: "/employerregister",
      name: "EmployerRegister",
      component: EmployerRegister
    },
    {
      path: "/feed",
      name: "Feed",
      component: Feed
    },
    {
      path: "/employerlogin",
      name: "employerlogin",
      component: EmployerLogin
    },
    {
      path: "/studentlogin",
      name: "studentlogin",
      component: StudentLogin
    },
    {
      path: "/LoginSuccess",
      name: "LoginSuceess",
      component: LoginSuccess
    },
    {
      path: "/studentlogin",
      name: "LoginSuceess",
      component: LoginSuccess
    },
    {
      path: "/LoginSuccess",
      name: "LoginSuceess",
      component: LoginSuccess
    },
    {
      path: "/",
      name: "LandingPage",
      component: LandingPage
    },
    {   
      path: '/StudentProfile',
      name: 'StudentProfile',
      component: StudentProfile,
  },
  ],
});

export default router;