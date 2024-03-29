import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import AntTradingCard from './AntTradingCard';

import Track from './Track';
import Loader from './Loader';
import StatusButton from './StatusButton';
import Grid from '@material-ui/core/Grid';

const useStyles:any = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    buttonContainer: {
        position: 'sticky',
        bottom: 20
    }
}));
const status:any = { 
    error: 'error',
    ready: 'ready',
    noWorkers: 'noWorkers',
    waiting: ''
};
function AntRace(props: any) {
    const [ants, setAnts] = useState<any | any>({data: [], status: status.waiting, maxValues: {length: 0, weight:0}});
    const classes = useStyles();
    const calculateAntsChance = () => {
        setAnts({data: ants.data.map((ant:any, index:number) => {
            ant.probability = -1;
            if (window.Worker) {
                const likelihoodCalculatorWorker = new Worker('./workers/generateAntWinLikelihoodCalculator.js');
                likelihoodCalculatorWorker.onmessage = function(event:any){
                    ant.probability = event.data;
                    ants.data = ants.data.sort((a:any, b:any) => {
                        if (a.probability < b.probability) return 1;
                        if (b.probability < a.probability) return -1;
                        return 0;
                    });
                    setAnts(JSON.parse(JSON.stringify(ants)));
                    likelihoodCalculatorWorker.terminate();
                };
            }
            return ant;
        }), status: status.ready, maxValues: ants.maxValues});

    }
    const tryAgain = () => {
        window.location.reload();
    }
    useEffect(() => {
        fetch(process.env.NODE_ENV === 'development' ? '/graphql' : 'https://antserver-blocjgjbpw.now.sh/graphql', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ operationName: null, variables: null, query: "{ants{name,length,color,weight}}" })
        }).then( response => {
            if (!response.ok) {
                setAnts({data:[], status: status.error});
            }
            return response.json();
        }).then((json) => {
            let maxValues:any = {
                weight: 0,
                length: 0
            }
            setAnts({data: json.data.ants.map((ant: any, index: number) => {
                ant.index = index;
                maxValues.weight = Math.max(maxValues.weight, ant.weight);
                maxValues.length = Math.max(maxValues.length, ant.length);
                return ant
            }), status: status.ready, maxValues: maxValues});
        }).catch( err => {
            setAnts({data:[], status: status.error});
        });
    }, []);
    const completedAnts:any = ants.data.filter((ant:any)=> ant.probability > -1);
    const completed:boolean = completedAnts.length === ants.data.length;
    return (
        <div className={ants.status}>
            {
                ants.status === status.waiting && (<Loader {...props} />)
            }
            {
                ants.status !== status.waiting && (
                <div>
                    <div className="ants-container">
                        <Grid container className={classes.root} justify="center" spacing={2}>
                            {ants.data.map((ant: any, index: number) => {
                                return <Grid key={index} item={true}>
                                    <AntTradingCard index={index} maxValues={ants.maxValues} name={ant.name} length={ant.length} weight={ant.weight} color={ant.color} probability={ant.probability} />
                                </Grid>
                            })}
                        </Grid>.
                    </div>
                    {
                        ants.status !== status.noWorkers && (
                        <Grid container className={classes.buttonContainer} justify="center">
                            <StatusButton onClick={calculateAntsChance} ants={ants}/>
                        </Grid>
                        )
                    }
                    {
                        ants.status === status.noWorkers && (
                        <Grid container className={classes.root} justify="center">
                            <Typography gutterBottom variant="caption" component="p">
                                Your browser doesn't support webworkers, the technology piece that makes ant estimations, parallel tasks and time travel possible. Please update to a modern browser.
                            </Typography>
                        </Grid>
                        )
                    }
                    <Track ants={ants.data.sort((a:any, b:any) => {
                        if (a.index > b.index) return 1;
                        if (b.index > a.index) return -1;
                        return 0;
                    })} completed={completed} />
                    <Dialog 
                        open={ants.status === status.error}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Sorry, didn't find the right ants"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                We just realized that Australia’s jack jumper ant kills more people annually than spiders... We really didn't know. For now please contact one of our survivors... I mean, administrators to fix this problem or try again later.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={tryAgain} color="primary">
                                Try Again
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                )
            }
        </div>
    );
}
AntRace.status = status;
export default AntRace;




    