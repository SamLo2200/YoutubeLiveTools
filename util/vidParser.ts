export const vidParser = (url: string) => {
    const arr = url.split(/(vi\/|v%3D|v=|\/v\/|\/live\/|youtu\.be\/|\/embed\/)/);
    return undefined !== arr[2] ? arr[2].split(/[^\w-]/i)[0] : arr[0];
};
