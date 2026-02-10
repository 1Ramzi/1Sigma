"use client";
import SocialIcon from "./Componnet/SocialIcon";
import Product from "./Componnet/Product";
import Companny from "./Componnet/Companny";
import Resources from "./Componnet/Resources";
import CopyRightText from "./Componnet/CopyRightText";
import FooterMenu from "./Componnet/FooterMenu";

export default function FooterHomeTwo() {
	return (
		<footer className="zuzu-footer-section footer-two zuzu-footer-light">
			<div className="container">
				<div className="zuzu-footer-top">
					<div className="row">
						<div className="col-xl-3 col-lg-4">
							<div className="zuzu-textarea">
								<div className="zuzu-footer-logo">
									<img src="/images/logo/logo-black.svg" alt="" className="light-version-logo" />
								</div>

								<p>
									Discover NFTs by category, track the latest drops, and follow the collections you
									love to enjoy it!
								</p>
								<SocialIcon />
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
						<div className="col-xl-2 offset-xl-1 col-lg-2 col-md-4">
							<div className="zuzu-footer-menu">
								<Resources />
							</div>
						</div>
					</div>
				</div>
				<div className="zuzu-footer-bottom">
					<div className="row">
						<div className="col-lg-6 col-md-8">
							<CopyRightText />
						</div>
						<div className="col-lg-6 col-md-4">
							<div className="zuzu-footer-menu">
								<FooterMenu />
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
