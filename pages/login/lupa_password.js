import React, { Component } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Header from '../../component/Header2'

const cookies = new Cookies();

class LupaPassword extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            go_back: false,
            go_home: false,
        }
    }

    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    send() {
        const {
            email
        } = this.state

        if (email == null || email == '') {
            alert('Email Tidak Boleh Kosong')
        } else {
            const parameter = {
                "email": email
            }


            then(response => {
                if (response.data.status == 400) {
                    alert(response.data.message)
                } else {
                    alert('Email Terkirim, mohon cek email untuk reset password !')
                    this.setState({ go_home: true })
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }
    callbackInput = (name, value) => {
        this.setState({ [name]: value })
    }

    render() {
        const {
            email, go_back, go_home
        } = this.state
        if (go_back)
            return <Redirect exact to="/login" />
        else if (go_home)
            return <Redirect exact to="/home" />

        return (
            <>
                <Header />
                <div className="base-login">
                    <div className="kontener">
                        <div className="login-logo" style={{ flexDirection: 'column' }}>
                            <img style={{ maxWidth: '25vh', maxHeight: '20vh' }} src="/logo_head_zakat.png" alt="" />


                        </div>
                        <div className="form-login">
                            <h3 style={{ fontWeight: 'bold' }}>Lupa Password</h3><br />
                            <input type="email" className="form-control lgn-frm" placeholder="Masukkan Email" name="username" value={email} onChange={(e) => this.handleInputChange(e)} /><br />
                            <div style={{ marginTop: '10px', color: 'blue', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <Link href="/login/register">
                                    <label style={{ color: '#65FFDC', cursor: 'pointer' }}>Register</label>
                                </Link>
                                <Link href="/login">
                                    <label style={{ color: '#65FFDC', cursor: 'pointer' }}>Login</label>
                                </Link>
                            </div>
                            <button type="button" className="btn btn-success" onClick={() => this.send()}>CONTINUE</button>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default LupaPassword;