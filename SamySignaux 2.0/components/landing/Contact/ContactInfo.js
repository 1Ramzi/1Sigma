"use client";
import Link from "next/link";
import MapSection from "./MapSection";

export default function ContactInfo() {
	const location = {
		address: "1600 Amphitheatre Parkway, Mountain View, california.",
		lat: 37.42216,
		lng: -122.08427,
	};
	return (
		<>
			<div className="zuzu-contact-info-column">
				<div className="zuzu-default-content sm dark">
					<h2>Get In Touch</h2>
					<p>Feel free to contact us with your any questions, contact our team and let’s schedule a call</p>
				</div>
				<div className="zuzu-contact-info-wrap">
					<Link href={"#"}>
						<div className="zuzu-contact-info">
							<div className="zuzu-contact-info-icon">
								<img src="/images/svg/call.svg" alt="" />
							</div>
							<div className="zuzu-contact-info-data">
								<h5>Call us</h5>
								<p>
									+088-234-6534-563 <br />
									+088-145-0083-2911
								</p>
							</div>
						</div>
					</Link>
					<Link href={"#"}>
						<div className="zuzu-contact-info">
							<div className="zuzu-contact-info-icon">
								<img src="/images/svg/message.svg" alt="" />
							</div>
							<div className="zuzu-contact-info-data">
								<h5>Email us</h5>
								<p>
									example@gmail.com <br />
									companyname@gmail.com
								</p>
							</div>
						</div>
					</Link>
					<Link href={"#"}>
						<div className="zuzu-contact-info m-0">
							<div className="zuzu-contact-info-icon">
								<img src="/images/svg/map.svg" alt="" />
							</div>
							<div className="zuzu-contact-info-data">
								<h5>Office address</h5>
								<p>2972 Westheimer Rd. Santa Ana, Illinois 85486 </p>
							</div>
						</div>
					</Link>
				</div>
			</div>

			<div className="zuzu-map">
				<div id="map">
					<MapSection location={location} zoomLevel={17} />
				</div>
			</div>
		</>
	);
}
