"use client";
import Link from "next/link";

export default function SidebarCategory() {
	return (
		<div className="zuzu-blog-sidebar-item">
			<div className="zuzu-sidebar-item-title">
				<h6>Blog Categories</h6>
			</div>
			<div className="zuzu-categories">
				<ul>
					<li>
						<Link href={"#"}> NFT News (86)</Link>
					</li>
					<li>
						<Link href={"#"}> Cryptocurrency (32)</Link>
					</li>
					<li>
						<Link href={"#"}> Digital Marketing (59)</Link>
					</li>
					<li>
						<Link href={"#"}> Blockchain (90)</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
