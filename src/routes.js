import React from 'react';
import AuthorizedLayout from './AuthorizedLayout';
import PublicLayout from './PublicLayout';

export default (store) => {
  if (!store) throw Error('No store passed to Root');

  return (
    <div>
      {
        store.getState().auth.token

              ?  <AuthorizedLayout
                    // router={router}
                    // action={action}
                    // location={location}
                    store={store}
                  />

              : <PublicLayout
                  // router={router}
                  // action={action}
                  // location={location}
                  store={store}
                />
      }
    </div>
  );
};

      // {
      //   store.getState().auth.token
      //
      //         ? ({ action, location, router }) => <AuthorizedLayout
      //                                               router={router}
      //                                               action={action}
      //                                               location={location}
      //                                               store={store}
      //                                             />
      //
      //         : ({ action, location, router }) => <PublicLayout
      //                                               router={router}
      //                                               action={action}
      //                                               location={location}
      //                                               store={store}
      //                                             />
      // }
