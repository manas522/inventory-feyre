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
    <v-alert
        v-if="$store.state.app.error.enable"
        :color="$store.getters['app/errorcode']"
        :icon="`$${$store.getters['app/errorcode'].toLowerCase()}`"
        :title="$store.getters['app/errorcode']"
        closable
        :text="$store.state.app.error.message"
    ></v-alert>

</template>

<style scoped>
</style>
