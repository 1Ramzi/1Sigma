"use client";
import Link from "next/link";
import SingleDigitalArt from "./SingleDigitalArt";

const GigitalCardData = [
	{
		img: "card1",
		title: "Playing Sheep",
		number: "0832",
		ctg: "Common",
		btnColor: "bg-primary-300",
	},
	{
		img: "card2",
		title: "Jumping Mushroom",
		number: "0833",
		ctg: "Exclusive",
		btnColor: "bg-primary-600",
	},
	{
		img: "card3",
		title: "Rainbow Unicorn",
		number: "0835",
		ctg: "Rare",
		btnColor: "bg-success-400",
	},
	{
		img: "card4",
		title: "Lazy Panda",
		number: "0836",
		ctg: "Common",
		btnColor: "bg-primary-500",
	},
	{
		img: "card5",
		title: "Colorful Mushroom",
		number: "0837",
		ctg: "Rare",
		btnColor: "bg-primary-300",
	},
	{
		img: "card6",
		title: "Flying Bird",
		number: "0834",
		ctg: "Exclusive",
		btnColor: "bg-primary-600",
	},
	{
		img: "card7",
		title: "Chicken Playing",
		number: "0838",
		ctg: "Common",
		btnColor: "bg-success-400",
	},
	{
		img: "card8",
		title: "Cute Zebra Sitting",
		number: "0839",
		ctg: "Exclusive",
		btnColor: "bg-primary-500",
	},
];

export default function SectionFive() {
	return (
		<div className="section bg-warning-10 zuzu-section-padding2">
			<div className="container">
				<div className="zuzu-section-title">
					<div className="zuzu-default-content large">
						<h2>Explore our best ready to collect digital art</h2>
					</div>
				</div>
				<div className="row">
					{GigitalCardData.map((item) => (
						<div key={item.number} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
							<SingleDigitalArt item={item} />
						</div>
					))}
				</div>
				<div className="zuzu-center-btn">
					<Link href={"/contact-light"} legacyBehavior>
						<a className="zuzu-btn btn-pink rounded-pill">View All Collections</a>
					</Link>
				</div>
			</div>
		</div>
	);
}
