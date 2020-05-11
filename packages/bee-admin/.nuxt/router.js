import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _410449fc = () => interopDefault(import('../pages/new.vue' /* webpackChunkName: "pages/new" */))
const _16484984 = () => interopDefault(import('../pages/migrations/new.vue' /* webpackChunkName: "pages/migrations/new" */))
const _29c7e6b4 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/new",
    component: _410449fc,
    name: "new"
  }, {
    path: "/migrations/new",
    component: _16484984,
    name: "migrations-new"
  }, {
    path: "/",
    component: _29c7e6b4,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
