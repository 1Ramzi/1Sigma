"use client";
import CountUp from "react-countup";

export default function CounterTwo() {
	return (
		<>
			<div className="zuzu-counter-data">
				<h2>
					<span className="zuzu-counter">
						<CountUp start={0} end={1.2} decimals={1} decimal="." />
					</span>
					<strong>B</strong>
				</h2>
				<p>Over a billion blockchain to discover & explore.</p>
			</div>
			<div className="zuzu-counter-data">
				<h2>
					<span className="zuzu-counter">
						<CountUp start={0} end={3.2} decimals={1} decimal="." />
					</span>
					<strong>M</strong>
				</h2>
				<p>Over 3 million digital items traded via the marketplace.</p>
			</div>
		</>
	);
}
