import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import { ErrorBoundary } from 'react-error-boundary'; 
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

const Main = () => {
  return (
    <div className="max-w-5xl mx-auto relative h-100">
      <header>
        <Nav />
      </header>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <main>
          <Outlet />
        </main>
      </ErrorBoundary>
    </div>
  );
};

export default Main;
