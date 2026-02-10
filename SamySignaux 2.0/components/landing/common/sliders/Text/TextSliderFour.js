"use client";
import Slider from "react-slick";

export default function TextSliderFour() {
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
		<div className="section bg-gray-500">
			<div className="zuzu-text-slider">
				<Slider {...settings}>
					<div className="zuzu-text-slider-data zuzu-text-slider-data2">
						<div className="zuzu-text-slider-icon ">
							<img src="/images/all-img/v5/start3.png" alt="" />
						</div>
						<h2>Explore, create & earn to try</h2>
					</div>
					<div className="zuzu-text-slider-data zuzu-text-slider-data2">
						<div className="zuzu-text-slider-icon ">
							<img src="/images/all-img/v5/start3.png" alt="" />
						</div>
						<h2>Explore, create & earn to try</h2>
					</div>
					<div className="zuzu-text-slider-data zuzu-text-slider-data2">
						<div className="zuzu-text-slider-icon ">
							<img src="/images/all-img/v5/start3.png" alt="" />
						</div>
						<h2>Explore, create & earn to try</h2>
					</div>
				</Slider>
			</div>
		</div>
	);
}
