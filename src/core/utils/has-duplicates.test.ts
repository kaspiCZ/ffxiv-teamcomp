import hasDuplicates from "./has-duplicates"

describe("has-duplicates", () => {
  it("detects player name duplicates", () => {
    expect(hasDuplicates([])).toBe(false)

    expect(hasDuplicates([{ job: "SGE", name: "Tal", weight: 1 }])).toBe(false)

    expect(
      hasDuplicates([
        { job: "SGE", name: "Tal", weight: 1 },
        { job: "AST", name: "Tal", weight: 1 },
      ]),
    ).toBe(true)
  })

  it("detects job duplicates", () => {
    expect(hasDuplicates([])).toBe(false)

    expect(hasDuplicates([{ job: "SGE", name: "Tal", weight: 1 }])).toBe(false)

    expect(
      hasDuplicates([
        { job: "SGE", name: "Tal", weight: 1 },
        { job: "SGE", name: "Aluny", weight: 1 },
      ]),
    ).toBe(true)
  })
})
