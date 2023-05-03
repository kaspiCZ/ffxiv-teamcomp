import { useEffect, useRef, useState } from "react"

type Runner<TPostMessage> = (postMessage: TPostMessage) => void

type Result<TMessageEventData> = {
  result?: MessageEvent<TMessageEventData>
  error?: ErrorEvent
} | null

export type SuspenseStatusUpdater<TMessageEventData> = {
  read: () => Result<TMessageEventData>
}

/**
 * Allows using Worker with React.Suspense by providing the { read } object
 *
 * @example of a worker that accepts a string as message and eventually returns
 * a string from result.read()
 * ```js
 * const createWorker = new Worker("worker.ts", { type: "module" })
 * const [result, runWorker] = useSuspenseWebWorker<string, string>("worker.ts", createWorker)
 *
 * runWorker("dataForWorker")
 * ```
 * @param workerUrl is the same url used in createWorker
 * @param createWorker is invoked to get a new Worker instance
 */
const useSuspenseWebWorker = <TMessageEventData, TPostMessage>(
  workerUrl: string,
  createWorker: () => Worker,
): [SuspenseStatusUpdater<TMessageEventData>, Runner<TPostMessage>] => {
  const [result, setResult] = useState<Result<TMessageEventData>>()
  /**
   * @see https://github.com/reactwg/react-18/discussions/18 for reasoning
   * and details of working around StrictMode when using Worker.terminate()
   */
  const workerRef = useRef<Worker | null>(null)

  /**
   * Runner is used to reset the current result and trigger a new run
   * of the Worker code
   */
  const runner: Runner<TPostMessage> = (postMessage) => {
    if (workerRef.current) {
      setResult(null)
      workerRef.current.postMessage(postMessage)
    }
  }

  useEffect(() => {
    /**
     * Because StrictMode will invoke useEffect's cleanup, terminating
     * the Worker, we need to create a new Worker in the second invocation.
     *
     * In production, this will be called only once and cleanup only when
     * the component is truly destroyed.
     */
    const worker = createWorker()

    workerRef.current = worker

    worker.onmessage = (receivedMessage) =>
      setResult({
        result: receivedMessage,
      })

    worker.onerror = (e) =>
      setResult({
        error: e,
      })

    // return cleanup function
    return () => {
      worker.terminate()
      setResult(null)
    }
  }, [createWorker, workerUrl])

  if (result === undefined) {
    return [{ read: () => null }, runner]
  }

  if (result !== null) {
    return [{ read: () => result }, runner]
  }

  return [
    {
      read: () => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        throw new Promise(() => {})
      },
    },
    runner,
  ]
}

export default useSuspenseWebWorker
