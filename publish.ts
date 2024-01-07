export default async function publish(commit: string, cwd?: string) {
    const commands: [string, Deno.CommandOptions][] = [
        ["git", { args: ["add", "."], cwd }],
        ["git", { args: ["commit", "-m", `"${commit}"`], cwd }],
        ["git", { args: ["push"], cwd }]
    ];
    for (const command of commands) {
        const process = new Deno.Command(...command);
        const result = await process.output();
        if (!result.success) return `Failed at "${command[0]} ${command[1].args?.join(" ")}"`;
        console.log(result.stdout);
    }
}