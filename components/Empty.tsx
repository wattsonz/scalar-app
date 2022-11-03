import styled from 'styled-components'

import { FilterIcon } from '../assets/logos'

type Props = {}

const Div = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;

  .round {
    border: 1px #eee solid;
    border-radius: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px rgba(255, 179, 0, 0.5);

    .icon {
      margin: 24px 24px;
      width: 32px;
      height: 32px;

      path {
        stroke-width: 1px;
      }
    }
  }

  .text {
    margin-top: 24px;
  }
`

export default function Empty({ }: Props) {
  return (
    <Div>
      <div className="round">
        <FilterIcon />
      </div>
      <p className="text">404 products not found</p>
    </Div>
  )
}