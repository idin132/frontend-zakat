import Head from "next/head";
import Link from "next/link";

const Header = () => {
    return (
        <>
        <Head>
          <title>Yuk Zakat</title>
          <link rel='icon' href="/logo_head_zakat.png" type='image/png' />
        </Head>

        <div className="header">
            <div className="container">
                <div className="box-header">
                    <img src="/logo_yuk_zakat.png" alt="" className="logo-header" />

                    <div className="box-menu-header">
                        <Link href="/">
                            <a
                                style={{ cursor: "pointer", textDecoration: "none" , fontWeight: 'bold'}}
                                className="item-menu-header"
                            >
                                HOME
                            </a>
                        </Link>
                        <Link href="/berita">
                            <a
                                style={{ cursor: "pointer", textDecoration: "none" , fontWeight: 'bold' }}
                                className="item-menu-header"
                            >
                                BERITA
                            </a>
                        </Link>
                        <Link href="/zakat">
                            <a
                                style={{ cursor: "pointer", textDecoration: "none" , fontWeight: 'bold'}}
                                className="item-menu-header"
                            >
                                ZAKAT
                            </a>
                        </Link>
                        <Link href="/login">
                            <a
                                className="btn btn-success"
                            >
                                Login
                            </a>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
        </>
    );
}

export default Header;