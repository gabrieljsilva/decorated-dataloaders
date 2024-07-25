import { type Type } from "@nestjs/common";
import { AdjacencyGraph, DataloaderHandlerMetadata, DataloaderKey, RelationMetadata } from "../types";
export declare class DataloaderMetadataService {
    private readonly aliases;
    private readonly dataloaderHandlersMappedByKey;
    private readonly relations;
    constructor(relations: AdjacencyGraph<Type, Map<string, RelationMetadata>>, aliases: Map<Type, Type>, dataloaderHandlersMappedByKey: Map<DataloaderKey, DataloaderHandlerMetadata>);
    getMetadata(parent: Type, child: Type): Map<string, RelationMetadata<unknown, unknown>>;
    getDataloaderHandler(key: DataloaderKey): DataloaderHandlerMetadata;
    getAlias(type: Type): Type<any>;
}
