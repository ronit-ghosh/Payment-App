const { Router } = require("express");
const router = Router();
const { authMiddleware } = require("../middlewares");
const { Account } = require("../models/index");
const mongoose = require('mongoose');

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({ userId: req.userId });
    res.status(200).json({ msg: "Balance Fetched", balance: account.balance, firstName: account.firstName });
});

router.post("/transfer", authMiddleware, async (req, res) => {
    try {
        const session = await mongoose.startSession();

        session.startTransaction();

        const amount = req.body.amount;
        const to = req.body.to;

        const account = await Account.findOne({ userId: req.userId }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ msg: "Insufficient Balance!" });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({ msg: "Sender is not a Valid User!" });
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();

        res.status(200).json({ msg: "Transfered Successfully", amount, to, from: req.userId });
    } catch (error) {
        res.status(411).json({ msg: "Error Occured!" });
    }
});

module.exports = router;
