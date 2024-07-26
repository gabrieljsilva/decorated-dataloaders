import type { Type } from "@nestjs/common";
import { RelationNodeFn } from "../types/dataloader.types";
import { LoadThroughMetadata } from "../types/load-through-metadata";
import { DataloaderMetadataContainer } from "../utils/dataloader-metadata-container";

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
