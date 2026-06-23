import assert from "node:assert/strict";
import { copyFileSync, existsSync, rmSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { test } from "node:test";

const root = join(import.meta.dirname, "..");
const fixture = join(root, "tests/fixtures/consumer");
const tarball = join(root, "xel-solid-0.0.0.tgz");
const fixtureTarball = join(fixture, "xel-solid-0.0.0.tgz");

function run(command: string, args: string[], cwd: string) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    stdio: "pipe",
  });

  if (result.status !== 0) {
    throw new Error([
      `${command} ${args.join(" ")} failed`,
      result.stdout,
      result.stderr,
    ].join("\n"));
  }
}

test("packed package installs and builds in a separate Solid consumer", () => {
  rmSync(join(fixture, "node_modules"), { recursive: true, force: true });
  rmSync(join(fixture, "dist"), { recursive: true, force: true });
  rmSync(join(fixture, "bun.lock"), { force: true });
  rmSync(fixtureTarball, { force: true });

  run("npm", ["pack"], root);
  copyFileSync(tarball, fixtureTarball);
  run("bun", ["install"], fixture);
  run("bun", ["run", "build"], fixture);

  assert.equal(existsSync(join(fixture, "dist/index.html")), true);
});

