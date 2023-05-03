import { render, screen } from "@testing-library/react"

import Results from "./Results"
import { SuspenseStatusUpdater } from "../hooks/use-suspense-web-worker"
import { EvaluatedCombination } from "../core"

describe("Results", () => {
  it("renders empty", () => {
    const data = {
      read: () => null,
    }

    render(<Results data={data} />)

    expect(screen.queryByTestId("team/player")).not.toBeInTheDocument()
  })

  it("renders with children", () => {
    const data = {
      read: () => null,
    }

    render(<Results data={data}>children</Results>)

    expect(screen.getByText("children")).toBeInTheDocument()
  })

  it("renders (including child components) with data", () => {
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
              name: "Riti",
              weight: 1,
            },
            {
              job: "DRG",
              name: "Aluny",
              weight: 0.5,
            },
          ],
          sum: 1.5,
        },
      ],
    })

    const data: SuspenseStatusUpdater<EvaluatedCombination[]> = {
      read: () => ({
        result: event,
      }),
    }

    render(<Results data={data} />)

    expect(screen.getByTestId("teams/divider")).toBeInTheDocument()

    const players = screen.getAllByTestId("team/player")

    expect(players.length).toBe(4)
    expect(players.at(0)?.textContent).toBe("Rexey")
    expect(players.at(1)?.textContent).toBe("Tal")
    // Aluny and Riti have different order than input, because of sorting
    expect(players.at(2)?.textContent).toBe("Aluny")
    expect(players.at(3)?.textContent).toBe("Riti")
  })
})
