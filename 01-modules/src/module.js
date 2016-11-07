export function valid(email) {
  var regex = /(([a-z]+)([\.]{1})([a-z]{3})([\-]{1})([m|b]{1})([\d]{4})([@]{1})(fh-salzburg.ac.at))/;
  return regex.test(email);
}

export function degreeProgram(email) {

  var regex = /(([\.]{1})([a-z]{3}))/;

  //ich kenne nicht alle endungen der studiengänge... würde aber auf alle angewendet werden können

  switch(email.match(regex)[3]) {
    case "mmt":
      return "MMT";
    case "mma":
      return "MMA";
    default:
      return "error";
  }
}

export function level(email) {
  var regex = /(([\-]{1})([m|b]{1}))/;

  //ich kenne nicht alle endungen der studiengänge... würde aber auf alle angewendet werden können

  switch(email.match(regex)[3]) {
    case "b":
      return "BA";
    case "m":
      return "MA";
    default:
      return "error not a valid fh salzburg email";
  }
}

export function graduationYear(email) {

  var actualYear = new Date().getFullYear();

  var regexLevel = /(([\-]{1})([m|b]{1}))/;
  var regexYear = /(\d{4})/;
  var studentsYear = email.match(regexYear)[0];

  var yearCount = actualYear-parseInt(studentsYear);


  switch(email.match(regexLevel)[3]) {
    case "b":
      if(yearCount == 0) return actualYear+3;
      else if(yearCount == 1) return actualYear+2;
      else if(yearCount == 2) return actualYear+1;
      else if(yearCount == 3) return actualYear;
      else if(yearCount > 3) return "graduated in past";
      else if(yearCount < 0) return "error not a valid fh salzburg email";
    case "m":
      if(yearCount == 0) return actualYear+3;
      else if(yearCount == 1) return actualYear+2;
      else if(yearCount == 2) return actualYear+1;
      else if(yearCount == 3) return actualYear;
      else if(yearCount > 3) return "graduated in past";
      else if(yearCount < 0) return "error not a valid fh salzburg email";
    default:
      return "error not a valid fh salzburg email";
  }
}

