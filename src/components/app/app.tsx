import { HistDataWidget } from '../../pages/HistDataWidget/HistDataWidget';
import { histDataExample } from '../../constants/historic-dates';

import * as appstyle from './app.scss';

function App() {
  return (
    <div className={appstyle.app}>
      <HistDataWidget data={histDataExample}/>
    </div>
  );
}

export default App;
