import * as Realm from "realm-web";
import {sizes} from "../constants/app";
import {bulkSellReturnPayloadResellerCheck, prepareReturnSellerAPIQuery} from "../utility/apisUtils";
export default {
    emailID: "manas522@gmail.com",
    password: "aryan123",
    DATA_SOURCE_NAME: "inventory",
    DATABASE_NAME: "rme-feyre",
    COLLECTION_NAME: "inventory",
    ORDER_COLLECTION_NAME: "order",
    RETURN_COLLECTION_NAME: "returns",
    async init () {
        window.mongoApp = this.app = new Realm.App({ id: "application-0-euwwb" });
    },
    async loginEmailPassword (email, password) {
        // Create an email/password credential
        const credentials = Realm.Credentials.emailPassword(email, password);
        // Authenticate the user
        const user = await this.app.logIn(credentials);
        // `App.currentUser` updates to match the logged in user
        console.assert(user.id === this.app.currentUser.id);
        return user;
    },
    async autologin() {
        return false;
    },
    async logout() {
        return this.app.currentUser.logOut();
    },
    async createInventory(product) {
        // type checking;
        if (product === null || typeof product !== typeof {}) {
            throw `Error Type in parameter, inventory as product expected as object"`
        }
        await this.app.currentUser.functions.post_inventory(product);
    },
    async readAllInventory() {
        // type checking;
        const mongo = this.app.currentUser.mongoClient(this.DATA_SOURCE_NAME);
        const inventoryCollection = mongo.db(this.DATABASE_NAME).collection(this.COLLECTION_NAME);
        return inventoryCollection.find({})
    },
    async readProductInventory(product_id) {
        // type checking;
        const response = await this.app.currentUser.functions.get_inventory(product_id)
        return response
        // return this.app.currentUser.functions.get_inventory(product_id)
    },
    async putInventory(product_id, query) {
        // type checking;
        const response = await this.app.currentUser.functions.put_inventory(product_id, query)
        return response
        // return this.app.currentUser.functions.get_inventory(product_id)
    },
    async readInputInventory(substr) {
        // type checking;
        const mongo = this.app.currentUser.mongoClient(this.DATA_SOURCE_NAME);
        const inventoryCollection = mongo.db(this.DATABASE_NAME).collection(this.COLLECTION_NAME);
        return inventoryCollection.find({ product_id: { $regex: substr, $options: 'i' } })
    },
    async sell(product_id, size, orderID) {
        if (typeof product_id !== typeof ""){
            throw `Error Type in parameter, product_id as ${product_id} expected as "product-22"`
        }
        if (typeof size !== typeof "" || !sizes.include(size) ){
            throw `Error Type in parameter, size as ${size} expected as "${sizes}"`
        }
        if (typeof orderID !== typeof ""){
            throw `Error Type in parameter, size as ${orderID} expected as OrderID"`
        }
        // type checking;
        const mongo = this.app.currentUser.mongoClient(this.DATA_SOURCE_NAME);
        const inventoryCollection = mongo.db(this.DATABASE_NAME).collection(this.COLLECTION_NAME);
        return inventoryCollection.updateOne({ product_id}, { $inc: {[size]: 1 }})
    },
    async bulkSellReturn(product_id, payload) {
        if (!bulkSellReturnPayloadResellerCheck(payload)) return;
        const query = prepareReturnSellerAPIQuery(payload);
        // type checking;
        const mongo = this.app.currentUser.mongoClient(this.DATA_SOURCE_NAME);
        const inventoryCollection = mongo.db(this.DATABASE_NAME).collection(this.COLLECTION_NAME);
        return inventoryCollection.updateOne({ product_id}, { $inc: query})
    },
    async newOrder(productID, orderQuery) {
        if (orderQuery === null || typeof orderQuery !== typeof {}) {
            throw `Error Type in parameter, inventory expected as object"`
        }
        const query = prepareReturnSellerAPIQuery(orderQuery);
        this.app.currentUser.functions.post_order(productID, query);
    },
    async returnOrder(productID, orderQuery, returnOrder) {
        if (orderQuery === null || typeof orderQuery !== typeof {}) {
            throw `Error Type in parameter, inventory expected as object"`
        }
        if (returnOrder === null || typeof returnOrder !== typeof {}) {
            throw `Error Type in parameter, inventory expected as object"`
        }
        const orderQueryPayload = prepareReturnSellerAPIQuery(orderQuery);
        const returnQueryPayload = prepareReturnSellerAPIQuery(returnOrder);
        this.app.currentUser.functions.post_return(productID, orderQueryPayload, returnQueryPayload);
    },
    async return(product_id, size, orderID) {
        if (typeof product_id !== typeof ""){
            throw `Error Type in parameter, product_id as ${product_id} expected as "product-22"`
        }
        if (typeof size !== typeof "" || !sizes.include(size) ){
            throw `Error Type in parameter, size as ${size} expected as "${sizes}"`
        }
        if (typeof orderID !== typeof ""){
            throw `Error Type in parameter, size as ${orderID} expected as OrderID"`
        }
        // type checking;
        const mongo = this.app.currentUser.mongoClient(this.DATA_SOURCE_NAME);
        const inventoryCollection = mongo.db(this.DATABASE_NAME).collection(this.COLLECTION_NAME);
        return inventoryCollection.updateOne({ product_id}, { $inc: {[size]: -1 }})
    }
};