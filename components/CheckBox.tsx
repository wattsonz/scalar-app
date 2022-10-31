import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { CheckIcon } from '../assets/icons'
import { filterActions } from '../store/slices/filterSlice'

type Props = {
    of: any,
    type: any
}

const Button = styled.button`
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border: 1px #bbb solid;
  border-radius: 2px;
  background-color: transparent;
  margin-right: 8px;
  cursor: pointer;

  &.checked {
    border-color: #ffb75f;
    background-color: #ffb75f;
    
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      stroke-width: 3;
    }
  }
`

export default function CheckBox({ of, type }: Props) {
    const filters = useSelector((state: any) => state.filter)
    const [isChecked, setIsChecked] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (type === 'brand') {
            if (filters.brands.includes(of)) {
                setIsChecked(true)
            }
        } else if (type === 'category') {
            if (filters.categories.includes(of)) {
                setIsChecked(true)
            }
        }
    }, [])

    const clickHandler = () => {
        if (isChecked) {
            if (type === 'brand') {
                dispatch(filterActions.deselectBrand(of))
            } else if (type === 'category') {
                dispatch(filterActions.deselectCategory(of))
            }
        } else {
            if (type === 'brand') {
                dispatch(filterActions.selectBrand(of))
            } else if (type === 'category') {
                dispatch(filterActions.selectCategory(of))
            }
        }

        setIsChecked((prevValue) => !prevValue)
    }

    return isChecked ? (
        <Button className="checked" onClick={clickHandler}>
            <CheckIcon />
        </Button>
    ) : (
        <Button onClick={clickHandler}></Button>
    )
}