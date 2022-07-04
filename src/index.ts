import "dotenv/config";
import * as fs from "fs";
import * as core from "@actions/core";
import got from "got";
import { buildFile } from "./file-utils";
import { gitCommit } from "./git-utils";

const GITHUB_TOKEN = core.getInput("gh_token");
core.setSecret(GITHUB_TOKEN);
const FILE_PATH = core.getInput("file_path");
const EVENTBRITE_ORG_ID = core.getInput("eventbrite_org_id", {
  required: true,
});
const EVENTBRITE_TOKEN = core.getInput("eventbrite_token", { required: true });
core.setSecret(EVENTBRITE_TOKEN);

const eventbriteApiUrl = `https://www.eventbriteapi.com/v3/organizations/${EVENTBRITE_ORG_ID}/events?order_by=start_desc&page_size=5`;

const runAction = async () => {
  try {
    const response = await got
      .get(eventbriteApiUrl, {
        headers: { Authorization: `Bearer ${EVENTBRITE_TOKEN}` },
      })
      .json<any>();
    let eventList = [];
    if (response.events) {
      eventList = response.events.map(
        (event: any) => `- [${event.name.text}](${event.url})`
      );
    }
    const fileData = fs.readFileSync(FILE_PATH, "utf8");
    const newFileData = buildFile(fileData, eventList.join("\n"));
    if (fileData !== newFileData) {
      core.info("Writing to " + FILE_PATH);
      fs.writeFileSync(FILE_PATH, newFileData);
    }
    if (!process.env.LOCAL_MODE) {
      gitCommit(GITHUB_TOKEN, FILE_PATH, {
        username: "eb-events-bot",
        email: "bot@example.com",
        message: `Update EB Events list for file ${FILE_PATH}`,
      });
    }
    core.setOutput("result", response.events);
  } catch (error) {
    core.error(error);
    process.exit(1);
  }
};

runAction();
