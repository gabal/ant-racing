import React from 'react';
import AntRacer from './AntRacer';
import SingleBarChart from './SingleBarChart';
import ChanceOfWinning from './ChanceOfWinning';
import { CardActions, Avatar, Card, CardContent, Typography, LinearProgress } from '@material-ui/core';


const AntTradingCard = (props: any) => {
	const prob:number|null = (props.probability && props.probability>-1) ? Math.round(props.probability*100) : null;
	const colorClass:string = `ant-trading-card ${props.color.toLowerCase()}`;
	return (
		<Card className={colorClass}>
			<div className='racer-container'>
				
				<Avatar>
					<AntRacer key={props.key} multiplier={4} name={props.name} length={props.length} weight={props.weight} color={props.color} probability={props.probability} />
				</Avatar>
			</div>
			{props.probability === -1 &&
				<LinearProgress />
			}
			<CardContent>
				<Typography gutterBottom variant="h5" component="h2">
					{props.name}
				</Typography>
			</CardContent>
			<CardActions>
				<SingleBarChart className="first" value={props.length} maxValue={props.maxValues.length} name="Weight" unit="milligrams"/>
				<SingleBarChart value={props.weight} maxValue={props.maxValues.weight} name="Length" unit="millimeters"/>
			</CardActions>
			<ChanceOfWinning value={prob} />
		</Card>
	)
}
export default AntTradingCard;