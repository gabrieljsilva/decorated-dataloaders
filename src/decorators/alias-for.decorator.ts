import type { Type } from "@nestjs/common";
import { AliasForReturnFn } from "../types/dataloader.types";
import { DataloaderMetadataContainer } from "../utils/dataloader-metadata-container";

export function AliasFor(provider: AliasForReturnFn) {
	return (target: NonNullable<unknown>) => {
		DataloaderMetadataContainer.setAlias(target as Type, provider);
	};
}
