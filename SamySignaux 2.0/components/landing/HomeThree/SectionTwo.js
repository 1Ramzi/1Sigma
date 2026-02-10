"use client";
import Link from "next/link";

export default function SectionTwo() {
	return (
		<div className="section bg-gray-500">
			<div className="container">
				<div className="row">
					<div className="col-lg-6">
						<div className="zuzu-earth-thumb wow fadeInUpX zuzu-tilt" id="zuzu-tilt" data-wow-delay=".10s">
							<img src="/images/all-img/v3/earth.png" alt="" />
						</div>
					</div>
					<div className="col-lg-6 d-flex align-items-center">
						<div className="zuzu-default-content sm dark font-syne">
							<h2>Especially promising and revolutionary technologies</h2>
							<p>
								Blockchain is an especially promising and revolutionary technology because it helps
								reduce security risks, stamp out fraud and bring transparency in a scalable way.
							</p>
							<p>
								Popularized by its association with cryptocurrency & NFTs blockchain technology has
								since evolved to become a management solution.
							</p>
							<div className="zuzu-btn-wrap">
								<Link href={"/contact-light"} legacyBehavior>
									<a className="zuzu-btn active gradient text-white">Discover More</a>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
