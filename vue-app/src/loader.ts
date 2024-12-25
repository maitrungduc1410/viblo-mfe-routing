import App from "./App.vue";
import AppView from "./components/appview/AppView.vue";
import router from "./router";

const widget = {
  id: "VUE_WIDGET", // must be globally unique
  framework: "vue",
  component: App,
  title: "My Vue Widget",
};

const app = {
  id: "VUE_APP", // must be globally unique
  framework: "vue",
  component: AppView,
  routeName: "vue-app",
  appView: true,
  plugins: [router],
  title: "Vue App",
};

export { widget, app };
