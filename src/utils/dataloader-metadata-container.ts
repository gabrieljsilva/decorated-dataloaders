import { Type } from "@nestjs/common";
import {
	AliasForReturnFn,
	DataloaderHandlerMetadata,
	DataloaderKey,
	LoadThroughMetadata,
	RelationField,
	RelationMetadata,
	RelationNodeFn,
} from "../types";
import { AdjacencyGraph } from "../types";

export class DataloaderMetadataContainer {
	private static readonly relations = new AdjacencyGraph<RelationNodeFn, Map<RelationField, RelationMetadata>>();
	private static readonly loadThroughMetadata = new Map<RelationNodeFn, Map<RelationNodeFn, LoadThroughMetadata>>();
	private static readonly aliases = new Map<Type, AliasForReturnFn>();
	private static readonly dataloaderHandlersMappedByKey = new Map<DataloaderKey, DataloaderHandlerMetadata>();

	static AddRelationMetadata<Parent, Child>(
		parent: RelationNodeFn<Parent>,
		child: RelationNodeFn<Child>,
		field: string,
		metadata: RelationMetadata,
	) {
		let relationMetadata = DataloaderMetadataContainer.relations.getEdges(parent)?.get(child);
		relationMetadata ||= new Map<RelationField, RelationMetadata>([[field, metadata]]);
		DataloaderMetadataContainer.relations.addEdge(parent, child, relationMetadata);
	}

	static addLoadThroughMetadata(
		parent: RelationNodeFn,
		joinEntity: RelationNodeFn,
		loadThroughMetadata: LoadThroughMetadata,
	) {
		DataloaderMetadataContainer.loadThroughMetadata.set(parent, new Map([[joinEntity, loadThroughMetadata]]));
	}

	static resolveLoadThroughMetadata() {
		const newMap = new Map<Type, Map<Type, LoadThroughMetadata>>();

		DataloaderMetadataContainer.loadThroughMetadata.forEach((map, parent) => {
			map.forEach((metadata, child) => {
				newMap.set(parent(), new Map([[child(), metadata]]));
			});
		});

		return newMap;
	}

	static resolveRelations() {
		const resolvedRelations = DataloaderMetadataContainer.relations.transform(
			(vertex) => vertex(),
			(edge) => edge,
		);

		const resolvedLoadThroughMetadata = DataloaderMetadataContainer.resolveLoadThroughMetadata();

		return resolvedRelations.transform(
			(vertex) => vertex,
			(edge, vertex) => {
				const loadThroughMetadata = resolvedLoadThroughMetadata.get(vertex);
				if (loadThroughMetadata) {
					// Find Metadata by entity field name
					loadThroughMetadata.forEach((value, joinEntity) => {
						const metadata = edge.get(value.field);
						if (metadata) {
							metadata.joinProperty = value.joinProperty;
							metadata.through = joinEntity;
						}
					});
				}

				return edge;
			},
		);
	}

	static setDataloaderHandler(key: DataloaderKey, provider: DataloaderHandlerMetadata) {
		if (DataloaderMetadataContainer.dataloaderHandlersMappedByKey.has(key)) {
			throw new Error(`Dataloader provider with key ${key} already exists`);
		}
		DataloaderMetadataContainer.dataloaderHandlersMappedByKey.set(key, provider);
	}

	static getDataloaderHandlers() {
		return DataloaderMetadataContainer.dataloaderHandlersMappedByKey;
	}

	static hasAlias(alias: Type): boolean {
		return DataloaderMetadataContainer.aliases.has(alias);
	}

	static setAlias(target: Type, alias: AliasForReturnFn) {
		if (DataloaderMetadataContainer.hasAlias(target)) {
			throw new Error(`Alias for ${target} already exists`);
		}

		DataloaderMetadataContainer.aliases.set(target, alias);
	}

	static resolveAliases() {
		const aliases = new Map<Type, Type>();
		for (const [key, aliasReturnFn] of DataloaderMetadataContainer.aliases.entries()) {
			aliases.set(key, aliasReturnFn() as Type);
		}
		return aliases;
	}
}
