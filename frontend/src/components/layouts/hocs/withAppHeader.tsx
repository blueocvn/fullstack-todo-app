import React from 'react';
import { AppHeader } from '../../AppHeader';

const withAppHeader = (WrappedComponent: React.ComponentType) => {
  return (props: JSX.IntrinsicAttributes) => {
    return (
      <>
        <AppHeader />
        <div className="w-3/5 mx-auto mt-5">
          <WrappedComponent {...props} />
        </div>
      </>
    );
  };
};

export default withAppHeader;
