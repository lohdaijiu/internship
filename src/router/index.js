import { createRouter, createWebHistory } from "vue-router";
import {getAuth, onAuthStateChanged} from "firebase/auth"

import EmployerRegister from '@/views/Employer/EmployerRegister.vue';
import EmployerLogin from '@/views/Employer/EmployerLogin.vue';
import EmployerProfileCreation from '@/views/Employer/EmployerProfileCreation.vue';
import EmployerHome from '@/views/Employer/EmployerHome.vue'

import StudentRegister from '@/views/Student/StudentRegister.vue';
import StudentLogin from '@/views/Student/studentLogin.vue';
import StudentProfileCreation from '@/views/Student/StudentProfileCreation.vue';
import StudentHome from '@/views/Student/StudentHome.vue'

import LandingPage from '@/views/LandingPage.vue';
import StudentProfile from '@/views/Student/StudentProfile.vue';

import StudentJobBoard from '@/views/Student/StudentJobBoard.vue';
import StudentViewListing from '@/views/Student/StudentViewListing.vue';
import EmployerViewListing from '@/views/Employer/EmployerViewListing.vue';


import EditStudentProfile from '@/views/Student/EditStudentProfile.vue';

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
      path: "/employerprofilecreation",
      name: "employerprofilecreation",
      component: EmployerProfileCreation
    },
    {
      path: "/employerlogin",
      name: "employerlogin",
      component: EmployerLogin,
      meta : {
        acceptable : true
      }
    },
    {
      path: "/studentlogin",
      name: "studentlogin",
      component: StudentLogin
    },
    {
      path: "/employerhome",
      name: "employerhome",
      component: EmployerHome,
      meta : {
        requiresAuth : true
      }
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
      component: StudentProfile
    },
    {
      path: '/studentjobboard',
      name: 'StudentJobBoard',
      component: StudentJobBoard
    },
    {
      path: '/viewjoblisting',
      name: 'StudentViewListing',
      component: StudentViewListing
    },
    {
        path: '/EditStudentProfile',
        name: 'Edit Profile',
        component: EditStudentProfile,
    },
    {
      path: '/viewpostedlisting',
      name: 'EmployerViewListing',
      component: EmployerViewListing
    },
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(getAuth(), resolve, reject)
  });
};

router.beforeEach(async (to, from, next) => {
  const isAuth = await getCurrentUser()

  if (from.matched.some(record => record.meta.acceptable)) {
    next();
  }
  else if (to.matched.some(record => record.meta.requiresAuth) && !isAuth) {
    alert("Not Authorised");
    next('/');
  } else {
    next()
  }
})


export default router;

