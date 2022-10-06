import React from "react";
import Link from "next/link";
import styles from "./Header.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import Cookies from "js-cookie";

const Header = () => {
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(logout());
		Cookies.remove("token");
	};
	return (
		<nav className={styles.Header}>
			<ul>
				{user ? (
					<li onClick={handleClick}>Log out</li>
				) : (
					<>
						<li>
							<Link href="/register">
								<a>Resgiter</a>
							</Link>
						</li>
						<li>
							<Link href="/login">
								<a>Login</a>
							</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Header;
