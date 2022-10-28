import React from "react";
import Link from "next/link";
import axios from "axios";
import Header from '../../component/Header2';
import CurrencyFormat from "react-currency-format";
import * as Endpoint from "../../service/Endpoint";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import Navbar from "../../component/Navbar";

const api = Endpoint.BASE_URL;
const backend = Endpoint.BASE_URL_WEB;
const key = Endpoint.KEY_YAYASAN;

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            kategori: "",
            total: "",
            nama_lengkap: "",
            no_handphone: "",
            email: "",

            btn_pilih: "block",
            btn_ganti: "none",
            selected_method: "none",

            vendor: "",
            type: "",
            method: "",
            no_rek: "",
            img_src: "",
            label: "",

            nama_bank: "",
            no_rekening_show: "",

            invoice: "",
            moota_vendor: "",
            nominal: "",
            moota_bank: "",

            categories: [],
            category_zakat_data: [],
            metode_pembayaran: "payment-method-hide",
            notif_pembayaran: "payment-method-hide",

            btn_text: "Lanjutkan Pembayaran",
            btn_disable: false,

            // Variable for Biaya Admin
            is_percent: false,
            percent_admin: 0,
            text_biaya_admin: 0,
            biaya_admin: 0,
            jenis_biaya_admin: 0,
            biaya_admin_txt: "",
            checkBiayaAdmin: false,
        };
        this.showMethodModal = this.showMethodModal.bind(this);
        this.closeMethodModal = this.closeMethodModal.bind(this);
        this.closeNotifModal = this.closeNotifModal.bind(this);

        this.handleKategoriChange = this.handleKategoriChange.bind(this);
        this.handleJumlahInput = this.handleJumlahInput.bind(this);
        this.handleNamaInput = this.handleNamaInput.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handleNoHandphoneInput = this.handleNoHandphoneInput.bind(this);

        this.lanjutkanPembayaranZakat = this.lanjutkanPembayaranZakat.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        // Check is_biaya_admin
        if (
            sessionStorage.getItem("isAdmin") === "null" ||
            sessionStorage.getItem("isAdmin") === 0 ||
            sessionStorage.getItem("isAdmin") === "0"
        ) {
            this.setState({ checkBiayaAdmin: true });
        } else {
            this.setState({ checkBiayaAdmin: false });
        }

        this.setState({
            // total: document.getElementById("total").value.replace(".", ""),
            // kategori: document.getElementById("kategori").value,
        });

        axios.get(api + "/api/kategori").then((res) => {
            this.setState({ category_zakat_data: res.data.data });
        });

        axios.get(api + "/api/payment_vendors/categories").then((res) => {
            this.setState({ categories: res.data.data });
        });
    }

    handleKategoriChange(event) {
        this.setState({ kategori: event.target.value });
    }

    handleJumlahInput(event) {
        this.setState({ total: event.target.value });
    }

    handleNamaInput(event) {
        this.setState({ nama_lengkap: event.target.value });
    }

    handleNoHandphoneInput(event) {
        this.setState({ no_handphone: event.target.value });
    }

    handleEmailInput(event) {
        this.setState({ email: event.target.value });
    }

    showMethodModal() {
        this.setState({ metode_pembayaran: "payment-method-active" });
    }

    closeMethodModal() {
        this.setState({ metode_pembayaran: "payment-method-hide" });
    }

    closeNotifModal() {
        this.setState({ notif_pembayaran: "payment-method-hide" });
    }

    callbackVendor = (
        dvendor,
        dtype,
        dmethod,
        dno_rek,
        dimg_src,
        dlabel,
        dbtn_payment_method,
        dselected_method,
        dbtn_ganti,
        modal,
        biayaAdmin,
        jenisBiayaAdmin
    ) => {
        if (
            biayaAdmin
                .toLocaleString(navigator.language, { minimumFractionDigits: 0 })
                .includes(".")
        ) {
            biayaAdmin.replace(",", ".");
        }

        var totalDonasi = "";
        if (
            sessionStorage.getItem("isAdmin") === 0 ||
            sessionStorage.getItem("isAdmin") === "0" ||
            sessionStorage.getItem("isAdmin") === "null"
        ) {
            if (jenisBiayaAdmin === "1" || jenisBiayaAdmin === 1) {
                let percent = Number(this.state.total) * Number(biayaAdmin / 100);
                totalDonasi = Number(this.state.total) - Number(percent);
                this.setState({
                    is_percent: true,
                    percent_admin: "Rp. " + this.currencyFormat(percent),
                });
            } else {
                totalDonasi = Number(this.state.total) - Number(biayaAdmin);
                this.setState({ is_percent: false });
            }
        }

        if (jenisBiayaAdmin === "1" || jenisBiayaAdmin === 1) {
            this.setState({ biaya_admin_txt: biayaAdmin + "%" });
        } else {
            this.setState({
                biaya_admin_txt: "Rp. " + this.currencyFormat(biayaAdmin),
            });
        }

        this.setState({
            vendor: dvendor,
            type: dtype,
            method: dmethod,
            no_rek: dno_rek,
            img_src: dimg_src,
            label: dlabel,
            btn_pilih: dbtn_payment_method,
            selected_method: dselected_method,
            btn_ganti: dbtn_ganti,
            metode_pembayaran: modal,
            biaya_admin: biayaAdmin,
            jenis_biaya_admin: jenisBiayaAdmin,
            text_biaya_admin: "Rp. " + this.currencyFormat(totalDonasi),
        });
    };

    commitZakat(event) {
        if (!event.detail || event.detail == 1) {
            document.getElementById("btnZakat").disabled = true;
            this.lanjutkanPembayaranZakat();
        }
    }

    currencyFormat = (value) => {
        return Number(value)
            .toLocaleString(navigator.language, { minimumFractionDigits: 0 })
            .replace(/\,/g, ".");
    };

    lanjutkanPembayaranZakat() {
        let biayaAdmin = 0;

        if (
            sessionStorage.getItem("isAdmin") === 0 ||
            sessionStorage.getItem("isAdmin") === "null" ||
            sessionStorage.getItem("isAdmin") === "0"
        ) {
            if (
                this.state.jenis_biaya_admin === "1" ||
                this.state.jenis_biaya_admin === 1
            ) {
                biayaAdmin = Number(this.state.total);
            } else {
                biayaAdmin = Number(this.state.total);
            }
        } else {
            if (
                this.state.jenis_biaya_admin === "1" ||
                this.state.jenis_biaya_admin === 1
            ) {
                let percent =
                    Number(this.state.total) * Number(this.state.biaya_admin / 100);
                biayaAdmin =
                    Number(this.state.total.replace(".", "")) + Number(percent);
            } else {
                biayaAdmin = Number(this.state.biaya_admin) + Number(this.state.total);
            }
        }

        this.setState({ btn_text: "", btn_disable: true });
        const category_id = this.state.kategori;
        const jumlah_zakat = biayaAdmin;
        const nama_lengkap = this.state.nama_lengkap;
        const no_handphone = this.state.no_handphone;
        const email = this.state.email;
        const method = this.state.method;
        const vendor = this.state.vendor;
        const payment_type = this.state.type;
        const no_rekening = this.state.no_rek;
        var atps = email.indexOf("@");
        var dots = email.lastIndexOf(".");
        var validasiAngka = /^[0-9]+$/;
        if (category_id === "") {
            alert("Kategori Harus di Isi");
            this.setState({ btn_text: "Lanjutkan Pembayaran", btn_disable: false });
            document.getElementById("btnZakat").disabled = false;
        } else if (jumlah_zakat === "") {
            // alert("Jumlah Zakat harus di Isi");
            // this.setState({ btn_text: "Lanjutkan Pembayaran", btn_disable: false });
            // document.getElementById("btnZakat").disabled = false;
        } else if (nama_lengkap === "") {
            alert("Nama Lengkap Harus di Isi");
            this.setState({ btn_text: "Lanjutkan Pembayaran", btn_disable: false });
            document.getElementById("btnZakat").disabled = false;
        } else if (
            no_handphone.match(validasiAngka) === null ||
            no_handphone === ""
        ) {
            alert("No Handphone Harus di Isi");
            this.setState({ btn_text: "Lanjutkan Pembayaran", btn_disable: false });
            document.getElementById("btnZakat").disabled = false;
        } else if (atps < 1 || dots < atps + 2 || dots + 2 >= email.length) {
            alert("Alamat email tidak valid.");
            this.setState({ btn_text: "Lanjutkan Pembayaran", btn_disable: false });
            document.getElementById("btnZakat").disabled = false;
        } else if (method === "") {
            alert("Anda Belum Memilih Metode Pembayaran ");
            this.setState({ btn_text: "Lanjutkan Pembayaran", btn_disable: false });
            document.getElementById("btnZakat").disabled = false;
        } else {
            trackPromise(
                axios
                    .post(api + "/api/snap-token-midtrans-zakat", {
                        jumlah_zakat: jumlah_zakat,
                        nama_produk: "Penghasilan",
                        nama: nama_lengkap,
                        email: email,
                        no_telp: no_handphone,
                        user_id: 1,
                        vendor: vendor,
                        payment_type: payment_type,
                        payment_method: method,
                        phone: no_handphone,
                        category_id: category_id,
                        device: "WEB",
                        key_yayasan: Endpoint.KEY_YAYASAN,
                        no_rekening: no_rekening,
                    })
                    .then((res) => {
                        if (payment_type === "manual_transfer") {
                            let nominal = res.data.moota.nominal
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                            this.setState({
                                nama_bank: res.data.moota.nama_bank,
                                no_rekening_show: res.data.moota.no_rekening,
                                notif_pembayaran: "payment-method-active",
                                invoice: res.data.moota.no_invoice,
                                moota_vendor: res.data.moota.vendor,
                                nominal: nominal,
                                moota_bank: res.data.moota.moota_bank,
                                btn_text: "Lanjutkan Pembayaran",
                                btn_disable: false,
                            });
                            document.getElementById("btnZakat").disabled = false;
                        } else {
                            window.snap.pay(res.data.snap_token, {
                                onSuccess: function (result) {
                                    axios
                                        .post(api + "/api/update-status-donasi", {
                                            params: {
                                                id: result.order_id,
                                                status: result.transaction_status,
                                                payment_method: result.payment_method,
                                                snap_token: res.snap_token,
                                            },
                                        })
                                        .then((res) => {
                                            window.location.href = "/notif-wait";
                                        });
                                },
                                onPending: function () {
                                    window.location.href = "/notif-wait";
                                },
                                onError: function () {
                                    alert("Transaksi Dibatalkan");
                                    document.getElementById("btnZakat").disabled = false;
                                },
                                onClose: function () {
                                    axios
                                        .post(api + "/api/delete-snap-token-midtrans", {
                                            params: {
                                                key_yayasan: Endpoint.KEY_YAYASAN,
                                                iDtoken: res.data.snap_token,
                                                status: 1,
                                            },
                                        })
                                        .then((res) => {
                                            window.location.reload();
                                            document.getElementById("btnZakat").disabled = false;
                                        });
                                },
                            });
                            this.setState({
                                btn_text: "Lanjutkan Pembayaran",
                                btn_disable: false,
                            });
                        }
                    })
            );
        }
    }

    confirmPay() {
        if (this.state.moota_vendor === "moota") {
            axios
                .post(api + "/api/moota/mutation/by-amount", {
                    params: {
                        bank_id: this.state.moota_bank,
                        amount: this.state.nominal,
                        type: "Qurban",
                    },
                })
                .then((res) => {
                    alert(res.data.message);
                });
        } else {
            axios
                .get(api + "/api/confirm-pay-zakat", {
                    params: {
                        no_invoice: this.state.invoice,
                    },
                })
                .then((res) => {
                    alert("Silahkan Lakukan Konfirmasi Pembayaran !");
                    this.setState({ notif_pembayaran: "payment-method-hide" });

                    window.location.href =
                        "/zakat/confirm/" + res.data.confirm.snap_token;
                });
        }
    }

    render() {
        return (
            <>
                <Navbar/>
                {/* <Index /> */}

                <section>
                    <div className="row">
                        <div className="col-md-6">
                            <h4 className="sc_donations_title sc_item_title">
                                Purchase Zakat
                            </h4>
                            <div className="slc-wrp">
                                <label>Kategori</label>
                                <select
                                    className="form-control default-input"
                                    name="category_id"
                                    id="category_id"
                                    onChange={this.handleKategoriChange}
                                >
                                    <option value="" disabled="">
                                        - Kategori -
                                    </option>
                                    {this.state.category_zakat_data.map((val) => {
                                        return (
                                            <option
                                                value={val.id}
                                                selected={val.kategori_zakat == this.state.kategori}
                                            >
                                                {val.kategori_zakat}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div className="slc-wrp">
                                <label>Jumlah Zakat</label>
                                <CurrencyFormat
                                    className="default-input"
                                    value={this.state.total}
                                    prefix="Rp "
                                    placeholder="Rp 0"
                                    thousandSeparator={true}
                                    onValueChange={(values) => {
                                        const { value } = values;
                                        this.setState({ total: value });

                                        setTimeout(() => {
                                            var totalDonasi = "";
                                            if (
                                                sessionStorage.getItem("isAdmin") === 0 ||
                                                sessionStorage.getItem("isAdmin") === "0" ||
                                                sessionStorage.getItem("isAdmin") === "null"
                                            ) {
                                                if (
                                                    this.state.jenis_biaya_admin === "1" ||
                                                    this.state.jenis_biaya_admin === 1
                                                ) {
                                                    let percent =
                                                        Number(this.state.total) *
                                                        Number(this.state.biaya_admin / 100);
                                                    totalDonasi =
                                                        Number(this.state.total) - Number(percent);
                                                    this.setState({
                                                        text_biaya_admin:
                                                            "Rp. " + this.currencyFormat(totalDonasi),
                                                    });
                                                } else {
                                                    totalDonasi =
                                                        Number(this.state.total) -
                                                        Number(this.state.biaya_admin);
                                                    this.setState({
                                                        text_biaya_admin:
                                                            "Rp. " + this.currencyFormat(totalDonasi),
                                                    });
                                                }
                                            }
                                        }, 1000);
                                    }}
                                />
                            </div>

                            <div className="slc-wrp">
                                <label>Metode Pembayaran</label>
                                <button
                                    type="button"
                                    id="btn-payment-method"
                                    className="thm-btn2 btn-hitung-zakat"
                                    style={{
                                        width: "100%",
                                        padding: "8px",
                                        borderRadius: "5px",
                                        display: this.state.btn_pilih,
                                    }}
                                    onClick={this.showMethodModal}
                                >
                                    Pilih Metode Pembayaran
                                </button>
                                <input
                                    name="payment_vendor"
                                    id="payment_vendor"
                                    type="hidden"
                                    value={this.state.vendor}
                                />
                                <input
                                    name="payment_type"
                                    id="payment_type"
                                    type="hidden"
                                    value={this.state.type}
                                />
                                <input
                                    name="payment_method"
                                    id="payment_method"
                                    type="hidden"
                                    value={this.state.method}
                                />
                                <input
                                    type="hidden"
                                    id="no_rekening"
                                    name="no_rekening"
                                    value={this.state.no_rek}
                                />
                                <div
                                    id="selected-method"
                                    style={{ display: "flex", width: "100%" }}
                                >
                                    <div style={{ width: "50%" }} className="flex-method">
                                        <img
                                            src={this.state.img_src}
                                            alt=""
                                            id="selected-method-img"
                                            style={{
                                                maxWidth: "100%",
                                                maxHeight: "40px",
                                                marginRight: "10px",
                                            }}
                                        />
                                        <span
                                            style={{ fontSize: "14px" }}
                                            id="selected-method-label"
                                        >
                                            {this.state.label}
                                        </span>
                                    </div>
                                    <div style={{ width: "50%" }}>
                                        <button
                                            type="button"
                                            id="btn-payment-method2"
                                            className="thm-btn2 btn-hitung-zakat"
                                            style={{
                                                width: "50%",
                                                padding: "5px",
                                                borderRadius: "5px",
                                                textAlign: "center",
                                                float: "right",
                                                display: this.state.btn_ganti,
                                            }}
                                            onClick={this.showMethodModal}
                                        >
                                            Ganti
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="slc-wrp">
                                <label>Nama Lengkap</label>
                                <input
                                    type="text"
                                    name="nama_lengkap"
                                    className="form-control default-input"
                                    id="nama_lengkap"
                                    placeholder="Nama Lengkap"
                                    value={this.state.nama_lengkap}
                                    onChange={this.handleNamaInput}
                                />
                            </div>

                            <div className="slc-wrp">
                                <label>No Handphone</label>
                                <input
                                    type="text"
                                    name="no_handphone"
                                    className="form-control default-input"
                                    id="no_handphone"
                                    placeholder="No Handphone"
                                    value={this.state.no_handphone}
                                    onChange={this.handleNoHandphoneInput}
                                />
                            </div>

                            <div className="slc-wrp">
                                <label>Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    className="form-control default-input"
                                    id="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.handleEmailInput}
                                />
                            </div>

                            <br />
                            <div style={{ display: this.state.selected_method }}>
                                {this.state.checkBiayaAdmin ? (
                                    this.state.is_percent ? (
                                        <span
                                            style={{
                                                fontSize: "12px",
                                                textTransform: "none",
                                                color: "gray",
                                            }}
                                        >
                                            Note : Biaya admin sebesar&nbsp;
                                            <b>
                                                {this.state.biaya_admin_txt} ({this.state.percent_admin}
                                                ){" "}
                                            </b>
                                            akan ditanggung yayasan, dan donasi yang disalurkan akan
                                            dikurangi sebesar biaya admin. Donasi disalurkan sejumlah{" "}
                                            <b>{this.state.text_biaya_admin}</b>
                                        </span>
                                    ) : (
                                        <span
                                            style={{
                                                fontSize: "12px",
                                                textTransform: "none",
                                                color: "gray",
                                            }}
                                        >
                                            Note : Biaya admin sebesar{" "}
                                            <b>{this.state.biaya_admin_txt} </b>
                                            akan ditanggung yayasan, dan donasi yang disalurkan akan
                                            dikurangi sebesar biaya admin. Donasi disalurkan sejumlah{" "}
                                            <b>{this.state.text_biaya_admin}</b>
                                        </span>
                                    )
                                ) : (
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            textTransform: "none",
                                            color: "gray",
                                        }}
                                    >
                                        Note : Biaya admin sebesar{" "}
                                        <b>{this.state.biaya_admin_txt} </b>
                                        akan ditanggung donatur, dan total donasi akan ditambahkan
                                        sebesar biaya admin
                                    </span>
                                )}
                            </div>
                            <br />

                            <div className="slc-wrp">
                                <button
                                    type="button"
                                    className="thm-btn2 btn-bayar-zakat"
                                    id="btnZakat"
                                    title=""
                                    itemprop="url"
                                    style={{
                                        textAlign: "center",
                                        width: "100%",
                                        marginTop: "20px",
                                        display: this.state.btn_disable,
                                    }}
                                    onClick={this.lanjutkanPembayaranZakat}
                                >
                                    {this.state.btn_text}
                                    {/* <LoadingIndicator /> */}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <div
                    id="metode-pembayaran"
                    className={"popup " + this.state.metode_pembayaran}
                >
                    <div className="popup-content">
                        <div className="head-pop" style={{ backgroundColor: "#f18404" }}>
                            <div className="title-pop">
                                <p style={{ color: "white" }}>Metode Pembayaran</p>
                            </div>
                            <span
                                id="mthd-close"
                                className="tutup"
                                onClick={this.closeMethodModal}
                            >
                                &times;
                            </span>
                        </div>
                        <div className="payment-scroller" id="payment-popup-body">
                            {this.state.categories.map((val) => {
                                return (
                                    <List
                                        id={val.id}
                                        category={val.category}
                                        callbackVendor={this.callbackVendor}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div> */}

                {/* <div
                    id="notif-pembayaran"
                    className={"popup " + this.state.notif_pembayaran}
                >
                    <div className="popup-content-notif">
                        <div className="head-pop" style={{ backgroundColor: "#f18404" }}>
                            <div className="title-pop">
                                <p id="title_popup" style={{ color: "white" }}>
                                    Transfer {this.state.nama_bank}
                                </p>
                            </div>
                            <span
                                id="simple-pop-close"
                                className="tutup"
                                onClick={this.closeNotifModal}
                            >
                                &times;
                            </span>
                        </div>
                        <div
                            className="payment-scroller"
                            id="payment-popup-body-notif"
                            style={{ padding: "10px" }}
                        >
                            <div
                                className="text-color-popup"
                                style={{
                                    display: "flex",
                                    borderRadius: "5px",
                                    fontSize: "15px",
                                    padding: "5px",
                                    lineHeight: "40px",
                                    textAlign: "center",
                                    backgroundColor: "#f18404",
                                }}
                            >
                                <span style={{ width: "20%" }}>
                                    <img
                                        className="logo-payment"
                                        id="moota-logo"
                                        src={this.state.img_src}
                                        alt=""
                                    />
                                </span>
                                <span
                                    id="no_rekening_show"
                                    style={{ width: "60%", textAlign: "center" }}
                                >
                                    {this.state.no_rekening_show}
                                </span>
                                <span id="salin" style={{ width: "20%", textAlign: "right" }}>
                                    <a
                                        href="javascript:0;"
                                        style={{ color: "white" }}
                                        onclick="copyToClip('no_rekening_show')"
                                    >
                                        Salin
                                    </a>
                                </span>
                            </div>
                            <div id="intruksi-pembayaran">
                                <center>
                                    <br />
                                    <span>
                                        <b>Intruksi Pembayaran</b>
                                    </span>
                                    <br />
                                    <span>Nominal yang harus anda bayar :</span>
                                    <br />
                                    <span style={{ fontSize: "18px" }}>
                                        <b>Rp. {this.state.nominal}</b>
                                    </span>
                                    <br />
                                    <span>
                                        *Harap selesaikan pembayaran sesuai dengan nominal yang
                                        tertera untuk memudahkan pengecekan!
                                    </span>
                                    <br />
                                    <span>
                                        *Sesuaikan nominal sampai 3 digit terakhir! (Kelebihan dari
                                        nominal akan didonasikan juga)
                                    </span>
                                    <br />
                                    <span>*Lakukan pembayaran maksimal 1x24 jam!</span>
                                    <br />
                                    <span>
                                        *Silahkan akses link berikut untuk melihat perkembangan
                                        donasi anda! (Link dikirim juga ke email anda)
                                    </span>
                                    <br />
                                    <span>
                                        *Tekan tombol dibawah juka sudah melakukan pembayaran!
                                    </span>
                                    <br />
                                    <span>
                                        <button
                                            className="post_readmore"
                                            style={{
                                                padding: "5px",
                                                width: "100%",
                                                borderRadius: "5px",
                                            }}
                                            onClick={() =>
                                                this.confirmPay(
                                                    this.state.invoice,
                                                    this.state.moota_vendor,
                                                    this.state.nominal,
                                                    this.state.moota_bank
                                                )
                                            }
                                        >
                                            <span className="post_readmore_label">
                                                Saya Sudah Melakukan Transfer
                                            </span>
                                        </button>
                                    </span>
                                </center>
                            </div>
                        </div>
                    </div>
                </div> */}
            </>
        );
    }
}

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vendors: [],
        };
    }

    componentDidMount() {
        axios
            .get(api + "/api/payment_vendors/" + this.props.id + "?yayasan=" + key)
            .then((res) => {
                this.setState({ vendors: res.data.data });
            });
    }

    dataCallback = (
        dvendor,
        dtype,
        dmethod,
        dno_rek,
        dimg_src,
        dlabel,
        dbiaya,
        djenisBiaya
    ) => {
        this.props.callbackVendor(
            dvendor,
            dtype,
            dmethod,
            dno_rek,
            dimg_src,
            dlabel,
            "none",
            "block",
            "flex",
            "payment-method-hide",
            dbiaya,
            djenisBiaya
        );
    };

    render() {
        var show_title = false;
        var title = <p className="category-title">{this.props.category}</p>;
        try {
            this.state.vendors.forEach((element) => {
                if (element.bank_rekening_moota === null) {
                    show_title = true;
                } else {
                    var used_for = element.bank_rekening_moota.used_for.split(",");
                    for (var i = 0; i < used_for.length; i++) {
                        if (used_for[i].includes("Donasi")) {
                            show_title = true;
                        } else if (used_for[i].includes("Qurban")) {
                            show_title = true;
                        } else if (used_for[i].includes("Zakat")) {
                            show_title = true;
                        } else {
                        }
                    }
                }
            });
        } catch (e) { }

        if (this.state.vendors.length > 0 && show_title) {
            title = <p className="category-title">{this.props.category}</p>;
        } else {
            title = null;
        }
        return (
            <>
                {title}
                {this.state.vendors.map((val) => {
                    var used_for = "";
                    if (val.bank_rekening_moota) {
                        used_for = val.bank_rekening_moota.used_for.split(",");
                    }
                    if (val.bank_rekening_moota === null) {
                        show_title = true;
                    } else {
                        for (var i = 0; i < used_for.length; i++) {
                            if (used_for[i].includes("Donasi")) {
                                show_title = true;
                            } else if (used_for[i].includes("Qurban")) {
                                show_title = true;
                            } else if (used_for[i].includes("Zakat")) {
                                show_title = true;
                            } else {
                            }
                        }
                    }

                    let vendor,
                        type,
                        method,
                        category,
                        label,
                        no_rek,
                        img_src,
                        biaya,
                        jenisBiaya;

                    biaya = val.biaya_admin;
                    jenisBiaya = val.jenis_biaya_admin;

                    if (
                        val.bank_rekening_moota === null ||
                        (val.bank_rekening_moota && show_title)
                    ) {
                        vendor = val.vendor;
                        type = val.payment_type;
                        method =
                            vendor === "midtrans" ? val.midtrans_code : val.xendit_code;

                        if (method === null) {
                            method = val.moota_bank_id;
                        }

                        category = "";
                        if (val.payment_type === "virtual_acccount") {
                            category = "Virtual Account";
                        }
                        if (val.payment_type === "manual_transfer") {
                            category = "Transfer";
                        }
                        label = category + val.payment_name;

                        no_rek = "";
                        if (val.bank_rekening_moota) {
                            no_rek = val.bank_rekening_moota.no_rekening;
                        }
                        img_src = backend + "/api/metode/icon/" + val.id;
                    }
                    return (
                        <div
                            className="item-method"
                            onClick={() =>
                                this.dataCallback(
                                    vendor,
                                    type,
                                    method,
                                    no_rek,
                                    img_src,
                                    label,
                                    biaya,
                                    jenisBiaya
                                )
                            }
                        >
                            <img className="logo-payment" src={img_src} alt="" />
                            <p className="title-payment">{val.payment_name}</p>
                        </div>
                    );
                })}
            </>
        );
    }
}

export default Form;