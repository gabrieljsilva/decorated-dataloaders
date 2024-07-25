import { JoinProperty, RelationMetadata } from "../types";
export declare class DataloaderMapper {
    static map(metadata: RelationMetadata, keys: Array<JoinProperty>, entities: Array<unknown>): any[];
    private static oneToMany;
    private static oneToOne;
    private static oneToManyThrough;
    private static oneToOneThrough;
}
