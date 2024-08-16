const { Router } = require("express");
const { userSignup, userSignin, userUpdate } = require("../types");
const { User, Account } = require("../models/index");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middlewares");

const router = Router();

router.post("/signup", async (req, res) => {
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    const parsedValues = userSignup.safeParse({ username, firstName, lastName, email, password });

    if (!parsedValues.success) {
        return res.status(411).json({ msg: "Inputs are Incorrect!" });
    }

    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
        return res.status(411).json({ msg: "User Already Exists!" });
    }

    const newUser = await User.create({ username, firstName, lastName, email, password });

    const random = Math.floor(Math.random() * 10000) + 1;
    const newUserAccount = await Account.create({ userId: newUser._id, balance: random });

    const token = jwt.sign({ username: newUser._id }, JWT_SECRET);
    res.status(200).json({
        msg: "User Created Successfully",
        token,
        balance: newUserAccount.balance
    });
});

router.post("/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const parsedValues = userSignin.safeParse({ username, password });

    if (!parsedValues.success) {
        return res.status(411).json({ msg: "Inputs are Incorrect!" });
    }

    const userExists = await User.findOne({ username, password });
    if (!userExists) {
        return res.status(411).json({ msg: "Error Occured!" });
    }

    const token = jwt.sign({ userId: userExists._id }, JWT_SECRET);
    res.status(200).json({ msg: "Logged In Successfully", token });
});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    });

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            userId: user._id,
        }))
    })
});

router.put("/", authMiddleware, async (req, res) => {
    const { success } = userUpdate.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        });
    }
    // TODO: Not working idkw
    await User.updateOne(req.body, {
        id: req.userId
    });

    res.json({
        message: "Updated successfully"
    });
});

module.exports = router;
