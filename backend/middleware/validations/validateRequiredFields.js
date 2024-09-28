function validateRequiredFields(requiredFields, req, res) {
    return function (req, res, next) {
        let missingFieldsDetails = {};

        requiredFields.forEach((field) => {
            if (!req.body[field]) {
                missingFieldsDetails[field] = `${field} is required`;
            }
        });

        if (Object.keys(missingFieldsDetails).length > 0) {
            return res.status(400).json({ message: missingFieldsDetails, status: 400 });
        }

        next();
    };
}

export default validateRequiredFields;