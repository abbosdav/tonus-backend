import { body } from "express-validator";

const registerValidation = [
    body('phone', 'Talabga javob bermaydigan telefon raqam!').isLength({min: 9}),
    body('password', 'Talabga javob bermaydigan parol!').isLength({min: 5}),
    body('username', 'Talabga javob bermaydigan foydalanuvchi nomi!').isLength({min: 3}),
    body('avatarUrl').optional().isURL()
]

const loginValidation = [
    body('phone', 'Talabga javob bermaydigan telefon raqam!').isLength({min: 9}),
    body('password', 'Talabga javob bermaydigan parol!').isLength({min: 5}),
]

export { registerValidation, loginValidation };