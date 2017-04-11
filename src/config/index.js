// @flow
import { get } from 'lodash/fp';
import production from './production';
import development from './development';

const getConfigProp = (propName: string): * => {
    switch (process.env.NODE_ENV) {
        case 'production':
            return get(propName, production);
        case 'development':
            return get(propName, development);
        default:
            return get(propName, development);
    }
};

export default getConfigProp;
