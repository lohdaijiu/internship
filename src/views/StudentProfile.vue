<template>
    <StudentNav/>
    <StudentProfile/>
</template>

<script>
import StudentNav from '@/components/StudentNav.vue'
import StudentProfile from '@/components/StudentProfile.vue'
export default {
    name: 'App',
    components: {
        StudentNav,
        StudentProfile
    }
}
</script>