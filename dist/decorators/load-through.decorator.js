"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadThrough = LoadThrough;
const types_1 = require("../types");
const utils_1 = require("../utils");
function LoadThrough(joinEntity, options) {
    return (target, propertyKey) => {
        const parent = target.constructor;
        utils_1.DataloaderMetadataContainer.addLoadThroughMetadata(() => parent, joinEntity, new types_1.LoadThroughMetadata({
            field: propertyKey,
            joinProperty: options.joinProperty,
        }));
    };
}
//# sourceMappingURL=load-through.decorator.js.map