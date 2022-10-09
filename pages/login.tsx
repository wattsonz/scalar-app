import React, { ReactElement, useState } from 'react'
import Layout from '../components/layout';
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/actions";
import { useSession, signIn, signOut, getSession } from "next-auth/react"

type Props = {}

export default function Login({ }: Props): ReactElement {

    // const dispatch: any = useDispatch();
    // const authReducer = useSelector(({ authReducer }) => authReducer);
    const { data: session } = useSession()
    console.log(session);

    if (session) {
        return (
            <>
                Signed in as {session.user.email} {session.user['roles']}<br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}

export async function getServerSideProps(context) {

    const session = await getSession(context)
    return {
        props: { session },
    }
}

