import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// Production route types are the shared check's source of truth. Local previews
// keep their own caches; neither old previews nor a stale dev validator belong
// in a release check. Next regenerates next-env.d.ts along with these types.
const environment = { ...process.env, NODE_ENV: "production" };
delete environment.NEXT_DEV_DIST_DIR;

for (const [cli, args] of [
  ["next/dist/bin/next", ["typegen"]],
  ["typescript/bin/tsc", ["--noEmit", "--incremental", "false", "--pretty", "false"]],
]) {
  const result = spawnSync(process.execPath, [path.join(projectRoot, "node_modules", cli), ...args], {
    cwd: projectRoot,
    env: environment,
    stdio: "inherit",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
