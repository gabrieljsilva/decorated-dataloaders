import type { Type } from "@nestjs/common";
import { LoadThroughMetadata, type RelationNodeFn } from "../types";
import { DataloaderMetadataContainer } from "../utils";

export interface LoadThroughOptions {
	joinProperty: string;
}

export function LoadThrough(joinEntity: RelationNodeFn, options: LoadThroughOptions) {
	return (target: NonNullable<any>, propertyKey: string) => {
		const parent = target.constructor as Type;
		DataloaderMetadataContainer.addLoadThroughMetadata(
			() => parent,
			joinEntity,
			new LoadThroughMetadata({
				field: propertyKey,
				joinProperty: options.joinProperty,
			}),
		);
	};
}
