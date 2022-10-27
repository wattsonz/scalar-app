import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import OutsideClickHandler from 'react-outside-click-handler';

type Props = {
  onClose: any
  onSignOut: any
}

const Div = styled.div`
  border: 1px #eee solid;
  background-color: white;
  padding: 6px 0;
  border-radius: 6px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
  position: absolute;
  top: calc(100% + 3px);
  right: -6px;
  z-index: 10;
  font-size: 14px;
  width: 250px;

  .special {
    padding: 8px 58px 8px 16px;

    p:first-child {
      font-weight: 600;
    }

    p:nth-child(2) {
      margin-top: 4px;
    }

    .sign {
      display: inline-block;
      border: 1px #4a00e0 solid;
      border-radius: 6px;
      color: #4a00e0;
      padding: 4px 12px;
      margin: 10px 0 6px 0;
      cursor: pointer;
    }
  }

  .divider {
    border-bottom: 1px #eee solid;
    margin: 6px 0;
  }

  .item {
    padding: 8px 16px;
    cursor: pointer;

    &:active {
      background-color: #f4f4f4;
    }
  }
`;

export default function LoginPanel({ onClose, onSignOut }: Props) {
  const router = useRouter();
  const user = useSelector((state: any) => state.auth.user);

  const loginHandler = () => {
    router.push('/login');
    onClose();
  };

  const collectionsHandler = () => {
    router.push('/browse');
    onClose();
  };

  const cartHandler = () => {
    router.push('/cart');
    onClose();
  };

  return (
    <Div>
      <OutsideClickHandler onOutsideClick={onClose}>
        <div className="special">
          {user ? (
            <>
              <p>Greeting</p>
              <p>{user.email}</p>
            </>
          ) : (
            <>
              <p>Welcome</p>
              <p>for more accessible,</p>
              <div className="sign" onClick={loginHandler}>
                Login
              </div>
            </>
          )}
        </div>
        <div className="divider"></div>
        <div className="item" onClick={collectionsHandler}>
          Showcase
        </div>
        <div className="item" onClick={cartHandler}>
          Cart
        </div>
        {user && (
          <div className="item" onClick={onSignOut}>
            Sign Out
          </div>
        )}
      </OutsideClickHandler>
    </Div>
  )
}