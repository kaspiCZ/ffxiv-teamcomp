import { isRole, jobs } from "./data"

describe("data", () => {
  it("checks roles", () => {
    expect(isRole("AST", jobs.tanks)).toBe(false)
    expect(isRole("PLD", jobs.tanks)).toBe(true)
  })
})
