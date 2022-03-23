<template>
      <StudentNav/>
      <StudentHome/>
</template>

<script>
import StudentNav from '../../components/StudentNav.vue'
import StudentHome from '@/components/StudentHome.vue'

export default {
    name: 'App',
    components:{
        StudentNav,
        StudentHome
    },
    
   
    mounted() {
     
    },
}
</script>

<style>

</style>