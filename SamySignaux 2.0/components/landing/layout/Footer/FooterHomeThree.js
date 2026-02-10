"use client";
import Link from "next/link";
import CopyRightText from "./Componnet/CopyRightText";
import Product from "./Componnet/Product";
import Companny from "./Componnet/Companny";
import Contact from "./Componnet/Contact";
import SocialIcon from "./Componnet/SocialIcon";

export default function FooterHomeThree() {
	return (
		<footer className="zuzu-footer-section zuzu-section-footer bg-gray-500">
			<div className="container">
				<div className="row">
					<div className="col-lg-4">
						<div className="zuzu-textarea">
							<div className="zuzu-footer-logo">
								<img src="/images/logo/logo-white.svg" alt="" className="light-version-logo" />
							</div>
							<p>
								Cryptocurrency trading is offered through an account with the zuzu crypto app. Our
								simplified zero commission pricing for use stocks.
							</p>
							<CopyRightText />
						</div>
					</div>
					<div className="col-lg-2 offset-lg-1 col-md-4 col-sm-4">
						<div className="zuzu-footer-menu">
							<Product />
						</div>
					</div>
					<div className="col-lg-3 col-md-4 col-sm-4">
						<div className="zuzu-footer-menu zuzu-footer-margin">
							<Companny />
						</div>
					</div>
					<div className="col-lg-2 col-md-4 col-sm-4">
						<div className="zuzu-footer-menu">
							<Contact />
						</div>
						<div className="zuzu-social-icon zuzu-social-icon3">
							<SocialIcon />
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
