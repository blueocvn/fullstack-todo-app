import React from 'react';
import { AppHeader } from '../../AppHeader';

const withAppHeader = (WrappedComponent: React.ComponentType) => {
  return (props: JSX.IntrinsicAttributes) => {
    return (
      <>
        <AppHeader />
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withAppHeader;
