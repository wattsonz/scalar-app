import styled from 'styled-components';

import { CartIcon } from '../assets/icons';

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
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);

    .icon {
      margin: 24px 24px;
      width: 32px;
      height: 32px;

      path,
      line {
        stroke-width: 1px;
      }
    }
  }

  .text {
    margin-top: 24px;
  }
`;

export default function EmptyCart({ }: Props) {
    return (
        <Div>
            <div className="round">
                <CartIcon />
            </div>
            <p className="text">Your cart is empty</p>
        </Div>
    )
}