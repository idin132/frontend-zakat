import React from 'react'
// import Header from '../component/Header'
import Navbar from '../component/Navbar'
import Slider from '../component/Slider'
import Program from '../component/program'
import Footer from '../component/Footer'


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemslider: [],
      itemprogram: [],
    };
  }

  render() {
    const {
      itemslider,
      itemprogram,
    } = this.state;

    return (
      <>

        {/* <Header /> */}
        <Navbar/>
        <Slider items={itemslider} />

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