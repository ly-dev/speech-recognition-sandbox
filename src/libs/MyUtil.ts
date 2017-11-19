import * as Lodash from 'lodash';
import * as jQuery from 'jquery';
import 'bootstrap-notify';

import { Subject } from 'rxjs/Subject';

import { MyStringUtil } from './MyStringUtil';

export class MyUtil {
  static timerQs: any = {};
  static config: any = {
    'mode': /* @replace-begin */'mode'/* @replace-end */,
    'debug': /* @replace-begin */'debug'/* @replace-end */,
    'api_url': /* @replace-begin */'api_url'/* @replace-end */,
  };

  /* Console log utilities */
  static debug(obj: any): void {
    if (MyUtil.config.debug) {
      let msg = MyStringUtil.shallowStringify(obj);
      console.debug(msg);
    }
  };

  static info(obj: any): void {
    let msg = MyStringUtil.shallowStringify(obj);
    console.info(msg);
  };

  static error(obj: any): void {
    let msg = MyStringUtil.shallowStringify(obj);
    console.error(msg);
  };

  static getUnixTimeStamp(dt?: string): number {
    let dateTime = new Date().getTime();

    if (dt) {
      dateTime = new Date(dt).getTime();
    }

    let timestamp = Math.floor(dateTime / 1000);
    return timestamp;
  }

  static formatUnixTimeStamp(ts?: number): string {
    let result = '';

    if (typeof (ts) === 'undefined') {
      ts = MyUtil.getUnixTimeStamp();
    }

    let dateTime = new Date(ts * 1000);
    result = dateTime.toLocaleDateString() + ' ' + dateTime.toLocaleTimeString();

    return result;
  }

  // show notify
  static notify(message: string, type: string = 'success'): NotifyReturn {
    let options:NotifyOptions = {
      message: message
    },
    settings:NotifySettings = {
      type: type,
      delay: 2000
    };

    return jQuery.notify(options, settings);
  }

  static createTimer(name: string, func: any, delay: number) {
    // cancel anyway
    MyUtil.cancelTimer(name);

    var timer: any = null;

    if (name && typeof func === 'function' && delay > 0) {
      timer = setTimeout(func, delay);
      MyUtil.timerQs[name] = timer;
      MyUtil.debug('Created timer: ' + name + '(' + delay + ')');
    }

    return timer;
  };

  static cancelTimer(name: string) {
    if (name && MyUtil.timerQs[name]) {
      clearTimeout(MyUtil.timerQs[name]);
      delete MyUtil.timerQs[name];
      MyUtil.debug('Cancelled timer: ' + name);
    }
  };

  static getStringFromElement($element: any, context: any): string {
    let result: string = null;

    if ($element && context) {
      let $targetElement = $element;

      // search by selector
      if (context.selector) {
        $targetElement = $element.find(context.selector).first();
      }

      if ($targetElement && context.attribute) {
        if (typeof (context.attribute) === 'object' && context.attribute.name) {
          let attr = $targetElement.attr(context.attribute.name);
          if (attr && context.attribute.pattern) {
            let pattern = context.attribute.pattern;
            let matched = attr.match(new RegExp(pattern, 'gi'));
            if (matched && matched[0]) {
              result = matched[0];
            }
          }
        } else {
          result = $targetElement.attr(context.attribute);
        }
      }

      if (!result && context.text) {
        result = $targetElement.text();
      }
    }

    return result;
  }

  static getFullUrl(partialUrl: string): string {
    let result: string = partialUrl;

    if (partialUrl) {
      if (partialUrl.match(new RegExp('^//', 'gi'))) {
        result = window.location.protocol + partialUrl;
      } else if (!partialUrl.match(new RegExp('^https?:', 'gi'))) {
        result = window.location.protocol + '//' + window.location.hostname + partialUrl;
      }
    }

    return result;
  }
}