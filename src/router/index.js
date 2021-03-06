import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import firebaseApp from '../main.js';

import EmployerRegister from '@/views/Employer/EmployerRegister.vue';
import EmployerLogin from '@/views/Employer/EmployerLogin.vue';
import EmployerProfileCreation from '@/views/Employer/EmployerProfileCreation.vue';
import EmployerHome from '@/views/Employer/EmployerHome.vue';

import StudentRegister from '@/views/Student/StudentRegister.vue';
import StudentLogin from '@/views/Student/studentLogin.vue';
import StudentProfileCreation from '@/views/Student/StudentProfileCreation.vue';
import StudentHome from '@/views/Student/StudentHome.vue';
import StudentResources from '@/views/Student/StudentResources.vue';

import LandingPage from '@/views/LandingPage.vue';
import StudentProfile from '@/views/Student/StudentProfile.vue';
import EditStudentProfile from '@/views/Student/EditStudentProfile.vue';
import StudentJobBoard from '@/views/Student/StudentJobBoard.vue';
import StudentViewListing from '@/views/Student/StudentViewListing.vue';

import NotFoundPage from '@/views/NotFoundPage.vue';

import EmployerViewListing from '@/views/Employer/EmployerViewListing.vue';
import EmployerProfile from '@/views/Employer/EmployerProfile.vue';
import EditEmployerProfile from '@/views/Employer/EditEmployerProfile.vue';
import ForgotPassword from '@/views/ForgotPassword.vue';
import AddJobListing from '@/views/Employer/AddJobListing.vue';
import ApplicationDashboard from '@/views/Student/ApplicationDashboard.vue';

import StudentApplyJob from '@/views/Student/StudentApplyJob.vue';
import EmployerEditListing from '@/views/Employer/EmployerEditListing.vue';

