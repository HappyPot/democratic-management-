
import wlTreeSelect from "./index.vue";


const components = {
  wlTreeSelect,
};

const install = function (Vue, opts = {}) {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
  });
};
export default install;
