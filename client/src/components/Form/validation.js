const validation = (input) => {
    let errors = {};
   // let dif = Number(input.difficulty);
    let duration = Number(input.duration);
  
    
    if (!input.name) errors.name = "Name is required";
    else if (input.name.length < 3) errors.name = "Must have more than three letters";
    else if (/[^A-Za-z0-9 ]+/g.test(input.name))
      errors.name = " Name cannot have special characters or tildes";
  
    if (!input.difficulty) errors.difficulty =  "Difficulty required";
    //else if (dif <= 0 || dif > 5) errors.difficulty = "Must be between 1 and 5";
  
    if (!input.duration) errors.duration = "Duration required";
    else if (duration <= 0 || duration > 24) errors.duration = "Must be between 1 and 24 hours";
  
    if (!input.season) errors.season = "Season required";
  
    if (!input.countries ) errors.countries = "Country or countries required";
  
    return errors;
  }

export default validation;

