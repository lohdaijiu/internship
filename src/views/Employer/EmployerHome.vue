<template>
  <EmployerNav/>
  <EmployerHome/>
</template>

<script>
import EmployerNav from "../../components/EmployerNav.vue"
import EmployerHome from '../../components/EmployerHome.vue'

export default {
    name: 'App',

    mounted() {
       
    },

    methods: {

    },

    components: {
      EmployerNav,
      EmployerHome
    }
}
</script>

<style>

</style>

