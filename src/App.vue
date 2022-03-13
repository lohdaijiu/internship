<template>
  <h1>Sail to startups with internSHIP</h1>

  internSHIP provides a seamless way to connect with each other, and start your ideal career path early.

  <p><button @click="studentsLogin">Students</button></p>
  <p><button @click="employerLogin">Startups</button></p>

</template>

<script>
  import {useRouter} from 'vue-router';
  const router = useRouter();

export default {
  
  name: 'App',
  components: {
    
  },
  methods: {
    studentsLogin() {
      router.push('./views/studentlogin')
    },
    employerLogin() {
      router.push('/employerlogin')
    }
  }
}

</script>

<style>

</style>
