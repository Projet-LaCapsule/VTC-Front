export default function Travel(travel = {}, action) {
     if(action.type === 'searchTravel') {
        var cpyTravel = {...travel};

        console.log('TEST MY ACTION ----->', action.positionDeparture.lat)
       // console.log('TEST MY ACTION ----->', action.positionDeparture.long)

        cpyTravel.departure = action.departure;
        cpyTravel.arrival = action.arrival;
        cpyTravel.date = action.date;
        cpyTravel.time = action.time;
        cpyTravel.positionDeparture = {
            lat: action.positionDeparture.lat,
            long: action.positionDeparture.long
        };
        cpyTravel.positionArrival = {
            lat: action.positionArrival.lat,
            long: action.positionArrival.long
        }

        console.log('SearchTravel ---->', cpyTravel);
        travel = cpyTravel;
        return cpyTravel;
     } else if(action.type === 'chooseTravel') {

        console.log('Travel  {} ----->', travel);
        var cpyTravel = {...travel};
        cpyTravel.price = action.price;
        cpyTravel.distance = action.distance

        console.log('ChooseTravel ---->', cpyTravel);
        return cpyTravel
    } else {
        return travel;
    }
}