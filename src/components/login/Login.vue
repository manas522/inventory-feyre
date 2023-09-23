<script>
import AtlasAPIs from "../../services/atlasAPI";
import { Error } from "../../services/error";
export default {
  data: () => ({
    form: false,
    email: null,
    password: null,
    visible: false,
    loading: false,
  }),

  methods: {
    async onSubmit() {
      this.loading = true
      try {
        const user = await AtlasAPIs.loginEmailPassword(this.email, this.password);
        if (user) {
          this.$router.push('/home')
        }
      } catch (e) {
        Error("Error in Login Credentials", 3, true);
      }
      this.loading = false;
    },
    required(v) {
      return !!v || 'Field is required'
    },
  },
}
</script>

<template>
  <div>
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <header>
        <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="75" />
      </header>
      <v-text-field density="compact" placeholder="Email address" v-model="email" prepend-inner-icon="mdi-email-outline"
        variant="outlined"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">

        <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer" target="_blank">
          Forgot login password?</a>
      </div>

      <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
        density="compact" v-model="password" placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline"
        variant="outlined" @click:append-inner="visible = !visible"></v-text-field>

      <v-card class="mb-12" color="surface-variant" variant="tonal">
        <v-card-text class="text-medium-emphasis text-caption">
          Warning: Password is case sensitive. You can also click "Forgot login password?" below to reset the login
          password.
        </v-card-text>
      </v-card>

      <v-btn block class="mb-8" color="blue" size="large" variant="tonal" :disabled="!password || !email"
        :loading="loading" @click.stop="onSubmit">
        Log In
      </v-btn>

      <v-card-text class="text-center">
        <a class="text-blue text-decoration-none" href="#" rel="noopener noreferrer" target="_blank">
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  padding: 1rem 0;
}

header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75px;
}
</style>
