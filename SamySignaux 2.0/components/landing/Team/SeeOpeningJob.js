"use client";
import Link from "next/link";

export default function SeeOpeningJob() {
	return (
		<div className="col-xl-4 col-md-6 offset-xl-0 offset-lg-3 offset-md-3">
			<div className="zuzu-team-wrap wow fadeInUpX wrap2" data-wow-delay=".80s">
				<h4>Are you interested in working with us?</h4>
				<Link href={"#"} legacyBehavior>
					<a className="zuzu-btn btn-deep-blue rounded-pill">See opening jobs</a>
				</Link>
			</div>
		</div>
	);
}
