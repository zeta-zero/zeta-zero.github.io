// assets/js/app.js

import Home from '/assets/components/home.js';
import Blog from '/assets/components/blog.js';
import Relax from '/assets/components/relax.js';
import About from '/assets/components/about.js';



const { createApp } = Vue;
const app = createApp({ /* your app options */ });

// Define your routes
const routes = [
  { path: "/", component: Home },
  { path: '/blog', component: Blog },
  { path: '/relax', component: Relax },
  { path: '/about', component: About },
  // Add more routes as needed
];

// Create the router instance
const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

app.use(router); // Use the router in your Vue app

// 注册组件
app.component('Home', Home);
app.component('Blog', Blog);
app.component('Relax', Relax);
app.component('About', About);
app.mount('#app');
