/// <reference types="node"/>
import {MergeExclusive, TypedArray} from 'type-fest';

declare namespace tempy {
	type Options = MergeExclusive<
		{
			/**
			File extension.

			Mutually exclusive with the `name` option.

			_You usually won't need this option. Specify it only when actually needed._
			*/
			readonly extension?: string;
		},
		{
			/**
			Filename.

			Mutually exclusive with the `extension` option.

			_You usually won't need this option. Specify it only when actually needed._
			*/
			readonly name?: string;
		}
	>;
}

declare const tempy: {
	/**
	Get a temporary file path you can write to.

	@example
	```
	import tempy = require('tempy');

	tempy.file();
	//=> '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T/4f504b9edb5ba0e89451617bf9f971dd'

	tempy.file({extension: 'png'});
	//=> '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T/a9fb0decd08179eb6cf4691568aa2018.png'

	tempy.file({name: 'unicorn.png'});
	//=> '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T/f7f62bfd4e2a05f1589947647ed3f9ec/unicorn.png'

	tempy.directory();
	//=> '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T/2f3d094aec2cb1b93bb0f4cffce5ebd6'
	```
	*/
	file(options?: tempy.Options): string;

	/**
	Get a temporary directory path. The directory is created for you.

	@example
	```
	import tempy = require('tempy');

	tempy.directory();
	//=> '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T/2f3d094aec2cb1b93bb0f4cffce5ebd6'
	```
	*/
	directory(): string;

	/**
	Write data to a random temp file.

	@example
	```
	import tempy = require('tempy');

	await tempy.write('🦄');
	//=> '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T/2f3d094aec2cb1b93bb0f4cffce5ebd6'
	```
	*/
	write(fileContent: string | Buffer | TypedArray | DataView | NodeJS.ReadableStream, options?: tempy.Options): Promise<string>;

	/**
	Synchronously write data to a random temp file.

	@example
	```
	import tempy = require('tempy');

	tempy.writeSync('🦄');
	//=> '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T/2f3d094aec2cb1b93bb0f4cffce5ebd6'
	```
	*/
	writeSync(fileContent: string | Buffer | TypedArray | DataView, options?: tempy.Options): string;

	/**
	Get the root temporary directory path.

	For example: `/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T`.
	*/
	readonly root: string;
};

export = tempy;
