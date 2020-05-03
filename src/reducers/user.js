const user = (state = {}, {
    type, name, token,
}) => {
    switch (type) {
    case "SET_USER":
        return {
            name,
            token,
        };
    default:
        return state;
    }
};

export default user;
