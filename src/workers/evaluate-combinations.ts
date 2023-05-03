"use strict"
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import getEvaluatedCombinations, { WorkerOptions } from "../core"

// let isRunning = false

onmessage = async (e) => {
  // if (isRunning) return

  // isRunning = true

  const { threshold, playersInput } = e.data

  const options: WorkerOptions = {}

  if (threshold) {
    options.threshold = threshold
  }

  if (playersInput) {
    options.playersInput = playersInput
  }

  console.log("starting with", options)
  console.time("teams")
  const result = await getEvaluatedCombinations(options)
  console.timeEnd("teams")

  postMessage(result)

  // isRunning = false
}
