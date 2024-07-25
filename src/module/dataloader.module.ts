import { type DynamicModule, type Provider } from "@nestjs/common";
import { CacheMap } from "dataloader";
import { DataloaderMetadataContainer } from "../utils";
import { DataloaderMetadataService } from "./dataloader-metadata.service";
import { DataloaderService } from "./dataloader.service";

interface DataloaderModuleOptions {
	global?: boolean;
	cache?: boolean;
	getCacheMap?: () => CacheMap<any, any>;
	providers?: Array<Provider>;
	/**
	 * PS: This option allows you to add providers to the dataloader module context;
	 * However, it's not possible to use providers imported from other modules
	 * using "import" statement;
	 */
}

export class CacheMapProvider {
	cache: boolean;
	getCacheMap: () => CacheMap<any, any>;
}

export class DataloaderModule {
	static register(options?: DataloaderModuleOptions): DynamicModule {
		const { global = options.global || false, getCacheMap, cache = false, providers: dataloaders = [] } = options || {};

		const aliases = DataloaderMetadataContainer.resolveAliases();
		const dataloaderHandlers = DataloaderMetadataContainer.getDataloaderHandlers();
		const relations = DataloaderMetadataContainer.resolveRelations();

		const providers: Provider[] = [
			{
				provide: CacheMapProvider,
				useValue: { getCacheMap, cache },
			},
			{
				provide: DataloaderMetadataService,
				useValue: new DataloaderMetadataService(relations, aliases, dataloaderHandlers),
			},
			DataloaderService,
			...dataloaders,
		];

		return {
			module: DataloaderModule,
			providers: providers,
			exports: providers,
			global: true,
			imports: [],
		};
	}
}
