import Link from 'next/link'

type Props = {
    href: string
    children: React.ReactNode
}

export default function SuperLink({ href, children }: Props) {
    return (
        <Link href={href}>
            <a>{children}</a>
        </Link>
    )
}