import {
  ChangeEventHandler,
  FormEventHandler,
  Suspense,
  useCallback,
  useRef,
  useState,
} from "react"
import ajv from "ajv"

import "./App.css"

import { EvaluatedCombination, WorkerOptions } from "./core"
import jsonSchema from "./core/json-schema"
import { Player } from "./core/utils/transform-players"
import useSuspenseWebWorker from "./hooks/use-suspense-web-worker"

import FormattingHint from "./components/FormattingHint"
import Loading from "./components/Loading"
import PlayerInput from "./components/PlayerInput"
import Results from "./components/Results"

function App() {
  const createWorker = useCallback(
    () =>
      new Worker(new URL("workers/evaluate-combinations.ts", import.meta.url), {
        name: "test",
        type: "module",
      }),
    [],
  )

  const importInputRef = useRef<HTMLInputElement>(null)
  const [players, setPlayers] = useState<Player[]>([])
  const [triggered, setTriggered] = useState(false)
  const [combinations, runWorker] = useSuspenseWebWorker<
    EvaluatedCombination[],
    WorkerOptions
  >("workers/evaluate-combinations.ts", createWorker)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    const workerOptions: WorkerOptions = {}

    const form = e.target as HTMLFormElement
    const formData = Object.fromEntries(new FormData(form).entries())

    if (formData.threshold) {
      workerOptions.threshold = +formData.threshold
    }

    if (players.length) {
      workerOptions.playersInput = players
    }

    setTriggered(true)
    runWorker(workerOptions)
  }

  const handleReset = () => {
    setTriggered(false)
  }

  const addPlayer = () => {
    setPlayers([
      ...players,
      {
        name: "",
        jobs: [],
        available: true,
      },
    ])
  }

  const removeAllPlayers = () => {
    setPlayers([])
  }

  const importFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (!e.target.files?.length) {
      return
    }

    const fileReader = new FileReader()
    fileReader.onload = async () => {
      const fileContents = fileReader.result

      if (typeof fileContents !== "string") {
        return
      }

      const validate = new ajv({
        multipleOfPrecision: 2,
      }).compile(jsonSchema)

      const validationResult = validate(JSON.parse(fileContents))

      if (!validationResult) {
        return
      }

      const json = JSON.parse(fileContents)

      setPlayers(json)

      if (importInputRef.current?.value) {
        importInputRef.current.value = ""
      }
    }
    fileReader.readAsText(e.target.files[0])
  }

  const exportFile = () => {
    const element = document.createElement("a")
    element.setAttribute(
      "href",
      "data:application/json;utf8," +
        encodeURIComponent(JSON.stringify(players, null, 2)),
    )
    element.setAttribute("download", `FFXIV-teamcomp-${Date.now()}`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <Suspense fallback={<Loading />}>
      {triggered ? (
        <Results data={combinations}>
          <button
            onClick={handleReset}
            style={{ display: "block", width: "100%" }}
          >
            Reset
          </button>
        </Results>
      ) : (
        <>
          <p style={{ fontSize: "0.8em" }}>
            Import a player list and/or add players. Once you have set up 8 or
            more available players, you can generate suitable team compositions.
          </p>
          <p style={{ fontSize: "0.8em" }}>
            "Viability score" is calculated as a sum of weights, which means
            that the best possible composition would have a score of 8.
            Threshold denotes the minimum viability score to display.
          </p>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <p>Import from a JSON file</p>
              <input
                ref={importInputRef}
                type="file"
                name="import"
                accept="application/json"
                style={{ marginInlineStart: "0.5rem" }}
                onChange={importFile}
              />
              <FormattingHint />
            </div>
            <div>
              or{" "}
              <button type="button" onClick={addPlayer}>
                Add player
              </button>
              {players.length ? (
                <>
                  {" "}
                  or{" "}
                  <button type="button" onClick={exportFile}>
                    Export
                  </button>{" "}
                  or{" "}
                  <button type="button" onClick={removeAllPlayers}>
                    Clear table
                  </button>
                </>
              ) : null}
            </div>
            <PlayerInput players={players} playersUpdateFunction={setPlayers} />
            {players.filter((player) => player.available).length >= 8 ? (
              <>
                <p>
                  <label>
                    Threshold:{" "}
                    <input
                      type="number"
                      name="threshold"
                      defaultValue="7"
                      step={0.1}
                      min={5}
                      max={8}
                    />
                  </label>
                </p>
                <div style={{ marginTop: "1rem" }}>
                  <button type="submit" style={{ width: "100%" }}>
                    Compute combinations
                  </button>
                </div>
              </>
            ) : null}
          </form>
        </>
      )}
    </Suspense>
  )
}

export default App
