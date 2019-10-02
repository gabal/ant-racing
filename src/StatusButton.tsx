import React from 'react';
const StatusButton = (props: any) => {
	if (!props.ants || props.ants.length === 0) {
		return <div></div>
	}
	let status: string = 'CALCULATE';
	const definedProbabilities: any = props.ants.filter((ant: any) => { return ant.probability !== undefined });
	if (definedProbabilities.length > 0) {
		status = definedProbabilities.filter((ant: any) => { return ant.probability < 0 }).length > 0 ? 'Calculating' : 'Completed';
	}
	return (
		<button onClick={props.onClick}>{status}</button>
	)
}
export default StatusButton;