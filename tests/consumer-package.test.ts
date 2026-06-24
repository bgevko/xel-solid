import assert from "node:assert/strict";
import { copyFileSync, existsSync, rmSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { test } from "node:test";

const root = join(import.meta.dirname, "..");
const fixture = join(root, "tests/fixtures/consumer");

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

  return result.stdout;
}

test("packed package installs and builds in a separate Solid consumer", () => {
  rmSync(join(fixture, "node_modules"), { recursive: true, force: true });
  rmSync(join(fixture, "dist"), { recursive: true, force: true });
  rmSync(join(fixture, "bun.lock"), { force: true });

  const packOutput = run("npm", ["pack", "--json"], root);
  const [{ filename }] = JSON.parse(packOutput) as [{ filename: string }];
  const tarball = join(root, filename);
  const fixtureTarball = join(fixture, "xel-solid-fixture.tgz");

  rmSync(fixtureTarball, { force: true });
  copyFileSync(tarball, fixtureTarball);
  run("bun", ["install"], fixture);
  run("bun", ["run", "build"], fixture);

  assert.equal(existsSync(join(fixture, "dist/index.html")), true);
  assert.equal(existsSync(join(fixture, "dist/xel/themes/material.css")), true);
  assert.equal(existsSync(join(fixture, "dist/xel/themes/base.css")), true);
  assert.equal(existsSync(join(fixture, "dist/xel/icons/material.svg")), true);
});
