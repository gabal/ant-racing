import React, { useState, useEffect } from 'react';
import AntRacer from './AntRacer';
import generateAntWinLikelihoodCalculator from './Utilities/generateAntWinLikelihoodCalculator'
import StatusButton from './StatusButton'

function AntCollection(props: any) {
    const [ants, setAnts] = useState<any | any>([]);

    function calculateAntsChance() {
        setAnts(ants.map((ant: any, index: number) => {
            ant.probability = -1;
            const alter = (currentIndex: number) => {
                generateAntWinLikelihoodCalculator()((likelihoodOfAntWinning: number) => {
                    ants[currentIndex].probability = likelihoodOfAntWinning;
                    setAnts(JSON.parse(JSON.stringify(ants)));
                });
            };
            alter(index);

            return ant;
        }));

    }
    useEffect(() => {
        fetch(process.env.NODE_ENV === 'development' ? '/graphql' : 'https://antserver-blocjgjbpw.now.sh/graphql', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ operationName: null, variables: null, query: "{ants{name,length,color,weight}}" })
        }).then((response) => {
            response.json().then((data) => {
                setAnts(data.data.ants);
            });
        });
    }, []);
    return (<div>
        {ants.map((ant: any, key: number) => {
            return <AntRacer key={key} name={ant.name} length={ant.length} weight={ant.weight} color={ant.color} probability={ant.probability} />
        })}
        <StatusButton onClick={calculateAntsChance} ants={ants} />
    </div>)
}

export default AntCollection;


