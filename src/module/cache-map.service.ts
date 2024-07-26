import { Injectable } from "@nestjs/common";
import { CacheMap } from "dataloader";

@Injectable()
export class CacheMapService {
	cache: boolean;
	getCacheMap: () => CacheMap<any, any>;
}
