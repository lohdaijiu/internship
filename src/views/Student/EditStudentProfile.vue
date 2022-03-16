<template>
    <StudentNav/>
    <EditStudentProfile/>
</template>

<script>
import EditStudentProfile from '@/components/EditStudentProfile.vue'
import StudentNav from '@/components/StudentNav.vue'
export default {
    name: 'App',
    components: {
        EditStudentProfile,
        StudentNav
    }
}
</script>