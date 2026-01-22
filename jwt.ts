import { decodeBase64Url, encodeBase64Url } from "@std/encoding/base64url";
import {
   create,
   decode,
   getNumericDate,
   type Header,
   type Payload,
   verify,
} from "@wok/djwt";

export class JWT {
   #key?: CryptoKey;
   algorithm: HmacKeyGenParams = { name: "HMAC", hash: "SHA-256" };
   keyUsages: KeyUsage[] = ["sign", "verify"];
   tokenHeader: Header = { alg: "HS256", typ: "JWT" };
   constructor(public template?: Payload) {}
   async importKey(key?: string): Promise<void> {
      this.#key = key
         ? await crypto.subtle.importKey(
              "raw",
              decodeBase64Url(key),
              this.algorithm,
              false,
              this.keyUsages,
           )
         : await crypto.subtle.generateKey(
              this.algorithm,
              true,
              this.keyUsages,
           );
   }
   async exportKey(): Promise<string> {
      return encodeBase64Url(await crypto.subtle.exportKey("raw", this.#key!));
   }
   async createToken(exp?: number, payload?: Payload): Promise<string> {
      return await create(
         this.tokenHeader,
         { ...this.template, exp: getNumericDate(exp || 5 * 60), ...payload },
         this.#key!,
      );
   }
   async verifyToken(token: string): Promise<Payload | null> {
      try {
         return await verify(token, this.#key!);
      } catch {
         return null;
      }
   }
   static decode(token: string): [unknown, Payload, Uint8Array] {
      return decode(token);
   }
}

export type { Payload };
