import React, { Dispatch, ReactElement } from 'react'
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/actions";

type Props = {}

export default function Header({ }: Props): ReactElement {

    const dispatch: any = useDispatch();
    const authReducer = useSelector(({ authReducer }) => authReducer);

    return (
        <div>
            <h1>header</h1>
            <button onClick={() => {
                dispatch(actions.clear())
            }}>Clear</button>

            <span>{authReducer.token ? authReducer.token : ""}</span>
            <span>{authReducer.token ? authReducer.user.username : ""}</span>
        </div>
    )
}