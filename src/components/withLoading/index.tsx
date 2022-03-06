import React, { ComponentType } from 'react';

function withLoading<T>(WrappedComponent: ComponentType<T>) {
  return (hocProps: T) => (
    <React.Suspense fallback={<>Loading</>}>
      <WrappedComponent {...hocProps} />
    </React.Suspense>
  );
}

export default withLoading;
