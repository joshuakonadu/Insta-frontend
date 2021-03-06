import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebookF,
  faLinkedinIn,
  faPaypal,
  faCcVisa,
  faCcMastercard
} from "@fortawesome/free-brands-svg-icons";
import {
  faPlus,
  faTrashAlt,
  faUpload,
  faCheckCircle,
  faEyeSlash,
  faEye,
  faTimesCircle,
  faEraser
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  install(Vue) {
    Vue.component("font-awesome-icon", FontAwesomeIcon);

    const icons = [
      faFacebookF,
      faLinkedinIn,
      faPaypal,
      faCcVisa,
      faCcMastercard,
      faPlus,
      faTrashAlt,
      faUpload,
      faCheckCircle,
      faEyeSlash,
      faEye,
      faTimesCircle,
      faEraser
    ];

    icons.forEach(iconDefinition => library.add(iconDefinition));
  }
};
