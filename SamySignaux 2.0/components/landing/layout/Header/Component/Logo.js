"use client";
import Link from "next/link";

export default function Logo({ logo_name }) {
	return (
		<Link href={"/"}>
			<img src={`/images/logo/${logo_name}`} alt="" className="light-version-logo" />
		</Link>
	);
}
