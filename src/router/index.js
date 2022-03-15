import { createRouter, createWebHistory } from "vue-router";
import EmployerRegister from '@/views/Employer/EmployerRegister.vue';
import EmployerLogin from '@/views/Employer/EmployerLogin.vue';
import EmployerProfileCreation from '@/views/Employer/EmployerProfileCreation.vue';
import EmployerHome from '@/views/Employer/EmployerHome.vue'

import StudentRegister from '@/views/Student/StudentRegister1.vue';
import StudentLogin from '@/views/Student/studentLogin.vue';
import StudentProfileCreation from '@/views/Student/StudentProfileCreation.vue';
import StudentHome from '@/views/Student/StudentHome.vue'
import ProfileUpdate from '@/views/Student/ProfileUpdate.vue'

import LandingPage from '@/views/LandingPage.vue';
import StudentProfile from '@/views/Student/StudentProfile.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/test",
      name: "test",
      component: ProfileUpdate
    },
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
      path: "/employerprofilecreation",
      name: "employerprofilecreation",
      component: EmployerProfileCreation
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
      path: "/employerhome",
      name: "employerhome",
      component: EmployerHome
    },
    {
      path: "/studentprofilecreation",
      name: "studentprofilecreation",
      component: StudentProfileCreation
    },
    {
      path: "/studenthome",
      name: "studenthome",
      component: StudentHome
    },
    {
      path: "/",
      name: "LandingPage",
      component: LandingPage
    },
    {   
      path: '/studentprofile',
      name: 'StudentProfile',
      component: StudentProfile,
  },
  ],
});

export default router;