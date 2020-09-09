import { createSlice, PayloadAction } from 'redux-starter-kit';

export type WeatherForLocation = {
    MetricsList: [];
    selectedMetric:string
};

export type ApiErrorAction = {
  error: string;
};

const initialState = {
    MetricsList: [],
    selectedMetric: "",
    currentTime: Date.now() - 1800000,
metricChartValue:[]
};



const slice = createSlice({
  name: 'Metrics',
  initialState,
  reducers: {
      metricsListDataRecevied: (state, action) => {
    
          state.MetricsList = action.payload
      },
      metricSelectedDataStore: (state, action) => {
          state.selectedMetric = action.payload;
          state.currentTime = Date.now() - 1800000;
      },
      metricsChartValue: (state, action) => { 
state.metricChartValue=action.payload
      },
    ApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
