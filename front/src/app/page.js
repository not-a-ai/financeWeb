'use client'
import styles from './page.module.css'
import { useRouter } from 'next/navigation';

export default function Home() {
  const Router = useRouter();
  const doLogin = () => {
    Router.push('/login')
  }
  return (
    <main className={styles.main} >
      <h1>YOURfinance.IO</h1>
      <button onClick={doLogin()}> Faça Login</button>
    </main>
  )
}
