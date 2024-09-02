import { redirect } from 'next/navigation';
import styles from './page.module.scss';
import logoImg from '/public/vercel.svg';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '@/services/api';
import { cookies } from "next/headers"

export default function Page() {
  async function handle(this: any, formData: FormData) {
    "use server"

    const userData = Object.fromEntries(formData);

    const { email, password } = userData;

    if (email === "" || password === "") {
      return;
    }

    let user;

    try {
      const response = await api.post("/session", {
        email: email,
        password: password
      })

      user = response.data;

      if (!user.token) {
        return;
      }

      cookies().set("session", response.data.token, {
        maxAge: 864000,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production"
      });

    } catch (err) {
      console.log(err)
    }

    redirect(user.prefered_screen);
  }

  return (
    <div className={styles.containerCenter}>
      <Image
        src={logoImg}
        alt="Logo da pizzaria"
      />
      <section className={styles.login}>
        <form action={handle}>
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
            Acessar
          </button>
        </form>
        <Link href="/signup" className={styles.text}>
          Não possui uma conta? Cadastre-se
        </Link>
      </section>
    </div>
  )
}