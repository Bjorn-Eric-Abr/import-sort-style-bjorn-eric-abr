import { IImport } from 'import-sort-parser'
import { IStyleAPI, IStyleItem } from 'import-sort-style'

const fixedOrder = ['react', 'react-relay', 'prop-types']

export default function (styleApi: IStyleAPI): IStyleItem[] {
	const {
		and,
		alias,
		isScopedModule,
		hasDefaultMember,
		hasNamedMembers,
		hasNamespaceMember,
		hasNoMember,
		dotSegmentCount,
		hasOnlyDefaultMember,
		hasOnlyNamedMembers,
		hasOnlyNamespaceMember,
		isInstalledModule,
		isAbsoluteModule,
		isRelativeModule,
		member,
		naturally,
		name,
		not,
		startsWithAlphanumeric,
		startsWithLowerCase,
		startsWithUpperCase,
		startsWith,
		isNodeModule,
		moduleName,
		unicode,
	} = styleApi

	function isReactModule(imported: IImport): boolean {
		return Boolean(
			imported.moduleName.match(
				/^(react|react-dom|react-native|react-relay|relay-runtime|prop-types|redux)/,
			),
		)
	}

	function reactComparator(name1: IImport, name2: IImport) {
		let i1 = fixedOrder.indexOf(name1.toString())
		let i2 = fixedOrder.indexOf(name2.toString())

		i1 = i1 === -1 ? Number.MAX_SAFE_INTEGER : i1
		i2 = i2 === -1 ? Number.MAX_SAFE_INTEGER : i2

		return i1 === i2 ? naturally(name1.toString(), name2.toString()) : i1 - i2
	}

	function isStylesModule(imported: IImport): boolean {
		return Boolean(imported.moduleName.match(/\.(s?css|less)$/))
	}

	function isImageModule(imported: IImport): boolean {
		return Boolean(
			imported.moduleName.match(/\.(svg|png|gif|jpg|jpeg|webp)$/),
		)
	}

	return [
		// import "foo"
		{ match: and(hasNoMember, isAbsoluteModule) },
		{ separator: true },

		// import React from "react";
		{
			match: isReactModule,
			sort: reactComparator,
			sortNamedMembers: alias(unicode),
		},
		{ separator: true },

		// import uniq from 'lodash/uniq';
		{
			match: isInstalledModule(__filename),
			sort: moduleName(naturally),
			sortNamedMembers: alias(unicode),
		},
		{ separator: true },

		// import xxx from '@something/else'
		{ match: isScopedModule },
		{ separator: true },

		// import … from "./foo";
		// import … from "../foo";
		{
			match: and(isRelativeModule, not(isStylesModule), not(isImageModule)),
			sort: [dotSegmentCount, moduleName(naturally)],
			sortNamedMembers: alias(unicode),
		},
		{ separator: true },

		// Styles
		{
			match: isStylesModule,
			sort: [dotSegmentCount, moduleName(naturally)],
			sortNamedMembers: alias(unicode),
		},
		{ separator: true },

		// Images
		{
			match: isImageModule,
			sort: [dotSegmentCount, moduleName(naturally)],
			sortNamedMembers: alias(unicode),
		},
		{ separator: true },
	]
}
