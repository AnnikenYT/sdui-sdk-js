import { Sdui } from '../src';

describe('lessons today', () => {
  it('produces correct lessons', () => {
    expect(async () => {
      const sdui = new Sdui(
        process.env.SDUI_TOKEN,
        Number(process.env.SDUI_USER_ID)
      );
      const lessons = await sdui.getLessonsAsync(0);
      return lessons;
    }).not.toBe([]);
  });
});
