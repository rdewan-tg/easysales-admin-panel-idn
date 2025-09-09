export interface DeviceSettingDto {
  status: string;
  data: DeviceSetting;
}

export interface DeviceSetting {
  id: number;
  deviceId: string;
  userId: number;
  userName: string;
  salesPersonCode: string;
  orderNumberFormat: string;
  createAt: Date;
  updatedAt: Date;
  companyId: number;
}
