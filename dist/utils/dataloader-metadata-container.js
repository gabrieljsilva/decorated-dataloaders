"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataloaderMetadataContainer = void 0;
const types_1 = require("../types");
class DataloaderMetadataContainer {
    static AddRelationMetadata(parent, child, field, metadata) {
        let relationMetadata = DataloaderMetadataContainer.relations.getEdges(parent)?.get(child);
        relationMetadata || (relationMetadata = new Map([[field, metadata]]));
        DataloaderMetadataContainer.relations.addEdge(parent, child, relationMetadata);
    }
    static addLoadThroughMetadata(parent, joinEntity, loadThroughMetadata) {
        DataloaderMetadataContainer.loadThroughMetadata.set(parent, new Map([[joinEntity, loadThroughMetadata]]));
    }
    static resolveLoadThroughMetadata() {
        const newMap = new Map();
        DataloaderMetadataContainer.loadThroughMetadata.forEach((map, parent) => {
            map.forEach((metadata, child) => {
                newMap.set(parent(), new Map([[child(), metadata]]));
            });
        });
        return newMap;
    }
    static resolveRelations() {
        const resolvedRelations = DataloaderMetadataContainer.relations.transform((vertex) => vertex(), (edge) => edge);
        const resolvedLoadThroughMetadata = DataloaderMetadataContainer.resolveLoadThroughMetadata();
        return resolvedRelations.transform((vertex) => vertex, (edge, vertex) => {
            const loadThroughMetadata = resolvedLoadThroughMetadata.get(vertex);
            if (loadThroughMetadata) {
                loadThroughMetadata.forEach((value, joinEntity) => {
                    const metadata = edge.get(value.field);
                    if (metadata) {
                        metadata.joinProperty = value.joinProperty;
                        metadata.through = joinEntity;
                    }
                });
            }
            return edge;
        });
    }
    static setDataloaderHandler(key, provider) {
        if (DataloaderMetadataContainer.dataloaderHandlersMappedByKey.has(key)) {
            throw new Error(`Dataloader provider with key ${key} already exists`);
        }
        DataloaderMetadataContainer.dataloaderHandlersMappedByKey.set(key, provider);
    }
    static getDataloaderHandlers() {
        return DataloaderMetadataContainer.dataloaderHandlersMappedByKey;
    }
    static hasAlias(alias) {
        return DataloaderMetadataContainer.aliases.has(alias);
    }
    static setAlias(target, alias) {
        if (DataloaderMetadataContainer.hasAlias(target)) {
            throw new Error(`Alias for ${target} already exists`);
        }
        DataloaderMetadataContainer.aliases.set(target, alias);
    }
    static resolveAliases() {
        const aliases = new Map();
        for (const [key, aliasReturnFn] of DataloaderMetadataContainer.aliases.entries()) {
            aliases.set(key, aliasReturnFn());
        }
        return aliases;
    }
}
exports.DataloaderMetadataContainer = DataloaderMetadataContainer;
DataloaderMetadataContainer.relations = new types_1.AdjacencyGraph();
DataloaderMetadataContainer.loadThroughMetadata = new Map();
DataloaderMetadataContainer.aliases = new Map();
DataloaderMetadataContainer.dataloaderHandlersMappedByKey = new Map();
//# sourceMappingURL=dataloader-metadata-container.js.map