import React, { FC } from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import { SignupRoute } from '../constants/routes.constants';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import requester from 'utils/requester';
import IServerError from 'models/ServerError';
import { useAuthFunction } from 'providers/AuthProvider/hooks';
import IUser from 'models/User';

const validateSchema = Yup.object({
  email: Yup.string()
    .required('Please enter your email!')
    .email('Email is not valid. Please enter your email!'),
  password: Yup.string()
    .required('Please enter your password')
    .min(6, 'Password must be least 6 charaters.'),
});

const loginForm = ({ email, password }: { email: string; password: string }) =>
  requester<IUser>('/users/login', {
    body: {
      user: {
        email,
        password,
      },
    },
  });

const SignIn: FC<RouteComponentProps> = () => {
  const { login } = useAuthFunction();
  const [mutate, { error, status }] = useMutation(loginForm, {
    onSuccess: (data: IUser) => {
      login(data);
    },
  });
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    dirty,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      mutate({
        email: values.email,
        password: values.password,
      });
    },
    validationSchema: validateSchema,
  });
  const serverError: IServerError | undefined = error as
    | IServerError
    | undefined;
  const isLoading = isSubmitting || status === 'loading';
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <Link to={SignupRoute}>Need an account?</Link>
            </p>

            {serverError && serverError.errors && (
              <ul className="error-messages">
                {Object.keys(serverError.errors).map((key: string) => {
                  const listError = serverError.errors[key];
                  return (
                    <React.Fragment key={key}>
                      {listError.map((subKey: string) => (
                        <li key={`${subKey}`}>{`${key} ${subKey}`}</li>
                      ))}
                    </React.Fragment>
                  );
                })}
              </ul>
            )}
            <form onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <input
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isLoading}
                  className="form-control form-control-lg"
                  type="text"
                  value={values.email}
                  placeholder="Email"
                />
                {touched.email && errors.email && (
                  <span style={{ color: 'red' }}>{errors.email}</span>
                )}
              </fieldset>
              <fieldset className="form-group">
                <input
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isLoading}
                  value={values.password}
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
                {touched.password && errors.password && (
                  <span style={{ color: 'red' }}>{errors.password}</span>
                )}
              </fieldset>
              <button
                disabled={!dirty || isLoading}
                type="submit"
                className="btn btn-lg btn-primary pull-xs-right"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
