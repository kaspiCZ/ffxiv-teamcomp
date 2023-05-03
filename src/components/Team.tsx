import { PlayerOption } from "../core/utils/transform-players"

type Props = {
  players: PlayerOption[]
}

const Team = ({ players }: Props) => {
  return (
    <>
      {players
        .sort((first, second) =>
          first.name < second.name ? -1 : first.name === second.name ? 0 : 1,
        )
        .map(({ job, name }) => (
          <div key={`${job}-${name}`} data-testid="team/player">
            <div>
              <img
                src={`icons/job/${job}.png`}
                width={20}
                style={{ marginRight: "0.5rem", verticalAlign: "middle" }}
              />
              {name}
            </div>
          </div>
        ))}
    </>
  )
}

export default Team
