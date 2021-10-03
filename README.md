# `import-sort-style-bjorn-eric-abr`

Björn-Eric's personal [renke/import-sort](https://github.com/renke/import-sort) style. Mostly based of [import-sort-style-zego](https://github.com/Zegocover/import-sort-style-zego) (thanks!).

## Installation
```
yarn add -D import-sort import-sort-style-bjorn-eric-abr
```
and optinally
```
yarn add -D import-sort import-sort-cli
```

Then copy this to your `.importsortrc`:
```
{
	".js, .jsx, .es6, .es, .mjs, .ts, .tsx": {
		"parser": "babylon",
		"style": "bjorn-eric-abr"
	}
}
```
