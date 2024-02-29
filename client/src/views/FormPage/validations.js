const validations = (input) => {
  const errors = {};
  const nameRegex = /^[a-zA-Z0-9\_\-\s]{4,30}$/;
  const nationalityRegex = /^[a-zA-Z0-9]+(?:\s*,\s*[a-zA-Z0-9]+)*$/;
  const imageRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  // Validacion de nombre
  if (!input.forename) {
      errors.forename = "Please enter a name";
  } else if (input.forename.length >= 40) {
      errors.forename = "Name should be less than 40 characters";
  } else if (!nameRegex.test(input.forename)) {
      errors.forename = "Name can only contain letters, numbers, spaces, underscores, and hyphens";
  }

  // Validacion de apellido
  if (!input.surname) {
      errors.surname = "Please enter a surname";
  } else if (input.surname.length >= 40) {
      errors.surname = "Surname should be less than 40 characters";
  } else if (!nameRegex.test(input.surname)) {
      errors.surname = "Surname can only contain letters, numbers, spaces, underscores, and hyphens";
  }

  // Validacion de descripción
  if (!input.description) {
      errors.description = "Please enter a description";
  }

  // Validacion de nacionalidad
  if (!input.nationality) {
      errors.nationality = "Please enter a nationality";
  }

  // Validacion de equipos
  if (!input.teams) {
      errors.teams = "Please enter at least one team";
  }

  // Validacion de fecha de nacimiento
  if (!input.dob) {
      errors.dob = "Please enter a birthdate";
  }

  // Validacion de imagen
  if (input.image && !imageRegex.test(input.image)) {
      errors.image = "Please enter a valid image URL";
  }

  return errors;
};

export default validations;

