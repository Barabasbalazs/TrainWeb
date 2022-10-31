import TopLogin from "./TopLogin";
import TopLogout from "./TopLogout";

const Top = (props) => {
    //console.log(props);
    if (props.user !== null) {
        return (
            <TopLogout
                authCallback={props.authCallback}
                user={props.user}
                type={props.type}
            />
        )
    } else {
        return (
            <TopLogin
                authCallback={props.authCallback}
            />
        )
    }
}

export default Top;