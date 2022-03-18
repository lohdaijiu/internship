!<template>
  <EmployerNav/>

  <Welcome msg = "Welcome! DATASPARK PTE.LTD"/>

  <h2>Analytics</h2>

</template>

<script>
import EmployerNav from "../../components/EmployerNav.vue"
const EmployerData = [numOfRoles: '5'];

export default {
    name: 'EmployerHome',

    data() {
        return {
            EmployerData,
            jobTypeData:{'Data Analyst': 5, 'Data Engineer': 7, 'Software Engineer': 10, 
            'Data Scientist': 8, 'Algorithm Engineer':10}
        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        })
    },

    methods: {

    },

    components: {
      EmployerNav,
      Welcome
    }
}
</script>

<style>
#Welcome{
  text-align: left;
  color: black;
  text-size-adjust: 10px;
}

</style>
