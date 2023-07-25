import 'dotenv/config';
import Sdui from '../src/index';


describe("Authentication", () => {
    it("logs in with user and password", () => {
        const sdui = new Sdui({
            identifier: process.env.SDUI_IDENTIFIER,
            slink: process.env.SDUI_SLINK,
            password: process.env.SDUI_PASSWORD
        })

        expect(sdui).toBeInstanceOf(Sdui);
    });

    it("logs in with token", () => {
        const sdui = new Sdui({
            token: process.env.SDUI_TOKEN
        })

        expect(sdui).toBeInstanceOf(Sdui);
    });
});