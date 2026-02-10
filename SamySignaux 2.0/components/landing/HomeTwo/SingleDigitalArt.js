"use client";
import Link from "next/link";

export default function SingleDigitalArt({ item: { img, title, number, ctg, btnColor } }) {
	return (
		<div className="zuzu-card-wrap rt-mb-24 wow fadeInUpX" data-wow-delay="0s">
			<div className="zuzu-card-thumb">
				<img src={`/images/all-img/v2/${img}.png`} alt="" />
			</div>
			<div className="zuzu-card-data">
				<h3>{title}</h3>
				<div className="zuzu-card-footer-data">
					<h4>#{number}</h4>
					<Link href={"#"} legacyBehavior>
						<a className={`zuzu-card-btn ${btnColor}`}>{ctg}</a>
					</Link>
				</div>
			</div>
		</div>
	);
}
