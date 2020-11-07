const { reject } = require("bluebird");
const fs = require("fs");

class TextQuestion {
  constructor(type, title, value, mandatory) {
    this.mandatory = mandatory;
    this.type = type;
    this.title = title;
    this.value = value;
  }
}

class SelectQuestion extends TextQuestion {
  constructor(type, title, value, mandatory, options, description) {
    super(type, title, value, mandatory);
    this.description = description;
    this.options = options;
  }
}
class ChoiceQuestion extends TextQuestion {
  constructor(type, title, value, mandatory, options) {
    super(type, title, value, mandatory);
    this.options = options;
  }
}
class FileQuestion extends TextQuestion {
  constructor(type, title, value, mandatory, archivo) {
    super(type, title, value, mandatory);
    this.archivo = archivo;
  }
}
class GroupedQuestion extends TextQuestion {
  constructor(type, title, value, mandatory, questions) {
    super(type, title, mandatory, value);
    this.questions = questions;
  }
}
class NumberQuestion extends TextQuestion {
  constructor(type, title, value, mandatory, description, restrictions) {
    super(type, title, value, mandatory);
    this.restrictions = restrictions;
    this.description = description;
  }
}

class Preguntas {
  constructor(preguntas) {
    this.preguntas = [];
    this.preguntas.push(preguntas);
  }
}
class objectToSave {
  static sections;
  constructor(id, userId, name, description, status, listaPreguntas) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.description = description;
    this.status = status;
    this.sections = [];
    listaPreguntas.forEach((element) => {
      this.sections.push(element);
    });
  }
}

const devolverJSON = () => {
  let listaPreguntas = [];
  let listaPreguntasTotales = [];
  let tipoText = new TextQuestion(
    "TEXT",
    "Pregunta pregunta?",
    "Siii",
    true
  );
  //let preguntas=new Preguntas(JSON.stringify(tipoText))
  listaPreguntas.push(tipoText);
  let variable = new objectToSave(
    "5",
    "ivanPonce",
    "Cuestionario",
    "Descripcion",
    "completa2",
    listaPreguntas
  );
  listaPreguntasTotales.push(variable);
  //console.log(variable)
  return listaPreguntasTotales;
};

module.exports = {
  devolverJSON
};

//Json parse es para convertir un .json a un objeto de java.
//Stringify es lo viceversa de esto.
