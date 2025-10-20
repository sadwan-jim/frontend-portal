

export const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/',

     component: () => import('@/layout/default.vue'),
   
    children: [
        
     
  
      {
        path: 'form-builder',
        name:'FormBuilder',
        component:() => import('@/modules/form-builder/form-builder.vue'),
      },
      {
        path: 'supplier-list',
        component: () => import('@/modules/supplier-contact/supplier-contact-list.vue'),
      },
    
     
    ],
  },
   {
    path: '/',
    component: () => import('@/layout/blank.vue'),
    children: [
    
     {
        path: 'login',
        name:'login',
        component:() => import('@/modules/auth/login.vue'),
      },
      //   {
      //   path: 'form-preview/:id?',
      //   name: 'FormPreview',
      //   component: () => import('@/modules/form-builder/form-preview.vue'),
      // },
      {
        path: 'form-preview',
        name: 'FormPreview',
        component: () => import('@/modules/form-builder/form-preview.vue'),
      },
    //   {
    //     path: '/:pathMatch(.*)*',
    //     component: () => import('@/pages/[...error].vue'),
    //   },
    ],
  },

]
