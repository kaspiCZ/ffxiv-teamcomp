# FFXIV Teamcomp

The goal of this application is to offer suitable combinations of players for raiding. Based on the jobs they can play and their availability, this app computes all available team setups and orders them by viability (that is the weight score in input data).

## Installation

Using [Volta](https://volta.sh/) is strongly recommended as it simplifies Node.js version handling. Then `npm i` should provide everything necessary.

## Usage

The app uses [Vite.js](https://vitejs.dev), [Vitest](https://vitest.dev). You can find more details in their respective documentation.

You can either run the app in development `npm run dev`
or build and preview `npm run build` 👉 `npm run preview`

## Example

The simplest way to try the app out is `npm run dev` and then choosing to import a JSON file (`src/core/data/all-import.json` would be the best). This will populate the input matrix for you.

## Data explained

The data hint explains the data shape in terms of TypeScript types.

But you do not have to understand that at all. You can use the "add player" and set up the whole team. Then "export" and you don't have to worry about understanding the JSON file structure at all.

If you need to modify your saved (JSON) team, you can import it, make modifications, then export it again.

Weight (from 0 to 1, representing a percentage) represents the player's assessment of how well they can play the job compared to **their** other jobs. E.g. if Tal is able to play SGE and MNK, but feels most comfortable on SGE, they would put 1 in SGE, and e.g. 0.9 in MNK.

Availability is there for ease of use. Let's say Tal can't play too often. Then it makes sense to keep their information, but have them unavailable by default. When you want to include them, you can import the whole team and flip the availability in the table.

# Acknowledgements

This app uses adapted version of [useSuspenseWebWorker](https://github.com/tiansijie/useSuspenseWebWorker) by Sijie Tian. With TypeScript, tweaks due to React's Strict Mode and test coverage.

# Limitations

Currently the main limiting factor is the constraints: "one player per job" (i.e. no job can be represented twice)

Firefox doesn't ship with Worker modules. A config flag needs to be enabled in Firefox. Even then, there are times when the module stops loading for no reason. This can usually be fixed by opening the app in new browser tab.

# TODO

- [ ] github actions (linting, tests)
- [ ] github pages (hosting)
- [ ] improve test coverage (workers/evaluate-combinations)
- [ ] improve test coverage (data/index)
- [ ] improve test coverage (App)
