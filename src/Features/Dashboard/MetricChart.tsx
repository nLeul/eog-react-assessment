import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';

import LinearProgress from '@material-ui/core/LinearProgress';

import Plot from 'react-plotly.js';



const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
query($input: [MeasurementQuery]) {
    getMultipleMeasurements(
      input: $input
    ) {
      measurements {
        metric
        at
        unit
        value
      }
    }
  }
`;



export default () => {
  return (
    <Provider value={client}>
      <MetricChart />
    </Provider>
  );
};



const MetricChart = () => {


 

  const dispatch = useDispatch();
  const {  selectedMetric,currentTime,metricChartValue} = useSelector((state: any) => state.metrics);
 
  const [result] = useQuery({
      query,
      variables: {
          input: [{metricName: selectedMetric ,after:currentTime}]
      }

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

    const { getMultipleMeasurements } = data;
   dispatch(actions.metricsChartValue(getMultipleMeasurements));
  }, [dispatch, data, error]);

    if (fetching) return <LinearProgress />;
    if(!selectedMetric) return <h3>Please select Metrics</h3>
    return <Plot
        data={metricChartValue.map((value: any) => (
            {
                x: value.measurements.map((list: any) => list.at),
                y: value.measurements.map((list: any) => list.value),
                type: 'scatter',
                mode: 'lines',
     
            }
    
        ))}
        layout={{
            title: selectedMetric, xaxis: {type:"date"}
      }}
/>
};
