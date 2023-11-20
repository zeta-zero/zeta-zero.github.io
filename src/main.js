import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
// 引入 Prism 样式
 import './assets/css/prism-vs.min.css';



import Home from './components/home.vue'
import Blog from './components/blog.vue'
import Relax from './components/relax.vue'
import About from './components/about.vue'

import SwitchOver from './components/switchover.vue'

const app = createApp({ /* your app options */ });

// Define your routes
const routes = [
  { path: "/", component: Home },
  { path: '/blog', component: Blog },
  { path: '/relax', component: Relax },
  { path: '/about', component: About },
  // Add more routes as needed
  
  { path: '/relax/game2048', component: () => import('/src/pages/game/game2048/Game2048Component.vue'), },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(router); // Use the router in your Vue app

// 注册组件
app.component('Home', Home);
app.component('Blog', Blog);
app.component('Relax', Relax);
app.component('About', About);

app.component('SwitchOver',SwitchOver);

app.mount('#app');


