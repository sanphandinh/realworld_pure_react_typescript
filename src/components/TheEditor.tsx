import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useUpdateArticle from '../hooks/useUpdateArticle';
import { queryCache } from 'react-query';
import IArticleResponse from 'models/ArticleResponse';
import InputTag from './InputTag';
import { useNavigate } from '@reach/router';

type Props = {
  slug?: string;
  title?: string;
  body?: string;
  tagList?: string[];
  description?: string;
};

const validateSchema = Yup.object({
  title: Yup.string().trim().required('Please enter your article title.'),
  description: Yup.string()
    .trim()
    .required('Please enter your article description'),
  body: Yup.string().required('Please enter your article body'),
  tagList: Yup.array().min(1, 'Please enter a least tag'),
});

const TheEditor: React.FC<Props> = ({
  title = '',
  description = '',
  body = '',
  tagList = [],
  ...rest
}) => {
  const navigate = useNavigate();
  const { handleCreate, handleUpdate } = useUpdateArticle({
    options: {
      onMutate: (variables) => {
        const { data, slug } = variables;
        const previousValue = { title, description, body, tagList, ...rest };
        if (slug) {
          queryCache.setQueryData<IArticleResponse>(
            `article/${slug}`,
            (oldData) => {
              if (!oldData) return undefined;
              return {
                article: {
                  ...oldData.article,
                  ...data,
                },
              };
            }
          );
        }
        return previousValue;
      },
      onError: (_error, variables, previousValue) => {
        if (variables?.slug) {
          queryCache.setQueryData(`article/${variables?.slug}`, previousValue);
        }
      },
      onSettled: (_data, _error, variables) => {
        queryCache.invalidateQueries(`article/${variables?.slug}`);
      },
    },
  });
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <Formik
              initialValues={{ title, description, body, tagList }}
              enableReinitialize
              validationSchema={validateSchema}
              onSubmit={async (values, { setSubmitting }) => {
                const dataConverted = await validateSchema.cast(values);
                if (!dataConverted) return;
                if (rest.slug) {
                  handleUpdate(
                    {
                      ...values,
                      slug: rest.slug,
                    },
                    {
                      onSettled: () => {
                        setSubmitting(false);
                      },
                    }
                  );
                } else {
                  handleCreate(values, {
                    onSettled: (data) => {
                      setSubmitting(false);
                      if (data?.article?.slug) {
                        navigate(`/editor/${data?.article?.slug}`);
                      }
                    },
                  });
                }
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
                setFieldValue,
              }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <fieldset>
                      <fieldset className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Article Title"
                          name="title"
                          value={values.title}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        />
                        {touched.title && errors.title && (
                          <span style={{ color: 'red' }}>{errors.title}</span>
                        )}
                      </fieldset>
                      <fieldset className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="What's this article about?"
                          name="description"
                          value={values.description}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        />
                        {touched.description && errors.description && (
                          <span style={{ color: 'red' }}>
                            {errors.description}
                          </span>
                        )}
                      </fieldset>
                      <fieldset className="form-group">
                        <textarea
                          className="form-control"
                          rows={8}
                          placeholder="Write your article (in markdown)"
                          name="body"
                          value={values.body}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        />
                        {touched.body && errors.body && (
                          <span style={{ color: 'red' }}>{errors.body}</span>
                        )}
                      </fieldset>
                      <fieldset className="form-group">
                        <InputTag
                          name="tagList"
                          className="form-control"
                          placeholder="Enter tags"
                          value={values.tagList}
                          onBlur={handleBlur}
                          onChange={(value) => {
                            setFieldValue('tagList', value);
                          }}
                          disabled={isSubmitting}
                        />
                        <div className="tag-list"></div>
                        {touched.tagList && errors.tagList && (
                          <span style={{ color: 'red' }}>{errors.tagList}</span>
                        )}
                      </fieldset>
                      <button
                        disabled={isSubmitting || !dirty}
                        type="submit"
                        className="btn btn-lg pull-xs-right btn-primary">
                        Publish Article
                      </button>
                    </fieldset>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheEditor;
