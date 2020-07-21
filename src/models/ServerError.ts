interface IServerError {
  errors: {
    [id: string]: Array<any>;
  };
}

export default IServerError;
