import { useEffect, useRef, useState } from 'react';

type Status = 'SUBMIT' | 'LOADING' | 'DONE' | 'ERROR';

const useSubmit = <T>(
  onSubmit: () => Promise<T>,
  onDone: (args: T) => void,
) => {
  const isMounted = useRef(false);
  const [status, setState] = useState<Status>();

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (status !== 'SUBMIT') return;

    setState('LOADING');

    (async () => {
      try {
        const response = await onSubmit();

        if (!isMounted.current) return;

        onDone(response);
        setState('DONE');
      } catch (error) {
        setState('ERROR');
      }
    })();
  }, [status]);

  const submit = () => {
    if (status === 'SUBMIT') return;
    if (status === 'LOADING') return;

    setState('SUBMIT');
  };

  return {
    submit,
    loading: status === 'LOADING',
    done: status === 'DONE',
    failed: status === 'ERROR',
  };
};

export default useSubmit;
