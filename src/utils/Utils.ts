export const assetHost = `${window.location.protocol}//${window.location.hostname}:5000/`;

export const assertNever = (shouldBeNever: never) => {
    throw new Error("Was not never: " + JSON.stringify(shouldBeNever));
};
