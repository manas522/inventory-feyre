<script>
import { sizes, resellers, SALE_MULTIPLIER } from "../../constants/app.js";
import atlasAPI from "../../services/atlasAPI";
export default {
  mounted() {
  },
  computed: {
    totalQuantity() {
      let total = 0;
      if (this.product) {
        sizes.list.forEach((size) => {
          total += this.product[size]
        });
      }
      return total;
    },
    sellersTotal() {
      const allresllers = {}
      resellers.forEach(seller => {
        allresllers[seller] = 0
        sizes.list.forEach((size) => {
          const count = parseInt(this.allresllers[seller][size]);
          if (!isNaN(count)) {
            allresllers[seller] += count
          }
        });
      });
      return allresllers;
    },
  },
  data() {
    const product = {}
    const allresllers = {};
    resellers.forEach(seller => {
      allresllers[seller] = {}
      sizes.list.forEach((size) => {
        allresllers[seller][size] = 0
        product[size] = 0;
      });
    });
    return {
      isEditing: true,
      productID: "",
      sizes,
      resellers,
      allresllers,
      product,
      products: [],
      quantity: 0
    }
  },
  methods: {
    saveReturn() {
      const payload = this.preparePayload();
      atlasAPI.bulkSellReturn(this.productID, payload)
    },
    preparePayload() {
      const payload = {}
      resellers.forEach(seller => {
        sizes.list.forEach((size) => {
          if (this.allresllers[seller][size] !== 0 && !isNaN(parseInt(this.allresllers[seller][size]))) {
            if (!payload[seller]) {
              payload[seller] = {}
            }
            payload[seller][size] = SALE_MULTIPLIER * parseInt(this.allresllers[seller][size]);
          }
        });
      });
      return payload;
    },
    autosearch(event) {
      atlasAPI.readInputInventory(event.target.value)
        .then((result) => {
          if (result && result.length) {
            this.products.splice(0, this.products.length);
            result = result.map(item => ({ name: item.product_id }))
            this.products.push(...result);
          }
          console.log(this.products);
        });
    },
    sellerSizeCount(seller, size) {
      console.log(seller, size, this.product)
      if (this.product && this.product[seller] && this.product[seller][size] !== undefined) {
        return this.product[seller][size];
      }
      return 0;
    },
    selectProduct(productID) {
      this.productID = productID;
      atlasAPI.readProductInventory(productID)
        .then(result => {
          if (result !== undefined) {
            this.product = {
              ...result
            }
          }
          this.isEditing = !this.isEditing;
        })

    },
    toggleEditing() {
      if (this.productID) {
        this.isEditing = !this.isEditing;
      }
    }
  },
}
</script>
<template>
  <v-container>
    <v-row>
      <v-col>
        <v-autocomplete v-model="productID" @input="autosearch"
          :hint="!isEditing ? 'Click the icon to edit' : 'Click the icon to save'" :items="products" item-title="name"
          :readonly="!isEditing" :label="`Products — ${isEditing ? 'Editable' : 'Readonly'}`" persistent-hint>
          <template v-slot:prepend>
            <v-badge :content="totalQuantity">
              <v-icon icon="mdi-tshirt-crew" color="info"></v-icon>
            </v-badge>
          </template>
          <template v-slot:append>
            <v-slide-x-reverse-transition mode="out-in">
              <v-icon :key="`icon-${isEditing}`" :color="isEditing ? 'success' : 'info'"
                :icon="isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'" @click="toggleEditing"></v-icon>
            </v-slide-x-reverse-transition>
          </template>
          <template v-slot:item="{ props, item }">
            <v-list-item @pointerdown="() => selectProduct(item?.raw?.name)" v-bind="props"
              :title="item?.raw?.name"></v-list-item>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-chip-group filter>
          <v-chip size="large" :prepend-icon="`mdi-size-${size}`" v-for="size in sizes.list">
            {{ product[size]
            }}</v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
    <v-row v-for="seller in resellers">
      <v-col>
        <v-card width="100%">
          <v-card-title style="text-transform: capitalize; padding-top: 15px">
            <v-badge :content="sellersTotal[seller]" color="info" floating>
              {{ seller }} Selling
            </v-badge>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="4" md="4" l="4" v-for="size in sizes.list">
                <v-badge :content="sellerSizeCount(seller, size)" color="info">
                  <v-text-field :label="`${sizes.map[size].key} Size`" v-model="this.allresllers[seller][size]"
                    :disabled="isEditing" :prepend-icon="`mdi-size-${size}`" type="number"></v-text-field>
                </v-badge>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-spacer></v-spacer>
    <v-footer>
      <RouterLink to="/home">
        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
          Discard
        </v-btn>
      </RouterLink>
      <v-btn color="blue-darken-1" variant="outline" @click="saveReturn" :disabled="isEditing">
        Save
      </v-btn>
    </v-footer>
  </v-container>
</template>