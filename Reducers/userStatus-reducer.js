export default function User(isConnected = false, action) {
    if(action.type === 'checkStatus') {
        console.log('Reducer Status');
        console.log(isConnected)
        isConnected = action.isConnected;
        console.log(isConnected)
        return isConnected
    } else {
        return isConnected
    }
}