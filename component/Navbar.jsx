import React, { useState } from "react";
import Link from "next/link";
import NavItem from "./NavItem";

const MENU_LIST = [
    {
        text: "Home",
        href: "/"
    }, {
        text: "Berita",
        href: "/berita"
    }, {
        text: "Zakat",
        href: "/zakat"
    }, {
        text: "Login",
        href: "/login"
    }
]
const Navbar = () => {
    const [navActive, setNavActive] = useState(false);
    const [activeIdx, setActiveIdx] = useState(0);
    return (
        <header>
            <nav className="nav">
                <Link href={"/"}>
                    <a onClick={()=>setActiveIdx(0)}>
                        <h1 className='logo'>YukZakat</h1>
                    </a>
                </Link>

                <div onClick={()=>{setNavActive(!navActive);
                }} className="nav__menu-bar">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <div className={`${navActive ? "active" : ""}
                nav__menu-list`}>
                    {
                        MENU_LIST.map((menu, idx) => {
                            return <div onClick={()=>{
                                setActiveIdx(idx);
                                setNavActive(false);
                            }} key={menu.text}>
                                <NavItem active={activeIdx === idx} {...menu}/>
                            </div>
                        })
                    }
                </div>
            </nav>
        </header>
    )
}

export default Navbar;