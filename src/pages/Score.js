import { useTable, Column } from "react-table";
//https://www.paigeniedringhaus.com/blog/customize-and-style-complex-data-in-react-table


const DUMMY_SCORES = [
    {
        round: 1,
        double: 12,
        scores: {
            1: 110,
            2: 100,
            3: 0,
            4: 75
        }
    },
    {
        round: 2,
        double: 10,
        scores: {
            1: 0,
            2: 150,
            3: 30,
            4: 55
        }

    }
]

const DUMMY_PLAYERS = [
    {
        id: '1',
        name: 'Josh',
    },
    {        
        id: '2',
        name: 'Brooke'},
    {
        id: '3',
        name: 'Linda'
    }, 
    {   
        id: '4',
        name: 'Dave'
    }

]

const Score = () => {
    const playerList = DUMMY_PLAYERS.map((player) =>  ([player.id, player.name]));
    console.log(playerList);
    const scoreData = DUMMY_SCORES.map((scores) => <tr>{scores.scores}</tr>);
    console.log(scoreData);
    return (
        <table>
            <th>Players</th>
            <tbody>
                {DUMMY_PLAYERS.map((player) => {
                    return (
                        <tr>
                            <td>{player.id}</td>
                            <tb>{player.name}</tb>
                        </tr>
                    )
                })}
                {DUMMY_SCORES.map((scores) => {
                    return (
                        <tr>
                            <td>{scores.round}</td>
                            <td>{scores.double}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
};
       

export default Score


