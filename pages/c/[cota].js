//import Header from '../../components/Header'
//import Data from '../../components/Data'
import Head from 'next/head'

export default async function Cota() {

  const header = new Headers({
    "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMzc4NTk3MywiZXhwIjoxOTM5MzYxOTczfQ.Gu0w5BH85pNyhmnADiXrEfjG5_BR6aw8q5nwQhbMezQ"
  })
  const resGame = await fetch(`https://vvvcixwhneodouvexhzx.supabase.co/rest/v1/games?select=*`, { headers })
  //const resQoute = await fetch(`https://vvvcixwhneodouvexhzx.supabase.co/rest/v1/qoutes?select=*`, { headers })

  const jsonGame = await resGame.json()

  console.log(jsonGame);

  return (
    <>
      <Head>
        <title>Gambler</title>
        <link rel="icon" href="../favicon.svg" />
        <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="../favicon.svg"
              alt="Gambler"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Gambler</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {c}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

/*
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
      bet: 1,
      c: 1
    }
  }
}
*/