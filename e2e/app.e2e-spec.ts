import { BlogUiPage } from './app.po';

describe('blog-ui App', () => {
  let page: BlogUiPage;

  beforeEach(() => {
    page = new BlogUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('itmazyiii works!');
  });
});
