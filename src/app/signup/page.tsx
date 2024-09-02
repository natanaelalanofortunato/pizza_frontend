import Image from "next/image"
import Link from "next/link"
import styles from "../page.module.scss"
import logoImg from "../../../public/logo.svg"
import { api } from "@/services/api"
import { redirect } from "next/navigation"

export default function Signup() {

  async function handle(formData: FormData) {
    "use server"

    const userData = Object.fromEntries(formData);

    const { name, email, password } = userData;

    try {
      await api.post("/users",
        {
          name: name,
          email: email,
          password: password,
          prefered_screen: "/dashboard",
          cross_origin: "create"
        }
      );

    } catch (err) {
      console.log(err);
    }

    redirect("/");
  }

  return (
    <div className={styles.containerCenter}>
      <Image
        src={logoImg}
        alt="Logo da pizzaria"
      />
      <section className={styles.login}>
        <h1>Crate Your Account</h1>
        <form action={handle}>
          <input
            type="text"
            required
            name="name"
            placeholder="Digite seu nome..."
            className={styles.input}
          />
          <input
            type="email"
            required
            name="email"
            placeholder="Digite seu email..."
            className={styles.input}
          />
          <input
            type="password"
            required
            name="password"
            placeholder="***********"
            className={styles.input}
          />
          <button type="submit">
            Cadastrar
          </button>
        </form>
        <Link href="/" className={styles.text}>
          Já possui uma conta? Faça login
        </Link>
      </section>
    </div>
  )
}