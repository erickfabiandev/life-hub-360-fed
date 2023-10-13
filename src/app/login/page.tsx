import LoginForm from "@/components/LoginForms";
import { NextPage } from "next";
import Image from "next/image";
import styles from "@/styles/page.module.scss"

const Login: NextPage = () => {
  return (
    <section className={styles.login}>
      <div className={styles.login_panel}>
      </div>
      <LoginForm />
    </section >
  )
}

export default Login