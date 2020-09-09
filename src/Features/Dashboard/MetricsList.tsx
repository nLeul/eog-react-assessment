import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import { useGeolocation } from 'react-use';
import LinearProgress from '@material-ui/core/LinearProgress';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
query{
  getMetrics
}
`;



export default () => {
  return (
    <Provider value={client}>
      <MetricsList />
    </Provider>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const MetricsList = () => {


  const classes = useStyles();

  const dispatch = useDispatch();
  const { MetricsList, selectedMetric} = useSelector((state: any) => state.metrics);
  const handleChange = (event:React.ChangeEvent<{ value: unknown }>) => {
  
    dispatch(actions.metricSelectedDataStore(event.target.value))
    }
  const [result] = useQuery({
    query

  });
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      console.log(error);

      // dispatch(actions.weatherApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    console.log(data);

    const { getMetrics } = data;
    dispatch(actions.metricsListDataRecevied(getMetrics));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  return <FormControl className={classes.formControl}>
    <InputLabel id="demo-simple-select-label">Select metrics</InputLabel>
    <Select

      id="metrics-select"
      value={selectedMetric}
      onChange={handleChange}
    >
      {MetricsList.map((list: string, index: number) => (


        <MenuItem value={list} key={index}>{list}</MenuItem>


      ))}  </Select></FormControl>
};
