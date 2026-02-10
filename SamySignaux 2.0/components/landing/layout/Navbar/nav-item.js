"use client";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import DropdownMenu from "./dropdown-menu";
import Link from "next/link";

export default function NavItem({ navItemText, menuItems = false, megaMenu = false }) {
	const [isOpenDropDown, setIsOpenDropDown] = useState(false);
	const handleClick = (e) => {
		setIsOpenDropDown(!isOpenDropDown);
	};

	function GenerateLinkHrefContent(menuItems, navItemText) {
		if (!menuItems) {
			return "/" + navItemText.split(" ").join("-").toLowerCase();
		} else {
			return "/#";
		}
	}

	return (
		<li className={`nav-item ${menuItems ? "nav-item-has-children" : ""}`}>
			<Link href={GenerateLinkHrefContent(menuItems, navItemText)} legacyBehavior>
				<a className="nav-link-item drop-trigger" onClick={handleClick}>
					{navItemText}
					{menuItems && <FontAwesomeIcon icon={faAngleDown} />}
				</a>
			</Link>

			{!megaMenu ? (
				<DropdownMenu isOpenDropDown={isOpenDropDown} menuItems={menuItems} />
			) : // <MegaMenu menuItems={menuItems} />
			null}
		</li>
	);
}
