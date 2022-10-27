import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { filterActions } from '../store/slices/filterSlice';

type Props = {
    by: any
}

const Button = styled.button`
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border: 1px #bbb solid;
  border-radius: 50%;
  background-color: transparent;
  margin-right: 8px;
  cursor: pointer;

  &.checked {
    border-color: #4a00e0;
    border-width: 5px;

    .icon {
      stroke-width: 3;
    }
  }
`;

export default function SortChecker({ by }: Props) {
    const filters = useSelector((state: any) => state.filter);
    const [isChecked, setIsChecked] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (filters.sort === by) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [filters.sort]);

    const clickHandler = () => {
        dispatch(filterActions.chooseSort(by));
        setIsChecked(true);
    };

    return (
        <Button
            className={isChecked ? 'checked' : ''}
            onClick={clickHandler}
        ></Button>
    )
}