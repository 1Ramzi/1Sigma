"use client";
import Community from "./Componnet/Community";
import CopyRightText from "./Componnet/CopyRightText";
import FooterMenu from "./Componnet/FooterMenu";
import MarketPlace from "./Componnet/MarketPlace";
import SocialIcon from "./Componnet/SocialIcon";
import Subscribe from "./Subscribe";

export default function FooterHomeFour() {
	return (
		<footer className="zuzu-footer-section zuzu-footer-light bg-warning-50">
			<div className="container">
				<div className="zuzu-footer-top">
					<div className="row">
						<div className="col-xl-3">
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
						<div className="col-xl-2 offset-xl-1 col-lg-3 col-md-3">
							<div className="zuzu-footer-menu">
								<Community />
							</div>
						</div>
						<div className="col-xl-3 col-lg-4 col-md-3">
							<div className="zuzu-footer-menu zuzu-footer-margin">
								<MarketPlace />
							</div>
						</div>
						<div className="col-xl-3 col-lg-5 col-md-6">
							<div className="zuzu-footer-menu">
								<Subscribe />
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
