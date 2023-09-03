<script>
export default {
  data() {
    return {
      dialog: true
    }
  }
}
</script>
<template>
  <v-dialog v-model="dialog" width="1024">
    <v-card>
      <v-toolbar title="Return Product Sale"></v-toolbar>
      <v-card-title>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row no-gutters>
            <v-col cols="3" sm="3" md="3" offset="1">
              <v-text-field label="Return Count" required type="number"></v-text-field>
            </v-col>
            <v-col cols="3" sm="3" md="3" offset="1">
              <v-select :items="['Flipkar', 'Amazon', 'Ajio', 'Myntra']" label="Channel Sale" required></v-select>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="3" sm="3" md="3" offset="1">
              <v-text-field label="Return Count" required type="number"></v-text-field>
            </v-col>
            <v-col cols="3" sm="3" md="3" offset="1">
              <v-select :items="['Flipkar', 'Amazon', 'Ajio', 'Myntra']" label="Channel Sale" required></v-select>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="3" sm="3" md="3" offset="1">
              <v-text-field label="Return Count" required type="number"></v-text-field>
            </v-col>
            <v-col cols="3" sm="3" md="3" offset="1">
              <v-select :items="['Flipkar', 'Amazon', 'Ajio', 'Myntra']" label="Channel Sale" required></v-select>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="3" sm="3" md="3" offset="1">
              <v-text-field label="Return Count" required type="number"></v-text-field>
            </v-col>
            <v-col cols="3" sm="3" md="3" offset="1">
              <v-select :items="['Flipkar', 'Amazon', 'Ajio', 'Myntra']" label="Channel Sale" required></v-select>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>