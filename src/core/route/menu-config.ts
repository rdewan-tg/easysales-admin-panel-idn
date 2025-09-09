import {
  PeopleAltOutlined,
  ShieldOutlined,
  BusinessOutlined,
  PublicOutlined,
  PhotoAlbumOutlined,
  PhotoLibraryOutlined,
  ViewListOutlined,
  GridView,
  HailOutlined,
  CategoryOutlined,
  PriceChangeOutlined,
  ReceiptLongOutlined,
  DevicesOutlined,
  ContactMailOutlined,
  ShoppingBagOutlined,
  PlaceOutlined,
} from "@mui/icons-material";
import { Theme } from "@mui/material";
import React from "react";

// Define an icon mapping function
const iconMapping = {
  users: PeopleAltOutlined,
  roles: ShieldOutlined,
  companies: BusinessOutlined,
  countries: PublicOutlined,
  photo: PhotoAlbumOutlined,
  gallery: PhotoLibraryOutlined,
  list: ViewListOutlined,
  grid: GridView,
  hailOutlined: HailOutlined,
  categoryOutlinedIcon: CategoryOutlined,
  priceChangeOutlinedIcon: PriceChangeOutlined,
  receiptLongOutlinedIcon: ReceiptLongOutlined,
  devicesOutlined: DevicesOutlined,
  contactMailOutlined: ContactMailOutlined,
  shoppingBagOutlined: ShoppingBagOutlined,
  areaOutlinedIcon: PlaceOutlined,
};

/*
    This interface defines the shape of an object that represents a menu item configuration. It has the following properties:
    label: a string that represents the label of the menu item
    path: a string that represents the URL path of the menu item
    iconKey: a key that references an icon from the iconMapping object
    children: an optional array of MenuItemConfig objects that represent submenu items
*/
export interface MenuItemConfig {
  key: string;
  label: string;
  path: string;
  iconKey: keyof typeof iconMapping; // Reference the keys from iconMapping
  children?: MenuItemConfig[]; // Submenu items
}

export const menuConfig: MenuItemConfig[] = [
  { key: "users", label: "Users", path: "/dashboard/users", iconKey: "users" },
  { key: "roles", label: "Roles", path: "/dashboard/roles", iconKey: "roles" },
  {
    key: "companies",
    label: "Companies",
    path: "/dashboard/companies",
    iconKey: "companies",
  },
  {
    key: "countries",
    label: "Countries",
    path: "/dashboard/countries",
    iconKey: "countries",
  }, 
  {
    key: "area",
    label: "Area",
    path: "/dashboard/area",
    iconKey: "areaOutlinedIcon",
  },
  {
    key: "order-detail",
    label: "Order Detail",
    path: "/dashboard/sales-order",
    iconKey: "list",
    children: [      
      {
        key: "sales-order",
        label: "Order",
        path: "/dashboard/sales-order",
        iconKey: "shoppingBagOutlined",
      },
      {
        key: "sales-header",
        label: "Sales Header",
        path: "/dashboard/sales-header",
        iconKey: "list",
      },
      {
        key: "sales-line",
        label: "Sales Line",
        path: "/dashboard/sales-line",
        iconKey: "list",
      },
    ],
  },
  {
    key: "photo",
    label: "Photo",
    path: "/dashboard/photo",
    iconKey: "photo",
    children: [
      {
        key: "gallery",
        label: "Gallery",
        path: "/dashboard/photo/photo-gallery",
        iconKey: "gallery",
      },
      {
        key: "merchandiser-report-by-date-range",
        label: "Report",
        path: "/dashboard/photo/merchandiser-report-by-date-range",
        iconKey: "grid",
      },
    ],
  },
  {
    key: "site-visit",
    label: "Site Visit",
    path: "/dashboard/site-visit",
    iconKey: "list",
  },
  {
    key: "master-data",
    label: "Master Data",
    path: "/dashboard/customer",
    iconKey: "list",
    children: [
      {
        key: "merchandiser-customer",
        label: "Merchandiser Customer",
        path: "/dashboard/customer/merchandiser-customer",
        iconKey: "hailOutlined",
      },
      {
        key: "sales-customer",
        label: "Customer",
        path: "/dashboard/customer/sales-customer",
        iconKey: "hailOutlined",
      },
      {
        key: "address",
        label: "Address",
        path: "/dashboard/address",
        iconKey: "contactMailOutlined",
      },
      {
        key: "item",
        label: "Item",
        path: "/dashboard/item/item-list",
        iconKey: "categoryOutlinedIcon",
      },
      {
        key: "price",
        label: "Price",
        path: "/dashboard/price/price-list",
        iconKey: "priceChangeOutlinedIcon",
      },
    ],
  },
  {
    key: "device-setting",
    label: "Device Setting",
    path: "/dashboard/device-setting",
    iconKey: "devicesOutlined",
  },
  {
    key: "activity-log",
    label: "Logs",
    path: "/dashboard/activity-log",
    iconKey: "receiptLongOutlinedIcon",
  },
];

// Export the icon resolver
/*
    This function, getIconComponent, returns a React icon component based on the provided iconKey and isActive status.
    It uses the iconMapping object to resolve the icon component and applies theme-based styling (active or inactive color) to the icon. 
    If the iconKey is not found in iconMapping, it returns null.
*/
export const getIconComponent = (
  iconKey: keyof typeof iconMapping,
  isActive: boolean,
  theme: Theme,
) => {
  const IconComponent = iconMapping[iconKey];
  return IconComponent
    ? React.createElement(IconComponent, {
        style: {
          color: isActive
            ? theme.palette.primary.main // Active color
            : theme.palette.text.secondary, // Inactive color
        },
      })
    : null;
};
