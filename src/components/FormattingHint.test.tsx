import { render, screen, userEvent } from "../utils/test-utils"
import FormattingHint from "./FormattingHint"

describe("FormattingHint", () => {
  it("renders in default state", () => {
    render(<FormattingHint />)

    expect(screen.getByText("Show/hide fromatting hint")).toBeInTheDocument()
  })

  it("expands and collapses the hint", async () => {
    render(<FormattingHint />)

    const button = screen.getByTestId("formatting-hint/toggle")

    await userEvent.click(button)

    expect(screen.getByTestId("formatting-hint/hint").textContent).toMatch(
      /type Players = Player\[\]/,
    )

    await userEvent.click(button)

    expect(screen.queryByTestId("formatting-hint/hint")).not.toBeInTheDocument()
  })
})
