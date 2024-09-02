"use client"

import Link from 'next/link'
import styles from './style.module.scss'
import Image from 'next/image'
import logoImg from '/public/next.svg'
import { LogOutIcon } from 'lucide-react'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function Header(){
  const router = useRouter();

  async function handleLogout(){
    deleteCookie("session", { path: "/" } )

    toast.info("Lougout done successfuly");
    
    router.replace("/")
  }

  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <Image
            alt="Logo Sujeito Pizza"
            src={logoImg}
            width={190}
            height={60}
            priority={true}
            quality={100}
          />
        </Link>

        <nav>
          <Link href="/dashboard/category">
            Category
          </Link>
          <Link href="/dashboard/product">
            Product
          </Link>
          <form action={handleLogout}>
            <button type='submit'>
              <LogOutIcon size={24} color="#FFF" />
            </button>
          </form>
        </nav>
      </div>
    </header>
  )
}