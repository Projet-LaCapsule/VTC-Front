export default function User(userDatas = {}, action) {
    if(action.type === 'signUp') {
        console.log(userDatas)
        console.log('Reducer: My action ---->' + action)
        console.log(action)

        var cpyUser = {...userDatas}; 

        //Enregistre les infos user dans la copy du state userDatas
        cpyUser.firstName = action.firstName;
        cpyUser.lastName = action.lastName;
        cpyUser.email = action.email;
        cpyUser.tel = action.tel;
        cpyUser.password = action.password

        console.log('Reducer: My cpyUser ---->')
        console.log(cpyUser);
        return cpyUser
    } else {
        return userDatas
    }
}