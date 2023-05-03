/**
 * Job lists and types
 */
const tanks = ["DRK", "GNB", "PLD", "WAR"] as const
const melee = ["DRG", "NIN", "MNK", "SAM", "RPR"] as const
const physicalRange = ["BRD", "DNC", "MCH"] as const
const magicalRange = ["BLM", "RDM", "SMN"] as const
const pureHealer = ["AST", "WHM"] as const
const shieldHealer = ["SCH", "SGE"] as const

type Tanks = typeof tanks
type Melee = typeof melee
type PhysicalRange = typeof physicalRange
type MagicalRange = typeof magicalRange
type PureHealer = typeof pureHealer
type ShieldHealer = typeof shieldHealer

const jobs = {
  tanks,
  melee,
  physicalRange,
  magicalRange,
  pureHealer,
  shieldHealer,
}

export type Jobs =
  | Tanks[number]
  | Melee[number]
  | PhysicalRange[number]
  | MagicalRange[number]
  | PureHealer[number]
  | ShieldHealer[number]

/**
 * Role checking
 */
const isRole = (
  input: Jobs,
  role:
    | Tanks
    | Melee
    | PhysicalRange
    | MagicalRange
    | PureHealer
    | ShieldHealer,
): boolean => (role as unknown as string[]).includes(input)

/**
 * Constraint definition
 */
export type RosterConstraints = {
  [K in keyof typeof jobs]: number
}

const rosterConstraints: RosterConstraints = {
  tanks: 2,
  melee: 2,
  physicalRange: 1,
  magicalRange: 1,
  pureHealer: 1,
  shieldHealer: 1,
}

export { isRole, jobs, rosterConstraints }
