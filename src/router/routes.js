
const routes = [
  // before login
  {
    path: '/login',
    component: () => import('pages/guest/Login.vue')
  },
  {
    path: '/admin/',
    component: () => import('layouts/admin/MasterLayout.vue'),
    children: [
      { path: 'dashboard', name: 'dashboard', component: () => import('pages/admin/Index.vue') },
      { path: 'form', name: 'formbarang', component: () => import('pages/admin/FormDataBarang.vue') },
      { path: 'edit/:id', name: 'formEditBarang', component: () => import('pages/admin/FormEditDataBarang.vue') }
    ],
    requiredAuth: true
  },
  // main / core app
  {
    path: '/',
    component: () => import('layouts/distributor/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/main/Index.vue') }
    ]
  },
  {
    path: '/addstok',
    component: () => import('layouts/distributor/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/main/AddStok.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
