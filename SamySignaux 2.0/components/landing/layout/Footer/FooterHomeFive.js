"use client";
import Companny from "./Componnet/Companny";
import CopyRightText from "./Componnet/CopyRightText";
import Product from "./Componnet/Product";
import Resources from "./Componnet/Resources";
import SocialIcon from "./Componnet/SocialIcon";

export default function FooterHomeFive() {
	return (
		<footer className="zuzu-footer-section bg-gray-500">
			<div className="container">
				<div className="zuzu-footer-top">
					<div className="row">
						<div className="col-xl-4 col-lg-4">
							<div className="zuzu-textarea">
								<div className="zuzu-footer-logo">
									<img src="/images/logo/logo-white.svg" alt="" className="light-version-logo" />
								</div>
								<p>
									Both in and out of the metaverse, Zuzu is strong cybersecurity tools are essential.
									As technology becomes increasingly integrated, hackers will find new ways to attack.
								</p>
								<SocialIcon />
							</div>
						</div>
						<div className="col-xl-2 offset-xl-1 col-lg-2 offset-lg-1 col-md-4">
							<div className="zuzu-footer-menu">
								<Product />
							</div>
						</div>
						<div className="col-xl-3 col-lg-3 col-md-4">
							<div className="zuzu-footer-menu zuzu-footer-margin">
								<Companny />
							</div>
						</div>
						<div className="col-xl-2 col-lg-2 col-md-4">
							<div className="zuzu-footer-menu">
								<Resources />
							</div>
						</div>
					</div>
				</div>
				<div className="zuzu-footer-bottom text-center">
					<CopyRightText />
				</div>
			</div>
		</footer>
	);
}
