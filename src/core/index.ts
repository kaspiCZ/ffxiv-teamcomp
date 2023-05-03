import { CartesianProduct } from "js-combinatorics"

import { isRole, jobs } from "./data"
import hasDuplicates from "./utils/has-duplicates"
import transformPlayers, {
  Player,
  PlayerOption,
} from "./utils/transform-players"

export type EvaluatedCombination = {
  combination: PlayerOption[]
  sum: number
}

export type WorkerOptions = {
  threshold?: number
  playersInput?: Player[]
}

const getEvaluatedCombinations = async ({
  threshold = 4,
  playersInput,
}: WorkerOptions): Promise<EvaluatedCombination[]> => {
  const result = new Set<EvaluatedCombination>()
  const usedCombinations = new Set<string>()
  const data: PlayerOption[][] = new Array(8).fill([])

  let rawPlayers: Player[] = []
  if (playersInput) {
    rawPlayers = playersInput
  } else {
    const playersCore = (await import("./data/players-core.json")).default
    const playersReserve = (await import("./data/players-reserve.json")).default

    rawPlayers = [...playersCore, ...playersReserve].filter(
      ({ available }) => available,
    ) as Player[]
  }

  const players = transformPlayers(rawPlayers)

  for (const player of players) {
    if (isRole(player.job, jobs["tanks"])) {
      data[0] = [...data[0], player]
      data[1] = [...data[1], player]
    }

    if (isRole(player.job, jobs["melee"])) {
      data[2] = [...data[2], player]
      data[3] = [...data[3], player]
    }

    if (isRole(player.job, jobs["physicalRange"])) {
      data[4] = [...data[4], player]
    }

    if (isRole(player.job, jobs["magicalRange"])) {
      data[5] = [...data[5], player]
    }

    if (isRole(player.job, jobs["pureHealer"])) {
      data[6] = [...data[6], player]
    }

    if (isRole(player.job, jobs["shieldHealer"])) {
      data[7] = [...data[7], player]
    }
  }

  const cp = new CartesianProduct(...data)

  for (const combination of cp) {
    if (hasDuplicates(combination)) continue

    const sum = combination.reduce(
      (accumulator, { weight }) => accumulator + weight,
      0,
    )

    if (sum < threshold) continue

    combination.sort((first, second) =>
      first.job < second.job ? -1 : first.job === second.job ? 0 : 1,
    )

    if (usedCombinations.has(JSON.stringify(combination))) continue

    usedCombinations.add(JSON.stringify(combination))
    result.add({ combination, sum })
  }

  return Array.from(result).sort((first, second) => second.sum - first.sum)
}

export default getEvaluatedCombinations
