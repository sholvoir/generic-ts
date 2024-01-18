// deno-lint-ignore-file no-explicit-any
import { HTTPMethod } from "./http-method.ts";

export const fetchJson = async (input: string|URL|Request, body?: any, method: HTTPMethod = 'POST') => {
    const init = body ?
        { method, Headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body) } :
        undefined;
    const resp = await fetch(input, init);
    if (!resp.ok) return undefined;
    const text = await resp.text();
    if (!text) return undefined;
    try { return JSON.parse(text) } catch { return undefined }
}

if (import.meta.main) console.log(await fetchJson('http://localhost:8000/test'));