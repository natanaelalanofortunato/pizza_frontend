import { Form } from "./components/form"
import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";

export default async function Product() {
    const token = getCookieServer();
    const auth = `Bearer ${token}`;

    if (!token) {
        return;
    }

    const getCategories = await api.get("/categories", { headers: { Authorization: auth } })

    return (
        <Form categories={getCategories.data} />
    )
}