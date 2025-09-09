import { axiosAdminInstance, getSiteVisitListEndpoint } from "@/core/data";
import { SiteVisitDto } from "../dto/site-visit.dto";


export const getSiteVisits = async (fromDate: string, toDate: string) => {
    const response = await axiosAdminInstance.get<SiteVisitDto>(getSiteVisitListEndpoint, {
        params: {
            fromDate,
            toDate
        }
    });
    return response.data;
}
