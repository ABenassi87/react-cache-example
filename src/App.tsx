import React, { useEffect, useState } from 'react';
import './assets/main.css';
import Dashboard from './components/Dashboard/Dashboard';
import * as serviceWorker from './serviceWorker';
import { withSnackbar } from 'notistack';

const App: React.FunctionComponent = (props: any) => {
  const { enqueueSnackbar } = props;
  const [waitingWorker, setWaitingWorker] = useState<any>({});
  const [newVersionAvailable, setNewVersionAvailable] = useState<boolean>(false);

  useEffect(() => {
    serviceWorker.register({ onUpdate: onServiceWorkerUpdate });
    if (newVersionAvailable)
      //show snackbar with refresh button
      enqueueSnackbar('A new version was released', {
        persist: true,
        variant: 'success',
        action: refreshAction(),
      });
  }, []);

  const onServiceWorkerUpdate = (registration: ServiceWorkerRegistration) => {
    setWaitingWorker(registration && registration.waiting);
    setNewVersionAvailable(true);
  };

  const updateServiceWorker = () => {
    waitingWorker && waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    setNewVersionAvailable(false);
    window.location.reload();
  };

  const refreshAction = () => {
    //render the snackbar button
    return (
      <React.Fragment>
        <button className='snackbar-button' onClick={updateServiceWorker}>
          {'refresh'}
        </button>
      </React.Fragment>
    );
  };

  return (
    <div className='App'>
      <Dashboard />
    </div>
  );
};

export default withSnackbar(App);
