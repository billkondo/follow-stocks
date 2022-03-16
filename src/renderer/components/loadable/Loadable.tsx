import { ComponentType, Suspense } from 'react';
import Loader from './Loader';

const Loadable =
  <Props extends object>(Component: ComponentType<Props>) =>
  (props: Props) => {
    return (
      <Suspense fallback={<Loader />}>
        <Component {...props} />
      </Suspense>
    );
  };

export default Loadable;
