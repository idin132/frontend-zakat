import React, { Component } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Header from '../../component/Header2';

const cookies = new Cookies();


class Daftar extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            nama: '',
            no_hp: '',
            password: '',
            password_confirm: '',
            alamat: '',


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
            username, email, nama, no_hp, password, password_confirm, alamat,
        } = this.state

        if (username == null || username == '') {
            alert('Username Tidak Boleh Kosong')
        } else if (email == null || email == '') {
            alert('Email Tidak Boleh Kosong')
        } else if (nama == null || nama == '') {
            alert('Nama Tidak Boleh Kosong')
        } else if (no_hp == null || no_hp == '') {
            alert('Nomor Telepon Tidak Boleh Kosong')
        } else if (password == null || password == '') {
            alert('Password Tidak Boleh Kosong')
        } else if (password_confirm == null || password_confirm == '') {
            alert('Ketik Ulang Password Tidak Boleh Kosong')
        } else if (password != password_confirm) {
            alert('Password Tidak Sama')
        } else if (alamat == null || alamat == '') {
            alert('Alamat Tidak Boleh Kosong')
        } else if (/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
            const parameter = {
                "username": username,
                "email": email,
                "name": nama,
                "no_hp": no_hp,
                "password": password,
                "alamat": alamat,
            }

        }
    }
    callbackInput = (name, value) => {
        this.setState({ [name]: value })
    }

    render() {
        const {
            username, email, nama, no_hp, password, password_confirm, alamat, go_back, go_home
        } = this.state
        if (go_back)
            return <Redirect exact to="/login" />
        else if (go_home)
            return <Redirect exact to="/home" />

        return (
            <>
                <Header />
                <div className="base-login">
                    <div className="kontener" style={{ height: 'auto' }}>
                        <div className="login-logo" style={{ flexDirection: 'column', height: 'auto' }}>
                            <img style={{ maxWidth: '25vh', maxHeight: '20vh' }} src="/logo_head_zakat.png" alt="" />
                        </div>

                        <div className="form-login">
                            <h3 style={{ fontWeight: 'bold' }}>Register</h3><br />
                            <input type="text" className="form-control lgn-frm" placeholder="Masukkan Username" name="username" value={username} onChange={(e) => this.handleInputChange(e)} /><br />
                            <input type="email" className="form-control lgn-frm" placeholder="Masukkan Email" name="email" value={email} onChange={(e) => this.handleInputChange(e)} /><br />
                            <input type="text" className="form-control lgn-frm" placeholder="Masukkan Nama" name="nama" value={nama} onChange={(e) => this.handleInputChange(e)} /><br />
                            <input type="number" className="form-control lgn-frm" placeholder="Masukkan No Hp" name="no_hp" value={no_hp} onChange={(e) => this.handleInputChange(e)} /><br />
                            <input type="password" className="form-control lgn-frm" placeholder="Masukkan Password" name="password" value={password} onChange={(e) => this.handleInputChange(e)} /><br />
                            <input type="password" className="form-control lgn-frm" placeholder="Ketik Ulang Password" name="password_confirm" value={password_confirm} onChange={(e) => this.handleInputChange(e)} /><br />
                            <input type="text" className="form-control lgn-frm" placeholder="Alamat" name="alamat" value={alamat} onChange={(e) => this.handleInputChange(e)} /><br />
                            <div style={{ marginBottom: '20px', color: 'blue', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <Link href="/login/lupa_password">
                                    <label style={{ color: '#65FFDC', cursor: 'pointer' }}>Lupa Password</label>
                                </Link>
                                <Link href="/login">
                                    <label style={{ color: '#65FFDC', cursor: 'pointer' }}>Login</label>
                                </Link>
                            </div>
                            <button type="button" className="btn btn-success" onClick={() => this.send()} style={{ marginBottom: '20px', cursor: 'pointer', color: 'rgb(175 175 175)' }}>CONTINUE</button>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Daftar;