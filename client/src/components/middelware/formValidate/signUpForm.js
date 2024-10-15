const signUpForm = (name, email, ville, password) => {
    if (!name || !email || !ville || !password) {
        return false
    } else {
        if (name.length > 20) {
            return " name should be < = 20 "
        } else if (ville.length > 15) {
            return " ville should be < 15  caractére  "
        } else {
            return true
        }
    }
}

export default signUpForm;