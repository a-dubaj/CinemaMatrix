const userValidator = (req, res, next) => {
    req.check("fullname", "Pełna nazwa użytkonika jest wymagana.").notEmpty();
    req.check("email", "Email powinien posiadać od 3 do 32 znaków.").isEmail()
        .withMessage("Niepoprawny adres email").isLength({
        min: 4, max: 32,
    }).normalizeEmail();
    req.check("birthday", "Niepoprawna data urodzenia.").isISO8601().toDate();
    req.check("phone", "Numer telefonu jest wymagany.").notEmpty();

    req.check("password", "Hasło jest wymagane.").notEmpty();
    req.check("password").isLength({
        min: 6,
    }).withMessage("Hasło musi posidać przynajmniej 6 znaków").matches(/\d/)
        .withMessage("Hasło powinno posiadać numer.");
    req.check("address", "Adres jest wymagany.").notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors[0].msg;
        return res.status(400).json({
            error: firstError,
        });
    }
    next();
};

const resetPasswordValidator = (req, res, next) => {
    req.check("password", "Hasło jest wymagane.").notEmpty();
    req.check("password").isLength({
        min: 6,
    }).withMessage("Hasło ma składać się z przynajmniej z 6 znaków.").matches(/\d/)
        .withMessage("Hasło musi posiadać numer");

    //check for error
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors[0].msg;
        return res.status(400).json({
            error: firstError,
        });
    }
    next();
};
export {userValidator, resetPasswordValidator};