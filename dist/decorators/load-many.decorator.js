"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadMany = LoadMany;
const types_1 = require("../types");
const utils_1 = require("../utils");
function LoadMany(child, options) {
    const { by, where, on } = options;
    return (target, propertyKey) => {
        const parent = target.constructor;
        utils_1.DataloaderMetadataContainer.AddRelationMetadata(() => parent, child, propertyKey, new types_1.RelationMetadata({
            by: by,
            where: where,
            type: types_1.RelationType.OneToMany,
            on: on,
        }));
    };
}
//# sourceMappingURL=load-many.decorator.js.map