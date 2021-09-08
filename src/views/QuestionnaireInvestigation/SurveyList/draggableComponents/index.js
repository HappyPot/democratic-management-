
import TextCom from "./TextCom.vue";
import RadioCom from "./RadioCom.vue";
import CheckboxCom from "./CheckboxCom.vue";
import SingleText from "./SingleText.vue";


const components = {
  TextCom,
  RadioCom,
  CheckboxCom,
  SingleText
};

const install = function (Vue, opts = {}) {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
  });
};
export default install;
