"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataloaderService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const dataloader_1 = require("dataloader");
const utils_1 = require("../utils");
let DataloaderService = class DataloaderService {
    constructor(moduleRef, cacheMapProvider, dataloaderMetadataService) {
        this.moduleRef = moduleRef;
        this.cacheMapProvider = cacheMapProvider;
        this.dataloaderMetadataService = dataloaderMetadataService;
        this.dataloaderMappedByParentField = new Map();
    }
    async load(child, params) {
        const { by, from, field } = params;
        const metadataMap = this.dataloaderMetadataService.getMetadata(from, child);
        if (!metadataMap) {
            throw new Error(`cannot find metadata for ${from.name} -> ${child.name}`);
        }
        if (!field && metadataMap.size > 1) {
            throw new Error(`multiple relations found between ${from.name} and ${child.name}, please provide the 'field' field.`);
        }
        const metadata = metadataMap.get(field) || metadataMap.values().next().value;
        const [parentData, args = []] = by;
        const key = metadata.by(parentData);
        const dataloader = await this.getOrCreateDataloader(params, metadata, ...args);
        return dataloader.load(key);
    }
    async getOrCreateDataloader(params, metadata, ...args) {
        let parentDataloaderMap = this.dataloaderMappedByParentField.get(params.from);
        if (!parentDataloaderMap) {
            parentDataloaderMap = new Map();
            this.dataloaderMappedByParentField.set(params.from, parentDataloaderMap);
        }
        if (parentDataloaderMap?.has(params.field)) {
            return parentDataloaderMap.get(params.field);
        }
        const dataloader = await this.createDataloader(metadata, ...args);
        parentDataloaderMap.set(params.field, dataloader);
        return dataloader;
    }
    async createDataloader(metadata, ...args) {
        const provider = this.dataloaderMetadataService.getDataloaderHandler(metadata.on);
        if (!provider) {
            throw new Error(`cannot find provider: ${metadata.on}`);
        }
        const resolvedProvider = this.dataloaderMetadataService.getAlias(provider.provide);
        const repository = this.moduleRef.get(resolvedProvider || provider.provide, { strict: false });
        if (!repository) {
            throw new Error(`cannot find provider: ${provider.provide.name}`);
        }
        const fetchRecords = async (keys) => {
            return repository[provider.field](keys, ...args);
        };
        const batchFunction = async (keys) => {
            const entities = await fetchRecords(keys);
            return utils_1.DataloaderMapper.map(metadata, keys, entities);
        };
        return new dataloader_1.default(batchFunction, {
            cache: this.cacheMapProvider?.cache,
            cacheMap: this.cacheMapProvider?.getCacheMap?.(),
        });
    }
};
exports.DataloaderService = DataloaderService;
exports.DataloaderService = DataloaderService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, common_1.Inject)(core_1.ModuleRef)),
    __metadata("design:paramtypes", [core_1.ModuleRef, Function, Function])
], DataloaderService);
//# sourceMappingURL=dataloader.service.js.map