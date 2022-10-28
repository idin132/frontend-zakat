import React from 'react';
// import Header from '../../component/Header';
import Navbar from '../../component/Navbar';
import Link from 'next/link';
import * as Endpoint from '../../service/Endpoint';
import CurrencyFormat from 'react-currency-format';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

const api = Endpoint.BASE_URL

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qty_beras: '',

            zakat_penghasilan: 'block',
            zakat_fitrah: 'none',

            bayar_zakat_penghasilan_hitung: 'none',
            notes: '',
            total: '0',

            category_zakat_data: [],
            kategori: '',

            penghasilan_perbulan: '',
            penghasilan_lainnya: '',
            harga_beras: '',

        };


        this.handleChange = this.handleChange.bind(this);
        this.handleInputPenghasilanPerbulanChange = this.handleInputPenghasilanPerbulanChange.bind(this);
        this.handleInputPenghasilanLainnnyaChange = this.handleInputPenghasilanLainnnyaChange.bind(this);
        this.handleInputHargaBerasChange = this.handleInputHargaBerasChange.bind(this);
        this.hitungZakatPenghasilan = this.hitungZakatPenghasilan.bind(this);
        this.hitungZakatFitrah = this.hitungZakatFitrah.bind(this);

    }
    componentDidMount() {
        window.scrollTo(0, 0);
        trackPromise(
            axios.get(api + '/api/kategori').then(
                res => {
                    this.setState({ category_zakat_data: res.data.data });
                }
            )
        )
    }

    handleInputPenghasilanPerbulanChange(event) {
        this.setState({ penghasilan_perbulan: event.target.value });
    }

    handleInputPenghasilanLainnnyaChange(event) {
        this.setState({ penghasilan_lainnya: event.target.value });
    }

    handleInputHargaBerasChange(event) {
        this.setState({ harga_beras: event.target.value });
    }

    handleChange(event) {
        this.setState({ kategori: event.target.value });
        var id_zakat = event.target.value;
        if (id_zakat === 'ZK01') {
            this.setState({
                zakat_penghasilan: 'block',
                zakat_fitrah: 'none',
            });
        } else if (id_zakat === 'ZK02') {
            this.setState({
                zakat_penghasilan: 'none',
                zakat_fitrah: 'block',
            });
        }
        this.setState({ total: '0', notes: '', bayar_zakat_penghasilan_hitung: 'none' });
    }

    hitungZakatPenghasilan() {
        var penghasilan_perbulan = Number(this.state.penghasilan_perbulan.replace(/\./g, ''));
        var penghasilan_lainnya = Number(this.state.penghasilan_lainnya.replace(/\./g, ''));
        var harga_beras = Number(this.state.harga_beras.replace(/\./g, ''));

        var total = (penghasilan_perbulan + penghasilan_lainnya) * (2.5 / 100);
        var nishab = this.state.qty_beras * harga_beras;

        var notes = 'Nishab Zakat Anda Adalah Rp. ' + nishab.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ', Jumlah Zakat Yang Harus Anda Bayar Adalah Rp. ' + total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '. Jika Jumlah Zakat Kurang dari Nishab Maka Anda Belum Wajib Zakat.';

        this.setState({ total: total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'), notes: notes, bayar_zakat_penghasilan_hitung: 'block' });
    }

    hitungZakatFitrah() {
        var harga_beras = Number(this.state.harga_beras.replace(/\./g, ''));
        var total = (harga_beras * 2.5);
        var notes = 'Jumlah Zakat Yang Harus Anda Bayar Adalah Rp. ' + total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

        this.setState({ total: total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'), notes: notes, bayar_zakat_penghasilan_hitung: 'block' });
    }
    render() {
        return (
            <>

                <Navbar />

                <section>
                    <div className='block'>
                        <h2 className="sc_donations_title sc_item_title" style={{ fontSize: '35px', textAlign: 'center', marginTop:'20px', marginBottom: '50px' }}>Kalkulator Zakat</h2>

                        <div className='row'>
                            <div className='col-md-6'>
                                <div className="slc-wrp">
                                    <label>Kategori</label>
                                    <select style={{ width: '100%', padding: '20px', backgroundColor: '#fff', borderColor: '#000' }} tabindex="-98" value={this.state.kategori} onChange={this.handleChange}>
                                        {
                                            this.state.category_zakat_data.map((val) => {
                                                return (
                                                    <option value={val.id_zakat}>{val.kategori_zakat}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                                {/* -- begin::Zakat penghasilan -- */}
                                <div id="zakat-penghasilan" style={{ display: this.state.zakat_penghasilan }}>
                                    <div className="slc-wrp">
                                        <label>Penghasilan Perbulan</label>
                                        <CurrencyFormat value={this.state.penghasilan_perbulan} thousandSeparator={true} prefix="Rp " className="default-input" placeholder="Penghasilan Perbulan" onValueChange={(values) => {
                                            const { value } = values;
                                            this.setState({ penghasilan_perbulan: value })
                                        }} />
                                    </div>

                                    <div className="slc-wrp">
                                        <label>Bonus/THR/Penghasilan Lainnya</label>
                                        <CurrencyFormat className="default-input" value={this.state.penghasilan_lainnya} thousandSeparator={true} prefix="Rp " placeholder="Penghasilan Lainnya" onValueChange={(values) => {
                                            const { value } = values;
                                            this.setState({ penghasilan_lainnya: value })
                                        }} />
                                    </div>

                                    <div className="slc-wrp">
                                        <label>Harga Beras</label>
                                        <CurrencyFormat className="default-input" value={this.state.harga_beras} thousandSeparator={true} prefix="Rp " placeholder="Harga Beras" onValueChange={(values) => {
                                            const { value } = values;
                                            this.setState({ harga_beras: value })
                                        }} />
                                    </div>

                                    <div className="slc-wrp">
                                        <label>Total</label>
                                        <CurrencyFormat className="default-input" value={this.state.total} thousandSeparator={true} prefix="Rp " placeholder="Rp 0" onValueChange={(values) => {
                                            const { value } = values;
                                            this.setState({ total: value })
                                        }} />
                                    </div>

                                    <div className="slc-wrp">
                                        <button className="thm-btn2 btn-hitung-zakat" type="button" id="hitung_zakat_penghasilan" title="" itemprop="url" style={{ textAlign: 'center', width: '100%', marginTop: '20px' }} onClick={this.hitungZakatPenghasilan}>Hitung</button>
                                    </div>
                                </div>
                                {/* -- end::Zakat penghasilan */}

                                {/* -- begin::Zakat fitrah -- */}
                                <div id="zakat-fitrah" style={{ display: this.state.zakat_fitrah }}>
                                    <div className="slc-wrp">
                                        <label>Harga Beras</label>
                                        <CurrencyFormat className="default-input" value={this.state.harga_beras} thousandSeparator={true} prefix="Rp " placeholder="Harga Beras" onValueChange={(values) => {
                                            const { value } = values;
                                            this.setState({ harga_beras: value })
                                        }} />
                                    </div>
                                    <div className="slc-wrp">
                                        <label>Jumlah Zakat</label>
                                        <CurrencyFormat className="default-input" value={this.state.total} thousandSeparator={true} prefix="Rp " placeholder="Rp 0" onValueChange={(values) => {
                                            const { value } = values;
                                            this.setState({ total: value })
                                        }} />
                                    </div>
                                    <div className="slc-wrp">
                                        <button className="thm-btn2 btn-hitung-zakat" id="hitung_zakat_fitrah" title="" itemprop="url" style={{ textAlign: 'center', width: '100%', marginTop: '20px' }} onClick={this.hitungZakatFitrah} >Hitung</button>
                                    </div>
                                </div>
                                {/* -- end::Zakat fitrah -- */}
                            </div>
                            <div className='col-md-6'>
                                <div className='flex-bayar-zakat'>
                                    <h4 className="text-center" style={{ marginTop: '5%' }}>Jumlah Zakat</h4>
                                    <h3 className="text-center txt-total-zakat" id="jumlah_zakat_side">Rp. {this.state.total}</h3>

                                    {/* <span id="notes"></span> */}

                                    <div id="bayar_zakat_penghasilan_hitung" style={{ display: this.state.bayar_zakat_penghasilan_hitung }}>{this.state.notes}</div>

                                    <Link className="thm-btn2 btn-bayar-zakat" id="bayar_zakat" title="" itemprop="url" style={{ textAlign: 'center', textDecoration: 'none', width: '100%', marginTop: '20px', marginBottom: '20px' }} href={{ pathname: '/zakat/form_zakat', total: this.state.total, kategori: this.state.kategori }}>
                                        Bayar Zakat
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            </>
        );
    }
}

export default Index;