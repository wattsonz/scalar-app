import React from 'react'
import { useSelector } from 'react-redux'
import { clear, increase, testSelector } from '../store/slices/testSlice'
import { useAppDispatch } from '../store/store'

type Props = {}

export default function Playground1({ }: Props) {

    const dispatch = useAppDispatch()
    const testReducer = useSelector(testSelector)

    return (
        <>
            <div>test</div>
            <div>{testReducer.loading && "Loading..."} {testReducer.counter}</div>
            <span><button onClick={() => { dispatch(increase()) }}>+1</button> <button onClick={() => { dispatch(clear()) }}>reset</button> </span>
        </>
    )
}