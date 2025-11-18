import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Survey from './Survey.jsx';
import StressDetails from './components/StressDetails.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*<StressDetails stress={"Eustress"} />*/}
    <Survey />
  </StrictMode>,
)
