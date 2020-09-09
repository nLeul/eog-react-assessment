import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '../../components/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '../../components/Avatar';
import MetricsList from './MetricsList';
import MetricChart from './MetricChart';

const useStyles = makeStyles({
    card: {
        margin: '5% 5%',
    },
});

export default () => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardHeader title="Select Metrics" />
            <CardContent>
                <MetricsList />
                <MetricChart />
            </CardContent>
        </Card>
    );
};
