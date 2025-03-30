import "./App.css";
import * as Sentry from "@sentry/react";
import Dashboard from "./components/Dashboard";
import { Container } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme();

// const useStyles = makeStyles((theme) => {
//   root: {
//     // some CSS that accesses the theme
//   }
// });

function App() {
  //   Sentry.init({
  //   dsn: "https://34ee2aaefd40613b56d1255ffad6a382@o4506377711452160.ingest.sentry.io/4506377714335744",
  //   integrations: [
  //     new Sentry.Feedback({
  //       // Additional SDK configuration goes in here, for example:
  //       colorScheme: "light",
  //     }),
  //     new Sentry.BrowserTracing({
  //       // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  //       tracePropagationTargets: ["localhost",/^https:\/\/character-generator\.nullsheen\.com/],
  //     }),
  //     new Sentry.Replay({
  //       maskAllText: false,
  //       blockAllMedia: false,
  //     }),
  //   ],
  //   // Performance Monitoring
  //   tracesSampleRate: 1.0, //  Capture 100% of the transactions
  //   // Session Replay
  //   replaysSessionSampleRate: 1.0, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  //   replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  // });
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <Container maxWidth="2xl" sx="mx-auto">
        <h1
          className="mainHeader"
          style={{
            paddingLeft: "48px",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          Shadowrun Character Generator
        </h1>
        <Dashboard className="dashboard" />
      </Container>
    </div>
    </ThemeProvider>
  );
}

export default App;
