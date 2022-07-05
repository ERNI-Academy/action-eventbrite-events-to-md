# About action-eventbrite-events-to-md

This Github Action goal is to get the list of events from Eventbrite and write the list to a markdown file.

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<!-- ALL-CONTRIBUTORS-BADGE:END -->

## How to use
1. Add the following snippet to your markdown file:
```md
<!-- EVENTBRITE-EVENTS-LIST:START -->
<!-- EVENTBRITE-EVENTS-LIST:END -->
```
2. Create a folder named `.github` and create a `workflows` folder inside it.
3. Create a new yml file with any name (for example `update-eventbrite-events-to-md.yml`) and paste the following content: 
```yml
name: Latest Eventbrite events workflow
on:
  schedule: # Run workflow automatically
    - cron: '0 20 * * *' # Runs every day at 8:00pm check out https://cron.help/#0_20_*_*_*
  workflow_dispatch: # Run workflow manually

jobs:
  update-readme-with-eventbrite:
    name: Update this repo's profile README with latest events from Eventbrite
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: ERNI-Academy/action-eventbrite-events-to-md@v1
        with:
          file_path: ./README.md
          eventbrite_org_id: ${{ secrets.EVENTBRITE_ORG_ID }}
          eventbrite_token: ${{ secrets.EVENTBRITE_TOKEN }}

```

4. Change options (`with`)
5. Setup [repository secrets](https://docs.github.com/es/actions/security-guides/encrypted-secrets)
5. Commit and wait for it to run automatically, or trigger it manually.

## Options

| Option              | Default Value           | Description                         | Required |
| ------------------- | ----------------------- | ----------------------------------- |---------:|
| `gh_token`          | `${{ github.token }}`   | Github token for git related tasks  | `false`  |
| `file_path`         | `./README.md`           | File path of the readme file        | `false`  |
| `eventbrite_org_id` |                         | Eventbrite Organizer ID             | `true`   | 
| `eventbrite_token`  |                         | Eventbrite Token                    | `true`   |

## Built With

- [Node.js](https://nodejs.org)

## Prerequisites

- Node.js >= 16

## Contributing

Please see our [Contribution Guide](CONTRIBUTING.md) to learn how to contribute.

## License

![MIT](https://img.shields.io/badge/License-MIT-blue.svg)

(LICENSE) © 2022 [ERNI - Swiss Software Engineering](https://www.betterask.erni)

## Code of conduct

Please see our [Code of Conduct](CODE_OF_CONDUCT.md)

## Follow us

[![Twitter Follow](https://img.shields.io/twitter/follow/ERNI?style=social)](https://www.twitter.com/ERNI)
[![Twitch Status](https://img.shields.io/twitch/status/erni_academy?label=Twitch%20Erni%20Academy&style=social)](https://www.twitch.tv/erni_academy)
[![YouTube Channel Views](https://img.shields.io/youtube/channel/views/UCkdDcxjml85-Ydn7Dc577WQ?label=Youtube%20Erni%20Academy&style=social)](https://www.youtube.com/channel/UCkdDcxjml85-Ydn7Dc577WQ)
[![Linkedin](https://img.shields.io/badge/linkedin-31k-green?style=social&logo=Linkedin)](https://www.linkedin.com/company/erni)

## Contact

📧 [esp-services@betterask.erni](mailto:esp-services@betterask.erni)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
