import { dummy } from './MySurveys.dummy';

export const MySurveysStore = {
	default: () => {},
	subscribe: () => {},
	dispatch: () => {},
	getState: () => {
		return { surveys: [dummy.surveys] };
	},
  replaceReducer: () => {},
};
