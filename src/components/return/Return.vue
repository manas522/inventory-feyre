<script>
import {sizes} from "../../constants/app.js";
export default {
  data() {
    return {
      isEditing: false,
      model: null,
      sizes,
      product: {
        "s":  0,
        "xl":  0,
        "l":  0,
        "m":  0,
      },
      products: ["product-23", "product-23", "product-33"],
      quantity: 0
    }
  },
  methods: {
    onModelValueChange() {
      alert(values)
    }
  },
}
</script>
<template>
  <v-row>
    <v-col cols="12" sm="10" md="10">
      <v-autocomplete v-model="model" :hint="!isEditing ? 'Click the icon to edit' : 'Click the icon to save'"
        :items="products" :readonly="!isEditing" :label="`Products — ${isEditing ? 'Editable' : 'Readonly'}`"
        persistent-hint prepend-icon="mdi-city">
        <template v-slot:append>
          <v-slide-x-reverse-transition mode="out-in">
            <v-icon :key="`icon-${isEditing}`" :color="isEditing ? 'success' : 'info'"
              :icon="isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'"
              @click="isEditing = !isEditing"></v-icon>
          </v-slide-x-reverse-transition>
        </template>
      </v-autocomplete>
    </v-col>
    <v-col cols="12" sm="2" md="2">
      <v-card width="100%">
        <v-card-text class="text-h6" elevate="0">
          <v-badge :content="quantity">
            <v-icon icon="mdi-tshirt-crew" color="info"></v-icon>
          </v-badge>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-container>
    <v-row>
      <v-chip-group filter>
        <v-chip size="large" :prepend-icon="`mdi-size-${size}`"  v-for="size in sizes.list">
 Size Quantity {{ product[size]
        }}</v-chip>
      </v-chip-group>
    </v-row>
  </v-container>
  <v-container v-for="item in ['flipkart', 'meesho', 'ajio']">
    <v-row>
      <v-card width="100%">
        <v-card-title style="text-transform: capitalize; padding-top: 15px">
          <v-badge :content="quantity" color="info" floating>
            {{ item }} Selling
          </v-badge>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="4" md="4" l="4" v-for="size in sizes.list">
              <v-text-field :label="`${sizes.map[size].key} Size`" :v-model="product[size]"
                :prepend-icon="`mdi-size-${size}`" type="number"></v-text-field>

            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
  <v-spacer></v-spacer>
  <v-footer>
  <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
    Discard
  </v-btn>
  <v-btn color="blue-darken-1" variant="outline" @click="dialog = false">
    Save
  </v-btn>
</v-footer>
</template>