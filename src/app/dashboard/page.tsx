import { Orders } from "./components/orders";
import { api } from '@/services/api'
import { getCookieServer } from '@/lib/cookieServer'
import { OrderProps } from '@/lib/order.type'

async function getOrders(): Promise<OrderProps[] | []> {
  try {
    const token = getCookieServer();
    const auth = `Bearer ${token}`;
    const response = await api.get("/orders", { headers: { Authorization: auth } });

    return response.data || [];
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default async function Dashboard() {
  const orders = await getOrders();

  return (
    <>
      <Orders orders={orders} />
    </>
  )
}