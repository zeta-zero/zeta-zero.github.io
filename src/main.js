import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

// Lazy-load route components
const PlazaView = () => import('./components/views/PlazaView.vue')
const HouseView = () => import('./components/views/HouseView.vue')
const MuseumView = () => import('./components/views/MuseumView.vue')
const WorkshopView = () => import('./components/views/WorkshopView.vue')
const CampsiteView = () => import('./components/views/CampsiteView.vue')
const BeachView = () => import('./components/views/BeachView.vue')

const routes = [
  { path: '/', component: PlazaView },
  { path: '/about', component: HouseView },
  { path: '/blog', component: MuseumView },
  { path: '/skills', component: WorkshopView },
  { path: '/projects', component: CampsiteView },
  { path: '/relax', component: BeachView },
  {
    path: '/relax/game2048',
    component: () => import('./pages/game/game2048/Game2048Component.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0 } },
})

const app = createApp(App)
app.use(router)
app.mount('#app')
