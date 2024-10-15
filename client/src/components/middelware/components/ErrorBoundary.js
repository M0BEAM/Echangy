import { useState, useEffect } from 'react';

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const originalError = console.error;
    console.error = (...args) => {
      setHasError(true);
      originalError(...args);
    };
    return () => (console.error = originalError);
  }, []);

  if (hasError) {
    return <h1>Something went wrong.</h1>;
  }
  return children;
}
export default ErrorBoundary