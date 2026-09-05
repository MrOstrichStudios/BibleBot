# BibleBot

BibleBot is a Slack slash command bot that delivers random Bible verses from the Old Testament, New Testament, or the entire Bible. Built with Node.js and Slack Bolt, it integrates with [Bible API](https://bible-api.com/) to fetch scripture on demand.
You can test it at Hack Club - Slack : https://app.slack.com/client/E09V59WQY1E/C0P5NE354?skip_today=1
---

## Features
- **[Random verse](ca://s?q=BibleBot_random_verse_feature)** → `/biblebot-verse random` or just `/biblebot-verse`
- **[Old Testament verse](ca://s?q=BibleBot_old_testament_feature)** → `/biblebot-verse old`
- **[New Testament verse](ca://s?q=BibleBot_new_testament_feature)** → `/biblebot-verse new`
- **Error handling** → Invalid parameters return a friendly error message
- **Slack integration** → Responds both privately and publicly in channels

---
