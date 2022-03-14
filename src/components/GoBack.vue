!<template>
  <p><button @click="back">Go Back</button></p>
</template>

<script>
export default {
    methods: {
    back() {
            this.$router.go(-1)
        }
}
}
</script>

<style>

</style>