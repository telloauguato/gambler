//import Header from '../../components/Header'
//import Data from '../../components/Data'
import Head from 'next/head'

export default function Cota({ results, bet = 1, c = 0 }) {

  console.log(results, bet, c);

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
              Insira o número da sua cota:
            </p>
          </div>
          <form className="mt-8 space-y-6">
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
                Buscar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}


export async function getServerSideProps() {
  const header = new Headers({
    "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMzc4NTk3MywiZXhwIjoxOTM5MzYxOTczfQ.Gu0w5BH85pNyhmnADiXrEfjG5_BR6aw8q5nwQhbMezQ"
  })
  const resGame = await fetch(`https://vvvcixwhneodouvexhzx.supabase.co/rest/v1/games?select=*`, { headers })
  //const resQoute = await fetch(`https://vvvcixwhneodouvexhzx.supabase.co/rest/v1/qoutes?select=*`, { headers })

  const jsonGame = await resGame.json()
  //const jsonQoute = await resQoute.json()

  //const filteredGame = jsonGame.filter(val => val['cota'] === params.cota.substr(0, 9));
  //const filteredQoute = jsonQoute.filter(val => val['name'] === params.cota);


  //const filteredGame = jsonGame.map(val => { val[0].results.home = 'teste' })


  return {
    props: {
      results: jsonGame,
      //bet: filteredQoute,
    }
  }
}