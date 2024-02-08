import { useRouter } from 'next/router';

// Define a function to retrieve the pid parameter
export const getPidFromRouter = (): string | undefined => {
    const router = useRouter();
    console.log(router.query);
    return router.query.pid as string;
};
