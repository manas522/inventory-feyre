<script>
import atlasAPI from '../../services/atlasAPI';

const ACTION_TYPE = {
  NEW: 0,
  EDIT: 1,
  DELETE: 2
}
export default {
  props:{
    action: -1
  },
  data() {
    return {
      actionType: -1,
    }
  },
  mounted() {
    if (this.$route.query.action) {
      const parseAction = parseInt(this.$route.query.action);
      if (!isNaN(parseAction)) {
        this.actionType = parseAction
      }
    }
  },
  methods: {
    createInventory() {
      atlasAPI.createInventory(undefined)
      .then((test) => {
        console.log(test);
      })
    }
  }
}
</script>

<template>
  <v-card :loading="loading" class="mx-auto my-12">
    <template v-slot:loader="{ isActive }">
      <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
    </template>
    <v-file-input v-if="actionType === 0" variant="solo-filled" label="Product Image"/>
    <v-img cover height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

    <v-card-item>
      <v-text-field v-if="actionType === 0" clearable label="Product Name*" variant="solo"></v-text-field>
      <v-card-title v-else>Cafe Badilico</v-card-title>
    </v-card-item>

    <v-card-text>
      <v-textarea  v-if="actionType === 0" clearable label="Product Description*" variant="solo"></v-textarea>
      <div v-else>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-title>Size Based Stock's Availability</v-card-title>

      <v-container fluid class="my-6">
        <v-row id="xl">
          <v-col cols="3">
            <v-list-subheader>XL*</v-list-subheader>
          </v-col>

          <v-col cols="3">
            <v-text-field label="Total Count" type="number" ></v-text-field>
          </v-col>
          <v-col cols="3"  v-if="actionType !== 0">
            <v-text-field label="Add Count" type="number" ></v-text-field>
          </v-col>
          <v-col cols="3"  v-if="actionType !== 0">
            <div class="totaladdsup"> <span>Total Adds to</span><span>2</span></div>
          </v-col>
        </v-row>

        <v-row id="large">
          <v-col cols="3">
            <v-list-subheader>Large*</v-list-subheader>
          </v-col>

          <v-col cols="3">
            <v-text-field label="Total Count" type="number" ></v-text-field>
          </v-col>
          <v-col cols="3"  v-if="actionType !== 0">
            <v-text-field label="Add Count" type="number" ></v-text-field>
          </v-col>
          <v-col cols="3"  v-if="actionType !== 0">
            <div class="totaladdsup"> <span>Total Adds to</span><span>2</span></div>
          </v-col>
        </v-row>

        <v-row id="medium">
          <v-col cols="3">
            <v-list-subheader>Medium*</v-list-subheader>
          </v-col>

          <v-col cols="3">
            <v-text-field label="Total Count" type="number" ></v-text-field>
          </v-col>
          <v-col cols="3"  v-if="actionType !== 0">
            <v-text-field label="Add Count" type="number" ></v-text-field>
          </v-col>
          <v-col cols="3"  v-if="actionType !== 0">
            <div class="totaladdsup"> <span>Total Adds to</span><span>2</span></div>
          </v-col>
        </v-row>

        <v-row id="small">
          <v-col cols="3">
            <v-list-subheader>Small*</v-list-subheader>
          </v-col>

          <v-col cols="3">
            <v-text-field label="Total Count" type="number" ></v-text-field>
          </v-col>
          <v-col cols="3"  v-if="actionType !== 0">
            <v-text-field label="Add Count" type="number" ></v-text-field>
          </v-col>
          <v-col cols="3"  v-if="actionType !== 0">
            <div class="totaladdsup"> <span>Total Adds to</span><span>2</span></div>
          </v-col>
        </v-row>
      </v-container>

    <v-card-actions>
      <template v-if="actionType !== 0">
        <v-btn color="deep-purple-lighten-2" variant="text" @click="reserve">
          Sale Order
        </v-btn>
        <v-btn color="deep-purple-lighten-2" variant="text" @click="reserve">
          Return
        </v-btn>
    </template>
    <template v-else>
      <v-btn prepend-icon="$vuetify" @click="this.createInventory">
        Create Inventory
      </v-btn>
    </template>
    </v-card-actions>
  </v-card>
</template>
<style scoped>
.inline-parent {
  display: flex;
  align-items: center;
}

.inline-child {
  flex: 1
}

.inventory__product-list {
  height: 100%;
  overflow: scroll;
}
.totaladdsup {
  display: flex;
  flex-direction: column;
}
</style>