import ViewApplicants from '@/views/Employer/ViewApplicants.vue';
import StudentChatSelection from '@/views/Student/StudentChatSelection.vue';
import EmployerChatSelection from '@/views/Employer/EmployerChatSelection.vue';
import ViewProfile from '@/views/Employer/ViewProfile.vue';
import StudentChat from '@/views/Student/StudentChat.vue';
import EmployerChat from '@/views/Employer/EmployerChat.vue';
import EmployerVideoCall from '@/views/Employer/EmployerVideoCall.vue';
import StudentVideoCall from '@/views/Student/StudentVideoCall.vue';
import ViewEmployerProfile from '@/views/Student/ViewEmployerProfile.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/viewemployerprofile',
      name: 'ViewEmployerProfile',
      component: ViewEmployerProfile,
      meta: {
        requiresAuth: true,
        employer: false
      }
    },
    {
      path: '/studentresources',
      name: 'StudentResources',
      component: StudentResources,
      meta: {
        requiresAuth: true,
        employer: false
      }
    },
    {
      path: '/studentchat',
      name: 'StudentChat',
      component: StudentChat,
      meta: {
        requiresAuth: true,
        employer: false
      }
    },
    {
      path: '/employerchat',
      name: 'EmployerChat',
      component: EmployerChat,
      meta: {
        requiresAuth: true,
        employer: true
      }
    },
    {
      path: '/studentchatselection',
      name: 'StudentChatSelection',
      component: StudentChatSelection,
      meta: {
        requiresAuth: true,
        employer: false
      }
    },
    {
      path: '/employerchatselection',
      name: 'EmployerChatSelection',
      component: EmployerChatSelection,
      meta: {
        requiresAuth: true,
        employer: true
      }
    },
    {
      path: '/studentregister',
      name: 'StudentRegister',
      component: StudentRegister,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/employerregister',
      name: 'EmployerRegister',
      component: EmployerRegister,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/employerprofilecreation',
      name: 'employerprofilecreation',
      component: EmployerProfileCreation,
      meta: {
        requiresAuth: true,
        employer: true
      }
    },
    {
      path: '/employerlogin',
      name: 'employerlogin',
      component: EmployerLogin,
      meta: {
        acceptable: true
      }
    },
    {
      path: '/studentlogin',
      name: 'studentlogin',
      component: StudentLogin,
      meta: {
        acceptable: true
      }
    },
    {
      path: '/employerhome',
      name: 'employerhome',
      component: EmployerHome,
      meta: {
        requiresAuth: true,
        employer: true
      }
    },
    {
      path: '/studentprofilecreation',
      name: 'studentprofilecreation',
      component: StudentProfileCreation,
      meta: {
        requiresAuth: true,
        employer: false
      }
    },
    {
      path: '/studenthome',
      name: 'studenthome',
      component: StudentHome,
      meta: {
        requiresAuth: true,
        employer: false
      }
    },
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/studentprofile',
      name: 'StudentProfile',
      component: StudentProfile,
      meta: {
        requiresAuth: true,
        employer: false
      }
    },
    {
      path: '/studentjobboard',
      name: 'StudentJobBoard',
      component: StudentJobBoard,
      meta: {
        requiresAuth: true,
        employer: false
      }
    },
    {
      // path: '/viewjoblisting/listing',
      path: '/viewjoblisting',
      name: 'StudentViewListing',
      component: StudentViewListing,
      meta: {
        requiresAuth: true,
        employer: false
      }
      // props: {listing: false}
    },
    {
      path: '/EditStudentProfile',
      name: 'EditStudentProfile',
      component: EditStudentProfile,
      meta: {
        requiresAuth: true,
        employer: false
      }
    },
    {
      path: '/viewpostedlisting',
      name: 'EmployerViewListing',
      component: EmployerViewListing,
      meta: {
        requiresAuth: true,
        employer: true
      }
    },
    {
      path: '/editlisting',
      name: 'EmployerEditListing',
      component: EmployerEditListing,
      meta: {
        requiresAuth: true,
        employer: true
      }
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFoundPage
    },
    {
      path: '/employerprofile',
      name: 'EmployerProfile',
      component: EmployerProfile,
      meta: {
        requiresAuth: true,
        employer: true
      }
    },
    {
      path: '/EditEmployerProfile',
      name: 'EditEmployerProfile',
      component: EditEmployerProfile,
      meta: {
        requiresAuth: true,
        employer: true
      }
    },
    {
      path: '/forgotpassword',
      name: 'forgotpassword',
      component: ForgotPassword,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/addjoblisting',
      name: 'AddJobListing',
      component: AddJobListing,
      meta: {
        requiresAuth: true,
        employer: true
      }
    },
    {
      path: '/applicationdashboard',
      name: 'ApplicationDashboard',
      component: ApplicationDashboard,
      meta: {
        requiresAuth: true,
        employer: false
      }
    },
    {
      path: '/applyjob',
      name: 'StudentApplyJob',
      component: StudentApplyJob,
      meta: {
        requiresAuth: true,
        employer: false
      }
    },
    {
      path: '/viewapplicants',
      name: 'ViewApplicants',
      component: ViewApplicants,
      meta: {
        requiresAuth: true,
        employer: true
      }
    },
    {
      path: '/viewprofile',
      name: 'ViewProfile',
      component: ViewProfile,
      meta: {
        requiresAuth: true,
        employer: true
      }
    },
    {
      path: '/studentvideocall',
      name: 'StudentVideoCall',
      component: StudentVideoCall,
      meta: {
        requiresAuth: true,
        employer: false
      }
    },
    {
      path: '/employervideocall',
      name: 'EmployerVideoCall',
      component: EmployerVideoCall,
      meta: {
        requiresAuth: true,
        employer: true
      }
    }
  ]
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(getAuth(), resolve, reject);
  });
};

// const isEmployer = () => {
//   await
// }

import { alertMsg } from '../functions/alertMsg';
router.beforeEach(async (to, from, next) => {
  const isAuth = await getCurrentUser();
  const employer = await getEmployer();
  if (from.matched.some(record => record.meta.acceptable)) {
    //login exception
    next();
    console.log(1);
  } else if (!to.matched.some(record => record.meta.requiresAuth)) {
    //do not require log in
    next();
  } else if (to.matched.some(record => record.meta.requiresAuth) && !isAuth) {
    //not logged in
    alertMsg('error', 'Not Authorised');
    next('/');
    console.log(2);
  } else if (
    isAuth &&
    to.matched.some(record => record.meta.employer) &&
    !employer
  ) {
    //Student logged in but go to employer page
    alertMsg('error', 'You have no access to employer features');
    next('/studenthome');
  } else if (
    isAuth &&
    !to.matched.some(record => record.meta.employer) &&
    employer
  ) {
    //Employer logged in but go to student page
    alertMsg('error', 'You have no access to student features');
    next('/employerhome');
  } else {
    //Authenticated and correct type
    next();
    console.log(employer);
  }
});

async function getEmployer() {
  const db = getFirestore(firebaseApp);
  if (getAuth().currentUser == null) {
    return null;
  }
  const docRef = doc(db, 'User', getAuth().currentUser.uid);
  const docSnap = await getDoc(docRef);

  try {
    return docSnap.data().Employer;
  } catch {
    console.log('error');
  }
}

export default router;
