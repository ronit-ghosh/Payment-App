const z = require("zod");

const userSignup = z.object({
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
});

const userSignin = z.object({
    username: z.string(),
    password: z.string().min(8),
})

const userUpdate = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    password: z.string().min(8).optional(),
})

module.exports = { userSignup, userSignin, userUpdate }
