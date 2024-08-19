const { Router } = require("express");
const { userSignup, userSignin, userUpdate } = require("../types");
const { User, Account } = require("../models/index");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middlewares");
const bcrypt = require('bcrypt');
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

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            const newUser = await User.create({ username, firstName, lastName, email, password: hash });

            const random = Math.floor(Math.random() * 10000) + 1;
            const newUserAccount = await Account.create({ userId: newUser._id, balance: random, firstName: newUser.firstName });

            const token = jwt.sign({ userId: newUser._id, firstName }, JWT_SECRET);
            res.status(200).json({
                msg: "User Created Successfully",
                token,
                balance: newUserAccount.balance,
                pass: newUser.password
            });
        });
    });
});

router.post("/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const parsedValues = userSignin.safeParse({ username, password });

    if (!parsedValues.success) {
        return res.status(411).json({ msg: "Inputs are Incorrect!" });
    }

    const userExists = await User.findOne({ username });
    if (!userExists) {
        return res.status(411).json({ msg: "Wrong Username!" });
    }

    bcrypt.compare(password, userExists.password, function (err, result) {
        if (!result) {
            res.status(411).json({ msg: "Password is Incorrect!" })
        }
        const token = jwt.sign({ userId: userExists._id }, JWT_SECRET);
        res.status(200).json({ msg: "Logged In Successfully", token });
    });
});

router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";
    const userId = req.userId;

    const users = await User.find({
        $and: [
            {
                _id: { $ne: userId }  // Exclude the logged-in user
            },
            {
                $or: [
                    { firstName: { "$regex": filter, "$options": "i" } }, // 'i' for case-insensitive
                    { lastName: { "$regex": filter, "$options": "i" } }
                ]
            }
        ]
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
    // FIXME: Not working idkw
    await User.updateOne(req.body, {
        id: req.userId
    });

    res.json({
        message: "Updated successfully"
    });
});

router.post("/me", authMiddleware, (req, res) => {
    res.status(200).json({ msg: "You're logged in", userId: req.userId })
})

module.exports = router;
