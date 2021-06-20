import { createClient } from '@supabase/supabase-js'
import Head from 'next/head'

export default function Cota({ results, bet }) {
  console.log(results, bet);

  let points = 0

  return (
    <>
      <Head>
        <title>Gambler</title>
        <link rel="icon" href="../favicon.svg" />
        <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet" />
      </Head>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Casa
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Placar
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fora
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Local/Data
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aposta
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pontos
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.map(({ home, away, home_point, away_point, place, day, finished }, index) => {

                    home_point = home_point ?? 0
                    away_point = away_point ?? 0
                    bet[index][0] = bet[index][0] ?? 0
                    bet[index][1] = bet[index][1] ?? 0

                    const point = home_point === bet[index][0] && away_point === bet[index][1]
                      ? 3
                      : home_point === bet[index][0] || away_point === bet[index][1]
                        ? 1
                        : 0

                    points += point

                    const now = new Date().getTime()

                    const d = new Date(parseInt(day))
                    const daysOfWeek = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']
                    const dayOfWeek = daysOfWeek[d.getDay()]
                    const date = d.getDate()
                    const month = (d.getMonth() < 9 ? '0' : '') + (parseInt(d.getMonth()) + 1)
                    const year = d.getFullYear()
                    const hour = d.getHours()
                    const minutes = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes()

                    const fullDay = day ? `${dayOfWeek}, ${date}/${month}/${year} ${hour}h${minutes}` : 'Indefinido'

                    const status = finished
                      ? ['green', 'finalizado']
                      : day < now
                        ? ['yellow', 'em andamento']
                        : ['blue', 'em breve']

                    return (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {home.name}
                          </div>
                          <div className="text-sm uppercase text-gray-500">
                            {home.abbr}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            {home_point ?? '-'}
                          </span> &times; <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            {away_point ?? '-'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {away.name}
                          </div>
                          <div className="text-sm uppercase text-gray-500">
                            {away.abbr}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {place}
                          </div>
                          <div className="text-sm uppercase text-gray-500">
                            {fullDay}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${status[0]}-100 text-${status[0]}-800 uppercase`}>
                            {status[1]}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center uppercase whitespace-nowrap text-sm text-gray-500">
                          {home.abbr}
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            {bet[index][0]}
                          </span> &times; <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            {bet[index][1] ?? 0}
                          </span>
                          {away.abbr}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {point}
                        </td>
                      </tr>
                    )
                  }
                  )
                  }
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan="7" className="x-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</td>
                    <td className="x-6 py-3 text-right font-medium text-gray-500 uppercase tracking-wider px-6 py-4 whitespace-nowrap text-sm ">{points}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
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

  let { results } = await games[0] ?? []
  let { bet } = await qoutes[0] ?? []

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