"use client";
import Slider from "react-slick";

export default function TextSliderThree() {
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
		<div className="zuzu-text-slider-section bg-pink-400">
			<div className="zuzu-text-slider">
				<Slider {...settings}>
					<div className="zuzu-text-slider-data">
						<div className="zuzu-text-slider-icon ">
							<img src="/images/all-img/v4/star.png" alt="" />
						</div>
						<h3>Rare and extraordinary way to collect artefacts</h3>
					</div>
					<div className="zuzu-text-slider-data">
						<div className="zuzu-text-slider-icon ">
							<img src="/images/all-img/v4/star.png" alt="" />
						</div>
						<h3>Rare and extraordinary way to collect artefacts</h3>
					</div>
					<div className="zuzu-text-slider-data">
						<div className="zuzu-text-slider-icon ">
							<img src="/images/all-img/v4/star.png" alt="" />
						</div>
						<h3>Rare and extraordinary way to collect artefacts</h3>
					</div>
				</Slider>
			</div>
		</div>
	);
}
