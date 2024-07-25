import type { Type } from "@nestjs/common";
import { type JoinProperty, RelationMetadata, type RelationNodeFn, RelationType } from "../types";
import { DataloaderMetadataContainer } from "../utils";

interface LoadManyOptions<Child, Parent> {
	by: (parent: Parent) => JoinProperty;
	where: (child: Child) => JoinProperty;
	on: string;
}

export function LoadMany<Child, Parent>(child: RelationNodeFn<Child>, options: LoadManyOptions<Child, Parent>) {
	const { by, where, on } = options;
	return (target: NonNullable<any>, propertyKey: string) => {
		const parent = target.constructor as Type;

		DataloaderMetadataContainer.AddRelationMetadata(
			() => parent,
			child,
			propertyKey,
			new RelationMetadata({
				by: by,
				where: where,
				type: RelationType.OneToMany,
				on: on,
			}),
		);
	};
}
