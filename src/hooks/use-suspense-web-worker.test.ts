import { useCallback } from "react"
import { act, renderHook, waitFor } from "../utils/test-utils"

import useSuspenseWebWorker from "./use-suspense-web-worker"

describe("useSuspenseWebWorker", () => {
  it("creates a worker that updates Suspense state", async () => {
    const { result } = renderHook(() => {
      const createWorker = useCallback(
        () =>
          new Worker(new URL("../workers/mock-worker.ts", import.meta.url), {
            name: "test",
            type: "module",
          }),
        [],
      )

      return useSuspenseWebWorker<string, { someOption: number }>(
        "../workers/mock-worker.ts",
        createWorker,
      )
    })

    // initial state
    expect(result.current[0].read()).toBe(null)

    // invoke the worker code
    act(() => {
      result.current[1]({ someOption: 8 })
    })

    // first read before worker code resolution throws Promise
    const promise = result.current[0].read
    expect(promise).toThrow()

    /**
     * when the worker code finishes executing and posts message Suspense will
     * have access to the resolved data
     */
    await waitFor(() => {
      expect(result.current[0].read()?.result?.data).toBe("someResult")
    })
  })
})
