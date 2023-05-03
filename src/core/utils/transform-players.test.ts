import transformPlayers from "./transform-players"

describe("transform-players", () => {
  it("transforms players with one job", () => {
    const transformedPlayers = transformPlayers([
      {
        name: "Tal",
        jobs: [
          {
            job: "SGE",
            weight: 1,
          },
        ],
        available: true,
      },
    ])

    expect(transformedPlayers).toEqual([
      {
        job: "SGE",
        weight: 1,
        name: "Tal",
      },
    ])
  })

  it("transforms players with no jobs", () => {
    const transformedPlayers = transformPlayers([
      {
        name: "Tal",
        jobs: [],
        available: true,
      },
    ])

    expect(transformedPlayers).toEqual([])
  })

  it("transforms players with multiple jobs", () => {
    const transformedPlayers = transformPlayers([
      {
        name: "Tal",
        jobs: [
          {
            job: "SGE",
            weight: 1,
          },
          {
            job: "WAR",
            weight: 1,
          },
        ],
        available: true,
      },
    ])

    expect(transformedPlayers).toEqual([
      {
        job: "SGE",
        weight: 1,
        name: "Tal",
      },
      {
        job: "WAR",
        weight: 1,
        name: "Tal",
      },
    ])
  })
})
