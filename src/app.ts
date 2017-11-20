import * as jQuery from 'jquery';
import "bootstrap-sass/assets/javascripts/bootstrap";

import Vue from 'vue';
import VueRouter from 'vue-router';
import VeeValidator from 'vee-validate';

import { MyUtil}  from "./libs/MyUtil";

import { NavbarComponent } from './components/navbar/navbar';
import { HomeComponent } from './components/home/home';
import { SpeakSynthesisComponent } from './components/speak-synthesis/speak-synthesis';
import { AboutComponent } from './components/about/about';

// Stylesheets
import "./scss/app.scss";

// register vue plugin
Vue.use(VueRouter);
Vue.use(VeeValidator);


// register router
let router = new VueRouter({
  routes: [
    { name: 'home', path: '/', component: HomeComponent},
    { name: 'speak-synthesis', path: '/speak-synthesis', component: SpeakSynthesisComponent },
    { name: 'about', path: '/about', component: AboutComponent },
  ]
});

router.beforeEach((to, from, next) => {
  MyUtil.debug(['Navigate from', from.name, ' to ', to.name]);
  next();
});

MyUtil.debug('start options');
jQuery(() => {
  MyUtil.debug('options ready');
  // bootstrap vue
  new Vue({
    el: '#app-main',
    router: router,
    components: {
      'navbar': NavbarComponent
    }
  });
});