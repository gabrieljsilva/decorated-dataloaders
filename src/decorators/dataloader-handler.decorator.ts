import { DataloaderHandlerMetadata } from "../types";
import { DataloaderMetadataContainer } from "../utils";

export function DataloaderHandler(key?: string) {
	return (target: any, propertyKey: string) => {
		DataloaderMetadataContainer.setDataloaderHandler(
			key || propertyKey,
			new DataloaderHandlerMetadata(target.constructor, propertyKey),
		);
	};
}
