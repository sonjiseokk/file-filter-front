import { createRouter, createWebHistory } from 'vue-router'
import UploadPage from './components/UploadPage.vue'
import AdminPage from './components/AdminPage.vue'
import HomePage from './components/HomePage.vue'
import HistoryPage from './components/HistoryPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/upload', component: UploadPage },
  { path: '/admin', component: AdminPage },
  { path: '/history', component: HistoryPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router 