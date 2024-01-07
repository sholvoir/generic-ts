import { create, verify, getNumericDate, type Header, type Payload } from "https://deno.land/x/djwt@v3.0.1/mod.ts";
import { encodeBase64, decodeBase64 } from 'https://deno.land/std@0.205.0/encoding/base64.ts';

export class JWT {
    #key?: CryptoKey;
    #template?: Payload;
    algorithm: HmacKeyGenParams = { name: "HMAC", hash: "SHA-256" };
    keyUsages: KeyUsage[] = ["sign", "verify"];
    tokenHeader: Header = { alg: "HS256", typ: "JWT" };
    constructor(template?: Payload) {
        this.#template = template;
    }
    async importKey(key?: string) {
        this.#key = key ?
            await crypto.subtle.importKey('raw', decodeBase64(key), this.algorithm, false, this.keyUsages) :
            await crypto.subtle.generateKey(this.algorithm, true, this.keyUsages);
    }
    async exportKey() {
        return encodeBase64(await crypto.subtle.exportKey('raw', this.#key!))
    }
    async createToken(exp?: number, payload?: Payload ) {
        return await create(this.tokenHeader, { ...this.#template, exp: getNumericDate(exp || 5 * 60), ...payload }, this.#key!);
    }
    async verifyToken(token: string): Promise<Payload | null> {
        try { return await verify(token, this.#key!); }
        catch { return null }
    }
}