<script>
import atlasAPI from '../../services/atlasAPI';
import {sizes, resellers} from "../../constants/app";
const ACTION_TYPE = {
  NEW: 0,
  EDIT: 1,
  DELETE: 2
}
export default {
  props:{
    action: -1
  },
  computed: {
    actionType() {
      if (this.$route.query.action) {
        return parseInt(this.$route.query.action)
      }
      return -1;
    }
  },
  data() {
    return {
      total_count_small: 0,
      product_name: "Manas",
      fileImage: null,
      product_url: "",
      product: {
        "s":  0,
        "xl":  0,
        "l":  0,
        "m":  0,
      },
      sizes,
      rules: {
          required: value => !!value || 'Required Field.',
          isnumber: value => (typeof value !== 'number' && value >= 0)|| 'Invalid value.',
      }
    }
  },
  methods: {
    productImageCB() {
      var reader  = new FileReader();
      reader.onloadend = function () {
        // this.product_url = reader.result;
      }
      alert(this.fileImage[0]);
      if (this.fileImage[0]) {
        reader.readAsDataURL(this.fileImage[0]);
      } else {
        this.product_url = ""
      }
    },
    prepareNewInventoryPayload() {
      const payload = {
        "_id": `PRODUCT-${this.product_name}`,
        "product_id": `PRODUCT-${this.product_name}`,
        "image": this.product_url,
        "description": this.product_description,
        "xl": parseInt(this.product.xl),
        "l": parseInt(this.product.l),
        "s": parseInt(this.product.s),
        "m": parseInt(this.product.m),
        "original_inventory": {
          "xl": parseInt(this.product.xl),
          "l": parseInt(this.product.l),
          "s": parseInt(this.product.s),
          "m": parseInt(this.product.m),
        }
      };
      const allresllers = {}
      resellers.concat(["damage"]).forEach(seller => {
        allresllers[seller] = {};
        sizes.list.forEach((size) => {
            allresllers[seller][size] = 0
        });
      });
      return {
        ...payload,
        ...allresllers
      }
    },
    async createInventory() {
      const payload = this.prepareNewInventoryPayload()
      await atlasAPI.createInventory(payload);
    }
  }
}
</script>

<template>
  <v-card :loading="loading" class="mx-auto my-12">
    <template v-slot:loader="{ isActive }">
      <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
    </template>
    <v-file-input accept="image/*" v-if="actionType === 0" v-model="fileImage" @change="productImageCB" variant="solo-filled" label="Product Image"/>
    <v-img cover height="250" :src="this.product_url"></v-img>

    <v-card-item>
      <v-text-field v-model="product_name" type="number"  label="Product Name*" variant="solo"></v-text-field>
    </v-card-item>

    <v-card-text>
      <v-textarea   label="Product Description*" v-model="product_description" variant="solo"></v-textarea>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-title>stock's Availability</v-card-title>

      <v-container fluid class="my-6">
        <v-row id="xl">
          <v-col cols="12" sm="4" md="4" l="4" v-for="size in sizes.list">
              <v-text-field :label="`${sizes.map[size].key} Size`" v-model="product[size]"
                :prepend-icon="`mdi-size-${size}`" type="number"></v-text-field>

            </v-col>
        </v-row>
      </v-container>

    <v-card-actions>
      <template v-if="actionType !== 0">
        <v-btn color="deep-purple-lighten-2" variant="text" @click="reserve">
          Discard
        </v-btn>
        <v-btn color="deep-purple-lighten-2" variant="text" @click="reserve">
          Update
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
