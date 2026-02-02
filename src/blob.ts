export const blobToBase64 = (blob: Blob): Promise<string> => new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => resolve(reader.result as string);
});

export const urlToDataUrl = async (url: string): Promise<string|undefined> => {
    const resp = await fetch(url);
    if (!resp.ok) return undefined;
    return await blobToBase64(await resp.blob());
}