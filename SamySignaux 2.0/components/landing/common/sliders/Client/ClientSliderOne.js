"use client";
import Slider from "react-slick";

export default function ClientSliderOne() {
	const settings = {
		infinite: true,
		slidesToShow: 5,
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
				breakpoint: 1199,
				settings: {
					slidesToShow: 4,
				},
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
				},
			},
		],
	};
	return (
		<div className="zuzu-client-section bg-gray-500">
			<div className="container">
				<div className="zuzu-sm-title dark">
					<h5>Partner with top 100k+ companies in the world</h5>
				</div>
				<div className="zuzu-client-slider">
					<Slider {...settings}>
						<div className="zuzu-client-slider-item">
							<img src="/images/all-img/v5/client1.png" alt="" />
						</div>
						<div className="zuzu-client-slider-item">
							<img src="/images/all-img/v5/client2.png" alt="" />
						</div>
						<div className="zuzu-client-slider-item">
							<img src="/images/all-img/v5/client3.png" alt="" />
						</div>
						<div className="zuzu-client-slider-item">
							<img src="/images/all-img/v5/client4.png" alt="" />
						</div>
						<div className="zuzu-client-slider-item">
							<img src="/images/all-img/v5/client5.png" alt="" />
						</div>
						<div className="zuzu-client-slider-item">
							<img src="/images/all-img/v5/client1.png" alt="" />
						</div>
						<div className="zuzu-client-slider-item">
							<img src="/images/all-img/v5/client2.png" alt="" />
						</div>
						<div className="zuzu-client-slider-item">
							<img src="/images/all-img/v5/client3.png" alt="" />
						</div>
						<div className="zuzu-client-slider-item">
							<img src="/images/all-img/v5/client4.png" alt="" />
						</div>
						<div className="zuzu-client-slider-item">
							<img src="/images/all-img/v5/client5.png" alt="" />
						</div>
					</Slider>
				</div>
			</div>
		</div>
	);
}
