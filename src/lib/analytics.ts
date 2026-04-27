type DataLayerEvent = {
  event: string;
  [key: string]: unknown;
};

type WindowWithDataLayer = Window & {
  dataLayer?: DataLayerEvent[];
};

export function pushDataLayerEvent(event: DataLayerEvent) {
  if (typeof window === "undefined") return;
  const dataLayerWindow = window as WindowWithDataLayer;
  dataLayerWindow.dataLayer = dataLayerWindow.dataLayer ?? [];
  dataLayerWindow.dataLayer.push(event);
}
