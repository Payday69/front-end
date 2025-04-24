'use client'
import React, { useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const ref = useRef<HTMLFormElement>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (ref.current) {
      const form = new FormData(ref.current)

      const email = form.get('email')
      const password = form.get('password')

      fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
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
      <h1 className="text-white text-4xl font-bold">Accede a Thrifty</h1>
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className="text-white flex flex-col w-[25%] space-y-4 mt-4"
      >
        <label htmlFor="email">Correo</label>
        <input
          className="bg-gray-600 border border-gray-400 focus:outline-none px-4 py-1 rounded-md"
          type="email"
          name="email"
          id="email"
        />
        <label htmlFor="password">Contrseña</label>
        <input
          className="bg-gray-600 border border-gray-400 focus:outline-none px-4 py-1 rounded-md"
          type="password"
          name="password"
          id="password"
        />
        <button className="bg-red-800 py-1 rounded-md font-bold">
          Acceder
        </button>
      </form>
    </div>
  )
}
