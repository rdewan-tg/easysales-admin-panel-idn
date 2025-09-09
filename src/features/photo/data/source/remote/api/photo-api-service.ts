import {
  axiosAdminInstance,
  getPhotosByFromToDateEndpoint,
  getPhotosByCustomerChainEndpoint,
  getPhotosByDeviceIdEndpoint,
  getPhotosEndpoint,
  getPhotoDevicesEndpoint,
  getPhotoTransDatesEndpoint,
  getPhotoCustomerChainsEndpoint,
} from "@/core/data";
import {
  PhotoDto,
  PhotoFilterCustomerChainDto,
  PhotoFilterDeviceDto,
  PhotoFilterTransDateDto,
} from "../../..";

export const getAllPhotos = async () => {
  const response = await axiosAdminInstance.get<PhotoDto>(getPhotosEndpoint);
  return response.data;
};

export const findPhotosByDeviceId = async (
  fromDate: string,
  toDate: string,
  deviceId: string,
) => {
  const response = await axiosAdminInstance.get<PhotoDto>(
    getPhotosByDeviceIdEndpoint,
    {
      params: { fromDate: fromDate, toDate: toDate, deviceId: deviceId },
    },
  );

  return response.data;
};

export const findPhotosByFromToDate = async (
  fromDate: string,
  toDate: string,
) => {
  const response = await axiosAdminInstance.get<PhotoDto>(
    getPhotosByFromToDateEndpoint,
    {
      params: { fromDate: fromDate, toDate: toDate },
    },
  );

  return response.data;
};

export const findPhotosByCustomerChain = async (
  fromDate: string,
  toDate: string,
  customerChain: string,
) => {
  const response = await axiosAdminInstance.get<PhotoDto>(
    getPhotosByCustomerChainEndpoint,
    {
      params: {
        fromDate: fromDate,
        toDate: toDate,
        customerChain: customerChain,
      },
    },
  );

  return response.data;
};

export const getDevices = async () => {
  const response = await axiosAdminInstance.get<PhotoFilterDeviceDto>(
    getPhotoDevicesEndpoint,
  );

  return response.data;
};

export const getTransDates = async () => {
  const response = await axiosAdminInstance.get<PhotoFilterTransDateDto>(
    getPhotoTransDatesEndpoint,
  );

  return response.data;
};

export const getCustomerChains = async () => {
  const response = await axiosAdminInstance.get<PhotoFilterCustomerChainDto>(
    getPhotoCustomerChainsEndpoint,
  );

  return response.data;
};
