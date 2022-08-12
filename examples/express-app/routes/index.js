"use strict";
exports.__esModule = true;
exports.get = void 0;
var validator_1 = require("@nordjs/validator");
var get = function (_a) {
    var query = _a.query;
    var data = query(validator_1.z.object({ id: validator_1.z.string() }));
    return { success: { id: data.id } };
};
exports.get = get;
