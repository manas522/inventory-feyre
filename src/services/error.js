import store from "../vuex/main";
export const Error = (message, code = 3, enable = true) => {
    store.dispatch("app/setErrorMessage",  {
        code,
        enable,
        message,
    });
}