<template>
      <StudentNav/>
      <div v-if="user">
          <div>
              <p> Welcome! Jason <br/>
          <div>
      </div>
</template>

<script>
import StudentNav from '../../components/StudentNav.vue'

const StudentData = [
        numOfRej: '3',
        ApplicationInProgress: '11',
        ApplicationComp: '14'];

export default {
    name: 'StudentHome',
    components:{
        StudentNav

    },
    
    data() {
        return {
            StudentData,
            jobTypeData:{'Software Engineer': 35%, 'Data Analyst': 65%},
            companyDistributionData:{'Grab': 25%, 'Shopee':25%, 'ByteDance':50%}
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
}
</script>

<style>

</style>
