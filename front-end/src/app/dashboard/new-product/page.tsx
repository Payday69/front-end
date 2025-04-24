'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewProductPage() {
  const router = useRouter()
  const ref = useRef(null)
  const [categories, setCategories] = useState([])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (ref.current) {
      const form = new FormData(ref.current)
      const name = form.get('name')
      const price = form.get('price')?.toString()
      const category_id = form.get('category')?.toString()
      const stock = form.get('stock')?.toString()

      fetch('http://localhost:3001/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          price: price && parseFloat(price),
          category_id: category_id && parseInt(category_id),
          stock: stock ? parseInt(stock) : 0,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) router.push('/dashboard')
        })
        .catch((error) => console.log(error))
    }
  }

  useEffect(() => {
    fetch('http://localhost:3001/categories')
      .then((response) => response.json())
      .then((data) => {
        if (data) setCategories(data)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-black">
      <h1 className="text-white text-4xl font-bold">Nuevo Producto</h1>
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className="text-white flex flex-col w-[25%] space-y-4 mt-4"
      >
        <label htmlFor="name">Nombre</label>
        <input
          className="bg-gray-600 border border-gray-400 focus:outline-none px-4 py-1 rounded-md"
          type="text"
          name="name"
          id="name"
        />
        <label htmlFor="price">Precio</label>
        <input
          className="bg-gray-600 border border-gray-400 focus:outline-none px-4 py-1 rounded-md"
          type="number"
          name="price"
          id="price"
        />
        <label htmlFor="category">Categoria</label>
        <select
          className="bg-gray-600 border border-gray-400 focus:outline-none px-4 py-1 rounded-md"
          name="category"
          id="category"
        >
          {categories.map((category: { id: number; name: string }) => (
            <option key={category.id} value={category.id.toString()}>
              {category.name}
            </option>
          ))}
        </select>
        <label htmlFor="stock">Disponibilidad</label>
        <input
          className="bg-gray-600 border border-gray-400 focus:outline-none px-4 py-1 rounded-md"
          type="number"
          name="stock"
          id="stock"
        />
        <button className="bg-red-800 hover:bg-red-500 py-1 rounded-md font-bold cursor-pointer">
          Crear
        </button>
      </form>
    </div>
  )
}
