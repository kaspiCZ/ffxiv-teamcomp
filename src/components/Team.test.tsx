import { render, screen } from "../utils/test-utils"

import { PlayerOption } from "../core/utils/transform-players"

import Team from "./Team"

describe("Team", () => {
  it("renders empty", () => {
    const players: PlayerOption[] = []

    render(<Team players={players} />)

    expect(screen.queryByTestId("team/player")).not.toBeInTheDocument()
  })

  it("renders with one player", () => {
    const players: PlayerOption[] = [
      {
        job: "SGE",
        name: "Tal",
        weight: 1,
      },
    ]

    render(<Team players={players} />)

    expect(screen.getAllByTestId("team/player").length).toBe(1)
  })

  it("renders with multiple players", () => {
    const players: PlayerOption[] = [
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
    ]

    render(<Team players={players} />)

    const playerElements = screen.getAllByTestId("team/player")

    expect(playerElements.length).toBe(2)
    expect(playerElements.at(0)?.textContent).toBe("Rexey")
    expect(playerElements.at(1)?.textContent).toBe("Tal")
  })
})
