import { createRouter, createWebHistory } from "vue-router";
import {getAuth, onAuthStateChanged} from "firebase/auth"
import { doc, getDoc, getFirestore} from "firebase/firestore";
import firebaseApp from "../main.js" 

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
      component: EmployerProfileCreation,
      meta : {
        requiresAuth : true,
        employer: true
      }
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
      component: StudentLogin,
      meta : {
        acceptable : true
      }
    },
    {
      path: "/employerhome",
      name: "employerhome",
      component: EmployerHome,
      meta : {
        requiresAuth : true,
        employer: true
      }
    },
    {
      path: "/studentprofilecreation",
      name: "studentprofilecreation",
      component: StudentProfileCreation,
      meta : {
        requiresAuth : true,
        employer: false
      }
    },
    {
      path: "/studenthome",
      name: "studenthome",
      component: StudentHome,
      meta : {
        requiresAuth : true,
        employer: false
      }
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
      meta : {
        requiresAuth : true,
        employer: false
      }
    },
    {
      path: '/studentjobboard',
      name: 'StudentJobBoard',
      component: StudentJobBoard,
      meta : {
        requiresAuth : true
      }
    },
    {
        path: '/EditStudentProfile',
        name: 'Edit Profile',
        component: EditStudentProfile,
        meta : {
          requiresAuth : true
        }
    },
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(getAuth(), resolve, reject)
  });
};




// const isEmployer = () => {
//   await
// }

router.beforeEach(async (to, from, next) => {
  const isAuth = await getCurrentUser()
  const employer = await getEmployer();
  if (from.matched.some(record => record.meta.acceptable)) { //login exception
    next();
    console.log(1)
  }
  else if (to.matched.some(record => record.meta.requiresAuth) && !isAuth) {
    alert("Not Authorised");
    next('/');
    console.log(2)
  } else { //Authenticated and correct type
    next()
    console.log(employer)
  }
})

async function getEmployer() {
  const db = getFirestore(firebaseApp);
  const docRef = doc(db, "Users", getAuth().currentUser.uid);
  const docSnap = await getDoc(docRef);

  try {
    return docSnap.data()
  } catch {
    console.log("error")
  }
}



export default router;

