"use client";
import CountUp from "react-countup";

export default function CounterOne({ light }) {
	return (
		<div className={`${light ? "section zuzu-counter-light" : "zuzu-counter-section bg-gray-500"}`}>
			<div id="zuzu-counter" />
			<div className="container">
				<div className="zuzu-counter-wrap">
					<div className="zuzu-counter-data wow fadeInUpX" data-wow-delay="0s">
						<h2>
							<span className="zuzu-counter">
								<CountUp start={0} end={5} />
							</span>
							<strong>K+</strong>
						</h2>
						<p>Active Traders</p>
					</div>
					<div className="zuzu-counter-data wow fadeInUpX" data-wow-delay="0.10s">
						<h2>
							<span className="zuzu-counter">
								<CountUp start={0} end={92} />
							</span>
							<strong>%</strong>
						</h2>
						<p>Win Rate</p>
					</div>
					<div className="zuzu-counter-data wow fadeInUpX" data-wow-delay="0.20s">
						<h2>
							<span className="zuzu-counter">
								<CountUp end={24} />
							</span>
							<strong>/7</strong>
						</h2>
						<p>Support & Mentorship</p>
					</div>
					<div className="zuzu-counter-data wow fadeInUpX" data-wow-delay="0.30s">
						<h2>
							<span className="zuzu-counter">
								<CountUp end={100} />
							</span>
							<strong>+</strong>
						</h2>
						<p>Daily Signals</p>
					</div>
				</div>
			</div>
		</div>
	);
}
