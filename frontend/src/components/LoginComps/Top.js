import TopLogin from "./TopLogin";
import TopLogout from "./TopLogout";

const Top = (props) => {
    if (props.user !== '') {
        return (
            <TopLogout
                logOut={props.logOut}
                user={props.user}
                type={props.type}
            />
        )
    } else {
        return (
            <TopLogin
                logIn={props.logIn}
            />
        )
    }
}

export default Top;