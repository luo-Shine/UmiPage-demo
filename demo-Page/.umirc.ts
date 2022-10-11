import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // 删除routes,直接使用约定式路由
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
  //组件按需加载 / 路由懒加载
  dynamicImport: {},
});

