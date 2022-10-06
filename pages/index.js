import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Header from "../components/header/Header";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import jwt from "jsonwebtoken";

export default function Home() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const cookieToken = Cookies.get("token");
    if (cookieToken) {
      const user = jwt.decode(cookieToken);
      dispatch(login(user));
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Formik - JWT - Example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div className="Home">
        <h1>Hi, {user ? user.email : "Guest"}</h1>
      </div>
    </div>
  );
}
