!<template>
  Hi
</template>

<script>
export default {
    mounted() {
        console.log(this.$route.query.id)
    }
}
</script>

<style>

</style>