import { RelationNodeFn } from "../types/dataloader.types";
export interface LoadThroughOptions {
    joinProperty: string;
}
export declare function LoadThrough(joinEntity: RelationNodeFn, options: LoadThroughOptions): (target: NonNullable<any>, propertyKey: string) => void;
