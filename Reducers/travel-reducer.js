export default function Travel(travel = {}, action) {
    // if(action.type = 'searchTravel') {
         //Button Search HomePage --> add on travel {departure: action.departure, arrival: action.arrival, ( date: action.date, time: action.time) }
    // }
    if(action.type === 'chooseTravel') {
        var cpyTravel = {...travel};
        cpyTravel.price = action.price;
        cpyTravel.distance = action.distance

        console.log(action);
        console.log(cpyTravel);
        return cpyTravel
    } else {
        return travel;
    }
}