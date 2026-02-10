"use client";
import Link from "next/link";

export default function SectionOne() {
	return (
		<div className="section zuzu-section-padding">
			<div className="container">
				<div className="row">
					<div className="col-lg-6">
						<div className="zuzu-cartoon-thumb">
							<img
								className="wow fadeInUpX"
								data-wow-delay=".10s"
								src="/images/all-img/v2/thumb1.png"
								alt=""
							/>
						</div>
					</div>
					<div className="col-lg-6 col-md-10 d-flex align-items-center">
						<div className="zuzu-default-content large">
							<h2>Know what NFT is before investing</h2>
							<p>
								NFTs are digital files. They can be a jpeg of a piece of art, real estate, or a video.
								Turning files into NFTs helps secure them via blockchain to make buying, selling and
								trading efficient.
							</p>
							<p>
								A NFTs is a unique digital identifier that cannot be copied, substituted, or subdivided,
								that is recorded in a blockchain, & that is used to certify authenticity and ownership.
							</p>
							<div className="zuzu-btn-wrap">
								<Link href={"contact-light"} legacyBehavior>
									<a className="zuzu-btn btn-pink rounded-pill">Discover More</a>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
