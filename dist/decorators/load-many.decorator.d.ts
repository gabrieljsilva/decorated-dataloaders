import { type JoinProperty, type RelationNodeFn } from "../types";
interface LoadManyOptions<Child, Parent> {
    by: (parent: Parent) => JoinProperty;
    where: (child: Child) => JoinProperty;
    on: string;
}
export declare function LoadMany<Child, Parent>(child: RelationNodeFn<Child>, options: LoadManyOptions<Child, Parent>): (target: NonNullable<any>, propertyKey: string) => void;
export {};
