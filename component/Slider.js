import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e) => e.preventDefault();

const itemslider = [
    <img style={{ maxWidth: '100%', maxHeight: '100%', backgroundColor: "white" }} src="/slider_zakat1.jpeg" onDragStart={handleDragStart} role="presentation" />,
    <img style={{ maxWidth: '100%', maxHeight: '100%', backgroundColor: "white" }} src="/slider_zakat_fitrah.jpeg" onDragStart={handleDragStart} role="presentation" />,
];

const Slider = () => {
    return (
        <div className="container-alice">
            <AliceCarousel
                autoPlay
                mouseTracking
                items={itemslider} />
        </div>
    );
}

export default Slider;