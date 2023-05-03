import { Dispatch, SetStateAction } from "react"

import { jobs } from "../core/data"
import { Player } from "../core/utils/transform-players"

type Props = {
  players: Player[]
  playersUpdateFunction: Dispatch<SetStateAction<Player[]>>
}

const PlayerInput = ({ players, playersUpdateFunction }: Props) => (
  <>
    {players.map(({ available, name }, index) => (
      <div
        key={`player-${index}`}
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <div style={{ margin: "0.5rem" }}>
          <button
            type="button"
            className="small"
            onClick={() => {
              const newState = [...players]
              newState.splice(index, 1)
              playersUpdateFunction([...newState])
            }}
          >
            remove
          </button>
        </div>
        <div style={{ margin: "0.5rem" }}>
          <input
            type="checkbox"
            name="availability[]"
            checked={available}
            onChange={(e) => {
              const newState = [...players]
              newState[index].available = !!e.currentTarget.checked
              playersUpdateFunction(newState)
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            alignItems: "start",
            margin: "0.5rem",
          }}
        >
          <label htmlFor={`player-${index}-name`}>Name</label>:
          <input
            type="text"
            id={`player-${index}-name`}
            name="playerName[]"
            style={{ flexGrow: 1, minWidth: 0 }}
            value={name}
            onChange={(e) => {
              const newState = [...players]
              newState[index].name = e.target.value
              playersUpdateFunction(newState)
            }}
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(4rem, 1fr))",
            gap: "0.5rem",
            margin: "0.5rem",
            flexGrow: 19,
          }}
        >
          {Object.values(jobs).map((jobGroup) =>
            jobGroup.map((job) => {
              const weightValue =
                players[index].jobs.find((storedJob) => storedJob.job === job)
                  ?.weight || ""

              return (
                <label
                  key={`player-${index}-${job}`}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={`icons/job/${job}.png`} width={25} />
                  </div>
                  <input
                    type="number"
                    name="playerJob[]"
                    step={0.1}
                    min={0}
                    max={1}
                    style={{ minWidth: 0 }}
                    value={weightValue}
                    onChange={(e) => {
                      const newState = [...players]

                      const value = {
                        job: job,
                        weight: +e.target.value,
                      }

                      const foundIndex = newState[index].jobs.findIndex(
                        ({ job: storedJob }) => storedJob === job,
                      )

                      if (foundIndex < 0) {
                        newState[index].jobs.push(value)
                      } else {
                        newState[index].jobs[foundIndex] = value
                      }

                      newState[index].jobs = newState[index].jobs.filter(
                        ({ weight }) => +weight > 0,
                      )

                      playersUpdateFunction(newState)
                    }}
                  />
                </label>
              )
            }),
          )}
        </div>
      </div>
    ))}
  </>
)

export default PlayerInput
