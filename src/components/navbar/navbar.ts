import Vue from 'vue';
import { Component, watch } from 'vue-property-decorator';

import { MyUtil}  from "../../libs/MyUtil";

@Component({
  template: require('./navbar.html')
})
export class NavbarComponent extends Vue {
  links: any = [
    {
      path: '/',
      name: 'Home'
    },
    {
      path: '/speak-synthesis',
      name: 'Speak Synthesis'
    },
    {
      path: '/about',
      name: 'About'
    }
  ];

  inverted: boolean = false; // default value

  @watch('$route.path')

  pathChanged() {
    MyUtil.info('Changed current path to: ' + this.$route.path);
  }

  mounted() {
    this.$nextTick(() => { MyUtil.debug('navbar is ready!') });
  }
}