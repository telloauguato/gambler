import { createClient } from '@supabase/supabase-js'
//import Header from '../../components/Header'
//import Data from '../../components/Data'
import Head from 'next/head'

export default function Cota({ results, bet }) {
  console.log(results, bet);

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

            </p>
          </div>
        </div>
      </div>
    </>
  )
}


export async function getServerSideProps({ params }) {

  const supabase = createClient('https://vvvcixwhneodouvexhzx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMzc4NTk3MywiZXhwIjoxOTM5MzYxOTczfQ.Gu0w5BH85pNyhmnADiXrEfjG5_BR6aw8q5nwQhbMezQ')

  let { data: games } = await supabase
    .from('games')
    .select('*')
    .eq('cota', params.cota.substr(0, 9))

  let { data: qoutes } = await supabase
    .from('qoutes')
    .select('*')
    .eq('name', params.cota)

  let { data: teams } = await supabase
    .from('teams')
    .select('*')

  let { results } = await games[0]
  let { bet } = await qoutes[0]

  //results.map(v => v.home = teams[v.home])
  results.map(v => {
    const filterHome = teams.filter(team => team.id === v.home)
    const filterAway = teams.filter(team => team.id === v.away)

    v.home = filterHome[0]
    v.away = filterAway[0]
  })

  return {
    props: {
      results,
      bet,
    }
  }
}