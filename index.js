const axios = require("axios");
require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/biblebot-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
  await respond({text: `Hey Dude! the bot is alive thou ^_^`})
});

app.command("/biblebot-verse", async ({ ack, respond, command }) => {
  await ack();
  const arg = command.text.trim().toLowerCase();

  try {
    let response, verseData;

    if (arg === "old") {
      // Old Testament random verse
      response = await axios.get("https://bible-api.com/data/web/random/OT");
      verseData = response.data.random_verse;
    } else if (arg === "new") {
      // New Testament random verse
      response = await axios.get("https://bible-api.com/data/web/random/NT");
      verseData = response.data.random_verse;
    } else if (arg === "random" || arg === "") {
      // Default random verse (whole Bible)
      response = await axios.get("https://bible-api.com/data/web/random");
      verseData = response.data.random_verse;
    } else {
      // Invalid parameter
      await respond({ text: "*sry twin but invalid parameter ya chose*" });
      return;
    }

    await respond({
      text: `*Bible Verse for ya twin!:*\n${verseData.book} ${verseData.chapter}:${verseData.verse} - ${verseData.text.trim()}`
    });
  } catch (err) {
    console.error(err);
    await respond({ text: "*Sorry twin; getting some issues here or you did something _wrong_ idk*" });
  }
});


app.command("/biblebot-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands for ya:
/biblebot-ping - Check bot latency and get a hello for the bot!
/biblebot-verse [old|new] - Gives ya a verse as per selection!
-> _blank_ - if no parameter added then it gives ya a random verse from the entire Bible.
-> old - gives ya a random verse from the Old Testament.
-> new - gives ya a random verse from the New Testament.
/biblebot-help - You can always count on me for help (u just ran me now duh)`
  });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();