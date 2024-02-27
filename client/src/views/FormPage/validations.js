export const validateForename = (value) => {
    if (value.trim() === "") {
      return "El nombre es obligatorio";
    }
    if (!/^[A-Za-z]+$/.test(value)) {
      return "El nombre debe contener solo letras";
    }
    return "";
  };
  
  export const validateSurname = (value) => {
    if (value.trim() === "") {
      return "El apellido es obligatorio";
    }
    if (!/^[A-Za-z]+$/.test(value)) {
      return "El apellido debe contener solo letras";
    }
    return "";
  };
  
  export const validateDob = (value) => {
    if (value.trim() === "") {
      return "La fecha de nacimiento es obligatoria";
    }
  
    const dateParts = value.split("-");
    if (dateParts.length !== 3) {
      return "Formato de fecha no válido. Use el formato DD-MM-YYYY";
    }
  
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);
  
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return "Formato de fecha no válido. Use el formato DD-MM-YYYY";
    }
  
    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1800) {
      return "Fecha de nacimiento no válida";
    }
  
    return "";
  };
  
  export const validateDescription = (value) => {
    if (typeof value !== "string") {
      return "La descripción debe ser un texto";
    }
    return "";
  };
  
  export const validateNationality = (value) => {
    if (typeof value !== "string") {
      return "La nacionalidad debe ser un texto";
    }
  
    if (/\d/.test(value)) {
      return "La nacionalidad no debe contener números";
    }
    return "";
  };
  
  export const validateImage = (value) => {
    if (typeof value !== "string") {
      return "La imagen debe ser una URL";
    }
  
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  
    if (!urlPattern.test(value) ) {
      return "La imagen no es una URL válida";
    }
  
    return "";
  };
  