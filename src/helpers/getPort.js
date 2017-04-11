// @flow
const DEFAULT_PORT: number = 5000;

const getPort = (): number => {
    if (process.env && typeof process.env.PORT === 'number') {
        return process.env.PORT;
    }

    return DEFAULT_PORT;
};

export default getPort;
