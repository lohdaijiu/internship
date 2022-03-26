<template>
    <StudentNav/>
    <StudentHome/>
</template>

<script>
//import firebaseApp from '../main.js'
//import { getFirestore} from "firebase/firestore";
//import { doc , getDoc} from "firebase/firestore";
//import { getAuth } from "firebase/auth";

import StudentNav from '../../components/StudentNav.vue'
import StudentHome from '../../components/StudentHome.vue'
//import StudentJobTypeChart from '@/components/StudentJobTypeChart.vue'
//import StudentCompDistributionChart from '@/components/StudentCompDistributionChart.vue'


export default {
    name: 'App',
    components:{
        StudentNav,
        StudentHome
        //StudentJobTypeChart,
        //StudentCompDistributionChart
    },
    mounted() {
        
    }
}
</script>

<style>


</style>