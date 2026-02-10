"use client";
import CounterTwo from "../common/Counter/CounterTwo";

export default function SectionFour() {
	return (
		<div className="section zuzu-section-padding">
			<div id="zuzu-counter" />
			<div className="container">
				<div className="row">
					<div className="col-lg-6 d-lg-flex justify-content-sm-end order-lg-2">
						<div className="zuzu-cartoon-thumb cartoon2">
							<img
								className="wow fadeInUpX"
								data-wow-delay=".10s"
								src="/images/all-img/v2/thumb2.png"
								alt=""
							/>
						</div>
					</div>
					<div className="col-lg-6 d-flex align-items-center">
						<div className="zuzu-default-content large">
							<h2>That's why we are better than others</h2>
							<p>
								We are the first marketplace that allows user to sell their own NFT. You can buy and
								sell your NFT with the best deal here. Place your bid and start your trade easily
								without any hassel.
							</p>
							<div className="zuzu-counter-wrap zuzu-counter-wrap4">
								<CounterTwo />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
