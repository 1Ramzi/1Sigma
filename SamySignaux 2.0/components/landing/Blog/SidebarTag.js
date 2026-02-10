"use client";
import Link from "next/link";

export default function SidebarTag() {
	return (
		<div className="zuzu-blog-sidebar-item">
			<div className="zuzu-sidebar-item-title">
				<h6>Tags</h6>
			</div>
			<div className="zuzu-tags">
				<ul>
					<li>
						<Link href={"#"}> Artica </Link>
					</li>
					<li>
						<Link href={"#"}> Busines </Link>
					</li>
					<li>
						<Link href={"#"}> Digita </Link>
					</li>
					<li>
						<Link href={"#"}> Technolog </Link>
					</li>
					<li>
						<Link href={"#"}> UI/U </Link>
					</li>
					<li>
						<Link href={"#"}> Desig </Link>
					</li>
					<li>
						<Link href={"#"}> NF </Link>
					</li>
					<li>
						<Link href={"#"}> Crypt </Link>
					</li>
					<li>
						<Link href={"#"}> Finenc </Link>
					</li>
					<li>
						<Link href={"#"}> Trend </Link>
					</li>
					<li>
						<Link href={"#"}> We </Link>
					</li>
					<li>
						<Link href={"#"}> Asse </Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
