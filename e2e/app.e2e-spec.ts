import { ArtemisPage } from './app.po';

describe('artemis App', () => {
  let page: ArtemisPage;

  beforeEach(() => {
    page = new ArtemisPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
