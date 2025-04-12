import { useHistory, useLocation, useParams } from 'react-router-dom';

export function useCustomRouter() {
  const history = useHistory();
  const location = useLocation();
  const params = useParams<Record<string, string>>();

  return {
    push: (path: string) => history.push(path),
    replace: (path: string) => history.replace(path),
    location,
    params,
    pathname: location.pathname,
    query: {
      ...Object.fromEntries(new URLSearchParams(location.search)),
      ...params,
    },
    asPath: location.pathname + location.search + location.hash,
    back: () => history.goBack(),
  };
}

// For compatibility with existing code
export const useRouter = useCustomRouter;
