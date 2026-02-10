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
							Crypto card users <br />
							share their experiences
						</h2>
						<p>
							5% of American adults, an estimated 13 million people, currently have a credit card that
							allows them to earn cryptocurrency through eligible.
						</p>
					</div>
				</div>
			</div>
			<div className="zuzu-testimonial-slider">
				<Slider {...settings}>
					<div className="zuzu-testimonial-card">
						<h4>Great experience and great cashback</h4>
						<p>
							Great experience with it so far, nice app to use and some really good return rates on your
							crypto. I've been using the card for about a month now and I’m definitely recommend to
							crypto beginners like me!
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
									<span>Head of finance @ company</span>
								</div>
							</div>
						</div>
					</div>
					<div className="zuzu-testimonial-card">
						<h4>Best crypto-wallet I've ever used. Love it</h4>
						<p>
							Crypto wallet with a cool credit card for all purposes without fees on the contrary, Zuzu
							crypto card on your mobile phone top for free transfers! Tried a few crypto exchanges and
							wallets.
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
									<span>Lead accountant @ XYZ.com</span>
								</div>
							</div>
						</div>
					</div>
					<div className="zuzu-testimonial-card">
						<h4>Best exchange for crypto currency I’ve…</h4>
						<p>
							The best crypto card provider out there and with cro about to flip bitcoin and be the king
							this is new best crypto out there on the planet. better now with all the updates and the
							debit card is great too!
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
									<span>Investor @ company </span>
								</div>
							</div>
						</div>
					</div>
					<div className="zuzu-testimonial-card">
						<h4>Great experience and great cashback</h4>
						<p>
							Great experience with it so far, nice app to use and some really good return rates on your
							crypto. I've been using the card for about a month now and I’m definitely recommend to
							crypto beginners like me!
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
									<span>Head of finance @ company</span>
								</div>
							</div>
						</div>
					</div>
					<div className="zuzu-testimonial-card">
						<h4>Best crypto-wallet I've ever used. Love it</h4>
						<p>
							Crypto wallet with a cool credit card for all purposes without fees on the contrary, Zuzu
							crypto card on your mobile phone top for free transfers! Tried a few crypto exchanges and
							wallets.
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
									<span>Lead accountant @ XYZ.com</span>
								</div>
							</div>
						</div>
					</div>
				</Slider>
			</div>
		</div>
	);
}
