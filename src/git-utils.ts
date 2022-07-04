import * as exec from "@actions/exec";
import * as core from "@actions/core";

export type GitCommitOptions = {
  username: string;
  email: string;
  message: string;
};

export const gitCommit = async (
  ghToken: string,
  filePath: string,
  options: GitCommitOptions
) => {
  await exec.exec("git", [
    "config",
    "--global",
    "user.email",
    options.username,
  ]);
  if (ghToken) {
    await exec.exec("git", [
      "remote",
      "set-url",
      "origin",
      `https://${ghToken}@github.com/${process.env.GITHUB_REPOSITORY}.git`,
    ]);
  }
  await exec.exec("git", ["config", "--global", "user.name", options.username]);
  await exec.exec("git", ["add", filePath]);
  await exec.exec("git", ["commit", "-m", options.message]);
  await exec.exec("git", ["push"]);
  core.info("File updated successfully in the upstream repository");
};
