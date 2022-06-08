require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const userRoute = require("./src/routers/user");
const missionRoute = require("./src/routers/mission");
const cors = require("cors");
const { User, Mission } = require("./src/models/model");
const { transferToken } = require("./src/middleware/transferToken");

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
    console.log(error);
});

database.once("connected", () => {
    console.log("Database connected");
});

database.once("open", () => {
    const taskCollection = database.collection("datas");
    const changeStream = taskCollection.watch();

    changeStream.on("change", async (change) => {
        console.log("change", change);

        if (change.operationType === "update") {
            console.log("id", change.documentKey._id.toString());
            const id = change.documentKey._id.toString();
            const userData = await User.find({ _id: id }).exec();
            const missionData = await Mission.find().exec();
            missionData.forEach((mission) => {
                if (userData[0].matchInDay == mission.numMatches) {
                    transferToken(userData[0].address, mission.reward);
                    console.log("transfer token successfully");
                }
            });
        }
    });
});

const app = express();

// app.use(updateMatch);
app.use(cors());
app.use(express.json());
app.use("/user", userRoute);
app.use("/mission", missionRoute);
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started at ${3000}`);
});
