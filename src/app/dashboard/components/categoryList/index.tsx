"use client"

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import styles from "./styles.module.scss"
import { getCookieClient } from "@/lib/cookieClient";

interface Category {
    id: number;
    name: string;
}

export function CategoryList() {
    const [categories, setCategories] = useState<Category[]>([]);
    const token = getCookieClient();

    useEffect(() => {
        async function fetchCategories() {
            if (!token) {
                console.error('Token não encontrado!');
                return;
            }

            try {
                const response = await api.get("/categories", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }

        fetchCategories();
    }, [token]); 

    return (
        <main>
            <ul>
                {categories.map((category) => (
                    <li className={styles.list}key={category.id}>{category.name}</li>
                ))}
            </ul>
        </main>
    );
}
