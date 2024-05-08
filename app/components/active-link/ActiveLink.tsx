"use client"
import Link from 'next/link'
import React from 'react'
// path name, necesitamos use client
// usamos el path del usuario, del client
import { usePathname } from 'next/navigation'

import style from './ActiveLink.module.css'

// creamos interfaz para definir tipos
// y estructura de los props
// recibidos por este componente
interface Props {
    path: string;
    text: string;
}

// usamos interface props
function ActiveLink({path, text}: Props) {
    // obtenemos el pathname del client
    const pathName = usePathname();

    // usamos Link -> para hipervinculos
    return (
        <Link key={path} className={ `${style.link} ${(pathName == path) && style['active-link']}` } href={path}>
            {text}
        </Link>
    )
}

export default ActiveLink;