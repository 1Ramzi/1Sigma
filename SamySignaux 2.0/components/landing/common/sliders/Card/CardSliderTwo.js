"use client";
import Link from "next/link";
import Slider from "react-slick";
export default function CardSliderTwo() {
	const settings = {
		infinite: true,
		slidesToShow: 6,
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
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
				},
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
				},
			},
		],
	};
	return (
		<div className="zuzu-card-slider">
			<Slider {...settings}>
				<div className="zuzu-card-wrap">
					<div className="zuzu-card-thumb">
						<img src="/images/all-img/v2/card1.png" alt="" />
					</div>
					<div className="zuzu-card-data">
						<h3>Jumping Mushroom</h3>
						<div className="zuzu-card-footer-data">
							<h4>#0833</h4>
							<Link href={"#"} legacyBehavior>
								<a className="zuzu-card-btn bg-primary-600">Exclusive</a>
							</Link>
						</div>
					</div>
				</div>
				<div className="zuzu-card-wrap">
					<div className="zuzu-card-thumb">
						<img src="/images/all-img/v2/card2.png" alt="" />
					</div>
					<div className="zuzu-card-data">
						<h3>Rainbow Unicorn</h3>
						<div className="zuzu-card-footer-data">
							<h4>#0833</h4>
							<Link href={"#"} legacyBehavior>
								<a className="zuzu-card-btn bg-success-400">Rare</a>
							</Link>
						</div>
					</div>
				</div>
				<div className="zuzu-card-wrap">
					<div className="zuzu-card-thumb">
						<img src="/images/all-img/v2/card3.png" alt="" />
					</div>
					<div className="zuzu-card-data">
						<h3>Lazy Panda</h3>
						<div className="zuzu-card-footer-data">
							<h4>#0833</h4>
							<Link href={"#"} legacyBehavior>
								<a className="zuzu-card-btn bg-success-300">common</a>
							</Link>
						</div>
					</div>
				</div>
				<div className="zuzu-card-wrap">
					<div className="zuzu-card-thumb">
						<img src="/images/all-img/v2/card4.png" alt="" />
					</div>
					<div className="zuzu-card-data">
						<h3>Colorful Mushroom</h3>
						<div className="zuzu-card-footer-data">
							<h4>#0833</h4>
							<Link href={"#"} legacyBehavior>
								<a className="zuzu-card-btn bg-primary-500">Rare</a>
							</Link>
						</div>
					</div>
				</div>
				<div className="zuzu-card-wrap">
					<div className="zuzu-card-thumb">
						<img src="/images/all-img/v2/card1.png" alt="" />
					</div>
					<div className="zuzu-card-data">
						<h3>Jumping Mushroom</h3>
						<div className="zuzu-card-footer-data">
							<h4>#0833</h4>
							<Link href={"#"} legacyBehavior>
								<a className="zuzu-card-btn bg-primary-600">Exclusive</a>
							</Link>
						</div>
					</div>
				</div>
				<div className="zuzu-card-wrap">
					<div className="zuzu-card-thumb">
						<img src="/images/all-img/v2/card2.png" alt="" />
					</div>
					<div className="zuzu-card-data">
						<h3>Rainbow Unicorn</h3>
						<div className="zuzu-card-footer-data">
							<h4>#0833</h4>
							<Link href={"#"} legacyBehavior>
								<a className="zuzu-card-btn bg-success-400">Rare</a>
							</Link>
						</div>
					</div>
				</div>
				<div className="zuzu-card-wrap">
					<div className="zuzu-card-thumb">
						<img src="/images/all-img/v2/card3.png" alt="" />
					</div>
					<div className="zuzu-card-data">
						<h3>Lazy Panda</h3>
						<div className="zuzu-card-footer-data">
							<h4>#0833</h4>
							<Link href={"#"} legacyBehavior>
								<a className="zuzu-card-btn bg-success-300">common</a>
							</Link>
						</div>
					</div>
				</div>
				<div className="zuzu-card-wrap">
					<div className="zuzu-card-thumb">
						<img src="/images/all-img/v2/card4.png" alt="" />
					</div>
					<div className="zuzu-card-data">
						<h3>Colorful Mushroom</h3>
						<div className="zuzu-card-footer-data">
							<h4>#0833</h4>
							<Link href={"#"} legacyBehavior>
								<a className="zuzu-card-btn bg-primary-500">Rare</a>
							</Link>
						</div>
					</div>
				</div>
			</Slider>
		</div>
	);
}
