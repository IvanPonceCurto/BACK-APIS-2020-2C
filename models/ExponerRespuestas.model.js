const { reject } = require('bluebird');
const fs=require('fs')


 
 

class textQuestion {
       constructor(type,title,value,mandatory){
            this.mandatory=mandatory;
            this.type=type;
            this.title=title;
            this.value=value;
       }
}
const hacerPreguntas=(tipoPregunta,listaPropiedades)=>{
    switch (tipoPregunta) {
        case tipoPregunta==="select":
            class SelectQuestion extends Preguntas{
                constructor(type,title,value,mandatory,options,description){
                    super(type,title,value,mandatory)
                    this.description=description;
                    this.options=options;
            }}
            return new SelectQuestion(); 
            break;   
        
    case tipoPregunta==="choice":
        class ChoiceQuestion extends Preguntas{
            constructor(type,title,value,mandatory,options){
                super(type,title,value,mandatory)
                this.options=options;
            }
        }
        return new ChoiceQuestion();
    case tipoPregunta==="file":
        class FileQuestion extends Preguntas{
            constructor(type,title,value,mandatory,archivo){
                super(type,title,value,mandatory)
                this.archivo=archivo;
            }
        }
        return FileQuestion(listaPropiedades.type,listaPropiedades.title,listaPropiedades.value,listaPropiedades.mandatory,listaPropiedades.archivo);
    case tipoPregunta==="grouped":
        class GroupedQuestion extends Preguntas{
            constructor(type,title,value,mandatory,questions){
                super(type,title,mandatory,value)
                this.questions=questions;
            }
        }
        return new GroupedQuestion(listaPropiedades.type,
            listaPropiedades.title,
            listaPropiedades.value,listaPropiedades.mandatory,
            listaPropiedades.options);
  
    case tipoPregunta==="number":
        class NumberQuestion extends Preguntas{
            constructor(type,title,value,mandatory,description,restrictions){
                super(type,title,value,mandatory)
                this.restrictions=restrictions;
                this.description=description;
            }
        }
        return new NumberQuestion(listaPropiedades.type,
            listaPropiedades.title,
            listaPropiedades.value,listaPropiedades.mandatory,
            listaPropiedades.description,
            listaPropiedades.restrictions);
    default:
        return undefined;
}
}

class Preguntas{
    constructor(preguntas){
        this.preguntas=[]
        this.preguntas.push(preguntas)
    }
}
class objectToSave{
    static sections;
    constructor(id,userId,name,description,status,listaPreguntas){
        this.id=id;
        this.userId=userId;
        this.name=name;
        this.description=description;
        this.status=status;
        this.sections=[];
        listaPreguntas.forEach(element => {
            this.sections.push(element)
        });
    
        
    }
}




const devolverJSON=()=>{
    let listaPreguntas=[];
    let listaPreguntasTotales=[];
    let tipoText=new textQuestion("TEXT","Es acaso el Fares el peronista N°1?","SEEE PADREEE",true);
    //let preguntas=new Preguntas(JSON.stringify(tipoText))
    listaPreguntas.push(JSON.stringify(tipoText))
    let variable=new objectToSave("5","ivanPonce","Cuestionario","Descripcion","completa2",listaPreguntas)
    listaPreguntasTotales.push(variable)
    //console.log(variable)
    return listaPreguntasTotales;
}


 module.exports={
     devolverJSON,
     hacerPreguntas
 }





//Json parse es para convertir un .json a un objeto de java.
//Stringify es lo viceversa de esto.
