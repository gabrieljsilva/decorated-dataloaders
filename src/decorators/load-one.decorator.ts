import type { Type } from "@nestjs/common";
import { JoinProperty, RelationMetadata, RelationNodeFn, RelationType } from "../types/dataloader.types";
import { DataloaderMetadataContainer } from "../utils/dataloader-metadata-container";

interface LoadOneOptions<Child, Parent> {
	by: (parent: Parent) => JoinProperty;
	where: (child: Child) => JoinProperty;
	on: string;
}

export function LoadOne<Child, Parent>(child: RelationNodeFn<Child>, options: LoadOneOptions<Child, Parent>) {
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
				type: RelationType.OneToOne,
				on: on,
			}),
		);
	};
}
