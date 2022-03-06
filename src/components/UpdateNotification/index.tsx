import React, { useEffect, useState } from 'react';
import * as serviceWorker from '../../serviceWorkerRegistration';
import { Button, Snackbar } from '@mui/material';

const UpdateNotification: React.FunctionComponent = () => {
  const [showReload, setShowReload] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const onSWUpdate = (registration: ServiceWorkerRegistration) => {
    setShowReload(true);
    setWaitingWorker(registration.waiting);
  };

  useEffect(() => {
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.register({ onUpdate: onSWUpdate });
  }, []);

  const reloadPage = () => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
    setShowReload(false);
    window.location.reload();
  };

  return (
    <Snackbar
      open={showReload}
      message='A new version is available!'
      onClick={reloadPage}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      action={
        <Button color='inherit' size='small' onClick={reloadPage}>
          Reload
        </Button>
      }
    />
  );
};

export default UpdateNotification;
