<script>
import { RouterView } from 'vue-router';
import atlasAPI from './services/atlasAPI'; 

export default {
    mounted() {
        atlasAPI.init();
        this.goToDashboard();
        console.log(this.$store.getters['app/errorcode'])
    },
    methods: {
        async goToDashboard() {
            const user = await atlasAPI.autologin();
            if (user) {
                this.$router.push('/home');
            }
        },
    },
}
</script>
<template>
    <RouterView />
</template>

<style scoped>
</style>
