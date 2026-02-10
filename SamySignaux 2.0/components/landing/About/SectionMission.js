"use client";
import Link from "next/link";

export default function SectionMission({ dark }) {
	return (
		<div className={`section zuzu-section-padding ${dark && "bg-gray-500"}`}>
			<div className="container">
				<div className="row">
					<div className="col-lg-7 order-lg-2">
						<div className="zuzu-thumb wow fadeInUpX" data-wow-delay="0.10s">
							<img src=" /images/all-img/about/thumb1.png" alt="" />
						</div>
					</div>
					<div className="col-lg-5 d-flex align-items-center">
						<div className={`zuzu-default-content ${dark && "dark"}`}>
							<h5>
								<strong>Our mission</strong>
							</h5>
							<h2 className="font-black">Increase economic freedom in the world</h2>
							<p>
								Essentially, cryptocurrencies are a technological and also breakthrough that allows us
								to build a freer & more open financial system that empowers people control their work
								and property. It is the best tool to advance our mission to increase economic freedom
								worldwide
							</p>
							<div className="zuzu-btn-wrap">
								<Link href={"/contact-light"} legacyBehavior>
									<a className="zuzu-btn btn-deep-blue rounded-pill">Get in touch</a>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
