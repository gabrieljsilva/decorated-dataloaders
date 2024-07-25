import { type Type } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import type { DataloaderMetadataService } from "./dataloader-metadata.service";
import type { CacheMapProvider } from "./dataloader.module";
interface LoadParams<Parent> {
    from: Type;
    field?: string;
    by: [Parent, ...any];
}
export declare class DataloaderService {
    private readonly moduleRef;
    private readonly cacheMapProvider;
    private readonly dataloaderMetadataService;
    private dataloaderMappedByParentField;
    constructor(moduleRef: ModuleRef, cacheMapProvider: CacheMapProvider, dataloaderMetadataService: DataloaderMetadataService);
    load<Parent>(child: Type, params: LoadParams<Parent>): Promise<any>;
    private getOrCreateDataloader;
    private createDataloader;
}
export {};
