import { PlayerOption } from "./transform-players"

const hasDuplicates = (input: PlayerOption[]): boolean => {
  const uniquePlayers = new Set(input.map(({ name }) => name))
  if (uniquePlayers.size < input.length) {
    return true
  }

  const uniqueJobs = new Set(input.map(({ job }) => job))
  if (uniqueJobs.size < input.length) {
    return true
  }

  return false
}

export default hasDuplicates
