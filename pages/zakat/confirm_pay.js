import React from 'react';
import axios from 'axios';
import CurrencyFormat from 'react-currency-format';
import Link from 'next/link';

class Confirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirm: [],
            no_invoice: '',
            id_yayasan: '',
            id_zakat: '',
            guest_id: '',
            nama_donatur: '',
            metode_pembayaran: '',
            total_zakat: '',
            nama_pengirim: '',
            bank_pengirim: '',
            tanggal_transaksi: ''
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    // componentDidMount() {
    //     window.scrollTo(0, 0);
    //     axios.get(api+'/api/confirm-pay-zakat?no_invoice=' + this.props.match.params.no_invoice).then(
    //         res => {
    //             console.log(res.data.confirm);
    //             if (res.data.confirm !== null) {
    //                 const data = res.data.confirm;
    //                 this.setState({
    //                     confirm: res.data.confirm,
    //                     no_invoice: data.snap_token,
    //                     id_yayasan: data.id_yayasan,
    //                     id_zakat: data.id_zakat,
    //                     guest_id: data.guest_id,
    //                     nama_donatur: data.nama_lengkap,
    //                     metode_pembayaran: data.metode_pembayaran,
    //                     total_zakat: data.total_zakat,
    //                 })
    //             } else {
    //                 alert('Invoice Tidak Ditemukan')
    //             }
    //         }
    //     )
    // }

    onFormSubmit(e) {
        e.preventDefault();
        let data = new FormData();
        data.append('no_invoice', this.state.no_invoice);
        data.append('id_yayasan', this.state.id_yayasan);
        data.append('id_zakat', this.state.id_zakat);
        data.append('guest_id', this.state.guest_id);
        data.append('nama_donatur', this.state.nama_donatur);
        data.append('metode_pembayaran', this.state.metode_pembayaran);
        data.append('total_zakat', this.state.total_zakat);
        data.append('nama_pengirim', this.state.nama_pengirim);
        data.append('bank_pengirim', this.state.bank_pengirim);
        data.append('tanggal_transaksi', this.state.tanggal_transaksi);
        data.append('bukti_transfer', document.getElementById('bukti_transfer').files[0]);
        // axios.post(api+'/api/confirm-payment-zakat', data).then(
        //     res => {
        //         alert(res.data.msg);
        //         window.location.href = '/zakat';
        //     }
        // )
    }

    render() {
        return (
            <>
                <section>
                    <div className="block">
                        <div className="container">
                            <div className="cnt-frm">
                                <form id="data-konfirmasi" className="sc_input_hover_default inited" data-formtype="form_2" enctype="multipart/form-data" onSubmit={this.onFormSubmit}>
                                    <div classname="sc_form_item sc_form_field label_over" style={{display: 'flex'}}>
                                        <div style={{width: '70%'}}>
                                            <span>No Invoice</span>
                                            <input id="no_invoice" type="text" name="no_invoice" placeholder="No Invoice" value={this.state.no_invoice} onChange={
                                                (event) => {
                                                    this.setState({no_invoice: event.target.value})
                                                }
                                            } />

                                        </div>
                                        <div style={{width: '30%'}}>
                                            <button type="button" className="thm-btn2" id="cari" style={{width: '95%', padding: '8px', borderRadius: '5px', marginTop: '24px', height: '55px', float: 'right'}}>
                                                Cari
									            </button>
                                        </div>
                                    </div>
                                    <div className="sc_form_item sc_form_field label_over">
                                        <span>Nama Donatur</span>
                                        <input type="text" id="nama_donatur" name="nama_donatur" placeholder="Nama Donatur" value={this.state.nama_donatur} readonly="" />
                                    </div>

                                    <div className="sc_form_item sc_form_field label_over">
                                        <span>Metode Pembayaran</span>
                                        <input type="text" name="metode_pembayaran" id="metode_pembayaran" placeholder="Metode Pembayaran" readonly="" value={this.state.metode_pembayaran} />
                                    </div>

                                    <div className="sc_form_item sc_form_field label_over">
                                        <span>Total Zakat</span>
                                        <input type="text" name="total_zakat" placeholder="Total Zakat" readonly="" value={this.state.total_zakat} id="total_zakat" />
                                    </div>

                                    <div className="sc_form_item sc_form_field label_over">
                                        <span>Nama Pengirim</span>
                                        <input type="text" name="nama_pengirim" placeholder="Nama Pengirim" id="nama_pengirim" value={this.state.nama_pengirim} onChange={
                                            (event) => {
                                                this.setState({nama_pengirim: event.target.value})
                                            }
                                        } />
                                    </div>

                                    <div className="sc_form_item sc_form_field label_over">
                                        <span>Bank Pengirim</span>
                                        <input type="text" name="bank_pengirim" placeholder="Bank Pengirim" id="bank_pengirim" value={this.state.bank_pengirim} onChange={
                                            (event) => {
                                                this.setState({bank_pengirim: event.target.value})
                                            }
                                        } />
                                    </div>

                                    <div className="sc_form_item sc_form_field label_over">
                                        <span>Tanggal Transaksi</span>
                                        <input type="date" name="tanggal_transaksi" placeholder="Tanggal Transaksi" style={{backgroundColor: '#f2f2f2'}} id="tanggal_transaksi" value={this.state.tanggal_transaksi} onChange={
                                            (event) => {
                                                this.setState({tanggal_transaksi: event.target.value})
                                            }
                                        } />
                                    </div>

                                    <div className="sc_form_item sc_form_field label_over">
                                        <span>Bukti Transfer</span>
                                        <input type="file" name="bukti_transfer" placeholder="Bukti Transfer" id="bukti_transfer" style={{backgroundColor: '#f2f2f2'}} />
                                    </div>
                                    <center style={{marginTop: '5px', marginBottom: '10px'}}>
                                        <button type="submit" className="thm-btn2" id="konfirmasi_pembayaran" style={{width: '100%', padding: '8px', borderRadius: '5px'}}>
                                            Konfirmasi Pembayaran
							            </button>
                                    </center>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default Confirm;