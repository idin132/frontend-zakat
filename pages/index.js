import React from 'react'
// import Header from '../component/Header'
import Navbar from '../component/Navbar'
import Slider from '../component/Slider'
import Program from '../component/program'
import Footer from '../component/Footer'
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

  getStatistik() {
    axios.get(api + '/api/total').then(
      result => {
        var donasi = '';
        if (result.data.donasi.jumlah === null) {
          donasi = 'Rp. 0';
        } else {
          donasi = 'Rp. ' + result.data.donasi.jumlah.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
        this.setState({ donasi_terkumpul_statistik: donasi, donasi_terkumpul_statistik2: result.data.donatur, loading: "none" });
      }
    );
  }
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
              <div className="white-box yayasan-info">
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