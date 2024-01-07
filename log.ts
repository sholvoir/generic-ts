type LogLevel = 'info'|'error'|'task'|'debug';

let logPath = Deno.env.get('LOG_PATH') || 'log.log';

export function setLogPath(path: string) { logPath = path; }

export async function log(level: LogLevel, info: string) {
    await Deno.writeTextFile(logPath, `${new Date().toISOString()}\t${level}\t${info}\n`, { append: true })
}
