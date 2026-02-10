"use client";
import Link from "next/link";

export default function Breadcrumb({ dark, title }) {
	return (
		<div className={`zuzu-breadcrumb-section  ${dark ? "bg-gray-800 dark" : "bg-gray-400"}`}>
			<div className="container">
				<div className="breadcrumbs zuzu-inner-padding">
					<h1 className="wow fadeInUpX" data-wow-delay="0s">
						{title}
					</h1>
					<nav aria-label="breadcrumb" className="wow fadeInUpX" data-wow-delay="0.15s">
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<Link href={"/"}>Home</Link>
							</li>
							<li className="breadcrumb-item active" aria-current="page">
								{title}
							</li>
						</ol>
					</nav>
				</div>
			</div>
		</div>
	);
}
