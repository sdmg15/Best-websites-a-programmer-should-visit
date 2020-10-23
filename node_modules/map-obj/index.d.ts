declare namespace mapObject {
	type Mapper<
		SourceObjectType extends {[key: string]: any},
		MappedObjectKeyType extends string,
		MappedObjectValueType
	> = (
		sourceKey: keyof SourceObjectType,
		sourceValue: SourceObjectType[keyof SourceObjectType],
		source: SourceObjectType
	) => [MappedObjectKeyType, MappedObjectValueType];

	interface Options {
		/**
		Recurse nested objects and objects in arrays.

		@default false
		*/
		deep?: boolean;

		/**
		Target object to map properties on to.

		@default {}
		*/
		target?: {[key: string]: any};
	}

	interface DeepOptions extends Options {
		deep: true;
	}

	interface TargetOptions<TargetObjectType extends {[key: string]: any}> extends Options {
		target: TargetObjectType;
	}
}

/**
Map object keys and values into a new object.

@param source - Source object to copy properties from.
@param mapper - Mapping function.

@example
```
import mapObject = require('map-obj');

const newObject = mapObject({foo: 'bar'}, (key, value) => [value, key]);
//=> {bar: 'foo'}
```
*/
declare function mapObject<
	SourceObjectType extends object,
	TargetObjectType extends {[key: string]: any},
	MappedObjectKeyType extends string,
	MappedObjectValueType
>(
	source: SourceObjectType,
	mapper: mapObject.Mapper<
		SourceObjectType,
		MappedObjectKeyType,
		MappedObjectValueType
	>,
	options: mapObject.DeepOptions & mapObject.TargetOptions<TargetObjectType>
): TargetObjectType & {[key: string]: unknown};
declare function mapObject<
	SourceObjectType extends object,
	MappedObjectKeyType extends string,
	MappedObjectValueType
>(
	source: SourceObjectType,
	mapper: mapObject.Mapper<
		SourceObjectType,
		MappedObjectKeyType,
		MappedObjectValueType
	>,
	options: mapObject.DeepOptions
): {[key: string]: unknown};
declare function mapObject<
	SourceObjectType extends {[key: string]: any},
	TargetObjectType extends {[key: string]: any},
	MappedObjectKeyType extends string,
	MappedObjectValueType
>(
	source: SourceObjectType,
	mapper: mapObject.Mapper<
		SourceObjectType,
		MappedObjectKeyType,
		MappedObjectValueType
	>,
	options: mapObject.TargetOptions<TargetObjectType>
): TargetObjectType & {[K in MappedObjectKeyType]: MappedObjectValueType};
declare function mapObject<
	SourceObjectType extends {[key: string]: any},
	MappedObjectKeyType extends string,
	MappedObjectValueType
>(
	source: SourceObjectType,
	mapper: mapObject.Mapper<
		SourceObjectType,
		MappedObjectKeyType,
		MappedObjectValueType
	>,
	options?: mapObject.Options
): {[K in MappedObjectKeyType]: MappedObjectValueType};

export = mapObject;
