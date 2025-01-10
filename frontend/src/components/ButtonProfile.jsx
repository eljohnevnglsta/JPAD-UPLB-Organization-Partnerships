
function ButtonProfile(props) {
    if (props.isPrivateView) {
        return (
            <button className="btn-edit-profile" onClick={props.onEditProfileClick}>
                Edit Profile
            </button>
        );
    }

    return (
        <button className="btn-partner" onClick={props.onPartnerClick}>
            Partner With Them
        </button>
    );
}

export default ButtonProfile;

