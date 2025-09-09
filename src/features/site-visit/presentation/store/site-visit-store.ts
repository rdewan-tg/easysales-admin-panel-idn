import { create } from "zustand";
import { SiteVisitState } from "../state/site-visit-state";
import { getSiteVisits } from "../../data";
import { createSelectors } from "@/core/data";



const useSiteVisitStore = create<SiteVisitState>((set) => ({
    siteVisits: [],
    isLoading: false,
    error: null,
    getSiteVisits: async (fromDate: string, toDate: string) => {
        try {
            set({ isLoading: true });
            const response = await getSiteVisits(fromDate, toDate);
            set({ siteVisits: response.data });
        } catch (error) {
            const errorMessage = (error as Error).message;
            set({ error: errorMessage, isLoading: false });
            setTimeout(() => {
                set({ error: null });
            }, 5000);
        } finally {
            set({ isLoading: false });
        }
    },
}))

export default createSelectors(useSiteVisitStore);