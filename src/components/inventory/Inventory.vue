<script>
export default {
  data() {
    return {
      drawer: true,
      rail: true,
      folders: [
        {
          subtitle: 'Jan 9, 2014',
          title: 'Photos',
        },
        {
          subtitle: 'Jan 17, 2014',
          title: 'Recipes',
        },
        {
          subtitle: 'Jan 28, 2014',
          title: 'Work',
        },

        {
          subtitle: 'Jan 9, 2014',
          title: 'Photos',
        },
        {
          subtitle: 'Jan 17, 2014',
          title: 'Recipes',
        },
        {
          subtitle: 'Jan 28, 2014',
          title: 'Work',
        },
        {
          subtitle: 'Jan 9, 2014',
          title: 'Photos',
        },
        {
          subtitle: 'Jan 17, 2014',
          title: 'Recipes',
        },
        {
          subtitle: 'Jan 28, 2014',
          title: 'Work',
        },
        {
          subtitle: 'Jan 9, 2014',
          title: 'Photos',
        },
        {
          subtitle: 'Jan 17, 2014',
          title: 'Recipes',
        },
        {
          subtitle: 'Jan 28, 2014',
          title: 'Work',
        },
        {
          subtitle: 'Jan 9, 2014',
          title: 'Photos',
        },
        {
          subtitle: 'Jan 17, 2014',
          title: 'Recipes',
        },
        {
          subtitle: 'Jan 28, 2014',
          title: 'Work',
        },
        {
          subtitle: 'Jan 9, 2014',
          title: 'Photos',
        },
        {
          subtitle: 'Jan 17, 2014',
          title: 'Recipes',
        },
        {
          subtitle: 'Jan 28, 2014',
          title: 'Work',
        },
        {
          subtitle: 'Jan 9, 2014',
          title: 'Photos',
        },
        {
          subtitle: 'Jan 17, 2014',
          title: 'Recipes',
        },
        {
          subtitle: '<span>Jan 28, 2014</span>',
          title: 'Work',
        },
      ],
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
          <v-list-item v-for="folder in folders" :key="folder.title" :title="folder.title">
            <v-list-item-subtitle>
              <v-chip-group>
                <v-chip>XL</v-chip>

                <v-chip>Large: </v-chip>

                <v-chip>Small</v-chip>
              </v-chip-group>
            </v-list-item-subtitle>
            <template v-slot:prepend>
              <v-avatar image="https://cdn.vuetifyjs.com/images/lists/1.jpg" size="75"></v-avatar>
            </template>
            <template v-slot:append>
              <router-link :to="{ name: 'invetory-detail-page', params: { id: 123 }}">
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
