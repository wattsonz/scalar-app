import Image from 'next/image';
import styled from 'styled-components';

import SuperLink from './SuperLink';
import { getFormattedCurrency } from '../utils/getFormattedCurrency';

type Props = {
  id: string
  imageURL: string
  brand: string
  name: string
  price: number
  setPriority: any
}

const Div = styled.div`
  border: 1px #ebebeb solid;
  /* border-radius: 30px; */
  border-radius: 15px/ 0px 0em 15px 15px;
  font-size: 14px;
  box-shadow: #ebebeb 0px 0px 10px;

  a {
    text-decoration: none;
    color: inherit;
  }

  .info {
    padding: 8px;

    .brand {
      font-weight: 500;
    }

    .name {
      color: #777;
      margin: 8px 0;
    }

    .price {
      font-weight: 500;
    }
  }
`;

export default function ItemCard({ id, imageURL, brand, name, price, setPriority }: Props) {
  return (
    <Div>
      <SuperLink href={`/browse/${id}`}>
        <Image
          src={imageURL}
          width={220}
          height={275}
          layout="responsive"
          priority={setPriority}
        />
        <div className="info">
          <div className="brand">{brand}</div>
          <div className="name">{name}</div>
          <div className="price">{`${getFormattedCurrency(price)} Baht`}</div>
        </div>
      </SuperLink>
    </Div>
  )
}