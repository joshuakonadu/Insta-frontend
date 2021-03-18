import * as userService from "@/services/user.service";
import { router } from "../router";
import jwtdecode from "jwt-decode";

const user =
  localStorage.getItem("userInsta") || sessionStorage.getItem("userInsta");
const initialState = user
  ? { status: { loggedIn: true }, user, username: jwtdecode(user).username }
  : { status: {}, user: null };

export const authentication = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ dispatch, commit }, { username, password }) {
      commit("loginRequest", { username });

      userService.login(username, password).then(
        user => {
          commit("loginSuccess", { user });
        },
        error => {
          if (!error.response) {
            dispatch(
              "alert/error",
              "Es konnte keine Verbindung zu dem Server hergestellt werden. Fehlercode 504",
              { root: true }
            );
            commit("loginFailure", error);
          } else {
            var errors = error.response.data.errors;
            errors.forEach(element => {
              dispatch("alert/error", element.msg, { root: true });
            });
            commit("loginFailure", error);
          }
        }
      );
    },
    register({ dispatch, commit }, { username, password }) {
      userService.register(username, password).then(
        user => {
          router.push("/login");
        },
        error => {
          var errors = error.response.data.errors;
          errors.forEach(element => {
            dispatch("alert/error", element.msg, { root: true });
          });
          commit("loginFailure", error);
        }
      );
    },
    logout({ commit }) {
      commit("logout");
    }
  },
  mutations: {
    loginRequest(state, user) {
      state.status = { loggingIn: true };
      state.user = user;
    },
    loginSuccess(state, { user, noRedirect }) {
      state.status = { loggedIn: true };
      state.user = user.data.token;
      this._vm.$set(state, "username", jwtdecode(user.data.token).username);
      // login successful if there's a jwt token in the response
      if (state.user) {
        localStorage.setItem("userInsta", state.user);
      }
      if (noRedirect) {
        return;
      }
      if (router.currentRoute.query.redirect) {
        router.push(router.currentRoute.query.redirect);
      } else {
        router.push("/");
      }
    },
    loginFailure(state) {
      state.status = {};
      state.user = null;
    },
    passwordResetRequest(state, user) {
      state.status = { loggingIn: true };
      state.user = user;
    },
    logout(state) {
      state.status = {};
      localStorage.removeItem("userInsta");
      state.user = null;
      router.push("/login");
    },
    setToken(state, { token }) {
      state.status = { loggingIn: true };
      state.user = token;
    }
  },
  getters: {
    loginData: state => state.user
  }
};
