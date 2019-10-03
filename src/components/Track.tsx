import React from 'react';
import AntRacer from './AntRacer';
import StatusButton from './StatusButton';
import { Typography } from '@material-ui/core';

const Track = (props: any) => {
    return (
        <div className="track-container">
            {props.completed}
            {
                !props.completed && (
                    <ul className="track loop">
                        <li><AntRacer length={20} weight={4} probability={6} /></li>
                        <li><AntRacer length={6} weight={2} probability={2} /></li>
                        <li><AntRacer length={10} weight={3} probability={4} /></li>
                    </ul>
                )
            }
            <ul className={`track ${props.completed ? StatusButton.calculationStatus.completed : ''}`}>
                {props.ants.map((ant: any, key: number) => {
                    return <li key={ant.name}>
                        <AntRacer name={ant.name} length={ant.length} weight={ant.weight} color={ant.color} probability={ant.probability} />
                        
                        <Typography gutterBottom variant="caption" component="p">
                            {ant.name}
				        </Typography>
                    </li>;
                })}
            </ul>
        </div>
    )
}
export default Track;