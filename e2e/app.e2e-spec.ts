import { EggplantsPage } from './app.po';

describe('eggplants App', () => {
  let page: EggplantsPage;

  beforeEach(() => {
    page = new EggplantsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
