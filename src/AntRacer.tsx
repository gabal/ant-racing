import React from 'react';
const AntRacerView = (props: any) => {
	let probabilityStatus: string;

	if (!props.probability) {
		probabilityStatus = 'not yet run';
	} else if (props.probability === -1) {
		probabilityStatus = 'in progress';
	} else {
		probabilityStatus = 'calculated';
	}

	let divStyle: any = {
		position: 'absolute',
		left: '0'
	};
	if (props.probability > 0) {
		divStyle.left = (100 * props.probability) + '%';
	}

	return (
		<div style={divStyle}>
			<div>{props.name}</div>
			<div>{props.length}</div>
			<div>{props.color}</div>
			<div>{props.weight}</div>
			<div>{props.probability}</div>
			<div>{probabilityStatus}</div>
		</div>
	)
}
export default AntRacerView;