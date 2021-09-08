
import TextCom from "./TextCom.vue";
import RadioCom from "./RadioCom.vue";


const components = {
  TextCom,
  RadioCom
};

const install = function (Vue, opts = {}) {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
  });
};
export default install;
