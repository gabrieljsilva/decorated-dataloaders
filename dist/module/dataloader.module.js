"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataloaderModule = exports.CacheMapProvider = void 0;
const utils_1 = require("../utils");
const dataloader_metadata_service_1 = require("./dataloader-metadata.service");
const dataloader_service_1 = require("./dataloader.service");
class CacheMapProvider {
}
exports.CacheMapProvider = CacheMapProvider;
class DataloaderModule {
    static register(options) {
        const { global = options.global || false, getCacheMap, cache = false, providers: dataloaders = [] } = options || {};
        const aliases = utils_1.DataloaderMetadataContainer.resolveAliases();
        const dataloaderHandlers = utils_1.DataloaderMetadataContainer.getDataloaderHandlers();
        const relations = utils_1.DataloaderMetadataContainer.resolveRelations();
        const providers = [
            {
                provide: CacheMapProvider,
                useValue: { getCacheMap, cache },
            },
            {
                provide: dataloader_metadata_service_1.DataloaderMetadataService,
                useValue: new dataloader_metadata_service_1.DataloaderMetadataService(relations, aliases, dataloaderHandlers),
            },
            dataloader_service_1.DataloaderService,
            ...dataloaders,
        ];
        return {
            module: DataloaderModule,
            providers: providers,
            exports: providers,
            global: true,
            imports: [],
        };
    }
}
exports.DataloaderModule = DataloaderModule;
//# sourceMappingURL=dataloader.module.js.map