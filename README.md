# quasar-vite-chips

This is a simple demo project to show using Vue + Quasar + Vite (as build system) with Pinia (store) and Typescript
via Vue's new "script setup" capability.

Note: Quasar CLI + Vite is still BETA and this demo requires Node > 16.xx

### Status / Notes

This repo is intended to help me transition some of my older apps that use Vue 2.x or 3.x and older Quasar into the new Q + Vite format.  

Currently converting key components from the Trussia-Q app
 * QSelectChips ... was old `TRTagsComp`
 * old `TRDatePicker`
 * old `TRAutoComp`
 * old `TRNoteEditor` which uses QEditor with custom toolbars  

## Created ...
```bash
yarn create quasar
```

## Install the dependencies
```bash
yarn install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Build the app for production
```bash
quasar build
```

and for Electron apps
```bash
quasar build -m electron
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
