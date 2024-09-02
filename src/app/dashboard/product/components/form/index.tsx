"use client"

import { ChangeEvent, useState } from 'react'
import styles from './styles.module.scss'
import { UploadCloud } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/app/dashboard/components/button'
import { api } from '@/services/api'
import { getCookieClient } from '@/lib/cookieClient'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'

interface CategoryProps {
  id: string;
  name: string;
}

interface Props {
  categories: CategoryProps[]
}

export function Form({ categories }: Props) {
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");

  async function handle(formData: FormData) {
    const categoryData = Object.fromEntries(formData);
    const sendData = new FormData();

    const token = getCookieClient();
    const auth = `Bearer ${token}`;

    if (!categoryData.name || !categoryData.category_id || !categoryData.price || !categoryData.description || !image || !token) {
      toast.warning("Fill all fields before!");
      return;
    }

    sendData.append('name', categoryData.name as string);
    sendData.append('category_id', categoryData.category_id);
    sendData.append('price', categoryData.price as string);
    sendData.append('description', categoryData.description as string);
    sendData.append('file', image);

    await api.post("/product", sendData, { headers: { Authorization: auth } });

    toast.success("Product registered!");

    redirect("/dashboard");
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type !== "image/jpeg" && image.type !== "image/png") {
        toast.warning("Format not allowed");
        return;
      }

      setImage(image);
      setPreviewImage(URL.createObjectURL(image))
    }
  }

  return (
    <main className={styles.container}>
      <h1>Novo produto</h1>
      <form className={styles.form} action={handle}>
        <label className={styles.labelImage}>
          <span>
            <UploadCloud size={30} color="#FFF" />
          </span>
          <input
            type="file"
            accept="image/png, image/jpeg"
            required
            onChange={handleFile}
          />
          {previewImage && (
            <Image
              alt="Imagem de preview"
              src={previewImage}
              className={styles.preview}
              fill={true}
              quality={100}
              priority={true}
            />
          )}
        </label>
        <select name="category_id">
          {categories.map((category, index) => (
            <option value={category.id}
              key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="name"
          placeholder='Type a name'
          required
          className={styles.input}
        />
        <input
          type="text"
          name="price"
          placeholder='Type a price USD$...'
          required
          className={styles.input}
        />
        <textarea
          placeholder='Type a description...'
          className={styles.input}
          required
          name="description"
        >
        </textarea>
        <Button name="Create Product" />
      </form>
    </main>
  )
}