import {errorCode} from "../constants/app.js";
export default {
    namespaced: true,
    state: () => ({
        test: false,
        error: {
            code: 0,
            enable: false,
            message: ""
        }
     }),
    mutations: { 
        setErrorState(state, payload) {
            state.error.message = payload.message;
            state.error.enable = payload.enable;
            state.error.code = payload.code;
        }
     },
    actions: { 
        setErrorMessage({ dispatch, commit, getters, rootGetters }, error) {
            commit("setErrorState", error);
        },
     },
    getters: {
        errorcode(state) {
            return errorCode[state.error.code];
        }
     }
  }