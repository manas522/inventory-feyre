<script>
import { RouterLink } from 'vue-router';
import atlasAPI from '../../services/atlasAPI';
  export default {
    data () {
      return {
        drawer: true,
        rail: true
      }
    },
    methods: {
      async logout() {
        const result = await atlasAPI.logout()
        if (!result) {
          this.$router.push("/login");
        }
      }
    }
  }
</script>

<template>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      > <v-list-item
          title="Feyre"
          nav
        >
          <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <RouterLink to="/home"><v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item></RouterLink>
          <RouterLink to="/home/inventory"><v-list-item prepend-icon="mdi-account" title="Inventory" value="inventory"></v-list-item></RouterLink>
          <RouterLink to="/home"><v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item></RouterLink>
          <v-list-item prepend-icon="mdi-logout-variant" @click.stop="logout" title="Logout" value="Logout"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <RouterView></RouterView>
      </v-main>
    </v-layout>
</template>
