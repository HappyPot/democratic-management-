
import TextCom from "./TextCom.vue";
import RadioCom from "./RadioCom.vue";
import CheckboxCom from "./CheckboxCom.vue";
import SingleText from "./SingleText.vue";
import MultilineText from "./MultilineText.vue";


const components = {
  TextCom,
  RadioCom,
  CheckboxCom,
  SingleText,
  MultilineText
};

const install = function (Vue, opts = {}) {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
  });
};
export default install;
