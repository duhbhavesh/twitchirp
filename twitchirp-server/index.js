require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const db = require("./models"); // connecting db to front end
const messagesRoutes = require("./routes/messages");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");

const PORT = process.env.PORT || 8081;

app.use(cors())
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/users/:id/messages", 
 loginRequired,
 ensureCorrectUser,
 messagesRoutes,
 );

app.get("/api/messages", loginRequired, async function(req, res, next) {
    try {
        let messages = await db.Message.find()
        .sort({ createdAt: "desc"})
        .populate("user", {
            username: true,
            profileImageUrl: true
        });
        return res.status(200).json(messages);
    } catch (err) {
        return next(err);
    }
});
// all my routes here - they will come later!

app.use(function(req, res, next){
    let err = new Error("Uh oh, Page You're looking for seems to be missing!");
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(PORT, function(){
    console.log(`Server is listening on PORT ${PORT}`);
})

