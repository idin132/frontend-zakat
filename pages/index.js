import React from 'react'
// import Header from '../component/Header'
import Navbar from '../component/Navbar'
import Slider from '../component/Slider'
import Program from '../component/program'
import Footer from '../component/Footer'
import axios from 'axios'
import * as Endpoint from '../service/Endpoint'

const api = Endpoint.BASE_URL

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemslider: [],
      itemprogram: [],
      donasi_terkumpul_statistik: '',
    };
  }

  componentDidMount() {
    this.getStatistik();
  }

  getStatistik() {
    axios.get(api + '/api/total').then(
      result => {
        var donasi = '';
        if (result.data.jumlah === null) {
          donasi = 'Rp. 0';
        } else {
          donasi = 'Rp. ' + result.data.jumlah?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
        this.setState({ donasi_terkumpul_statistik: donasi });
      }
    );
  }

  // numberFormat = (v) => {
  //   var number_string = v.toString().replace(/^0+/, "");
  //   var number_amount = number_string.replace(/[^,\d]/g, ""),
  //     split = number_amount.split(","),
  //     sisa = split[0].length % 3,
  //     rupiah = split[0].substr(0, sisa),
  //     ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  //   // tambahkan titik jika yang di input sudah menjadi angka ribuan
  //   if (ribuan) {
  //     var separator = sisa ? "." : "";
  //     rupiah += separator + ribuan.join(".");
  //   }

  //   rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
  //   return rupiah;
  // };
  render() {
    const {
      itemslider,
      itemprogram,
      donasi_terkumpul_statistik,
    } = this.state;

    
    return (
      <>

        {/* <Header /> */}
        <Navbar/>
        <Slider items={itemslider} />

        <section className="how_help row" style={{ paddingTop: '40px', paddingBottom: '50px' }}>
            <div className="container">
              <div className="white-box info">
                <div className="col-sm-6 help-process">
                  <h2 className="head-statistik">{donasi_terkumpul_statistik}</h2>
                  <p className="desc-statistik">Donasi Terkumpul</p>
                </div>
                {/* <div className="col-sm-6 help-process">
                  <h2 className="head-statistik">{donasi_terkumpul_statistik2}</h2>
                  <p className="desc-statistik">Donatur Tergabung</p>
                </div> */}
              </div>
            </div>
          </section>

        <section style={{ background: '#e8ecf2', marginBottom: '50vh' }} className="row our_casuses">
          <div className="container">
            <div className="row sectionTitle text-center">
              <h6 className="label label-default">Program</h6>
            </div>
            <Program items={itemprogram} />
          </div>
        </section>

        <Footer />

      </>
    )
  }
}
export default Dashboard;