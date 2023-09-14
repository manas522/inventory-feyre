<script>
import atlasAPI from '../../services/atlasAPI';
import {sizes} from "../../constants/app";

export default {
  mounted() {
    atlasAPI.readAllInventory()
    .then((result) => this.inventories = result);
  },
  data() {
    return {
      drawer: true,
      rail: true,
      sizes,
      inventories: [],
    }
  },
}
</script>

<template>
  <v-container class="bg-surface-variant mb-6 full-height">
    <v-row>
      <v-col>
        <v-text-field :loading="loading" density="compact" variant="solo" label="Search templates"
          append-inner-icon="mdi-magnify" single-line hide-details @click:append-inner="onClick"></v-text-field>
          <p class="font-weight-medium inline-parent pb-1 mb-1">
        </p>
        <router-link :to="{ name: 'inventory-edit-new', query: { action: 0 }}">
          <v-btn variant="outlined pa-2 ma-2">Create New Inventory</v-btn>
        </router-link>
      </v-col>
    </v-row>
    <v-row class="inventory__product-list">
      <v-col>
        <v-list lines="two">
          <v-list-item v-for="inventory in inventories" :key="inventory.title" :title="inventory.title">
            <v-list-item-subtitle>
              {{ inventory.product_id }}
              <v-chip-group filter>
              <v-chip size="small" color="info" :prepend-icon="`mdi-size-${size}`"  v-for="size in sizes.list">
                   {{ inventory[size] ?? 0
                }}</v-chip>
              </v-chip-group>
            </v-list-item-subtitle>
            <template v-slot:prepend>
              <v-avatar v-if="inventory.image !== ''" :image="inventory.image" size="75"></v-avatar>
              <v-avatar v-else color="info">
                <v-icon  icon="mdi-tshirt-crew" size="x-large"></v-icon>
              </v-avatar>
            </template>
            <v-divider></v-divider>
            <template v-slot:append>
              <router-link :to="{ name: 'invetory-detail-page', params: { id: inventory.product_id }, query: { action: 1 }}">
                <v-btn @click="" color="grey-lighten-1" icon="mdi-chevron-right" variant="text"></v-btn>
              </router-link>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

  </v-container>
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
</style>
