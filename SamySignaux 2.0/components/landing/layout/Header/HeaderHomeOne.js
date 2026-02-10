"use client";
import useScroll from "../../Hooks/useScroll";
import Logo from "./Component/Logo";

export default function HeaderHomeOne() {
	const scroll = useScroll();

	return (
		<header
			className={`site-header zuzu-header-dark zuzu-header-section ${scroll ? "sticky-menu" : ""}`}
			id="sticky-menu"
		>
			<div className="container-fluid">
				<nav className="navbar site-navbar">
					{/* Brand Logo*/}
					<div className="brand-logo zuzu-menu-left">
						<Logo logo_name={"logo-white.svg"} />
					</div>

					<div className="header-btn header-btn-l1 ms-auto d-inline-flex">
						<a href="/login" className="zuzu-btn zuzu-header-btn rounded-pill black">Get Started</a>
					</div>
				</nav>
			</div>
		</header>
	);
}
