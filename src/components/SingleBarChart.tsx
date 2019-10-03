import React from 'react';
import { Typography } from '@material-ui/core';
const SingleBarChart = (props: any) => {
    const perc:number = 100*(props.value/props.maxValue);
    const className:string = `${props.className} single-bar-chart`;
    return (
        <div className={className}>
            <Typography variant="overline" component="p" align="center">
                {props.name}
            </Typography>
            <div className="bar">
                <div className="total" style={{height:`${perc}%`}}></div>
            </div>
            <Typography variant="caption" component="p" align="center">
                {props.value} {props.unit}
            </Typography>
        </div>
    );
}
export default SingleBarChart;