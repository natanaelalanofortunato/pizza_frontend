import { api } from '@/services/api';
import styles from './styles.module.scss'
import { Button } from "@/app/dashboard/components/button"
import { CategoryList } from "@/app/dashboard/components/categoryList"
import { getCookieServer } from '@/lib/cookieServer';
import { redirect } from 'next/navigation';

export default function Category() {

    async function handleRegisterCategory(formData: FormData) {
        "use server"
        const token = getCookieServer();

        const categoryData = Object.fromEntries(formData);

        const { name } = categoryData;

        try {
            await api.post("/category",
                {
                    name: name
                }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            );

        } catch (err) {
            console.log(err);
        }

        redirect("/dashboard");
    }

    return (
        <main className={styles.container}>
            <h1>Nova Categoria</h1>

            <form
                className={styles.form}
                action={handleRegisterCategory}
            >
                <input
                    type="text"
                    name="name"
                    placeholder="Nome da categoria, ex: Pizzas"
                    required
                    className={styles.input}
                />
                <CategoryList />
                <Button name="Cadastrar" />
            </form>
        </main>
    )
}