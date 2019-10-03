import React from 'react';
const AntRacerView = (props: any) => {
	const multiplier:number = props.multiplier ? props.multiplier : 1; 
	const antWidth:number = props.weight*multiplier;
	const antSize:string = antWidth<6 ? 'tiny' : (antWidth<10 ? 'medium': '');
	const antClass:string = `ant-racer ${antSize}`;
	const antHalfLength:number = props.length*(multiplier/4)/2;

	const headStyle:any = {
		width: `${antWidth}px`,
		height: `${antWidth}px`,
	};
	const animationTime:string = props.probability ? `${50/(props.probability+1)}s` : '0s';
	const antStyle:any = {
		transitionDuration: animationTime,
		animationDuration: animationTime
	};
	const thoraxAbdomenStyle: any = {
		height: `${antHalfLength}px`,
		width: `${antWidth}px`
	};
	return (
		<div className={antClass} style={antStyle}>
			<div className='head' style={headStyle}></div>
			<div className='thorax' style={thoraxAbdomenStyle}>
				<div className='leg left-leg top-leg'></div>
				<div className='leg right-leg top-leg'></div>
				<div className='leg left-leg medium-leg'></div>
				<div className='leg right-leg medium-leg'></div>
				<div className='leg left-leg bottom-leg'></div>
				<div className='leg right-leg bottom-leg'></div>
			</div>
			<div className='abdomen' style={thoraxAbdomenStyle}></div>
		</div>
	)
}
export default AntRacerView;