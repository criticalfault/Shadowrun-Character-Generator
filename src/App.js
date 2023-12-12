
import './App.css';
import * as Sentry from "@sentry/react";
import Dashboard from './components/Dashboard';

function App() {
  Sentry.init({
  dsn: "https://34ee2aaefd40613b56d1255ffad6a382@o4506377711452160.ingest.sentry.io/4506377714335744",
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost",/^https:\/\/character-generator\.nullsheen\.com/],
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Session Replay
  replaysSessionSampleRate: 1.0, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
  return (
    <div className="App">
      <h1 className='mainHeader' style={{"paddingLeft":"10px"}}>Shadowrun Character Generator</h1>
      <Dashboard className='dashboard'/>
    </div>
  );
}

export default App;
