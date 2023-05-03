import { useState } from "react"

const FormattingHint = () => {
  const [showFormatting, toggleFormatting] = useState(false)

  return (
    <>
      <div data-testid="formatting-hint">
        <button
          type="button"
          className="small"
          data-testid="formatting-hint/toggle"
          onClick={() => {
            toggleFormatting(!showFormatting)
          }}
        >
          Show/hide fromatting hint
        </button>

        {showFormatting ? (
          <div
            data-testid="formatting-hint/hint"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <pre>
              <code>{`type Players = Player[]`}</code>
            </pre>
            <pre style={{ marginLeft: "2rem" }}>
              <code>
                {`type Player = {
  name: string
  jobs: WeightedJob[]
  available: boolean
}`}
              </code>
            </pre>
            <pre style={{ marginLeft: "2rem" }}>
              <code>
                {`type WeightedJob = {
  job: Jobs
  weight: number
}`}
              </code>
            </pre>
            <pre style={{ marginLeft: "2rem" }}>
              <code>
                {`[
  {
    "name": "Tal",
    "jobs": [
      {
        "job": "SGE",
        "weight": 1
      }
    ],
    "available": true
  }
]`}
              </code>
            </pre>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default FormattingHint
