const AddDevForm = (name, description, number, image) => {
  if (!name || !description | !number || !image) {
    return false
  } else {
    if (description.length > 200) {
      return " Description should be < = 200 "
    } else if (number.length !== 8) {
      return " Number should be 8 chiffre  "
    }
    else if (!(["9", "2", "4", "5"].includes(number.charAt(0)))) {
      return " Number should be type of telecom/orange/ooredoo "

    } else {
      return true
    }
  }
}

export default AddDevForm;