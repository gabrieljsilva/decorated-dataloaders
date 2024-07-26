import { Type } from "@nestjs/common";
import { AdjacencyGraph } from "../types/adjacency-graph";
import { DataloaderHandlerMetadata } from "../types/dataloader-handler-metadata";
import { AliasForReturnFn, DataloaderKey, RelationMetadata, RelationNodeFn } from "../types/dataloader.types";
import { LoadThroughMetadata } from "../types/load-through-metadata";
export declare class DataloaderMetadataContainer {
    private static readonly relations;
    private static readonly loadThroughMetadata;
    private static readonly aliases;
    private static readonly dataloaderHandlersMappedByKey;
    static AddRelationMetadata<Parent, Child>(parent: RelationNodeFn<Parent>, child: RelationNodeFn<Child>, field: string, metadata: RelationMetadata): void;
    static addLoadThroughMetadata(parent: RelationNodeFn, joinEntity: RelationNodeFn, loadThroughMetadata: LoadThroughMetadata): void;
    static resolveLoadThroughMetadata(): Map<Type<any>, Map<Type<any>, LoadThroughMetadata>>;
    static resolveRelations(): AdjacencyGraph<Type<unknown>, Map<string, RelationMetadata<unknown, unknown>>>;
    static setDataloaderHandler(key: DataloaderKey, provider: DataloaderHandlerMetadata): void;
    static getDataloaderHandlers(): Map<string, DataloaderHandlerMetadata>;
    static hasAlias(alias: Type): boolean;
    static setAlias(target: Type, alias: AliasForReturnFn): void;
    static resolveAliases(): Map<Type<any>, Type<any>>;
}
