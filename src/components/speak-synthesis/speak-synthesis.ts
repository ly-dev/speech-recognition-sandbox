import Vue from 'vue';
import Component from 'vue-class-component';

import { MyUtil}  from "../../libs/MyUtil";

@Component({
  template: require('./speak-synthesis.html')
})
export class SpeakSynthesisComponent extends Vue {
  links: any = {
    home: '/'
  }

  pageData: any = {
    txt: '',
    voiceIndex: null,
    voices: speechSynthesis.getVoices(),
    submitError: ''
  }

  process(action: string): void {
    MyUtil.debug(action);

    // validate the form before submit
    this.$validator.validateAll().then(() => {
      this.pageData.submitError = '';

      let utterance = new SpeechSynthesisUtterance();

      utterance.text = this.pageData.txt;
      utterance.lang = this.pageData.voices[this.pageData.voiceIndex].lang;
      utterance.rate = 1;
      speechSynthesis.speak(utterance);

    }).catch((err: any) => {
      let errors = this.$validator.errorBag;
      MyUtil.debug(errors.all());
    });
  }

  mounted() {
    this.$nextTick(() => { MyUtil.debug('speak-synthesis is ready!') });
  }
}