# Changelog

## [1.1.0](https://github.com/billiam/cncjs-pendant-streamdeck/compare/1.0.0...1.1.0?diff=split) (2024-10-14)

### 🚀 Added

*  List accessible ports in connection config dialog ([8ae07db](https://github.com/billiam/cncjs-pendant-streamdeck/commit/8ae07db))

### 🩹 Fixes

*  Fix API calls failing after changing host details ([386b063](https://github.com/billiam/cncjs-pendant-streamdeck/commit/386b063))

## [1.0.0](https://github.com/billiam/cncjs-pendant-streamdeck/compare/0.9.0...1.0.0?diff=split) (2024-10-12)

### 🚀 Added

* Add config editor ([b851465](https://github.com/billiam/cncjs-pendant-streamdeck/commit/b851465)), see readme
* In the web view, font size now scales smoothly with page size and button column count
* New `ui.textSize` option, which increases or decreases the size of text in buttons. Default is 1 (for 100%).
* Show message when loading the web view if configuration cannot be found
* Web view now has a favicon

## [0.9.0](https://github.com/billiam/cncjs-pendant-streamdeck/compare/0.8.0...0.9.0?diff=split) (2024-09-02)

### 🚀 Added

- Add loading button overlay while outline is processing ([566faaa](https://github.com/billiam/cncjs-pendant-streamdeck/commit/566faaa))

## [0.8.0](https://github.com/billiam/cncjs-pendant-streamdeck/compare/0.7.2...0.8.0?diff=split) (2024-09-01)

### 📖 Documentation

- Default absolute position display button to set instead of toggle in example config ([63d45ee](https://github.com/billiam/cncjs-pendant-streamdeck/commit/63d45ee))
- Add outline action to example config ([d032783](https://github.com/billiam/cncjs-pendant-streamdeck/commit/d032783))

### 🚀 Added

#### Outline ([c07a1b2](https://github.com/billiam/cncjs-pendant-streamdeck/commit/c07a1b2))

The new `outline` action does a rapid move around the perimeter of the currently loaded gcode. There is some path simplification done here, so smooth arcs in the original gcode are will be translated to a series of points, and will not be as smooth.

The default configuration included in the example config looks like this:

```json
"outline": {
  "actions": [
    {
      "action": "outline",
      "event": "hold"
    }
  ],
  "disabled": "!gcode.gcode || !cnc.idle",
  "bgColor": 5,
  "icon": "default/perimeter.png"
}
```

#### New position actions ([cc163cb](https://github.com/billiam/cncjs-pendant-streamdeck/commit/cc163cb), [2f35157](https://github.com/billiam/cncjs-pendant-streamdeck/commit/2f35157))

Two new actions have been added `absoluteMachinePosition` and `absoluteWorkPosition`.

Previously in the example configuration, buttons like `goZeroX` used a `gcode` action with the argument `G0 X0`. This gcode was executed as-is, and would do a rapid move to the coordinate, but only if the controller was already in the absolute (`G90`) modal state. If the controller was in the incremental mode instead, these buttons would do nothing until the state was returned to absolute.

To fix this, the [`absoluteWorkPosition`](https://billiam.github.io/cncjs-pendant-streamdeck/docs/actions/#absoluteworkposition) action has been added. The argument for `absoluteMachinePosition` is a string which will be used with a `G0` rapid move, and will always run in absolute movement mode, regardless of the current modal state.

[`absoluteMachinePosition`](https://billiam.github.io/cncjs-pendant-streamdeck/docs/actions/#absolutemachineposition) has been added for symmetry, though its functionality was already available with the [`goto`](https://billiam.github.io/cncjs-pendant-streamdeck/docs/actions/#goto) action.

### 🩹 Fixes

- Fixed low update frequency for spindle RPM and feedrate ([7bd7b82](https://github.com/billiam/cncjs-pendant-streamdeck/commit/7bd7b82))
- Fix potential error on button release ([7cfe0fd](https://github.com/billiam/cncjs-pendant-streamdeck/commit/7cfe0fd))
- Fix outermost gcode line slightly out of frame ([0b828a9](https://github.com/billiam/cncjs-pendant-streamdeck/commit/0b828a9))
- Fix axis-to-position actions not working in relative mode ([cc163cb](https://github.com/billiam/cncjs-pendant-streamdeck/commit/cc163cb))
- Increase jog command frequency for streamdeck usage ([cc4ed5a](https://github.com/billiam/cncjs-pendant-streamdeck/commit/cc4ed5a))

## [0.7.2](https://github.com/billiam/cncjs-pendant-streamdeck/compare/0.7.0...0.7.2?diff=split) (2024-08-18)

### 🩹 Fixes

##### `stream deck`

- Fix render size being fixed at 72x72 ([4828696](https://github.com/billiam/cncjs-pendant-streamdeck/commit/4828696))
- Fix icon rendering in multi column/row buttons ([859066c](https://github.com/billiam/cncjs-pendant-streamdeck/commit/859066c))
- Fix transposed render location for multi row/column buttons ([9f50a89](https://github.com/billiam/cncjs-pendant-streamdeck/commit/9f50a89))

## [0.7.0](https://github.com/billiam/cncjs-pendant-streamdeck/compare/0.6.0...0.7.0?diff=split) (2024-08-15)

### 🚀 Added

- Add 0.001 mm step distance ([c957a69](https://github.com/billiam/cncjs-pendant-streamdeck/commit/c957a69))
- Add template variables for `spindleRpm` and `feedrate` ([cfc9311](https://github.com/billiam/cncjs-pendant-streamdeck/commit/cfc9311))

## [0.6.0](https://github.com/billiam/cncjs-pendant-streamdeck/compare/0.5.2...0.6.0?diff=split) (2024-08-09)

### 🚀 Added

- Add \`secure\` cncjs option for api and websocket connections ([6af2bf2](https://github.com/billiam/cncjs-pendant-streamdeck/commit/6af2bf2))

## [0.5.2](https://github.com/billiam/cncjs-pendant-streamdeck/compare/0.5.1...0.5.2?diff=split) (2024-06-02)

### 🩹 Fixes

- Fix errors when binding does not contain actions ([069391f](https://github.com/billiam/cncjs-pendant-streamdeck/commit/069391f))

## [0.5.1](https://github.com/billiam/cncjs-pendant-streamdeck/compare/0.5.0...0.5.1?diff=split) (2024-06-02)

### 🩹 Fixes

##### `stream deck`

- Exit with error when streamdeck is not found ([c7f7ed0](https://github.com/billiam/cncjs-pendant-streamdeck/commit/c7f7ed0))
- Fix unconfigurable global font size ([2704fac](https://github.com/billiam/cncjs-pendant-streamdeck/commit/2704fac))

##### `web`

- Failed pointer release events in mobile browsers ([84adb0d](https://github.com/billiam/cncjs-pendant-streamdeck/commit/84adb0d))

## [0.5.0](https://github.com/billiam/cncjs-pendant-streamdeck/compare/0.4.3...0.5.0?diff=split) (2022-09-15)

### 🚀 Added

##### `web`

- Make overall background color configurable ([06f7921](https://github.com/billiam/cncjs-pendant-streamdeck/commit/06f7921))

### 🩹 Fixes

- Fix overall font size being ignored ([2dfd088](https://github.com/billiam/cncjs-pendant-streamdeck/commit/2dfd088))

##### `stream deck`

- Fix missing md5 dependency in packaged build ([d468677](https://github.com/billiam/cncjs-pendant-streamdeck/commit/d468677))

## [0.4.3](https://github.com/billiam/cncjs-pendant-streamdeck/compare/0.4.2...0.4.3?diff=split) (2022-08-27)

### 🩹 Fixes

##### `file list`

- Fix incorrect enabled test for down arrow ([df84469](https://github.com/billiam/cncjs-pendant-streamdeck/commit/df84469))
- Fix button state caching causing stuck/incorrect buttons ([9fa195f](https://github.com/billiam/cncjs-pendant-streamdeck/commit/9fa195f))

# Changelog

## [0.4.2](https://github.com/billiam/cncjs-pendant-streamdeck/compare/0.4.1...0.4.2?diff=split) (2022-08-25)

### 🩹 Fixes

##### `stream deck`

- Fix sleep dimming resetting to full brightness ([a8dec87](https://github.com/billiam/cncjs-pendant-streamdeck/commit/a8dec87))

## [0.4.1](https://github.com/billiam/cncjs-pendant-streamdeck/compare/0.4.0...0.4.1?diff=split) (2022-08-25)

### 🩹 Fixes

- Add missing loading module ([556cc93](https://github.com/billiam/cncjs-pendant-streamdeck/commit/556cc93))

## [0.4.0](https://github.com/billiam/cncjs-pendant-streamdeck/compare/0.3.0...0.4.0?diff=split) (2022-08-25)

### 📖 Documentation

##### `config example`

- Distinguish between unhold and start feed in default icon config ([189c39c](https://github.com/billiam/cncjs-pendant-streamdeck/commit/189c39c))
- Use different background for play button when it means 'unpause' in default config ([4c6176d](https://github.com/billiam/cncjs-pendant-streamdeck/commit/4c6176d))
- Add default streamdeckUi section ([4f7848c](https://github.com/billiam/cncjs-pendant-streamdeck/commit/4f7848c))

### 🚀 Added

- Set state to disconnected when a connection error occurs ([1bf77e7](https://github.com/billiam/cncjs-pendant-streamdeck/commit/1bf77e7))
- Support custom user commands, loading animations ([889ba37](https://github.com/billiam/cncjs-pendant-streamdeck/commit/889ba37), [#8](https://github.com/billiam/cncjs-pendant-streamdeck/issues/8))

### 🩹 Fixes

##### `web`

- Fixed right-click triggering buttons, especially hold actions ([1943880](https://github.com/billiam/cncjs-pendant-streamdeck/commit/1943880))

# [0.3.0](https://github.com/billiam/cncjs-pendant-streamdeck/compare/0.2.5...0.3.0) (2022-08-18)

### Added

Added `streamdeckUi` configuration value to config. This allows `ui` configuration to be overwritten with different
fonts, colors, etc. when using a Stream Deck, so that a single config.json file can be shared between web and Stream
Deck processes.

## [0.2.5](https://github.com/billiam/cncjs-pendant-streamdeck/compare/0.2.4...0.2.5) (2022-08-17)

### Fixed

- Fixed compilation error in templating library affecting web build

## [0.2.4](https://github.com/billiam/cncjs-pendant-streamdeck/compare/0.2.3...0.2.4) (2022-08-13)

### Fixed

- Fixed spindle/rapid/feedrate overrides being unavailable while job is running

## [0.2.3](https://github.com/billiam/cncjs-pendant-streamdeck/compare/0.2.2...0.2.3) (2022-08-07)

### Fixed

- Fixed issue where rapid jog actions could trigger an absolute position move instead, depending on latency
- [Stream Deck only] Updated [stream deck library](https://github.com/julusian/node-elgato-stream-deck) to add support
  for Stream Deck Mini

### Chore

- Updated dependencies

## [0.2.2](https://github.com/billiam/cncjs-pendant-streamdeck/compare/0.2.1...0.2.2) (2022-08-06)

### Fixed

- Fix missing 100% height, causing squashed icons in some browsers
- Fix missing error class during connection failure

## [0.2.1](https://github.com/billiam/cncjs-pendant-streamdeck/compare/0.2.0...0.2.1) (2022-07-21)

### Fixed

- Fix Stream Deck connection failing before commandline arguments were parsed
- Fix incorrect default text line height

# [0.2.0](https://github.com/billiam/cncjs-pendant-streamdeck/compare/0.1.0...0.2.0) (2022-07-20)

Mostly focused on performance improvements on slower systems.

On a fast system, the initial processing for a large (180,000 line) gcode file was reduced from 5.5 seconds to 0.7 sec.  
On a slow system (Raspberry Pi 3b+), reduced processing time from 43 seconds to about 10 sec.

### Added

- New option: `ui.throttle` - Limit the draw frequency for a given button (_Stream Deck only_)
- New option: `ui.gcodeLimit` - Limit the number of lines of gcode that will be processed for slower systems,
  affecting both gcode rendering, and gcode dimension display (_Stream Deck only_)

### Changed

- Commandline options for Stream Deck service now override config.json values
- Faster error when no streamdeck devices are connected (no longer waits for other initialization steps)
- Exit from service (quickly) if initial websocket connection to cncjs fails
- Updated socket-io.client
- Reduce data transferred from gcode processor
- Much faster, and less strict, gcode processing
- Cache images loaded from disk

### Fixed

- Fixed websocket connection ignoring configured socket port
- Fixed missing license and readme in web build
- Fixed incorrect dependency for canvas module
- Adding missing 'Home' workflow state
- When smooth jogging, fix soft limits generating a backlog of unacknowledged moves, resulting in unexpected movement later
- Reduced unnecessary re-rendering for some button states
- Fixed very small gcode files not rendering correctly

# [0.1.0](https://github.com/billiam/cncjs-pendant-streamdeck/compare/7874c7dd1bacaccfb1fcd04e93f9926dcf712344...0.1.0) (2022-07-17)
