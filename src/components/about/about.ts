import Vue from 'vue';
import Component from 'vue-class-component';

import { MyUtil}  from "../../libs/MyUtil";

@Component({
  template: require('./about.html')
})
export class AboutComponent extends Vue {
  links: any = {
    home: '/'
  }

  mounted() {
    this.$nextTick(() => { MyUtil.debug('about is ready!') });
  }
}