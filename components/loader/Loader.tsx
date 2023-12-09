import { create } from "zustand";
import { Dialog, DialogContent, CircularProgress, Box } from '@mui/material';
import { FunctionComponent, ReactNode } from "react";
import Lottie from "lottie-react";
import LoaderLottie from "@/assets/json/loader_lottie.json";

const Loader: React.FunctionComponent = () => {
    return (
        <Dialog
            open
            PaperProps={{
                style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                }
            }}
        >
            <DialogContent>
                <Box sx={{ textAlign: 'center', width: 200, height: 200 }}>
                    <Lottie animationData={LoaderLottie} loop={true} />
                </Box>
            </DialogContent>
        </Dialog>
    );
};

interface UseLoader {
    isLoading: boolean;
    getIsloading: () => boolean;
    setIsloading: (isLoading: boolean) => void;
    openLoader: () => void;
    closeLoader: () => void;
    LoaderComponent: FunctionComponent<{}>;
}

export const useLoader = create<UseLoader>((set, get) => ({
    isLoading: false,
    getIsloading: () => get().isLoading,
    setIsloading: (isLoading: boolean) => set({ isLoading }),

    openLoader: () => {
        set({isLoading: true});
    },

    closeLoader: () => {
        set({isLoading: false});
    },

    LoaderComponent: (): ReactNode => {
        return get().isLoading ? <Loader /> : null;
    },

}));

export default useLoader;