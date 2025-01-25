export const versionpp = (version: string): string =>
    version.replace(/(\d+)([A-Za-z._-]*)$/m, (_, p1, p2) =>(`${(+p1)+1}${p2}`));