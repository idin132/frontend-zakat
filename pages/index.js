import React from 'react'
import Header from '../component/Header'
import Slider from '../component/Slider'
import Footer from '../component/Footer'


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemslider: []
    };
  }

  render() {
    const {
      itemslider
    } = this.state;

    return (
      <>

        <Header />
        <Slider items={itemslider}/>
        <Footer />

      </>
    )
  }
}
export default Dashboard;