"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliasFor = AliasFor;
const utils_1 = require("../utils");
function AliasFor(provider) {
    return (target) => {
        utils_1.DataloaderMetadataContainer.setAlias(target, provider);
    };
}
//# sourceMappingURL=alias-for.decorator.js.map