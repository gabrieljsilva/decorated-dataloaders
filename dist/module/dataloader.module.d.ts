import { type DynamicModule, type Provider } from "@nestjs/common";
import { CacheMap } from "dataloader";
interface DataloaderModuleOptions {
    global?: boolean;
    cache?: boolean;
    getCacheMap?: () => CacheMap<any, any>;
    providers?: Array<Provider>;
}
export declare class CacheMapProvider {
    cache: boolean;
    getCacheMap: () => CacheMap<any, any>;
}
export declare class DataloaderModule {
    static register(options?: DataloaderModuleOptions): DynamicModule;
}
export {};
