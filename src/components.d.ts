/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */

import '@stencil/router';


import {
  AppChartsEventForm as AppChartsEventsForm
} from './components/app-charts-event-form/app-charts-event-form';

declare global {
  interface HTMLAppChartsEventsFormElement extends AppChartsEventsForm, HTMLElement {
  }
  var HTMLAppChartsEventsFormElement: {
    prototype: HTMLAppChartsEventsFormElement;
    new (): HTMLAppChartsEventsFormElement;
  };
  interface HTMLElementTagNameMap {
    "app-charts-events-form": HTMLAppChartsEventsFormElement;
  }
  interface ElementTagNameMap {
    "app-charts-events-form": HTMLAppChartsEventsFormElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "app-charts-events-form": JSXElements.AppChartsEventsFormAttributes;
    }
  }
  namespace JSXElements {
    export interface AppChartsEventsFormAttributes extends HTMLAttributes {
      datas?: any;
    }
  }
}


import {
  AppCharts as AppCharts
} from './components/app-charts/app-charts';

declare global {
  interface HTMLAppChartsElement extends AppCharts, HTMLElement {
  }
  var HTMLAppChartsElement: {
    prototype: HTMLAppChartsElement;
    new (): HTMLAppChartsElement;
  };
  interface HTMLElementTagNameMap {
    "app-charts": HTMLAppChartsElement;
  }
  interface ElementTagNameMap {
    "app-charts": HTMLAppChartsElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "app-charts": JSXElements.AppChartsAttributes;
    }
  }
  namespace JSXElements {
    export interface AppChartsAttributes extends HTMLAttributes {
      datas?: any;
    }
  }
}

