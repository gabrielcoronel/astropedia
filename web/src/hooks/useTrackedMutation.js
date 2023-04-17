import { useMutation } from "react-query";

const useTrackedMutation = (fetcher, setIsLoading, setRequestError, options) => {
    const mutation = useMutation(fetcher, {
        onMutate: () => setIsLoading(true),
        onSettled: () => setIsLoading(false),
        onError: (error) => setRequestError(error),
        ...options
    });

    return mutation;
};

export default useTrackedMutation;