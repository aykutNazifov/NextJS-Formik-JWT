import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const validationSchema = yup.object({
	email: yup
		.string()
		.email("Invalid email address")
		.required("Required Field"),
	password: yup
		.string()
		.min(6, "Must be 6 characters or more")
		.max(15, "Must be 15 characters or less")
		.required("Required field"),
});

const Login = () => {
	const { user } = useSelector((state) => state.user);

	const [error, setError] = useState("");

	const dispatch = useDispatch();
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values, { resetForm }) => {
			loginUser(values);
			resetForm();
		},
	});

	const loginUser = async (data) => {
		try {
			const token = await axios.post(
				"http://localhost:3000/api/user/login",
				data
			);

			Cookies.set("token", token.data);
			const user = jwt.decode(token);
			dispatch(login(user));
			router.push("/");
		} catch (error) {
			console.log(error);
			setError(error.response.data);
		}
	};

	return (
		<div className="login">
			<div className="Form_Box">
				<div className="Image">
					<Image
						src="/images/login-img.jpeg"
						alt="Image"
						layout="fill"
						objectFit="cover"
					/>
				</div>
				<div className="Form_Content">
					<h1> Login</h1>
					<form onSubmit={formik.handleSubmit}>
						<div className="Form_Input">
							<input
								placeholder="Email"
								id="email"
								name="email"
								type="email"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.email}
							/>
							<label htmlFor="email">Email</label>
							{formik.touched.email && formik.errors.email ? (
								<p className="Error">{formik.errors.email}</p>
							) : null}
						</div>

						<div className="Form_Input">
							<input
								placeholder="Password"
								id="password"
								name="password"
								type="password"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.password}
							/>
							<label htmlFor="password">Password</label>
							{formik.touched.password &&
							formik.errors.password ? (
								<p className="Error">
									{formik.errors.password}
								</p>
							) : null}{" "}
						</div>

						<button type="submit">Log In</button>

						{error && <p className="Api_Error">{error}</p>}
						<span className="link">
							Don't have account yet{" "}
							<Link href="/register">
								<a>go to Register page!</a>
							</Link>
						</span>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
