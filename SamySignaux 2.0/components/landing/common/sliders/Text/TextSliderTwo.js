"use client";
import Slider from "react-slick";

export default function TextSliderTwo() {
	const settings = {
		infinite: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		autoplay: true,
		autoplaySpeed: 0,
		speed: 10000,
		cssEase: "linear",
		pauseOnHover: true,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 1400,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};
	return (
		<div className="zuzu-text-slider-section bg-gray-800">
			<div className="zuzu-text-slider">
				<Slider {...settings}>
					<div className="zuzu-text-slider-data dark">
						<div className="zuzu-text-slider-icon ">
							<img src="/images/all-img/v2/star.png" alt="" />
						</div>
						<h3>The best NFT platform of the year platform of</h3>
					</div>
					<div className="zuzu-text-slider-data dark">
						<div className="zuzu-text-slider-icon ">
							<img src="/images/all-img/v2/star.png" alt="" />
						</div>
						<h3>The best NFT platform of the year platform of</h3>
					</div>
					<div className="zuzu-text-slider-data dark">
						<div className="zuzu-text-slider-icon ">
							<img src="/images/all-img/v2/star.png" alt="" />
						</div>
						<h3>The best NFT platform of the year platform of</h3>
					</div>
				</Slider>
			</div>
		</div>
	);
}
