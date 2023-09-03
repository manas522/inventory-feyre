import app from "./appstore";
import { createStore } from 'vuex'
export default createStore({
    modules: {
      app,
    }
});