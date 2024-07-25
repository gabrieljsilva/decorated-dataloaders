"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataloaderMapper = void 0;
class DataloaderMapper {
    static map(metadata, keys, entities) {
        if (metadata.type === "OneToMany" && metadata.through) {
            return DataloaderMapper.oneToManyThrough(metadata, keys, entities);
        }
        if (metadata.type === "OneToOne" && metadata.through) {
            return DataloaderMapper.oneToOneThrough(metadata, keys, entities);
        }
        if (metadata.type === "OneToOne") {
            return DataloaderMapper.oneToOne(metadata, keys, entities);
        }
        return DataloaderMapper.oneToMany(metadata, keys, entities);
    }
    static oneToMany(metadata, keys, entities) {
        const entitiesMappedByKey = new Map();
        for (const entity of entities) {
            const key = metadata.where(entity);
            if (key) {
                if (!entitiesMappedByKey.has(key)) {
                    entitiesMappedByKey.set(key, []);
                }
                entitiesMappedByKey.get(key).push(entity);
            }
        }
        return keys.map((key) => entitiesMappedByKey.get(key) || []);
    }
    static oneToOne(metadata, keys, entities) {
        const entitiesMappedByKey = new Map();
        for (const entity of entities) {
            const key = metadata.where(entity);
            if (key) {
                entitiesMappedByKey.set(key, entity);
            }
        }
        return keys.map((key) => entitiesMappedByKey.get(key) || null);
    }
    static oneToManyThrough(metadata, keys, entities) {
        const entitiesMappedByKey = new Map();
        for (const entity of entities) {
            const intermediateEntities = entity[metadata.joinProperty];
            for (const intermediateEntity of intermediateEntities) {
                const key = metadata.where(intermediateEntity);
                if (key) {
                    if (!entitiesMappedByKey.has(key)) {
                        entitiesMappedByKey.set(key, []);
                    }
                    entitiesMappedByKey.get(key).push(entity);
                }
            }
        }
        return keys.map((key) => entitiesMappedByKey.get(key) || []);
    }
    static oneToOneThrough(metadata, keys, entities) {
        const entitiesMappedByKey = new Map();
        for (const entity of entities) {
            const intermediateEntities = entity[metadata.joinProperty];
            for (const intermediateEntity of intermediateEntities) {
                const key = metadata.where(intermediateEntity);
                if (key) {
                    entitiesMappedByKey.set(key, entity);
                }
            }
        }
        return keys.map((key) => entitiesMappedByKey.get(key) || null);
    }
}
exports.DataloaderMapper = DataloaderMapper;
//# sourceMappingURL=dataloader-mapper.js.map