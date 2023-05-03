import { EvaluatedCombination } from "../core"

import { SuspenseStatusUpdater } from "../hooks/use-suspense-web-worker"
import { render, screen } from "../utils/test-utils"

import Teams from "./Teams"

describe("Teams", () => {
  it("renders empty", () => {
    const data = {
      read: () => null,
    }

    render(<Teams data={data} />)

    expect(screen.queryByTestId("team/teams/wrapper")).not.toBeInTheDocument()
  })

  it("renders with divider", () => {
    const event = new MessageEvent<EvaluatedCombination[]>("a", {
      data: [
        {
          combination: [
            {
              job: "WAR",
              name: "Rexey",
              weight: 1,
            },
            {
              job: "SGE",
              name: "Tal",
              weight: 1,
            },
          ],
          sum: 2,
        },
        {
          combination: [
            {
              job: "PLD",
              name: "Rexey",
              weight: 0.5,
            },
            {
              job: "WHM",
              name: "Tal",
              weight: 0.5,
            },
          ],
          sum: 1,
        },
      ],
    })

    const data: SuspenseStatusUpdater<EvaluatedCombination[]> = {
      read: () => ({
        result: event,
      }),
    }

    render(<Teams data={data} />)

    expect(screen.getByTestId("teams/divider")).toBeInTheDocument()

    const scores = screen.getAllByTestId("teams/score")

    expect(scores.at(0)?.textContent).toBe("2.00")
    expect(scores.at(1)?.textContent).toBe("1.00")
  })
})
