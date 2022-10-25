import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e) => e.preventDefault();

const itemprogram = [
    <div style={{ maxWidth: '50vh' }} className="item-program-home">
        <div style={{display: 'flex'}} className="images_row row m0">
            <img style={{ maxWidth: '100%', maxHeight: '100%', backgroundColor: "white" }} src="/slider_zakat1.jpeg" onDragStart={handleDragStart} role="presentation" alt="" />

        </div>
        <div className="cause_excepts row m0">
            <h4 className="cuase_title">
                <p
                    className="title-card"
                    style={{ marginTop: "20px", color: "#65FFDC" }}
                >
                    program
                </p>
            </h4>
        </div>
        <div className="images_row row m0">
            <img style={{ maxWidth: '100%', maxHeight: '100%', backgroundColor: "white" }} src="/slider_zakat1.jpeg" onDragStart={handleDragStart} role="presentation" alt="" />

        </div>
        <div className="cause_excepts row m0">
            <h4 className="cuase_title">
                <p
                    className="title-card"
                    style={{ marginTop: "20px", color: "#65FFDC" }}
                >
                    program
                </p>
            </h4>
        </div>
    </div>
];

const Program = () => {
    return (
        <div className="container-alice">
            <AliceCarousel
                autoPlay
                mouseTracking
                items={itemprogram} />
        </div>
    );
}

export default Program;