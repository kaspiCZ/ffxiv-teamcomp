import { render, screen } from "../utils/test-utils"
import Loading from "./Loading"

describe("Loading", () => {
  it("renders", () => {
    render(<Loading />)

    expect(screen.getByText("Loading")).toBeInTheDocument()
  })
})
