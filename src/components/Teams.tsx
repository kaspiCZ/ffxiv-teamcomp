import { Fragment } from "react"
import { v4 } from "uuid"

import Team from "./Team"

import { EvaluatedCombination } from "../core"
import { SuspenseStatusUpdater } from "../hooks/use-suspense-web-worker"

type Props = {
  data: SuspenseStatusUpdater<EvaluatedCombination[]>
}

const Teams = ({ data }: Props) => {
  let lastSum: number

  if (!data.read()?.result?.data) {
    return null
  }

  return (
    <div
      data-testid="teams/wrapper"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(9, 1fr)",
        gap: "1rem 0",
      }}
    >
      {data.read()?.result?.data
        ? data.read()?.result?.data.map(({ combination, sum }) => {
            const element = (
              <Fragment key={v4()}>
                {lastSum && sum !== lastSum ? (
                  <div
                    data-testid="teams/divider"
                    style={{
                      gridColumn: "span 9",
                      borderBottom: "solid 0.1rem white",
                    }}
                  ></div>
                ) : null}
                <div data-testid="teams/score">{sum.toFixed(2)}</div>
                <Team players={combination} />
              </Fragment>
            )

            lastSum = sum

            return element
          })
        : null}
    </div>
  )
}

export default Teams
