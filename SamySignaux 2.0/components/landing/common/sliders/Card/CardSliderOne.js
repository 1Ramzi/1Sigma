"use client";
import Slider from "react-slick";

export default function CardSliderOne() {
	const settings = {
		infinity: true,
		centerMode: true,
		centerPadding: "180px",
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		autoplay: false,
		autoplaySpeed: 2000,
		responsive: [
			{
				breakpoint: 1499,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
					centerPadding: "100px",
				},
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 2,
					centerPadding: "70px",
				},
			},
			{
				breakpoint: 850,
				settings: {
					slidesToShow: 1,
					centerPadding: "70px",
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					centerPadding: "0",
				},
			},
		],
	};
	return (
		<div className="section bg-gray-500 zuzu-section-padding2">
			<div className="container">
				<div className="zuzu-section-title">
					<div className="zuzu-default-content dark large font-cabin">
						<h2>
							Real traders <br />
							share their journey
						</h2>
						<p>
							Join thousands of students who have transformed their understanding of the markets
							through our academy and signals.
						</p>
					</div>
				</div>
			</div>
			<div className="zuzu-testimonial-slider">
				<Slider {...settings}>
					<div className="zuzu-testimonial-card">
						<h4>Finally profitable after years</h4>
						<p>
							I tried so many signal groups, but this is different. They actually teach you WHY they are taking a trade.
							My risk management has never been better. Highly recommended!
						</p>
						<div className="zuzu-testimonial-author">
							<div className="zuzu-testimonial-author-wrap">
								<div className="zuzu-testimonial-author-thumb">
									<img
										src="
                                    /images/all-img/v1/t_1.png"
										alt=""
									/>
								</div>
								<div className="zuzu-testimonial-author-data">
									<h5>Leslie Alexander</h5>
									<span>Student Trader</span>
								</div>
							</div>
						</div>
					</div>
					<div className="zuzu-testimonial-card">
						<h4>Best community ever</h4>
						<p>
							The community support is insane. Whenever I have a question about a chart, a mentor or another student
							helps me out within minutes. No toxicity, just pure growth.
						</p>
						<div className="zuzu-testimonial-author">
							<div className="zuzu-testimonial-author-wrap">
								<div className="zuzu-testimonial-author-thumb">
									<img
										src="
                                    /images/all-img/v1/t_2.png"
										alt=""
									/>
								</div>
								<div className="zuzu-testimonial-author-data">
									<h5>Marcel Gafam</h5>
									<span>Forex Trader</span>
								</div>
							</div>
						</div>
					</div>
					<div className="zuzu-testimonial-card">
						<h4>Transparency is key</h4>
						<p>
							I love their business model. They are open about being paid by the broker, which means I get
							amazing value for free. No hidden upsells, just great education.
						</p>
						<div className="zuzu-testimonial-author">
							<div className="zuzu-testimonial-author-wrap">
								<div className="zuzu-testimonial-author-thumb">
									<img
										src="
                                    /images/all-img/v1/t_3.png"
										alt=""
									/>
								</div>
								<div className="zuzu-testimonial-author-data">
									<h5>Albert Flores</h5>
									<span>Crypto Enthusiast</span>
								</div>
							</div>
						</div>
					</div>
					<div className="zuzu-testimonial-card">
						<h4>Finally profitable after years</h4>
						<p>
							I tried so many signal groups, but this is different. They actually teach you WHY they are taking a trade.
							My risk management has never been better. Highly recommended!
						</p>
						<div className="zuzu-testimonial-author">
							<div className="zuzu-testimonial-author-wrap">
								<div className="zuzu-testimonial-author-thumb">
									<img
										src="
                                    /images/all-img/v1/t_1.png"
										alt=""
									/>
								</div>
								<div className="zuzu-testimonial-author-data">
									<h5>Leslie Alexander</h5>
									<span>Student Trader</span>
								</div>
							</div>
						</div>
					</div>
					<div className="zuzu-testimonial-card">
						<h4>Best community ever</h4>
						<p>
							The community support is insane. Whenever I have a question about a chart, a mentor or another student
							helps me out within minutes. No toxicity, just pure growth.
						</p>
						<div className="zuzu-testimonial-author">
							<div className="zuzu-testimonial-author-wrap">
								<div className="zuzu-testimonial-author-thumb">
									<img
										src="
                                    /images/all-img/v1/t_4.png"
										alt=""
									/>
								</div>
								<div className="zuzu-testimonial-author-data">
									<h5>Jenny Wilson</h5>
									<span>Full-time Trader</span>
								</div>
							</div>
						</div>
					</div>
				</Slider>
			</div>
		</div>
	);
}
