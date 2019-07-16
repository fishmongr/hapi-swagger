const Joi = require('joi');
const customJoi = Joi.extend((joi) => ({
    base: joi.string(),
    name: 'string',
    language: {
        hidden: 'hidden from swagger docs',
    },
    /*eslint-disable */
    rules: [
        {
            name: 'hidden',
            setup(params) {
                this._flags.hidden = true; // Set a flag for later use
            },
            validate(params, value, state, options) {
                return value; // Everything is OK
            }
        },
    ]
    /*eslint-enable */
}));

module.exports = customJoi;
