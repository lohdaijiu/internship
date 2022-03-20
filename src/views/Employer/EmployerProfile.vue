<template>
    <EmployerNav/>
    <EmployerProfile/>
</template>
<script>
import EmployerNav from '@/components/EmployerNav.vue';
import EmployerProfile from '@/components/EmployerProfile.vue';
export default {
    name: 'App',

    components:{
        EmployerNav,
        EmployerProfile,
    },
}
</script>