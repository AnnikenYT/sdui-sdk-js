import { Sdui } from '../src';

describe('lessons today', () => {
  it('Gets correct lessons', () => {
    const sdui = new Sdui();
    sdui
      .authAsync(
        process.env.SDUI_EMAIL!,
        process.env.SDUI_PASSWORD!,
        process.env.SDUI_SCHOOL!
      )
      .then(() => {
        sdui.getLessonsAsync(0).then(lessons => {
          expect(lessons).not.toBe([]);
        });
      });
  });
});
