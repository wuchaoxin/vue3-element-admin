import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";
import store from "@/store";
import { Roles } from "./../../types/typings/role";
import { UserState } from "@/types/typings/store/user";
import { getToken, removeToken, setToken } from "@/utils/auth";
import { getInfo, login, logout } from "@/apis/user";
import { resetRouter } from "@/router";
import router from "@/router";
import { usePermissionStoreWithOut, useTagsViewStoreWithOut } from "@/store";

export const useUserStore = defineStore({
  id: "user",
  state: (): UserState => ({
    token: getToken(),
    name: "",
    avatar: "",
    roles: [],
  }),
  getters: {},
  actions: {
    login(userInfo: Dynamic) {
      const { username, password } = userInfo;
      return new Promise<void>((resolve, reject) => {
        login({ username: username.trim(), password: password })
          .then((response) => {
            const { data } = response;
            this.token = data.token;
            setToken(data.token);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // get user info
    getInfo() {
      return new Promise((resolve, reject) => {
        getInfo(this.token)
          .then((response) => {
            const { data } = response;
            if (!data) {
              return reject("Verification failed, please Login again.");
            }
            const { name, avatar, roles } = data;
            // roles must be a non-empty array
            if (!roles || roles.length <= 0) {
              reject("getInfo: roles must be a non-null array!");
            }
            this.name = name;
            this.avatar = avatar;
            this.roles = [...roles];
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // user logout
    logout() {
      return new Promise<void>((resolve, reject) => {
        logout()
          .then(() => {
            removeToken(); // must remove  token  first
            resetRouter();
            _resetStore();
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // remove token
    resetToken() {
      return new Promise<void>((resolve) => {
        removeToken(); // must remove  token  first
        _resetStore();
        resolve();
      });
    },
    // dynamically modify permissions
    async changeRoles(role: Roles) {
      const tagsViewStore = useTagsViewStoreWithOut();
      const PermissonStore = usePermissionStoreWithOut();
      const token = role + "-token";
      this.setToken(token);
      setToken(token);

      await this.getInfo();

      resetRouter();

      //generate accessible routes map based on roles
      await PermissonStore.generateRoutes(this.roles);
      // dynamically add accessible routes
      PermissonStore.addRoutes.forEach((item) => {
        const tempItem = item as RouteRecordRaw;
        if (tempItem) {
          router.addRoute(tempItem);
        }
      });

      //reset visited views and cached views
      tagsViewStore.delAllViews();
    },
    setToken(token: string) {
      this.token = token;
    },
  },
});

function _resetStore() {
  const userStore = useUserStore();
  userStore.$reset();
}

// 在 setup 之外 时使用
export function useUserStoreWithOut() {
  return useUserStore(store);
}
