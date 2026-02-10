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
								<CountUp start={0} end={600} />
							</span>
							<strong>K</strong>
						</h2>
						<p>Users worldwide</p>
					</div>
					<div className="zuzu-counter-data wow fadeInUpX" data-wow-delay="0.10s">
						<h2>
							<span className="zuzu-counter">
								<CountUp start={0} end={15} />
							</span>
							<strong>B+</strong>
						</h2>
						<p>Payments are processed annually</p>
					</div>
					<div className="zuzu-counter-data wow fadeInUpX" data-wow-delay="0.20s">
						<h2>
							<span className="zuzu-counter">
								<CountUp end={120} />
							</span>
							<strong>+</strong>
						</h2>
						<p>Countries are supported</p>
					</div>
					<div className="zuzu-counter-data wow fadeInUpX" data-wow-delay="0.30s">
						<h2>
							<span className="zuzu-counter">
								<CountUp end={78} />
							</span>
							<strong>+</strong>
						</h2>
						<p>Currencies supported</p>
					</div>
				</div>
			</div>
		</div>
	);
}
