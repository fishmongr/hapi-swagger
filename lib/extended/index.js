const ExtendedStringJoi = require('./extended-string');
const ExtendedNumberJoi = require('./extended-number');
const ExtendedBooleanJoi = require('./extended-boolean');

exports.default = {
  String: ExtendedStringJoi,
  Number: ExtendedNumberJoi,
  Boolean: ExtendedBooleanJoi,
};
