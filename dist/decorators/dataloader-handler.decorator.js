"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataloaderHandler = DataloaderHandler;
const types_1 = require("../types");
const utils_1 = require("../utils");
function DataloaderHandler(key) {
    return (target, propertyKey) => {
        utils_1.DataloaderMetadataContainer.setDataloaderHandler(key || propertyKey, new types_1.DataloaderHandlerMetadata(target.constructor, propertyKey));
    };
}
//# sourceMappingURL=dataloader-handler.decorator.js.map