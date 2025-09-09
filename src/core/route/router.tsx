import { createBrowserRouter, Navigate } from "react-router-dom";
import { NotFoundPage } from "../../common/pages";
import { MainLayout } from "../../common/components";
import AuthChecker from "../../common/components/AuthChecker";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import LoginPage from "../../features/auth/login/presentation/ui/LoginPage";
import PrivacyPolicyPage from "../../features/privacy-policy/presentation/ui/PrivacyPolicyPage";
import DashboardPage from "../../features/dashboard/presentation/ui/DashboardPage";
import {
  UserDetailPage,
  UsersListPage,
  UsersPage,
} from "@/features/user/presentation";
import { routeName } from "./route-name";
import UserRolePage from "@/features/role/presentation/ui/RolePage";
import CreateUserPage from "@/features/user/presentation/ui/CreateUserPage";
import CompanyPage from "@/features/company/presentation/ui/CompanyPage";
import CompanyListPage from "@/features/company/presentation/ui/CompanyListPage";
import CreateCompanyPage from "@/features/company/presentation/ui/CreateCompanyPage";
import CountryPage from "@/features/country/presentation/ui/CountryPage";
import CountryListPage from "@/features/country/presentation/ui/CountryListPage";
import CreateCountryPage from "@/features/country/presentation/ui/CreateCountryPage";
import MePage from "@/features/me/presentation/ui/MePage";
import ProfilePage from "@/features/me/presentation/ui/ProfilePage";
import PhotoListScreen from "@/features/photo/presentation/ui/PhotoListScreen";
import PhotoGalleryScreen from "@/features/photo/presentation/ui/PhotoGalleryScreen";
import PhotoScreen from "@/features/photo/presentation/ui/PhotoScreen";
import CustomerScreen from "@/features/master-data/customer/presentation/ui/CustomerScreen";
import SalesCustomerScreen from "@/features/master-data/customer/presentation/ui/SalesCustomerScreen";
import MerchandiserCustomerScreen from "@/features/master-data/merchandiser-customer/presentation/ui/MerchandiserCustomerScreen";
import ItemScreen from "@/features/master-data/item/presentation/ui/ItemScreen";
import ItemListScreen from "@/features/master-data/item/presentation/ui/ItemListScreen";
import PriceScreen from "@/features/master-data/price/presentation/ui/PriceScreen";
import PriceListScreen from "@/features/master-data/price/presentation/ui/PriceListScreen";
import DeviceSettingPage from "@/features/device-setting/presentation/ui/DeviceSettingPage";
import DeviceSettingListPage from "@/features/device-setting/presentation/ui/DeviceSettingListPage";
import CreateDeviceSettingPage from "@/features/device-setting/presentation/ui/CreateDeviceSettingPage";
import AddressScreen from "@/features/master-data/address/presentation/ui/AddressScreen";
import AddressListScreen from "@/features/master-data/address/presentation/ui/AddressListScreen";
import MerchandiserReportByDateRangeScreen from "@/features/report/merchandiser/presentation/ui/MerchandiserReportByDateRangeScreen";
import {
  OrderDetailScreen,
  OrderScreen,
  SalesLineScreen,
  SalesLineListScreen,
} from "@/features/order/presentation";
import SalesHeaderListScreen from "@/features/order/presentation/ui/SalesHeaderListScreen";
import SalesHeaderScreen from "@/features/order/presentation/ui/SalesHeaderScreen";
import { ActivityLogScreen } from "@/features/activity-log/presentation";
import UpdateUserPage from "@/features/user/presentation/ui/UpdateUserPage";
import { AreaListPage, AreaPage, CreateAreaPage } from "@/features/area/presentation";
import { SiteVisitPage, SiteVisitListPage } from "@/features/site-visit/presentation";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthChecker />,
    errorElement: <NotFoundPage />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <MainLayout />, // Protect the dashboard route
            children: [
              {
                path: routeName.dashboard,
                element: <DashboardPage />,
                errorElement: <NotFoundPage />,
                children: [
                  //Redirect from /dashboard to /dashboard/users
                  {
                    // default component  - This will match the exact /dashboard path
                    index: true,
                    // Redirects to /dashboard/users
                    element: <Navigate to={routeName.users} replace={true} />,
                  },
                  //user
                  {
                    path: routeName.users,
                    element: <UsersPage />,
                    errorElement: <NotFoundPage />,
                    children: [
                      {
                        index: true, // default component
                        element: <UsersListPage />,
                        errorElement: <NotFoundPage />,
                      },
                      {
                        path: ":id",
                        element: <UserDetailPage />,
                        errorElement: <NotFoundPage />,
                        children: [
                          {
                            path: routeName.roles,
                            element: <UserRolePage />,
                            errorElement: <NotFoundPage />,
                          },
                        ],
                      },
                      {
                        path: routeName.createUser,
                        element: <CreateUserPage />,
                        errorElement: <NotFoundPage />,
                      },
                      {
                        path: "edit/:id",
                        element: <UpdateUserPage />,
                        errorElement: <NotFoundPage />,
                      },
                    ],
                  },
                  //roles
                  {
                    path: routeName.roles,
                    element: <UserRolePage />,
                    errorElement: <NotFoundPage />,
                  },
                  // companies
                  {
                    path: routeName.companies,
                    element: <CompanyPage />,
                    errorElement: <NotFoundPage />,
                    children: [
                      {
                        index: true,
                        element: <CompanyListPage />,
                        errorElement: <NotFoundPage />,
                      },
                      {
                        path: routeName.createCompany,
                        element: <CreateCompanyPage />,
                        errorElement: <NotFoundPage />,
                      },
                    ],
                  },
                  // countries
                  {
                    path: routeName.countries,
                    element: <CountryPage />,
                    children: [
                      {
                        index: true,
                        element: <CountryListPage />,
                        errorElement: <NotFoundPage />,
                      },
                      {
                        path: routeName.createCountry,
                        element: <CreateCountryPage />,
                        errorElement: <NotFoundPage />,
                      },
                    ],
                  },
                  // area
                  {
                    path: routeName.area,
                    element: <AreaPage />,
                    children: [
                      {
                        index: true,
                        element: <AreaListPage />,
                        errorElement: <NotFoundPage />,
                      },
                      {
                        path: routeName.createArea,
                        element: <CreateAreaPage />,
                        errorElement: <NotFoundPage />,
                      },
                    ],
                  },
                  // sales order
                  {
                    path: routeName.salesOrder,
                    element: <OrderScreen />,
                    children: [
                      {
                        index: true,
                        element: <OrderDetailScreen />,
                        errorElement: <NotFoundPage />,
                      },
                    ],
                  },
                  // sales header
                  {
                    path: routeName.salesHeader,
                    element: <SalesHeaderScreen />,
                    errorElement: <NotFoundPage />,  
                    children: [
                      {
                        index: true,
                        element: <SalesHeaderListScreen />,  
                        errorElement: <NotFoundPage />,
                      },
                    ],
                  },
                  // sales line
                  {
                    path: routeName.salesLine,
                    element: <SalesLineScreen />,
                    errorElement: <NotFoundPage />,
                    children: [
                      {
                        index: true,
                        element: <SalesLineListScreen />,
                        errorElement: <NotFoundPage />,
                      },
                    ],
                  },
                  // me
                  {
                    path: routeName.me,
                    element: <MePage />,
                    children: [
                      {
                        index: true,
                        element: <ProfilePage />,
                        errorElement: <NotFoundPage />,
                      },
                    ],
                  },
                  // photo
                  {
                    path: routeName.photo,
                    element: <PhotoScreen />,
                    children: [
                      {
                        index: true,
                        element: <PhotoListScreen />,
                        errorElement: <NotFoundPage />,
                      },
                      {
                        path: routeName.photoGallery,
                        element: <PhotoGalleryScreen />,
                        errorElement: <NotFoundPage />,
                      },
                      {
                        path: routeName.merchandiserReportByDaterange,
                        element: <MerchandiserReportByDateRangeScreen />,
                        errorElement: <NotFoundPage />,
                      },
                    ],
                  },
                  // site visit
                  {
                    path: routeName.siteVisit,
                    element: <SiteVisitPage />,
                    children: [
                      {
                        index: true,
                        element: <SiteVisitListPage />,
                        errorElement: <NotFoundPage />,
                      },
                    ],
                  },
                  // customer
                  {
                    path: routeName.customer,
                    element: <CustomerScreen />,
                    children: [
                      {
                        path: routeName.merchandiserCustomer,
                        element: <MerchandiserCustomerScreen />,
                        errorElement: <NotFoundPage />,
                      },
                      {
                        path: routeName.salesCustomer,
                        element: <SalesCustomerScreen />,
                        errorElement: <NotFoundPage />,
                      },
                    ],
                  },
                  // address
                  {
                    path: routeName.address,
                    element: <AddressScreen />,
                    children: [
                      {
                        index: true,
                        element: <AddressListScreen />,
                        errorElement: <NotFoundPage />,
                      },
                    ],
                  },
                  // item
                  {
                    path: routeName.item,
                    element: <ItemScreen />,
                    children: [
                      {
                        path: routeName.itemList,
                        element: <ItemListScreen />,
                        errorElement: <NotFoundPage />,
                      },
                    ],
                  },
                  // price
                  {
                    path: routeName.price,
                    element: <PriceScreen />,
                    children: [
                      {
                        path: routeName.priceList,
                        element: <PriceListScreen />,
                        errorElement: <NotFoundPage />,
                      },
                    ],
                  },
                  // Activity Log
                  {
                    path: routeName.activityLog,
                    element: <ActivityLogScreen />,
                    errorElement: <NotFoundPage />,
                  },
                  // device setting
                  {
                    path: routeName.deviceSetting,
                    element: <DeviceSettingPage />,
                    errorElement: <NotFoundPage />,
                    children: [
                      {
                        index: true,
                        element: <DeviceSettingListPage />,
                        errorElement: <NotFoundPage />,
                      },
                      {
                        path: routeName.createdeviceSetting,
                        element: <CreateDeviceSettingPage />,
                        errorElement: <NotFoundPage />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      // Public routes (accessible without authentication)
      {
        element: <PublicRoute />,
        children: [
          {
            path: routeName.login,
            element: <LoginPage />,
          },
        ],
      },
      // Redirect root path to login if not authenticated
      {
        path: "/",
        element: <Navigate to={routeName.login} replace />,
      },
      // Publicly accessible route for Privacy Policy
      {
        path: routeName.privacyPolicy,
        element: <PrivacyPolicyPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: routeName.others,
        element: <NotFoundPage />,
      },
    ],
  },
]);
