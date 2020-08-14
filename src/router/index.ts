import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

interface RoutesType {
  path: string;
  name: string;
  component: () => {};
  meta?: {
    index?: number;
    keepAlive?: boolean;
  };
  children?: RoutesType[];
}

const routes: Array<RoutesType> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    path: "/api",
    name: "CompositionApi",
    component: () => import("@/views/composition-api.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
