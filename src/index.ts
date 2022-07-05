import 'dotenv/config'

import * as core from '@actions/core'
import got from 'got'

import {
  buildFile,
  getFileContentsAsync,
  writeFileContentsAsync,
} from './file-utils'
import { gitCommit } from './git-utils'
import { EventbriteEventsResponse } from './types/eventbrite-events-response'

const GITHUB_TOKEN = core.getInput('gh_token')
core.setSecret(GITHUB_TOKEN)
const FILE_PATH = core.getInput('file_path')
const EVENTBRITE_ORG_ID = core.getInput('eventbrite_org_id', {
  required: true,
})
const EVENTBRITE_TOKEN = core.getInput('eventbrite_token', { required: true })
core.setSecret(EVENTBRITE_TOKEN)
const EVENTBRITE_URL = `https://www.eventbriteapi.com/v3/organizations/${EVENTBRITE_ORG_ID}/events?order_by=start_desc&page_size=5`

const getEvents = async () => {
  const response = await got
    .get(EVENTBRITE_URL, {
      headers: { Authorization: `Bearer ${EVENTBRITE_TOKEN}` },
    })
    .json<EventbriteEventsResponse>()
  return response?.events || []
}

const writeAndCommit = (newData: string) => {
  writeFileContentsAsync(FILE_PATH, newData)
  if (!process.env.LOCAL_MODE) {
    gitCommit(GITHUB_TOKEN, FILE_PATH, {
      username: 'eb-events-bot',
      email: 'bot@example.com',
      message: `Update EB Events list for file ${FILE_PATH}`,
    })
  }
}

const runAction = async () => {
  try {
    const events = await getEvents()
    const eventList = events.map(
      (event) => `- [${event.name.text}](${event.url})`
    )
    const fileData = getFileContentsAsync(FILE_PATH)
    const newFileData = buildFile(fileData, eventList.join('\n'))
    if (fileData !== newFileData) {
      writeAndCommit(newFileData)
    }
    core.setOutput('result', events)
  } catch (error) {
    core.error(error)
    process.exit(1)
  }
}

runAction()
