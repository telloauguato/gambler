import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Cota({ info, results, bet, day }) {
    //console.log(results, bet, day, info);

    const d = new Date(parseInt(day))
    const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
    const date = d.getDate()
    const month = months[d.getMonth()]
    const year = d.getFullYear()
    const hour = d.getHours()
    const minutes = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes()
    const seconds = (d.getSeconds() < 10 ? '0' : '') + d.getSeconds()

    const fullDay = `${date} ${month} ${year} - ${hour}:${minutes}:${seconds}`

    const r = useRouter()
    const c = r.query.cota

    return (
        <>
            <Head>
                <title>Gambler</title>
                <link rel="icon" href="../favicon.svg" />
                <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet" />
            </Head>

            <div className="flex align-center justify-between">
                <div className="p-4 sm:w-1/3 border border-gray-200">
                    <i className="ri-todo-line ri-3x"></i>
                    <div className="mt-2">
                        <div className=" my-3 text-2xl font-bold justify-between">
                            Comprovante — Gambler
                        </div>
                        <div className="flex justify-between text-gray-400">
                            <div className="text-sm uppercase">
                                {c}
                            </div>
                            <div className="text-sm uppercase">
                                {fullDay}
                            </div>
                        </div>
                    </div>
                    <div className="uppercase">
                        <div className="my-2 text-center">
                            {info}
                        </div>
                        <div className="flex justify-between">
                            <span>Série</span>
                            <span className="text-gray-400">{c.substr(0, 9)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Id</span>
                            <span className="text-gray-400">{c.substr(9, 6)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>valor</span>
                            <span className="text-gray-400">R$ 2.50</span>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex border-b font-bold border-gray-600 px-2">
                            <div className="m-1 font-medium">#</div>
                            <div className="m-1 w-full text-right">Casa</div>
                            <div className="m-1">&times;</div>
                            <div className="m-1 w-full">Fora</div>
                            <div className="m-1 font-medium">#</div>
                        </div>
                        {results.map(({ home, away, home_point, away_point, place, day, finished }, index) => {

                            home_point = home_point ?? 0
                            away_point = away_point ?? 0
                            bet[index][0] = bet[index][0] ?? 0
                            bet[index][1] = bet[index][1] ?? 0

                            return (
                                <div key={index} className="flex px-2">
                                    <div className="m-1 font-medium">{bet[index][0] ?? 0}</div>
                                    <div className="m-1 w-full text-right">{home.name}</div>
                                    <div className="m-1">&times;</div>
                                    <div className="m-1 w-full">{away.name}</div>
                                    <div className="m-1 font-medium">{bet[index][1] ?? 0}</div>
                                </div>
                            )
                        }
                        )
                        }
                    </div>
                    <div className="mt-4 flex align-center justify-center">
                        <img className="w-1/2" src={`http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=https%3A%2F%2Fgambler.vercel.app%2Fc%2F${c}`} alt="qrcode" />
                    </div>
                    <div className="text-center">
                        https://gambler.vercel.app/c/{c}
                    </div>
                    <div className="text-center mt-2 text-gray-400">
                        QlJBMjAyMT
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

    let { results, info } = await games[0] ?? []
    let { bet, buyday } = await qoutes[0] ?? []

    results.map(v => {
        const filterHome = teams.filter(team => team.id === v.home)
        const filterAway = teams.filter(team => team.id === v.away)

        v.home = filterHome[0]
        v.away = filterAway[0]
    })

    return {
        props: {
            info,
            results,
            bet,
            day: buyday
        }
    }
}