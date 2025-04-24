'use client'
import React, { useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function NewCategoryPage() {
  const router = useRouter()
  const ref = useRef(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (ref.current) {
      const form = new FormData(ref.current)
      const name = form.get('name')

      fetch('http://localhost:3001/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) router.push('/dashboard')
        })
        .catch((error) => console.log(error))
    }
  }
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-black">
      <h1 className="text-white text-4xl font-bold">Nueva Categoria</h1>
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
        <button className="bg-red-800 hover:bg-red-500 py-1 rounded-md font-bold cursor-pointer">
          Crear
        </button>
      </form>
    </div>
  )
}
