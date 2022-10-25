import React from "react";
import Link from "next/link";

const NavItem = ({ href, text, active}) => {
    return (
        <Link href={href}>
            <a className={` nav__link ${active ? "active" : ""}`}>
                {text}
            </a>
        </Link>
    )
}

export default NavItem;