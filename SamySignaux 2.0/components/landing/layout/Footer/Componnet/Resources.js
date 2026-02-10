"use client";
import Link from "next/link";

export default function Resources() {
	return (
		<>
			<span>Resources</span>
			<ul>
				<li>
					<Link href={"#"}> Explore NFTs </Link>
				</li>
				<li>
					<Link href={"#"}> Platform Status </Link>
				</li>
				<li>
					<Link href={"#"}> Help Center </Link>
				</li>
				<li>
					<Link href={"#"}> Partners </Link>
				</li>
				<li>
					<Link href={"#"}> Marketplace </Link>
				</li>
			</ul>
		</>
	);
}
