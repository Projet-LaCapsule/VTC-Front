export default function Travel(travel = {}, action) {
     if(action.type === 'searchTravel') {
        var cpyTravel = {...travel};

        cpyTravel.departure = action.departure;
        cpyTravel.arrival = action.arrival;
        cpyTravel.date = action.date;
        cpyTravel.time = action.time

        console.log('SearchTravel ---->')
        console.log(cpyTravel);
        travel = cpyTravel;
        return cpyTravel;
     } else if(action.type === 'chooseTravel') {
        console.log('Travel  {} ----->')
        console.log(travel);
        var cpyTravel = {...travel};
        cpyTravel.price = action.price;
        cpyTravel.distance = action.distance

        console.log('ChooseTravel ---->')
        console.log(cpyTravel);
        return cpyTravel
    } else {
        return travel;
    }
}