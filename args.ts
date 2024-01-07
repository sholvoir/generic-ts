export default function getArgs() {
    const options = new Map<string, string>();
    const args = new Array<string>();
    for (const arg of Deno.args) if (arg.startsWith('-')) {
        const [option, value] = arg.split('=');
        options.set(option, value || '');
    } else args.push(arg);
    return { options, args };
}