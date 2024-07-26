import { DataloaderHandlerMetadata } from "../types/dataloader-handler-metadata";
import { DataloaderMetadataContainer } from "../utils/dataloader-metadata-container";

export function DataloaderHandler(key?: string) {
	return (target: any, propertyKey: string) => {
		DataloaderMetadataContainer.setDataloaderHandler(
			key || propertyKey,
			new DataloaderHandlerMetadata(target.constructor, propertyKey),
		);
	};
}
