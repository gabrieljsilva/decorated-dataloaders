import { type DynamicModule } from "@nestjs/common";
import { CacheMap } from "dataloader";
import { DataloaderMetadataContainer } from "../utils/dataloader-metadata-container";
import { CacheMapService } from "./cache-map.service";
import { DataloaderMetadataService } from "./dataloader-metadata.service";
import { DataloaderService } from "./dataloader.service";

interface DataloaderModuleOptions {
	global?: boolean;
	cache?: boolean;
	getCacheMap?: () => CacheMap<any, any>;
}

export class DataloaderModule {
	static register(options?: DataloaderModuleOptions): DynamicModule {
		const { global = false, cache = true, getCacheMap } = options || {};

		return {
			module: DataloaderModule,
			providers: [
				DataloaderService,
				{
					provide: DataloaderMetadataService,
					useFactory: () => {
						const relations = DataloaderMetadataContainer.resolveRelations();
						const aliases = DataloaderMetadataContainer.resolveAliases();
						const dataloaderHandlers = DataloaderMetadataContainer.getDataloaderHandlers();

						return new DataloaderMetadataService(relations, aliases, dataloaderHandlers);
					},
				},
				{
					provide: CacheMapService,
					useValue: {
						cache,
						getCacheMap,
					},
				},
			],
			exports: [DataloaderService],
			global: global,
			imports: [],
		};
	}
}
