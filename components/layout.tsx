import React, { ReactElement, ReactNode } from 'react'
import Header from './header'
import Footer from './footer';

type Props = {
    children: ReactNode;
}

export default function Layout({ children }: Props): ReactElement {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    )
}