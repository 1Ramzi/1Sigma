"use client";
import Link from "next/link";

export default function SectionOne() {
	return (
		<div className="section bg-gray-500">
			<div className="container">
				<div className="row">
					<div className="col-lg-6">
						<div className="zuzu-thumb wow fadeInUpX" data-wow-delay="0.2s">
							<img src="/images/all-img/v5/thumb1.png" alt="" />
						</div>
					</div>
					<div className="col-lg-6 d-flex align-items-center">
						<div className="zuzu-default-content dark font-grotesk margin_left">
							<h5>
								<span>Realization of unexpected expectations</span>
							</h5>
							<h2>Turn your imagination into reality in an instant</h2>
							<p>
								With thousands of virtual experiences and communities, you'll never run out of places to
								explore and people to meet. Music clubs, roleplaying communities, virtual cinemas &
								more.
							</p>
							<p>
								Zuzu will provide an unprecedented VR experience for allows users to buy land inside the
								world, do more exciting activities
							</p>
							<div className="zuzu-btn-wrap">
								<Link href={"/contact-light"} legacyBehavior>
									<a className="zuzu-btn btn-deep-pink">Discover More</a>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
