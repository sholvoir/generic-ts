export const camel2pascal = (camel: string): string => camel.replace(camel[0], camel[0].toUpperCase());
export const pascal2camel = (pascal: string): string => pascal.replace(pascal[0], pascal[0].toLowerCase());
export const camel2snake = (camel: string): string => camel.replace(/[A-Z]+/g, (match) => `_${match.toLowerCase()}`);
export const snake2camel = (snake: string): string => snake.replace(/_./g, (match) => match.slice(1).toUpperCase());
export const camel2kebab = (camel: string): string => camel.replace(/[A-Z]+/g, (match) => `-${match.toLowerCase()}`);
export const kebab2camel = (snake: string): string => snake.replace(/-./g, (match) => match.slice(1).toUpperCase());
export const pascal2snake = (pascal: string): string => pascal.replace(/[A-Z]+/g, (match) => `_${match.toLowerCase()}`).slice(1);
export const snake2pascal = (kebab: string): string => `_${kebab}`.replace(/_./g, (match) => match.slice(1).toUpperCase());
export const pascal2kebab = (pascal: string): string => pascal.replace(/[A-Z]+/g, (match) => `-${match.toLowerCase()}`).slice(1);
export const kebab2pascal = (kebab: string): string => `-${kebab}`.replace(/-./g, (match) => match.slice(1).toUpperCase());
export const snake2kebab = (snake: string): string => snake.replaceAll('_', '-');
export const kebab2snake = (kebab: string): string => kebab.replaceAll('-', '_');