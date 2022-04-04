import { Sdui } from '../src';

describe('Login and Authenticate', () => {
  it('Logs in successfully with Email/Password', () => {
    const sdui = new Sdui();
    sdui
      .authAsync(
        process.env.SDUI_EMAIL!,
        process.env.SDUI_PASSWORD!,
        process.env.SDUI_SCHOOL!
      )
      .then(() => {
        expect(sdui.user).toBe(Number(process.env.SDUI_USER_ID!));
      });
  });
  it('Logs in successfully with Token/UserID', () => {
    const sdui = new Sdui(
      process.env.SDUI_TOKEN,
      Number(process.env.SDUI_USER_ID)
    );
    expect(sdui.user).toBe(Number(process.env.SDUI_USER_ID!));
  });
});
