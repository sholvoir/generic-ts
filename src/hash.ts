import { encodeBase64Url } from "@std/encoding/base64url";
export const getHash = async (text: string): Promise<string> => {
   const mBuffer = new TextEncoder().encode(text);
   const hBuffer = await crypto.subtle.digest("SHA-256", mBuffer);
   return encodeBase64Url(hBuffer);
};
