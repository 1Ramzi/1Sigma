"use client";
export default function SectionOne() {
	return (
		<div className="section bg-gray-500 zuzu-section-padding">
			<div className="container">
				<div className="row">
					<div className="col-lg-6">
						<div className="zuzu-thumb wow fadeInUpX" data-wow-delay="0.2s">
							<img src="/images/all-img/v1/card-thumb1.png" alt="" />
						</div>
					</div>
					<div className="col-lg-6 d-flex align-items-center">
						<div className="zuzu-default-content dark large font-cabin">
							<h2>Earn up to 12% BNB cashback every time</h2>
							<p>
								All your cashback from eligible purchases are automatically deposited in your Funding
								Wallet so you only need to worry about spending crypto.
							</p>
							<p>
								Cashback will be distributed monthly in the form of BNB within 14 days after the end of
								each months. You will be able to log in and check your cashback via Card Dashboard.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
