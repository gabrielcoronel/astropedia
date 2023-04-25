import { useMutation } from "react-query";

// Hook que construye encima de useMutation de react-query
// para manejar las mutaciones de una manera conveniente
// con estado de carga y estado de error
const useTrackedMutation = (fetcher, setIsLoading, setRequestError, options) => {
    // Se usa el hook con la configuración en específico
    const mutation = useMutation(fetcher, {
        onMutate: () => setIsLoading(true),
        onSettled: () => setIsLoading(false),
        onError: (error) => setRequestError(error),
        ...options
    });

    // Se devuelve el resultado del hook
    return mutation;
};

export default useTrackedMutation;