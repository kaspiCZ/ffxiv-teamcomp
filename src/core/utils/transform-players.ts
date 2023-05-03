import { Jobs } from "../data"

export type Player = {
  name: string
  jobs: WeightedJob[]
  available: boolean
}

export type WeightedJob = {
  job: Jobs
  weight: number
}

export type PlayerOption = WeightedJob & { name: Player["name"] }

/**
 * Transforms a list of players into a list of jobs they can play
 */
const transformPlayers = (data: Player[]): PlayerOption[] => {
  let result: PlayerOption[] = []

  data.forEach((player) => {
    if (!player.available) {
      return
    }

    const jobs = player.jobs.map((job) => ({ ...job, name: player.name }))

    result = [...result, ...jobs]
  })

  return result
}

export default transformPlayers
