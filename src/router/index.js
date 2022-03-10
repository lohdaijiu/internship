import { createRouter, createWebHistory } from "vue-router";
import Home from '@/views/Home.vue';
import Register from '@/views/Register.vue';
import SignIn from '@/views/SignIn.vue';
import Feed from '@/views/Feed.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/feed",
      name: "Feed",
      component: Feed
    },
    {
      path: "/signin",
      name: "SignIn",
      component: SignIn
    },
  ],
});

export default router;