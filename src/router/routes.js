

export const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/',

    component: () => import('@/layout/default.vue'),

    children: [



      {
        path: 'form-builder',
        name: 'FormBuilder',
        component: () => import('@/modules/form-builder/form-builder.vue'),
      },
      {
        path: 'form-viewer',
        name: 'FormViewer',
        component: () => import('@/modules/form-builder/form-viewer.vue'),
      },
      {
        path: 'supplier-list',
        name: 'SupplierList',
        component: () => import('@/modules/supplier-contact/supplier-contact-list.vue'),
      },
      {
        path: 'supplier-add',
        name: 'AddList',
        component: () => import('@/modules/supplier-contact/supplier-tab-form.vue'),
      },
      {
        path: 'profile',
        name: 'SupplierProfile',
        component: () => import('@/modules/profile/SupplierProfile.vue'),
      },
      {
        path: 'supplier-form',
        name: 'SupplierForm',
        component: () => import('@/modules/supplier-form/supplier-form-template.vue'),
      },

    ],
  },
  {
    path: '/',
    component: () => import('@/layout/blank.vue'),
    children: [

      {
        path: 'login',
        name: 'login',
        component: () => import('@/modules/auth/login.vue'),
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
      {
        path: 'form-feedback',
        name: 'FormFeedback',
        component: () => import('@/modules/form-builder/form-feedback.vue'),
      },
      {
        path: 'dynamic-template',
        name: 'DynamicForm',
        component: () => import('@/modules/supplier-form/form-component/dynamic-registration-form.vue'),
      },

      {
        path: 'success',
        name: 'Success',
        component: () => import('@/modules/msg/success.vue'),
      },
      //   {
      //     path: '/:pathMatch(.*)*',
      //     component: () => import('@/pages/[...error].vue'),
      //   },
    ],
  },

]
