import Vue from 'vue';
import Component from 'vue-class-component';

import { MyUtil}  from "../../libs/MyUtil";

@Component({
  template: require('./home.html')
})
export class HomeComponent extends Vue {
  links: any = {
    about: '/about'
  }

  pageData: any = {}

  process(action: string): void {
    MyUtil.debug(action);

    switch (action) {
      case 'action':
        break;
      default:
        MyUtil.debug('Action: ' + action + ' not handled');
        break;
    }
  }

  mounted() {
    this.$nextTick(() => {
      MyUtil.debug('home view is ready!')
    });
  }
}