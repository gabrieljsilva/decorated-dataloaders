"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadThrough = LoadThrough;
const load_through_metadata_1 = require("../types/load-through-metadata");
const dataloader_metadata_container_1 = require("../utils/dataloader-metadata-container");
function LoadThrough(joinEntity, options) {
    return (target, propertyKey) => {
        const parent = target.constructor;
        dataloader_metadata_container_1.DataloaderMetadataContainer.addLoadThroughMetadata(() => parent, joinEntity, new load_through_metadata_1.LoadThroughMetadata({
            field: propertyKey,
            joinProperty: options.joinProperty,
        }));
    };
}
//# sourceMappingURL=load-through.decorator.js.map