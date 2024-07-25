import { Type } from "@nestjs/common";

export enum RelationType {
	OneToOne = "OneToOne",
	OneToMany = "OneToMany",
}

export type JoinProperty = string | number;
export type DataloaderKey = string;
export type AliasForReturnFn = () => Type | Function;
export type RelationField = string;
export type RelationNodeFn<Of = unknown> = () => Type<Of>;

export class RelationMetadata<Child = unknown, Parent = unknown> {
	type: RelationType;
	by: (parent: Parent) => JoinProperty;
	where: (child: Child) => JoinProperty;
	through?: Type;
	joinProperty?: string;
	on: string;

	constructor(metadata: RelationMetadata<Child, Parent>) {
		this.type = metadata.type;
		this.by = metadata.by;
		this.where = metadata.where;
		this.through = metadata.through;
		this.joinProperty = metadata.joinProperty;
		this.on = metadata.on;
	}
}
