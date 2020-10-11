import {Except} from 'type-fest';
import readPkg = require('read-pkg');

declare namespace readPkgUp {
	type Options = {
		/**
		Directory to start looking for a package.json file.

		@default process.cwd()
		*/
		cwd?: string;
	} & Except<readPkg.Options, 'cwd'>;

	type NormalizeOptions = {
		/**
		Directory to start looking for a package.json file.

		@default process.cwd()
		*/
		cwd?: string;
	} & Except<readPkg.NormalizeOptions, 'cwd'>;

	type PackageJson = readPkg.PackageJson;
	type NormalizedPackageJson = readPkg.NormalizedPackageJson;

	interface ReadResult {
		packageJson: PackageJson;
		path: string;
	}

	interface NormalizedReadResult {
		packageJson: NormalizedPackageJson;
		path: string;
	}
}

declare const readPkgUp: {
	/**
	Read the closest `package.json` file.

	@example
	```
	import readPkgUp = require('read-pkg-up');

	(async () => {
		console.log(await readPkgUp());
		// {
		// 	packageJson: {
		// 		name: 'awesome-package',
		// 		version: '1.0.0',
		// 		…
		// 	},
		// 	path: '/Users/sindresorhus/dev/awesome-package/package.json'
		// }
	})();
	```
	*/
	(options?: readPkgUp.NormalizeOptions): Promise<
		readPkgUp.NormalizedReadResult | undefined
	>;
	(options: readPkgUp.Options): Promise<readPkgUp.ReadResult | undefined>;

	/**
	Synchronously read the closest `package.json` file.

	@example
	```
	import readPkgUp = require('read-pkg-up');

	console.log(readPkgUp.sync());
	// {
	// 	packageJson: {
	// 		name: 'awesome-package',
	// 		version: '1.0.0',
	// 		…
	// 	},
	// 	path: '/Users/sindresorhus/dev/awesome-package/package.json'
	// }
	```
	*/
	sync(
		options?: readPkgUp.NormalizeOptions
	): readPkgUp.NormalizedReadResult | undefined;
	sync(options: readPkgUp.Options): readPkgUp.ReadResult | undefined;
};

export = readPkgUp;
