import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import useGetCurrentUser from 'hooks/useGetCurrentUser';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import useUpdateUser from 'hooks/useUpdateUser';
import { queryCache } from 'react-query';
import IUserResponse from 'models/UserResponse';
const validateSchema = Yup.object({
  image: Yup.string().trim().url('Please enter your image url'),
  username: Yup.string()
    .required('Please enter your username')
    .trim()
    .min(6, 'Please enter your username at least 6 characters')
    .max(20, 'Please enter your username at largest 20 character'),
  bio: Yup.string().trim().required('Please enter some description about you'),
  email: Yup.string()
    .trim()
    .required('Please enter your email!')
    .email('Email is not valid. Please enter your email!'),
  password: Yup.string().trim().min(6, 'Password must be least 6 charaters.'),
});

const Settings: FC<RouteComponentProps> = () => {
  const { data, isLoading } = useGetCurrentUser();
  const { updateCurrentUser } = useUpdateUser({
    onMutate: (variables) => {
      const previousValue = data;
      queryCache.setQueryData<IUserResponse>('user', (oldData) => {
        if (!oldData) return undefined;
        return {
          user: {
            ...oldData.user,
            ...variables,
          },
        };
      });
      return previousValue;
    },
    onError: (err, variables, previousValue) =>
      queryCache.setQueryData('user', previousValue),
    onSettled: () => {
      queryCache.invalidateQueries('user');
    },
  });
  const user = data?.user;
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <Formik
              initialValues={{
                image: user?.image || '',
                username: user?.username || '',
                bio: user?.bio || '',
                email: user?.email || '',
                password: '',
              }}
              enableReinitialize
              validationSchema={validateSchema}
              onSubmit={async (values, { setSubmitting }) => {
                const dataConverted = await validateSchema.cast(values);
                if (!dataConverted) return;
                updateCurrentUser(dataConverted, {
                  onSettled: () => {
                    setSubmitting(false);
                  },
                });
              }}>
              {({
                values,
                handleBlur,
                handleChange,
                handleSubmit,
                dirty,
                errors,
                isSubmitting,
                touched,
              }) => {
                return (
                  <Form onSubmit={handleSubmit}>
                    <fieldset>
                      <fieldset className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="URL of profile picture"
                          name="image"
                          value={values.image}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          disabled={isLoading || isSubmitting}
                        />
                        {touched.image && errors.image && (
                          <span style={{ color: 'red' }}>{errors.image}</span>
                        )}
                      </fieldset>
                      <fieldset className="form-group">
                        <input
                          className="form-control form-control-lg"
                          type="text"
                          placeholder="Your Username"
                          name="username"
                          value={values.username}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          disabled={isLoading || isSubmitting}
                        />
                        {touched.username && errors.username && (
                          <span style={{ color: 'red' }}>
                            {errors.username}
                          </span>
                        )}
                      </fieldset>
                      <fieldset className="form-group">
                        <textarea
                          className="form-control form-control-lg"
                          rows={8}
                          placeholder="Short bio about you"
                          name="bio"
                          value={values.bio}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          disabled={isLoading || isSubmitting}
                        />
                        {touched.bio && errors.bio && (
                          <span style={{ color: 'red' }}>{errors.bio}</span>
                        )}
                      </fieldset>
                      <fieldset className="form-group">
                        <input
                          className="form-control form-control-lg"
                          type="text"
                          placeholder="Email"
                          name="email"
                          value={values.email}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          disabled={isLoading || isSubmitting}
                        />
                        {touched.bio && errors.bio && (
                          <span style={{ color: 'red' }}>{errors.bio}</span>
                        )}
                      </fieldset>
                      <fieldset className="form-group">
                        <input
                          className="form-control form-control-lg"
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={values.password}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          disabled={isLoading || isSubmitting}
                        />
                        {touched.password && errors.password && (
                          <span style={{ color: 'red' }}>
                            {errors.password}
                          </span>
                        )}
                      </fieldset>
                      <button
                        type="submit"
                        disabled={isLoading || isSubmitting || !dirty}
                        className="btn btn-lg btn-primary pull-xs-right">
                        Update Settings
                      </button>
                    </fieldset>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
