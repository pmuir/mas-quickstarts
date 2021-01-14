import { Map as ImmutableMap } from 'immutable';

type Request<R> = {
  active: boolean;
  timeout: NodeJS.Timer;
  inFlight: boolean;
  data: R;
  error: any;
};

export const featureReducerName = 'FLAGS';

export type FeatureState = ImmutableMap<string, boolean>;

export type RequestMap<R> = ImmutableMap<string, Request<R>>;

export type DashboardsState = ImmutableMap<string, RequestMap<any>>;

export type K8sState = ImmutableMap<string, any>;

export type UIState = ImmutableMap<string, any>;

export type RootState = {
  k8s: K8sState;
  UI: UIState;
  [featureReducerName]: FeatureState;
  dashboards: DashboardsState;
  plugins?: {
    [namespace: string]: any;
  };
};

