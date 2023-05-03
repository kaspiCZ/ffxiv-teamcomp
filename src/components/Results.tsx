import { PropsWithChildren } from "react"

import Teams from "./Teams"

import { EvaluatedCombination } from "../core"
import { SuspenseStatusUpdater } from "../hooks/use-suspense-web-worker"

type Props = {
  data: SuspenseStatusUpdater<EvaluatedCombination[]>
} & PropsWithChildren

const Results = ({ children, data }: Props) => (
  <>
    {children ? (
      <div style={{ marginBottom: "1rem", textAlign: "center" }}>
        {children}
      </div>
    ) : null}
    <Teams data={data} />
  </>
)

export default Results
