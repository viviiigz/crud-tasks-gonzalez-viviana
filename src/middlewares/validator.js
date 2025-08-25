import { validationResult } from "express-validator";


//revisamos la solicitud
export const validator = (req, res, next) => {
    //dame el resultado de la validacion
  const result = validationResult(req);


  //si el resultado no esta vacio, es decir si hay errores
  if (!result.isEmpty()) {

    //entonces deten y envia la respuesta con los errores 
    return res.json({ errors: result.mapped() });
  }
//si el if es falso, entonces next 
  next();
};