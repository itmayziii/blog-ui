import { browser, element, by } from 'protractor';

export class BlogUiPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('itmazyiii-root h1')).getText();
  }
}
