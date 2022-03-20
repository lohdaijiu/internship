<template>
    <EmployerNav/>
    <EditEmployerProfile/>
</template>

<script>
import EditEmployerProfile from '@/components/EditEmployerProfile.vue'
import EmployerNav from '@/components/EmployerNav.vue'
export default {
    name: 'App',
    components: {
        EditEmployerProfile,
        EmployerNav
    }
}
</script>