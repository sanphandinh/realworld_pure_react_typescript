import React, { useCallback } from 'react';
import { useAuthState, useRequester } from 'providers/AuthProvider/hooks';
import Comment from 'models/Comment';
import { useMutation, queryCache } from 'react-query';
import { MethodTypes } from 'utils/requester';
import { Formik, Form } from 'formik';

type IResponseAddComment = {
  comment: Comment;
};

type Props = {
  slug: string;
};

const TheCommentPoster: React.FC<Props> = ({ slug }) => {
  const url = `articles/${slug}/comments`;
  const { user } = useAuthState();
  const requester = useRequester<IResponseAddComment>();
  const addComment = useCallback(
    (comment) => {
      return requester(url, {
        method: MethodTypes.POST,
        body: {
          comment: {
            body: comment,
          },
        },
      });
    },
    [requester, url]
  );
  const [mutate, { isLoading, reset }] = useMutation(addComment);
  if (!user) return null;
  return (
    <Formik
      initialValues={{ body: '' }}
      onSubmit={async (values, formikBag) => {
        mutate(values.body, {
          onSuccess: (data) => {
            const previousData = queryCache.getQueryData(url) as {
              comments: Array<Comment>;
            };
            queryCache.setQueryData(url, {
              comments: [...previousData.comments, data],
            });
          },
          onError: (err, variables, previousValue) => {
            queryCache.setQueryData(url, previousValue);
          },
          onSettled: () => {
            queryCache.invalidateQueries(url);
            //Reset form after mutate
            reset();
            formikBag.resetForm();
          },
        });
      }}>
      {({
        isSubmitting,
        values,
        dirty,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Form onSubmit={handleSubmit} className="card comment-form">
          <div className="card-block">
            <textarea
              disabled={isSubmitting || isLoading}
              name="body"
              className="form-control"
              placeholder="Write a comment..."
              rows={3}
              value={values.body}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div className="card-footer">
            <img
              src={user.image}
              className="comment-author-img"
              alt="author icon"
            />
            <button
              type="submit"
              className="btn btn-sm btn-primary"
              disabled={isSubmitting || isLoading || !dirty}>
              Post Comment
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TheCommentPoster;
