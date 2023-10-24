<script>
import atlasAPI from '../../services/atlasAPI';
import {sizes, resellers} from "../../constants/app";
import { getIDFromProduct } from "../../utility/appUtils";
const ACTION_TYPE = {
  NEW: 0,
  EDIT: 1,
  DELETE: 2
}
export default {
  async mounted() {
    if (this.actionType !== 0) {
      // read inventory
      // console.log("hello", this.id, this.$route.params.id);
      const inventoryDetails = await atlasAPI.readProductInventory(this.paramID);
      if (inventoryDetails.code === 200) {
        this.inventoryResponse = inventoryDetails.response;
        this.updateReactiveData(inventoryDetails.response);
      }
      console.log(inventoryDetails)
    }
  },
  props:{
    action: -1
  },
  computed: {
    paramID() {
      if (this.$route.params.id) {
        return this.$route.params.id;
      }
      return -1;
    },
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
      product_id: "",
      fileImage: null,
      product_url: "",
      product_description: "",
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
    updateReactiveData(payloadData) {
      this.product_id = getIDFromProduct(payloadData._id);
      this.product_description = payloadData.description;
      this.product_url = payloadData.image;
      for (let i  = 0; i < sizes.list.length; i += 1) {
        if (payloadData[sizes.list[i]] !== undefined) {
          this.product[sizes.list[i]] = payloadData[sizes.list[i]]
        }
      }
    },
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
        "_id": `PRODUCT-${this.product_id}`,
        "product_id": `PRODUCT-${this.product_id}`,
        "image": this.product_url,
        "description": this.product_description,
        "xl": parseInt(this.product.xl),
        "l": parseInt(this.product.l),
        "s": parseInt(this.product.s),
        "m": parseInt(this.product.m),
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
    returnBack() {
      this.$router.go(-1);
    },
    async updateInventory() {
      const queryPayload = {}
      if (this.product_description !== this.inventoryResponse.description) {
        if (queryPayload.$set === undefined) {
          queryPayload.$set = {}
        }
        queryPayload.$set = {
          ...queryPayload.$set,
          description: this.product_description
        }
      }
      if (this.product_url !== this.inventoryResponse.image) {
        if (queryPayload.$set === undefined) {
          queryPayload.$set = {}
        }
        queryPayload.$set = {
          ...queryPayload.$set,
          image: this.product_url
        }
      }
      const updateQuery = {}
      for (let i = 0; i < sizes.list.length; i += 1) {
        const size = sizes.list[i];
        const newQuantity = parseInt(this.product[size]);
        const existingQuantity = parseInt(this.inventoryResponse[size]);
        if (newQuantity !== existingQuantity) {
            if (updateQuery.$inc === undefined) {
              updateQuery.$inc = {}
            }
            updateQuery.$inc = {
              ...updateQuery.$inc,
              [size]: newQuantity - existingQuantity
            }
        }
      }
      const finalQuery = {
        ...updateQuery,
        ...queryPayload
      }
      const response = await atlasAPI.putInventory(this.inventoryResponse.product_id, finalQuery);
      console.log("responmse", response);
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
      <v-text-field v-model="product_id" type="number" :disabled="actionType === 1" label="Product Name*" variant="solo"></v-text-field>
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
        <v-btn color="deep-purple-lighten-2" variant="text" @click="returnBack">
          Discard
        </v-btn>
        <v-btn color="deep-purple-lighten-2" variant="text" @click="updateInventory">
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
