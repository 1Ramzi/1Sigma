"use client";
import Link from "next/link";

export default function Product() {
	return (
		<>
			<span>Product</span>
			<ul>
				<li>
					<Link href={"#"}> Invest </Link>
				</li>
				<li>
					<Link href={"#"}> Crypto </Link>
				</li>
				<li>
					<Link href={"#"}> Cash Card </Link>
				</li>
				<li>
					<Link href={"#"}> Learn </Link>
				</li>
				<li>
					<Link href={"#"}> Snacks </Link>
				</li>
			</ul>
		</>
	);
}
