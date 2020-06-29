const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const cron = require("node-cron");
const User = require('../models/User');
const createNotifyDate = require('./dateCalc');


cron.schedule('0 10 * * *', async () => {

    const date = new Date();
    const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const menstData = await User.find({ notifyDate: new Date(dateStr) });

    for (let user of menstData) {
        await user.populate('owner').execPopulate();

        await client.messages.create({
            to: `+91${user.owner.contact}`,
            from: process.env.TWILIO_NO,
            body: `Hey ${user.owner.username}! This is to notify you that from tomorrow your periods is going to begin for the current cycle.\n\nRegards,\nCaring Aunt Team.`
        });

        user.pastPeriodDate = createNotifyDate(user.notifyDate, 1);
        user.notifyDate = createNotifyDate(dateStr, user.menstrualCycleLength);
        await user.save();
    }
});