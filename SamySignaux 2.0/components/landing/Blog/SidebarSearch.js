"use client";
export default function SidebarSearch() {
	return (
		<div className="zuzu-blog-sidebar-item">
			<form action="#">
				<div className="zuzu-product-search">
					<input type="search" placeholder="Type to search..." />
					<button id="zuzu-search-btn">
						<img src="/images/svg/search.svg" alt="" />
					</button>
				</div>
			</form>
		</div>
	);
}
