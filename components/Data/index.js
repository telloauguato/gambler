import Status from '../../components/Status';

function Data({ id, homeName, homeAbbr, homePoints, awayName, awayAbbr, awayPoints, place, date, homeBet, awayBet, finished = false }) {

    const now = new Date();
    const d = new Date(date);

    const status = finished ?
        <Status status="Finalizado" color="green" /> :
        (
            (now > d) ?
                <Status status="Em andamento" color="yellow" /> :
                <Status status="Em breve" color="blue" />
        )
        
    const daysOfWeek = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']
    const dayOfWeek = daysOfWeek[d.getDay()]
    const day = d.getDate()
    const month = (d.getMonth() < 9 ? '0' : '') + (parseInt(d.getMonth()) + 1)
    const year = d.getFullYear()
    const hour = d.getHours()
    const minutes = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes()

    const fullDate = date ? `${dayOfWeek}, ${day}/${month}/${year} ${hour}h${minutes}` : 'Indefinido'

    const points = (homePoints === homeBet && awayPoints === awayBet) ?
        3 :
        (
            (homePoints === homeBet || awayPoints === awayBet) ?
                1 :
                0
        )
    const homeColor = homePoints === null ? 'yellow' : ((homePoints === homeBet) ? 'green' : 'red')
    const awayColor = awayPoints === null ? 'yellow' : ((awayPoints === awayBet) ? 'green' : 'red')

    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                    {id}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                    {homeName}
                </div>
                <div className="text-sm uppercase text-gray-500">
                    {homeAbbr}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    {homePoints ?? '-'}
                </span> &times; <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    {awayPoints ?? '-'}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                    {awayName}
                </div>
                <div className="text-sm uppercase text-gray-500">
                    {awayAbbr}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                    {place}
                </div>
                <div className="text-sm uppercase text-gray-500">
                    {fullDate}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                {status}
            </td>
            <td className="px-6 py-4 whitespace-nowrap uppercase text-sm text-gray-500">
                <span className={`inline-block w-2 h-2 bg-${homeColor}-600 rounded-full mx-1`}></span>
                {homeAbbr}
                <span className="ml-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    {homeBet}
                </span>
                &times;
                <span className="mr-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    {awayBet}
                </span>
                {awayAbbr}
                <span className={`inline-block w-2 h-2 bg-${awayColor}-600 rounded-full mx-1`}></span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {points}
            </td>
        </tr>
    );
}

export default Data;
