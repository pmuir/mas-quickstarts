import { K8sKind } from '@app/OpenShiftConsole/k8s/types';

export const ConfigMapModel: K8sKind = {
  apiVersion: 'v1',
  label: 'Config Map',
  plural: 'configmaps',
  abbr: 'CM',
  namespaced: true,
  kind: 'ConfigMap',
  id: 'configmap',
  labelPlural: 'Config Maps',
};


export const QuickStartModel: K8sKind = {
  kind: 'ConsoleQuickStart',
  label: 'ConsoleQuickStart',
  labelPlural: 'ConsoleQuickStarts',
  apiGroup: 'console.openshift.io',
  apiVersion: 'v1',
  abbr: 'CQS',
  namespaced: false,
  crd: true,
  plural: 'consolequickstarts',
  propagationPolicy: 'Background',
};
