export const USER_SETTING_CONFIGMAP_NAMESPACE = 'openshift-console-user-settings';

export const deseralizeData = (data: string | null) => {
  if (typeof data !== 'string') {
    return data;
  }
  try {
    return JSON.parse(data);
  } catch {
    return data;
  }
};

export const seralizeData = <T>(data: T) => {
  if (typeof data === 'string') {
    return data;
  }
  return JSON.stringify(data);
};
