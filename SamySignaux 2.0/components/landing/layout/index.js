"use client";
import FooterHomeFive from "./Footer/FooterHomeFive";
import FooterHomeFour from "./Footer/FooterHomeFour";
import FooterHomeThree from "./Footer/FooterHomeThree";
import FooterHomeTwo from "./Footer/FooterHomeTwo";
import FooterHomeOne from "./Footer/footerHomeOne";
import HeaderHomeFive from "./Header/HeaderHomeFive";
import HeaderHomeFour from "./Header/HeaderHomeFour";
import HeaderHomeOne from "./Header/HeaderHomeOne";
import HeaderHomeThree from "./Header/HeaderHomeThree";
import HeaderHomeTwo from "./Header/HeaderHomeTwo";

export default function Layout({ children }) {
	const headerChooseFunc = () => {
		switch (children.props.header) {
			case "one":
				return <HeaderHomeOne />;
			case "two":
				return <HeaderHomeTwo />;
			case "three":
				return <HeaderHomeThree />;
			case "four":
				return <HeaderHomeFour />;
			case "five":
				return <HeaderHomeFive />;
			case "six":
				return <HeaderErrorSix />;
			default:
				return <HeaderHomeOne />;
		}
	};
	const footerChooseFunc = () => {
		switch (children.props.footer) {
			case "one":
				return <FooterHomeOne />;
			case "two":
				return <FooterHomeTwo />;
			case "three":
				return <FooterHomeThree />;
			case "four":
				return <FooterHomeFour />;
			case "five":
				return <FooterHomeFive />;
			default:
				return <FooterHomeOne />;
		}
	};
	return (
		<>
			{headerChooseFunc()}
			<main>{children}</main>
			{footerChooseFunc()}
		</>
	);
}
