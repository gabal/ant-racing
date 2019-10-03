import React from 'react';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
const calculationStatus = {
	calculate: 'calculate',
	calculating: 'calculating',
	completed: 'completed'
}
const StatusButton = (props: any) => {
	if (!props.ants || props.ants.data.length === 0) {
		return <div></div>
	}
	let status: string = calculationStatus.calculate;
	const definedProbabilities: any = props.ants.data.filter((ant: any) => { return ant.probability !== undefined });
	if (definedProbabilities.length > 0) {
		status = definedProbabilities.filter((ant: any) => { return ant.probability < 0 }).length > 0 ? calculationStatus.calculating : calculationStatus.completed;
	}
	return (
		<Fab variant="extended" color="primary" onClick={props.onClick} disabled={status === calculationStatus.calculating}>
			{status === calculationStatus.calculating && <CircularProgress size={20} />}
			{status !== calculationStatus.calculating && status}
      	</Fab>
	)
}
StatusButton.calculationStatus = calculationStatus;
export default StatusButton;