import { type JoinProperty, type RelationNodeFn } from "../types";
interface LoadOneOptions<Child, Parent> {
    by: (parent: Parent) => JoinProperty;
    where: (child: Child) => JoinProperty;
    on: string;
}
export declare function LoadOne<Child, Parent>(child: RelationNodeFn<Child>, options: LoadOneOptions<Child, Parent>): (target: NonNullable<any>, propertyKey: string) => void;
export {};
