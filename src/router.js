import Vue from "vue";
import Router from "vue-router";
import About from "./views/About.vue";
const Home = () => import("./views/Home.vue");
const AuthenticationPage = () => import("./views/Authentication.vue");
const Register = () => import("@/components/Register.vue");
const Login = () => import("@/components/Login.vue");
const UserImage = () => import("@/views/UserImage.vue");

Vue.use(Router);

export const router = new Router({
  mode: "history",
  linkActiveClass: "",
  linkExactActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },

  routes: [
    { path: "/", component: Home, meta: { title: "Home" } },
    { path: "/about", component: About, meta: { title: "Über uns" } },
    {
      path: "/p/:id",
      name: "userImage",
      component: UserImage,
      meta: { title: "Image" }
    },
    {
      path: "",
      component: AuthenticationPage,
      meta: { title: "Authentication" },
      children: [
        { path: "/login", component: Login, meta: { title: "Login" } },
        {
          path: "/register",
          component: Register,
          meta: { title: "Registrieren" }
        }
      ]
    },
    { path: "*", redirect: "/" }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["login", "register", "user", "p"];
  const domainpath = to.path.split("/")[1];
  const authRequired = !publicPages.includes(domainpath);
  const loggedIn =
    localStorage.getItem("userInsta") || sessionStorage.getItem("userInsta");
  if (authRequired && !loggedIn) {
    document.title = to.meta.title;
    return next({ path: "/login", query: { redirect: to.fullPath } });
  }

  document.title = "Insta | " + to.meta.title;
  next();
});
