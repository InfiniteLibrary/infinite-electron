# infinite-electron
An [Electron](http://electron.atom.io/)-based cross-platform desktop reader for free ebooks (EPUB) from Project Gutenberg and [Unglue.it](https://unglue.it). 
The InfiniteLibrary team has grown out of two [Codex Hackathons](http://codexhackathon.com/).

## Stretch goals

- Add your own DRM-free ebooks.
- Make print copies

## Installation
If you don't have yarn, see https://yarnpkg.com/en/docs/install.

```bash
$ cd [infinite-electron path]
$ yarn
```

## Run

Run these two commands __simultaneously__ in different console tabs.

```bash
$ yarn run hot-server
$ yarn run start-hot
```

or run two servers with one command

```bash
$ yarn run dev
```

## DevTools

#### Toggle Chrome DevTools

- OS X: <kbd>Cmd</kbd> <kbd>Alt</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Linux: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Windows: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>

*See [electron-debug](https://github.com/sindresorhus/electron-debug) for more information.*

#### DevTools extension

This boilerplate is included following DevTools extensions:

* [Devtron](https://github.com/electron/devtron) - Install via [electron-debug](https://github.com/sindresorhus/electron-debug).
* [React Developer Tools](https://github.com/facebook/react-devtools) - Install via [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer).
* [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension) - Install via [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer).

You can find the tabs on Chrome DevTools.

If you want to update extensions version, please set `UPGRADE_EXTENSIONS` env, just run:

```bash
$ UPGRADE_EXTENSIONS=1 yarn run dev

# For Windows
$ set UPGRADE_EXTENSIONS=1 && yarn run dev
```

## CSS Modules

This boilerplate out of the box is configured to use [css-modules](https://github.com/css-modules/css-modules).

All `.css` file extensions will use css-modules unless it has `.global.css`.

If you need global styles, stylesheets with `.global.css` will not go through the
css-modules loader. e.g. `app.global.css`

If you want to import global css libraries (like `bootstrap`), you can just write the following code in `.global.css`:

```css
@import "~bootstrap/dist/css/bootstrap.css";
```


## Packaging

To package apps for the local platform:

```bash
$ yarn run package
```

To package apps for all platforms:

First, refer to [Multi Platform Build](https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build) for dependencies.

Then,
```bash
$ yarn run package-all
```

To package apps with options:

```bash
$ yarn run package -- --[option]
```

## Further commands

To run the application without packaging run

```bash
$ yarn run build
$ yarn start
```

To run End-to-End Test

```bash
$ yarn run build
$ yarn run test-e2e
```

#### Options

See [electron-builder CLI Usage](https://github.com/electron-userland/electron-builder#cli-usage)

#### Module Structure

This boilerplate uses a [two package.json structure](https://github.com/electron-userland/electron-builder/wiki/Two-package.json-Structure).

1. If the module is native to a platform or otherwise should be included with the published package (i.e. bcrypt, openbci), it should be listed under `dependencies` in `./app/package.json`.
2. If a module is `import`ed by another module, include it in `dependencies` in `./package.json`.   See [this ESLint rule](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md).
3. Otherwise, modules used for building, testing and debugging should be included in `devDependencies` in `./package.json`.
