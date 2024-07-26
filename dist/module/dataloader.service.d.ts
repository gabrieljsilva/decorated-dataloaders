import { Type } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { CacheMapService } from "./cache-map.service";
import { DataloaderMetadataService } from "./dataloader-metadata.service";
interface LoadParams<Parent> {
    from: Type;
    field?: string;
    by: [Parent, ...any];
}
export declare class DataloaderService {
    private readonly moduleRef;
    private readonly dataloaderMetadataService;
    private readonly cacheMapService;
    private dataloaderMappedByParentField;
    constructor(moduleRef: ModuleRef, dataloaderMetadataService: DataloaderMetadataService, cacheMapService: CacheMapService);
    load<Parent>(child: Type, params: LoadParams<Parent>): Promise<any>;
    private getOrCreateDataloader;
    private createDataloader;
}
export {};
