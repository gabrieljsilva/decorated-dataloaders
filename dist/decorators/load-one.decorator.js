"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadOne = LoadOne;
const types_1 = require("../types");
const utils_1 = require("../utils");
function LoadOne(child, options) {
    const { by, where, on } = options;
    return (target, propertyKey) => {
        const parent = target.constructor;
        utils_1.DataloaderMetadataContainer.AddRelationMetadata(() => parent, child, propertyKey, new types_1.RelationMetadata({
            by: by,
            where: where,
            type: types_1.RelationType.OneToOne,
            on: on,
        }));
    };
}
//# sourceMappingURL=load-one.decorator.js.map