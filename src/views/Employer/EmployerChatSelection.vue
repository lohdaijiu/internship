!<template>
  <NavBar/>
  <ChatSelection/>
</template>

<script>
import NavBar from "../../components/EmployerNav.vue"
import ChatSelection from "../../components/ChatSelection.vue"

export default {
    components : {
        NavBar,
        ChatSelection
    },
    methods : {
        test() {
            this.$router.push({name : 'Chat', params : {test : '123'}})
        }
    }
}
</script>

<style>

</style>