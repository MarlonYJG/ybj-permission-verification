/*
 * @Author: Marlon
 * @Date: 2024-07-04 14:39:12
 * @Description:
 */

// 插件详解：
// 全局方法 $canAccess：在 Vue 实例中添加了 $canAccess 方法，用于在组件中进行权限验证。它可以根据传入的 requiredPermissions 数组，与当前用户的权限信息进行比较，并返回一个布尔值表示是否有权限。

// 全局指令 v-permission：定义了一个 permission 指令，可以在模板中直接使用。它可以根据传入的权限数组，动态地控制元素的显示与隐藏。

// 全局导航守卫 beforeEach：在路由导航守卫中进行权限验证。示例中使用了 meta.requiresAuth 和 meta.requiredPermissions，来指定哪些路由需要进行权限验证，并在验证失败时重定向到无权限页面。

/**
 * 
 * 使用示例：
 * 在组件中可以通过 $canAccess 方法进行权限验证：
 * <template>
      <div>
        <h1 v-if="$canAccess(['view_dashboard'])">Dashboard</h1>
        <p v-permission="['edit_profile']">Edit Profile</p>
      </div>
    </template>

    <script>
    export default {
      name: 'MyComponent',
      mounted() {
        // 示例：通过 $canAccess 方法检查权限
        if (this.$canAccess(['edit_profile'])) {
          // 允许编辑操作
        }
      }
    };
    </script>
 * 
 * 在路由配置中可以使用路由元信息 meta 来指定需要的权限验证：
 * 
 * // router/index.js

import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import( '../views/Dashboard.vue'),
      meta: {
        requiresAuth: true,
        requiredPermissions: ['view_dashboard']
      }
    }
  ]
});

export default router;

 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */