class DtoService {
  id: string;
  email: string;
  isActivated: boolean;

  constructor({ ...user }) {
    this.id = user._id;
    this.email = user.email;
    this.isActivated = user.isActivated;
  }
}

export default DtoService;
