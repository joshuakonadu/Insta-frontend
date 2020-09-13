import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  linkActiveClass: "",
  linkExactActiveClass: "active",
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  
  routes: [
    {path:'/', component:Home, meta: { title: 'Home' } },
    {path:'/about', component:About, meta: { title: 'Über uns' } },
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['login','register','activate-email', 'activate-account','password-set','password-reset','password-reset-confirm','Bewerbungsprofil','arbeitszeugnis-erstellen','arbeitszeugnis-hilfe','arbeitszeugnis','print-candidate','Bewerbungsprofil-vorschau','karriere','bewerben','job','BewerbungErfolgreich','adecco','job-sharelinks'];
  const domainpath = to.path.split('/')[1]
  const authRequired = !publicPages.includes(domainpath);
  const loggedIn = localStorage.getItem('user') || sessionStorage.getItem('user');
  
  if (authRequired && !loggedIn) {
    document.title = to.meta.title
    return next({ path: '/login', query: { redirect: to.fullPath }});
  }
 
  document.title = 'Insta | '+ to.meta.title
  next();
})
