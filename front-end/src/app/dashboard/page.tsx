'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])
  const [cart, setCart] = useState<
    | {
        id: number
        category_id: number
        name: string
        price: number
      }[]
    | undefined
  >(undefined)

  useEffect(() => {
    fetch('http://localhost:3001/categories')
      .then((response) => response.json())
      .then((data) => {
        if (data) setCategories(data)
      })
      .catch((error) => alert(error))

    fetch('http://localhost:3001/items')
      .then((response) => response.json())
      .then((data) => {
        if (data) setItems(data)
      })
      .catch((error) => alert(error))
  }, [])

  const addToCart = (item: {
    id: number
    category_id: number
    name: string
    price: number
    stock: number
  }) => {
    if (item.stock === 0) {
      alert('Producto ya no esta disponible.')
      return
    }
    setCart((prev) => [...(prev || []), item])
  }

  const removeFromCart = (indexToRemove: number) => {
    setCart((prev) =>
      (prev || []).filter((_, index) => index !== indexToRemove)
    )
  }

  const deleteItem = (itemId: number) => {
    fetch(`http://localhost:3001/items/${itemId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          if (data.success) {
            setItems(items.filter((item: { id: number }) => item.id !== itemId))
            alert('Producto eliminado correctamente')
          }
        }
      })
      .catch((error) => alert(error))
  }

  function handleCheckout() {
    if (cart && cart.length === 0) {
      alert('El carrito está vacío')
      return
    }
    fetch('http://localhost:3001/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setCart([])
          alert('Compra generada correctamente.')
        }
      })
      .catch((error) => {
        alert(error)
      })
  }

  return (
    <div className="w-full h-full min-h-screen flex flex-col py-10 items-center bg-black">
      <h1 className="text-white text-4xl font-bold">Categorias</h1>

      <div className="mt-6 space-x-4">
        <Link
          href={'/dashboard/new-category'}
          className="bg-red-800 px-4 py-2 text-white rounded-lg hover:bg-red-500"
        >
          Agregar Categoria
        </Link>
        <Link
          href={'/dashboard/new-product'}
          className="bg-red-800 px-4 py-2 text-white rounded-lg hover:bg-red-500"
        >
          Agregar Producto
        </Link>
        <Link
          href={'/'}
          className="bg-red-800 px-4 py-2 text-white rounded-lg hover:bg-red-500"
        >
          Cerrar Sesion
        </Link>
      </div>

      <div className="text-white w-full px-10 mt-8">
        {categories.map((category: { id: number; name: string }) => (
          <div key={category.id} className="flex flex-col mb-4">
            <span className="text-xl font-bold">{category.name}</span>
            <div className="space-x-4 px-4 py-2 flex flex-wrap">
              {items.map(
                (item: {
                  id: number
                  category_id: number
                  name: string
                  price: number
                  stock: number
                }) => {
                  if (item.category_id === category.id) {
                    return (
                      <div
                        key={item.id}
                        className="flex items-center space-x-2"
                      >
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-gray-800 px-4 py-1.5 rounded-lg font-semibold cursor-pointer hover:bg-gray-700"
                        >
                          {item.name} - ${item.price}
                        </button>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Eliminar
                        </button>
                      </div>
                    )
                  }
                }
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Tabla de carrito */}
      {cart && cart.length > 0 && (
        <div className="w-full max-w-2xl mt-10 text-white">
          <h2 className="text-2xl font-bold mb-4">Carrito de compras</h2>
          <table className="w-full text-left border border-gray-600">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-2">Producto</th>
                <th className="p-2">Precio</th>
                <th className="p-2">Acción</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index} className="border-t border-gray-600">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">${item.price}</td>
                  <td className="p-2">
                    <button
                      onClick={() => removeFromCart(index)}
                      className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Quitar
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-700 font-semibold">
                <td className="p-2">Total</td>
                <td className="p-2">
                  $
                  {(
                    cart?.reduce((sum, item) => sum + Number(item.price), 0) ||
                    0
                  ).toFixed(2)}
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>

          <button
            onClick={handleCheckout}
            className="mt-4 bg-green-700 px-6 py-2 text-white font-bold rounded-lg hover:bg-green-600"
          >
            Finalizar compra
          </button>
        </div>
      )}
    </div>
  )
}
