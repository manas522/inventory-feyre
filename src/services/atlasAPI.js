import * as Realm from "realm-web";
import {sizes} from "../constants/app";
export default {
    emailID: "manas522@gmail.com",
    password: "aryan123",
    DATA_SOURCE_NAME: "inventory",
    DATABASE_NAME: "rme-feyre",
    COLLECTION_NAME: "inventory",
    async init () {
        this.app = new Realm.App({ id: "application-0-euwwb" });
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
        const mongo = this.app.currentUser.mongoClient(this.DATA_SOURCE_NAME);
        const inventoryCollection = mongo.db(this.DATABASE_NAME).collection(this.COLLECTION_NAME);
        inventoryCollection.insertOne(product)
    },
    async readAllInventory() {
        // type checking;
        const mongo = this.app.currentUser.mongoClient(this.DATA_SOURCE_NAME);
        const inventoryCollection = mongo.db(this.DATABASE_NAME).collection(this.COLLECTION_NAME);
        return inventoryCollection.find({})
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