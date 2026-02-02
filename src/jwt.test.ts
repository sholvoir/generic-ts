import { JWT } from "./jwt.ts";

Deno.test('Create Token', async () => {
    const jwt = new JWT({ iss: "micit.co", sub: "mail" });
    await jwt.importKey();
    console.log(`key: ${await jwt.exportKey()}`);
    const token = await jwt.createToken(5 * 365 * 24 * 60 * 60);
    console.log(`token: ${token}`);
    console.log(await jwt.verifyToken(token));
});