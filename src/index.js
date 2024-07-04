/*
 * @Author: Marlon
 * @Date: 2024-07-04 14:35:41
 * @Description: 
 */

const YBJPermissionVerification = {
  install(Vue, options) {
    // 添加全局方法或属性
    Vue.prototype.$canAccess = function (requiredPermissions) {
      // 这里可以根据自己的逻辑进行权限验证
      // 示例：假设 requiredPermissions 是一个数组，包含所需的权限
      const userPermissions = this.$store.state.user.permissions; // 假设权限信息存储在 Vuex 的状态中

      for (let permission of requiredPermissions) {
        if (!userPermissions.includes(permission)) {
          return false;
        }
      }

      return true;
    };

    // 添加全局指令
    Vue.directive('permission', {
      bind(el, binding, vnode) {
        // 在这里可以根据 binding.value 判断权限，并做相应处理
        const requiredPermissions = binding.value;
        const canAccess = vnode.context.$canAccess(requiredPermissions);

        if (!canAccess) {
          el.style.display = 'none'; // 示例：隐藏元素
        }
      }
    });

    // 添加全局导航守卫
    Vue.router.beforeEach((to, from, next) => {
      // 示例：检查路由是否需要权限验证
      if (to.meta.requiresAuth) {
        const requiredPermissions = to.meta.requiredPermissions;
        const canAccess = Vue.prototype.$canAccess(requiredPermissions);

        if (!canAccess) {
          next('/403'); // 示例：跳转到无权限页面
        } else {
          next();
        }
      } else {
        next();
      }
    });
  }
};


export default YBJPermissionVerification;
