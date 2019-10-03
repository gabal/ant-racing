import React from 'react';
import { Typography } from '@material-ui/core';
const chanceOfWinningLiteral = {
    good: 'good',
    ok: 'ok'
};
const ChanceOfWinning = (props: any) => {
    let chance:string = '';
    if(props.value>80){
        chance = chanceOfWinningLiteral.good;
    }else if(props.value>50){
        chance = chanceOfWinningLiteral.ok;
    }
    return (
        <div>
        {
            props.value && props.value>-1 && (
                <div className={`chance-of-winning ${chance}`}>
                    <Typography variant="caption" component="p" align="center">
                        ODDS
                    </Typography>
                    <Typography variant="h6" component="p" align="center">
                        {props.value}%
                    </Typography>
                </div>
            )
        }
        </div>
    )
}
ChanceOfWinning.chanceOfWinningLiteral = chanceOfWinningLiteral;
export default ChanceOfWinning;