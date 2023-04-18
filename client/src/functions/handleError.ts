export default function handleError(error: any, callback: (msg: string) => void) {
    if (error.response) {
        callback(error.response.data);
    } else if (error.request) {
        console.log(error.request);
        callback("Couldn't connect to server");
    } else {
        callback(error.message);
    }
}