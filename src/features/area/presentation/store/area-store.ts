import { create } from "zustand";
import { AreaState } from "../state/area-state";
import { CreateAreaDto } from "../../data/source/remote/dto/create-area.dto";
import { UpdateAreaDto } from "../../data/source/remote/dto/update-area.dto";
import {
  createArea as createAreaApi,
  createManyArea as createManyAreaApi,
  getAreas as getAreaApi,
  getAreaById as getAreaByIdApi,
  updateArea as updateAreaApi,
  deleteArea as deleteAreaApi,
  setUserArea as setUserAreaApi,
  deleteUserArea as deleteUserAreaApi,
} from "../../data/source/remote/api/area-api";
import { createSelectors } from "@/core/data";

const useAreaStore = create<AreaState>((set) => ({
  areas: [],
  area: null,
  loading: false,
  isCreated: null,
  isUpdated: null,
  isDeleted: null,
  isUserAreaSet: null,
  isUserAreaRemoved: null,
  error: null,
  selectedArea: null,
  getAreas: async () => {
    try {
      set({ loading: true, error: null });
      const response = await getAreaApi();
      set({ areas: response.data, loading: false });
    } catch (error) {
      set({ error: error as string });
      setTimeout(() => {
        set({ error: null });
      }, 5000);
    } finally {
      set({ loading: false });
    }
  },
  getAreaById: async (id: number) => {
    try {
      set({ loading: true, error: null });
      const response = await getAreaByIdApi(id);
      set({ area: response.data, loading: false });
    } catch (error) {
      set({ error: error as string });
      setTimeout(() => {
        set({ error: null });
      }, 5000);
    } finally {
      set({ loading: false });
    }
  },
  createArea: async (area: CreateAreaDto) => {
    try {
      set({ loading: true, error: null });
      const response = await createAreaApi(area);
      set({ area: response.data, loading: false, isCreated: true });
      setTimeout(() => {
        set({ isCreated: false });
      }, 3000);
    } catch (error) {
      set({ error: error as string });
      setTimeout(() => {
        set({ error: null });
      }, 5000);
    } finally {
      set({ loading: false });
    }
  },
  createManyArea: async (area: CreateAreaDto[]) => {
    try {
      set({ loading: true, error: null });
      const response = await createManyAreaApi(area);
      set({ area: response.data, loading: false, isCreated: true });
      setTimeout(() => {
        set({ isCreated: false });
      }, 3000);
    } catch (error) {
      set({ error: error as string });
      setTimeout(() => {
        set({ error: null });
      }, 5000);
    } finally {
      set({ loading: false });
    }
  },
  updateArea: async (area: UpdateAreaDto) => {
    try {
      set({ loading: true, error: null });
      const response = await updateAreaApi(area);
      set({ area: response.data, loading: false, isUpdated: true });
      setTimeout(() => {
        set({ isUpdated: false });
      }, 3000);
    } catch (error) {
      set({ error: error as string });
      setTimeout(() => {
        set({ error: null });
      }, 5000);
    } finally {
      set({ loading: false });
    }
  },
  deleteArea: async (id: number) => {
    try {
      set({ loading: true, error: null });
      const response = await deleteAreaApi(id);
      set({ area: response.data, loading: false, isDeleted: true });
      setTimeout(() => {
        set({ isDeleted: false });
      }, 3000);
    } catch (error) {
      set({ error: error as string });
      setTimeout(() => {
        set({ error: null });
      }, 5000);
    } finally {
      set({ loading: false });
    }
  },
  setUserArea: async (userId: number, areaId: number) => {
    try {
      set({ loading: true, error: null });
      const response = await setUserAreaApi(userId, areaId);
      set({ area: response.data, loading: false, isUserAreaSet: true });
      setTimeout(() => {
        set({ isUserAreaSet: false });
      }, 3000);
    } catch (error) {
      set({ error: error as string });
      setTimeout(() => {
        set({ error: null });
      }, 5000);
    } finally {
      set({ loading: false });
    }
  },
  deleteUserArea: async (userId: number, areaId: number) => {
    try {
      set({ loading: true, error: null });
      const response = await deleteUserAreaApi(userId, areaId);
      set({ area: response.data, loading: false, isUserAreaRemoved: true });
      setTimeout(() => {
        set({ isUserAreaRemoved: false });
      }, 3000);
    } catch (error) {
      set({ error: error as string });
      setTimeout(() => {
        set({ error: null });
      }, 5000);
    } finally {
      set({ loading: false });
    }
  },
  setSelectedArea: (area: string | null) => {
    set({ selectedArea: area });
  },
}));

export default createSelectors(useAreaStore);
