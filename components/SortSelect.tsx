import Select from 'react-select'
import { useDispatch } from 'react-redux'

import { filterActions } from '../store/slices/filterSlice'

type Props = {}

const options = [
    { value: 'default', label: 'Default' },
    { value: 'price_low_to_high', label: 'Low to High (Price)' },
    { value: 'price_high_to_low', label: 'High to Low (Price)' },
];

const customStyles = {
    container: (provided) => ({
        ...provided,
        fontSize: '14px',
    }),
    control: (provided) => ({
        ...provided,
        width: '180px',
        border: '1px #ddd solid',
        boxShadow: 'none',
        '&:hover': {},
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        display: 'none',
    }),
    menu: (provided) => ({
        ...provided,
        border: '1px #ddd solid',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.05)',
    }),
    option: (provided, state) => ({
        ...provided,
        border: 'none',
        backgroundColor: state.isSelected ? '#ffb75f' : 'white',
        cursor: 'pointer',
        ':active': {
            ...provided[':active'],
            backgroundColor: state.isSelected ? '#ffb75f' : '#f4f4f4',
        },
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#bbb',
    }),
};

export default function SortSelect({ }: Props) {
    const dispatch = useDispatch()

    const changeHandler = (selectedOption) => {
        dispatch(filterActions.chooseSort(selectedOption.value))
    }
    return (
        <Select
            blurInputOnSelect
            defaultValue={options[0]}
            instanceId="sort-select"
            isSearchable={false}
            onChange={changeHandler}
            options={options}
            placeholder="Sort by"
            styles={customStyles}
        />
    )
}