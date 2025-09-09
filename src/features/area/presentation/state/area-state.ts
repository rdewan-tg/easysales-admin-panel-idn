import { AreaData } from "../../data/source/remote/dto/area.dto";
import { CreateAreaDto } from "../../data/source/remote/dto/create-area.dto";
import { UpdateAreaDto } from "../../data/source/remote/dto/update-area.dto";

export type AreaState = {
    areas: AreaData[];
    area: AreaData | null;
    loading: boolean;
    isCreated: boolean | null;
    isUpdated: boolean | null;
    isDeleted: boolean | null;
    isUserAreaSet: boolean | null;
    isUserAreaRemoved: boolean | null;
    selectedArea: string | null;
    error: string | null;
    getAreas: () => Promise<void>;
    getAreaById: (id: number) => Promise<void>;
    createArea: (area: CreateAreaDto) => Promise<void>;
    createManyArea: (area: CreateAreaDto[]) => Promise<void>;
    updateArea: (area: UpdateAreaDto) => Promise<void>;
    deleteArea: (id: number) => Promise<void>;
    setUserArea: (userId: number, areaId: number) => Promise<void>;
    deleteUserArea: (userId: number, areaId: number) => Promise<void>;
    setSelectedArea: (area: string | null) => void;
};