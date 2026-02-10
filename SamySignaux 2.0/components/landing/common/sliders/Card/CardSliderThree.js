"use client";
import Slider from "react-slick";
function NextArrow({ onClick }) {
	return <button className="slide-arrow next-arrow" onClick={onClick}></button>;
}

function PrevArrow({ onClick }) {
	return <button className="slide-arrow prev-arrow" onClick={onClick}></button>;
}

export default function CardSliderThree() {
	const settings = {
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		autoplay: true,
		autoplaySpeed: 2000,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
	};
	return (
		<div className="zuzu-card-slider2">
			<Slider {...settings}>
				<div className="zuzu-card-slider-item">
					<img src="/images/all-img/v4/card1.png" alt="" />
				</div>
				<div className="zuzu-card-slider-item">
					<img src="/images/all-img/v4/card2.png" alt="" />
				</div>
				<div className="zuzu-card-slider-item">
					<img src="/images/all-img/v4/card3.png" alt="" />
				</div>
			</Slider>
		</div>
	);
}


