// activity log
export const getActivityLogsEndpoint: string = "/v1/api/activity-logs";
export const createActivityLogEndpoint: string = "/v1/api/activity-logs";
// auth
export const loginEndpoint: string = "/v1/api/admin/auth/login";
export const checkAuthStateEndpoint: string = "/v1/api/admin/auth/check";
export const getMyRolesEndpoint: string = "/v1/api/admin/roles/my-roles";
export const logoutEndpoint: string = "/v1/api/admin/auth/logout";
// company
export const getCompaniesEndpoint: string = "/v1/api/company";
export const createCompanyEndpoint: string = "/v1/api/company";
export const updateCompanyEndpoint: string = "/v1/api/company";
export const deleteCompanyEndpoint: string = "/v1/api/company";
// country
export const getCountriesEndpoint: string = "/v1/api/admin/countries";
export const createCountryEndpoint: string = "/v1/api/admin/countries";
// device setting
export const getDeviceSettingsEndpoint: string = "/v1/api/admin/device-setting";
export const getDeviceSettingByIdEndpoint: string =
  "/v1/api/admin/device-setting";
export const findByDeviceIdEndpoint: string = "/v1/api/device-setting/find";
export const createDeviceSettingEndpoint: string =
  "/v1/api/admin/device-setting";
export const updateDeviceSettingEndpoint: string =
  "/v1/api/admin/device-setting";
export const deleteDeviceSettingEndpoint: string =
  "/v1/api/admin/device-setting";
// user-admin
export const getUsersEndpoint: string = "/v1/api/admin/users";
export const getUsersByCompanyEndpoint: string = "/v1/api/admin/users";
export const getUserByIdEndpoint: string = "/v1/api/admin/users";
export const createUserEndpoint: string = "/v1/api/admin/users";
export const deleteUserEndpoint: string = "/v1/api/admin/users";
export const changeCompanyEndpoint: string =
  "/v1/api/admin/users/change-company";
export const updatePasswordEndpoint: string =
  "/v1/api/admin/users/update-password";
export const updateUserEndpoint: string = "/v1/api/admin/users/update-user";
// area
export const setUserAreaEndpoint: string = "/v1/api/admin/users/set-user-area";
export const deleteUserAreaEndpoint: string =
  "/v1/api/admin/users/delete-user-area";
// me
export const getMeEndpoint: string = "/v1/api/me";
// role
export const getRolesEndpoint: string = "/v1/api/admin/roles";
export const setUserRolesEndpoint: string = "/v1/api/admin/users/set-user-role";
export const deleteUserRoleEndpoint: string =
  "/v1/api/admin/users/delete-user-role";
// photo
export const getPhotosEndpoint: string = "/v1/api/merchandiser/photos";
export const getPhotosByDeviceIdEndpoint: string =
  "/v1/api/merchandiser/photos/find-by-device-and-date";
export const getPhotosByFromToDateEndpoint: string =
  "/v1/api/merchandiser/photos/find-by-from-and-to-date";
export const getPhotosByCustomerChainEndpoint: string =
  "/v1/api/merchandiser/photos/find-by-customer-chain-and-date";
export const getPhotoDevicesEndpoint: string =
  "/v1/api/merchandiser/photos/devices";
// address
export const getCustomerAddressEndpoint: string = "/v1/api/addresses";
// customers
export const getCustomersEndpoint: string = "/v1/api/customers";
export const getMerchandiserCustomersEndpoint: string =
  "/v1/api/merchandiser-customers";
// items
export const getItemsEndpoint: string = "/v1/api/items";
// price
export const getPricesEndpoint: string = "/v1/api/prices";
// report
export const getPhotoReportByDateRangeEndpoint: string =
  "/v1/api/merchandiser/photos/report/photo-report-by-date-range";
export const getPhotoTransDatesEndpoint: string =
  "/v1/api/merchandiser/photos/trans-dates";
export const getPhotoCustomerChainsEndpoint: string =
  "/v1/api/merchandiser/photos/customer-chains";
// sales
export const getSalesHeadersByCompanyEndpoint: string =
  "/v1/api/sales-header/search/search-by-company-id";
export const getSalesLinesByCompanyEndpoint: string =
  "/v1/api/sales-line/search/search-by-company-id";
export const getSalesHeaderByIdEndpoint: string = "/v1/api/sales-header";
export const getSalesLinesByIdEndpoint: string = "/v1/api/sales-line";
export const deleteSalesHeaderEndpoint: string = "/v1/api/sales-header";
export const findSalesHeaderByCompanyDateRangeEndpoint: string =
  "/v1/api/sales-header/find/by-company-date-range";
export const findSalesLineByCompanyDateRangeEndpoint: string =
  "/v1/api/sales-line/find/by-company-date-range";
export const exportOrderToCSVEndpoint: string =
  "/v1/api/sales-header/export-sales-orders";
export const OrderCreatedDateEndpoint: string =
  "/v1/api/sales-header/find/order-created-dates";

//area
export const getAreasEndpoint: string = "/v1/api/admin/area/filter/by-company";
export const getAreaByIdEndpoint: string = "/v1/api/admin/area";
export const createAreaEndpoint: string = "/v1/api/admin/area";
export const createManyAreaEndpoint: string = "/v1/api/admin/area/create-many";
export const updateAreaEndpoint: string = "/v1/api/admin/area/update";
export const deleteAreaEndpoint: string = "/v1/api/admin/area";

//master data
export const importItemsFromAzureDbEndpoint: string =
  "/v1/api/items/import/from-azure-db";
export const importPricesFromAzureDbEndpoint: string =
  "/v1/api/prices/import/from-azure-db";
export const importCustomersFromAzureDbEndpoint: string =
  "/v1/api/customers/import/from-azure-db";
export const importMerchandiserCustomersFromAzureDbEndpoint: string =
  "/v1/api/merchandiser-customers/import/from-azure-db";
export const importAddressesFromAzureDbEndpoint: string =
  "/v1/api/addresses/import/from-azure-db";

// site visit
export const getSiteVisitListEndpoint: string = "/v1/api/site-visit/filter/by-company-and-date";
