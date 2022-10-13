import react, { Component } from 'react';
import Link from 'next/link'
import axios from 'axios';
import Cookies from 'universal-cookie';
import Header from '../../component/Header2'

const cookies = new Cookies();

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            fcmToken: cookies.get('fcmToken'),
        }
    }

    handleInputChange(e) {
        const { name, value } = e.target
        // if (name == "fcmToken") {
        //     this.setState({ [name]: "12321232123213"})
        // } else {
        this.setState({ [name]: value })
        // }
    }

    doLogin() {
        const {
            username, password
        } = this.state
        // console.log(username, password, fcmToken)

        const parameter = {
            "username": username,
            "password": password,
            "fcmToken": cookies.get('fcmToken'),
        }
    }

    render() {
        const {
            username, password
        } = this.state
        let user_id = cookies.get('user_id');
        if (user_id != null) {
            return <Redirect exact to="/dashboard" />
        }
        return (
            <>
                <Header />
                <div className="base-login">
                    <div className="kontener">
                        <div className="login-logo" style={{ flexDirection: 'column' }}>
                            <img style={{ maxWidth: '25vh', maxHeight: '20vh' }} src="/logo_head_zakat.png" alt="" />

                        </div>
                        <div className="form-login">
                            <h3 style={{ fontWeight: 'bold' }}>Login</h3><br />
                            <input type="text" className="form-control lgn-frm" placeholder="Username atau Email" name="username" value={username} onChange={(e) => this.handleInputChange(e)} /><br />
                            <input type="password" className="form-control lgn-frm" placeholder="Password" name="password" value={password} onChange={(e) => this.handleInputChange(e)} /><br />
                            <div style={{ display: 'flex', color: 'blue', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                                <Link href="/login/lupa_password">
                                    <label style={{ color: '#65FFDC', cursor: 'pointer' }}>Lupa Password</label>
                                </Link>
                                <Link href="/login/register">
                                    <label style={{ color: '#65FFDC', cursor: 'pointer' }}>Register</label>
                                </Link>
                            </div>
                            <button type="button" className="btn btn-success" onClick={() => this.doLogin()}>Login</button><br/>

                        </div>
                    </div>
                </div>
            </>
        )
    };
}

export default Login;