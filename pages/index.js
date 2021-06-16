import { useState } from 'react'
import Head from 'next/head'

export default function Home() {

  return (
    <>
      <Head>
        <title>Gambler</title>
        <link rel="icon" href="/favicon.svg" />
        <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="/favicon.svg"
              alt="Gambler"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Gambler</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Insira o número da sua cota
            </p>
          </div>
          <form className="mt-8 space-y-6" action={cota}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="cota" className="sr-only">
                  Número da cota
                </label>
                <input
                  id="cota"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="XXX000000XXXXXX"
                  value={cota}
                  onChange={(e) => setCota(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <i className="ri-search-line"></i>
                </span>
                Buscar {cota}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
