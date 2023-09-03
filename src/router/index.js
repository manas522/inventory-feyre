import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import InventoryView from '../views/InventoryView.vue'
import InventoryDetailView from "../views/InventoryDetailView.vue";
import OrderInvetoryDialogView from "../views/OrderInvetoryDialogView.vue";
import ReturnInvetoryDialogView from "../views/ReturnInvetoryDialogView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: HomeView,
      children: [{
        path: 'inventory',
        component: InventoryView
      },
      {
        path: 'inventory/edit',
        name: 'inventory-edit-new',
        component: InventoryDetailView
      }, {
        path: 'inventory/:id',
        name: 'invetory-detail-page',
        component: InventoryDetailView
      }, {
        path: 'inventory/:id/sale',
        name: 'invetory-sale-page',
        component: OrderInvetoryDialogView
      }, {
        path: 'inventory/:id/return',
        name: 'invetory-return-page',
        component: ReturnInvetoryDialogView
      }]
    }
  ]
})

export default router
