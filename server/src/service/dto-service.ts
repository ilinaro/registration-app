import { DtoModelT } from "../types/dto";

export interface DtoServiceT {
  id: string;
  email: string;
  isActivated: boolean;
}

class DtoService {
  id: string;
  email: string;
  isActivated: boolean;

  constructor(model: DtoModelT) {
    this.id = model._id;
    this.email = model.email;
    this.isActivated = model.isActivated;
  }
}

export default DtoService as new (model: DtoModelT) => DtoServiceT;
