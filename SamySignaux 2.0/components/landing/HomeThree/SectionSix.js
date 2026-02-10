"use client";
import Link from "next/link";

export default function SectionSix() {
	return (
		<div className="bg-gray-500 position-relative">
			<div className="container">
				<div className="zuzu-section-title">
					<div className="zuzu-default-content sm dark font-syne">
						<h2>Globally recognized and trusted blockchain technology</h2>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-6">
						<div className="zuzu-map-thumb">
							<img src="/images/all-img/v3/map.png" alt="" />
							<div className="zuzu-t-user t-user1">
								<img src="/images/all-img/v3/t_1.png" alt="" />
							</div>
							<div className="zuzu-t-user t-user2">
								<img src="/images/all-img/v3/t_2.png" alt="" />
							</div>
							<div className="zuzu-t-user t-user3">
								<img src="/images/all-img/v3/t_3.png" alt="" />
							</div>
							<div className="zuzu-t-user t-user4">
								<img src="/images/all-img/v3/t_4.png" alt="" />
							</div>
						</div>
					</div>
					<div className="col-lg-5 offset-lg-1">
						<div className="zuzu-testimonial-content-v7">
							<div className="zuzu-testimonial-rating">
								<ul>
									<li>
										<img src="/images/svg/star3.svg" alt="" />
									</li>
									<li>
										<img src="/images/svg/star3.svg" alt="" />
									</li>
									<li>
										<img src="/images/svg/star3.svg" alt="" />
									</li>
									<li>
										<img src="/images/svg/star3.svg" alt="" />
									</li>
									<li>
										<img src="/images/svg/star3.svg" alt="" />
									</li>
								</ul>
							</div>
							<p>
								“Blockchain wallet is my first choice because their work team is respectable people and
								on the other hand it has always been trusted and safe for my funds.
							</p>
							<p>
								And two days ago I needed help from the support team aware in some of the things related
								to the blockchain.”
							</p>
							<h5>Karen Lynn</h5>
							<span>Founder @ Company</span>
						</div>
					</div>
				</div>
				<div className="zuzu-center-btn">
					<Link href="/contact-light" legacyBehavior>
						<a className="zuzu-btn active gradient text-white">View All Reviews</a>
					</Link>
				</div>
			</div>
			<div className="zuzu-hero-box box3">
				<img src="/images/all-img/v3/box.png" alt="" />
			</div>
			<div className="zuzu-hero-box box4">
				<img src="/images/all-img/v3/box.png" alt="" />
			</div>
		</div>
	);
}
