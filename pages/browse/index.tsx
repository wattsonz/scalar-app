import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';

import BrandFilter from '../../components/BrandFilter';
import CategoryFilter from '../../components/CategoryFilter';
import SortSelect from '../../components/SortSelect';
import ItemCard from '../../components/ItemCard';
import Empty from '../../components/Empty';
import ProductsService from '../../utils/product.services';

type Props = {
  clothes: any
  brands: any
  categories: any
}

const MainNav = styled.div`
  font-size: 20px;
  background-color: #e06500;
  background: -webkit-linear-gradient(to right, #eeee4b9c, #e06500);
    background: linear-gradient(to right, #eeee4b9c, #e06500);
  padding: 16px;
  text-align: center;
  border-radius: 30px;
  

  display: center;
	align-items: center;
	position: sticky;
	top: -5px;
	z-index: 2;
	height: 70px;
	min-height: 70px;
	width: 100%;

  a {
    text-decoration: none;
    color: inherit;
  }

  span {
    color: #eff5bd;
  }
`;

const Div = styled.div`
  flex: 1;
  display: flex;

  .aside {
    width: 300px;
    padding: 16px;

    .title {
      font-size: 18px;
      font-weight: 500;
    }
  }

  .main {
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;

    .top {
      display: flex;

      .title {
        font-size: 18px;
        font-weight: 500;
        margin-right: auto;
      }
    }

    .clothes {
      margin: 16px 0;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
  }

  @media (max-width: 1024px) {
    .main {
      .clothes {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }

  @media (max-width: 768px) {
    .main {
      .clothes {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }

  @media (max-width: 640px) {
    .main {
      .top {
        align-items: center;

        .sort-filter {
          display: flex;
        }
      }

      .clothes {
        margin-bottom: 0;
      }
    }
  }
`;

export default function Browse({ clothes, brands, categories }: Props) {
  const filteredBrands = useSelector((state: any) => state.filter.brands);
  const filteredCategories = useSelector((state: any) => state.filter.categories);
  const filteredSort = useSelector((state: any) => state.filter.sort);

  let filteredClothes;

  filteredClothes =
    filteredBrands.length > 0
      ? [...clothes].filter((value) => filteredBrands.includes(value.brand))
      : [...clothes];

  filteredClothes =
    filteredCategories.length > 0
      ? filteredClothes.filter((value) =>
        filteredCategories.includes(value.category)
      )
      : filteredClothes;

  if (filteredSort === 'price_high_to_low') {
    filteredClothes = filteredClothes.sort((a, b) => +b.price - +a.price);
  } else if (filteredSort === 'price_low_to_high') {
    filteredClothes = filteredClothes.sort((a, b) => +a.price - +b.price);
  }

  return (
    <>
      <Head>
        <title>Browse</title>
      </Head>
      <MainNav>
        <Link href="/">Home</Link> / <span>Browse</span>
      </MainNav>
      <Div>
        <aside className="aside">
          {/* <div className="title">Filters</div> */}
          <BrandFilter items={brands} />
          <CategoryFilter items={categories} />
        </aside>

        <main className="main">
          <div className="top">
            <div className="title">Showcase</div>
            <SortSelect />
          </div>
          {filteredClothes.length > 0 ? (
            <div className="clothes">
              {filteredClothes.map((item, index) => (
                <ItemCard key={item.id} {...item} setPriority={index < 8} />
              ))}
            </div>
          ) : (
            <Empty />
          )}
        </main>
      </Div>
    </>
  )
}

export async function getServerSideProps(context) {
  const items = await ProductsService.getProducts()

  const brands = items.reduce((previous, current) => {
    if (!previous.includes(current.brand)) {
      previous.push(current.brand);
    }

    return previous;
  }, []);

  const categories = items.reduce((previous, current) => {
    if (!previous.includes(current.category)) {
      previous.push(current.category);
    }

    return previous;
  }, []);

  return {
    props: {
      clothes: items,
      brands,
      categories,
    },
  }
}