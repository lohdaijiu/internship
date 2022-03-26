!<template>
  <NavBar/>
  <ChatSelection/>
  <el-button type="primary" @click="test()">Create</el-button>
</template>

<script>
import NavBar from "../../components/StudentNav.vue"
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