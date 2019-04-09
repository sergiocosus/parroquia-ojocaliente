import {Injectable} from '@angular/core';
import {flatMap} from 'rxjs/operators';
import { AuthService } from '@app/api/services/auth.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthPopupService {
  private callBackUrl: string = location.origin + '/assets/social-success.html';
  private oAuthTokenUrl: string;
  private loopCount = 600;
  private intervalLength = 100;

  private preUrl: string = location.origin + '/assets/pop-up-loading.html';
  private popup: Window;


  constructor(private authService: AuthService) {

  }

  preOpen() {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('This is running as standalone.');
      this.popup = null;
    } else {
      this.popup = this.popupwindow(this.preUrl, '', window, 550, 450);
    }
  }

  closePopup() {
    this.popup.close();
  }

  openPopup(driver: 'google' | 'facebook') {
    return this.authService.getSocialRedirectUrl(driver, this.callBackUrl)
      .pipe(flatMap(
        redirectUrl => this.doLogin(redirectUrl)
      ));
  }


  loginFromSocialPopup(driver) {
    return this.openPopup(driver).pipe(flatMap(
      data => this.authService.loginWithSocialCode(driver, data.data.code, this.callBackUrl)
    ));
  }

  doLogin(url) {
    const loginWatcher = new Subject<any>();

    this.oAuthTokenUrl = url;

    let loopCount = this.loopCount;

    if (!this.popup) {
      this.popup = this.popupwindow(this.oAuthTokenUrl, '', window, 550, 450);
    }
    const windowHandle = this.popup;

    setTimeout(() => {
      windowHandle.location.replace(this.oAuthTokenUrl);
    }, 100)

    const intervalId = window.setInterval(() => {
      if (loopCount-- < 0 || windowHandle.closed) {
        window.clearInterval(intervalId);
        loginWatcher.error({
          success: false
        });
        windowHandle.close();
        console.log('closed');
      } else {
        let href: string;
        try {
          href = windowHandle.location.href;
        } catch (e) {
        }
        if (href != null && href !== this.preUrl) {
          const found = href.split(location.origin).length > 1;
          if (found) {
            window.clearInterval(intervalId);
            const parsed = this.parse(href.substr(this.callBackUrl.length + 1));

            windowHandle.close();
            loginWatcher.next({
              success: true,
              data: parsed
            });
          }
        }
      }
    }, this.intervalLength);

    return loginWatcher;
  }

  private parse(str) {
    if (typeof str !== 'string') {
      return {};
    }

    str = str.trim().replace(/^(\?|#|&)/, '');

    if (!str) {
      return {};
    }

    str = str.split('#')[0];

    return str.split('&').reduce(function (ret, param) {
      const parts = param.replace(/\+/g, ' ').split('=');
      let key = parts.shift();
      let val = parts.length > 0 ? parts.join('=') : undefined;

      key = decodeURIComponent(key);

      val = val === undefined ? null : decodeURIComponent(val);

      if (!ret.hasOwnProperty(key)) {
        ret[key] = val;
      } else if (Array.isArray(ret[key])) {
        ret[key].push(val);
      } else {
        ret[key] = [ret[key], val];
      }

      return ret;
    }, {});
  }

  private popupwindow(url, title, win, w, h) {
    const y = win.top.outerHeight / 2 + win.top.screenY - (h / 2);
    const x = win.top.outerWidth / 2 + win.top.screenX - (w / 2);
    return win.open(url, title,
      'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='
      + w + ', height=' + h + ', top=' + y + ', left=' + x);
  }


}
