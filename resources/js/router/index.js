import Vue from "vue";
import VueRouter from "vue-router";

// Register Vue Router
Vue.use(VueRouter);

// Project
const ProjectMainComponent = () =>
    import ("../components/project/ProjectMainComponent.vue");
const ProjectIndex = () =>
    import ("../components/project/ProjectHome.vue");
const ProjectDetails = () =>
    import ("../components/project/ProjectDetail.vue");
const ProjectViewDocument = () =>
    import ("../components/project/partials/ProjectDocumentView.vue");
// Heavy Equipment
const HeavyEquipmentMainComponent = () =>
    import ("../components/heavy_equipment/HeavyEquipmentMainComponent.vue");
const HeavyEquipmentIndex = () =>
    import ("../components/heavy_equipment/HeavyEquipmentIndex.vue");
const HeavyEquipmentDetails = () =>
    import ("../components/heavy_equipment/HeavyEquipmentDetails.vue");

// truc vehicle
const TruckVehicleMainComponent = () =>
    import ("../components/vehicle/TruckVehicleMainComponent.vue");
const TruckVehicleIndex = () =>
    import ("../components/vehicle/TruckVehicleIndex.vue");
const TruckVehicleDetails = () =>
    import ("../components/vehicle/TruckVehicleDetails.vue");

// Other Inventory
const OtherInventoryMainComponent = () =>
    import ("../components/other_inventory/OtherInventoryMainComponent.vue");
const OtherInventoryIndex = () =>
    import ("../components/other_inventory/OtherInventoryIndex.vue");
const OtherInventoryDetails = () =>
    import ("../components/other_inventory/OtherInventoryDetails.vue");

// FIxed Assets
const FixedAssetMainComponent = () =>
    import ("../components/fixed_assets/FixedAssetMainComponent.vue");
const FixedAssetIndex = () =>
    import ("../components/fixed_assets/FixedAssetIndex.vue");

// Category Inventory
const CategoryInventoryMainComponent = () =>
    import ("../components/categories_inventory/CategoryInventoryMianComponent.vue");
const CategoryInventoryIndex = () =>
    import ("../components/categories_inventory/CategoryInventoryIndex.vue");

// Type Inventory
const TypeInventoryMainComponent = () =>
    import ("../components/types_inventory/TypeInventoryMainComponent.vue");
const TypeInventoryIndex = () =>
    import ("../components/types_inventory/TypeInventoryIndex.vue");

// consumable inventory
const ConsumableMainComponent = () =>
    import ("../components/consumable_inventory/ConsumableMainComponent.vue");
const ConsumableIndex = () =>
    import ('../components/consumable_inventory/ConsumableIndex.vue');

// Supplier Management
const SupplierManagementMainComponent = () =>
    import ('../components/supplier_management/SupplierManagementMainComponent.vue')
const SupplierManagementIndex = () =>
    import ('../components/supplier_management/SupplierManagementIndex.vue');
const SupplierDetails = () =>
    import ("../components/supplier_management/partials/SupplierDetails.vue")

// Request Material
const RequestMaterialMainComponent = () =>
    import ('../components/material/RequestMaterialMainComponent.vue');
const RequestMaterialIndex = () =>
    import ('../components/material/RequestMaterialIndex.vue');
const RequestMaterialDetails = () =>
    import ('../components/material/RequestMaterialDetails.vue');

// Not Found
const NotFound = () =>
    import ("../components/global/NotFound.vue");

export default new VueRouter({
    linkActiveClass: "active",
    linkExactActiveClass: "",
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    routes: [{
            path: "/project-main",
            name: "Project Main Component",
            props: true,
            component: ProjectMainComponent,
            children: [{
                    path: '/project-list',
                    name: "Project List",
                    props: true,
                    component: ProjectIndex
                },
                {
                    path: '/project-list/:id',
                    name: "Project Details",
                    props: true,
                    component: ProjectDetails
                },
                {
                    path: '/view-file',
                    name: 'View Document',
                    props: true,
                    component: ProjectViewDocument
                }
            ]
        },

        // Assets Inventory Routes

        {
            path: "/heavyEquipment",
            name: 'Heavy Equipment Component',
            component: HeavyEquipmentMainComponent,
            children: [{
                    path: '/list',
                    name: 'Heavy Equipment',
                    props: true,
                    component: HeavyEquipmentIndex
                },
                {
                    path: '/hDetails/:id',
                    name: 'Heavy Equipment Details',
                    props: true,
                    component: HeavyEquipmentDetails
                }
            ]
        },
        {
            path: "/truckVehicle",
            name: 'Truck Vehicle Main Component',
            component: TruckVehicleMainComponent,
            children: [{
                    path: '/list-truck-vehicle',
                    name: 'Truck Vehicle List',
                    component: TruckVehicleIndex,
                    props: true
                },
                {
                    path: '/list-truck-vehicle/:id',
                    name: 'Truck Vehicle Details',
                    component: TruckVehicleDetails,
                    props: true
                }
            ]
        },
        {
            path: '/OtherMainComponent',
            name: 'Other Main Component',
            component: OtherInventoryMainComponent,
            props: true,
            children: [{
                    path: '/other-inventory',
                    name: 'Other Inventory Index',
                    props: true,
                    component: OtherInventoryIndex
                },
                {
                    path: '/other-inventory/:id',
                    name: 'Other Inventory Details',
                    props: true,
                    component: OtherInventoryDetails
                }
            ]
        },
        {
            path: "/FixedAssetMainComponent",
            name: "Fixed Asset Main Component",
            component: FixedAssetMainComponent,
            props: true,
            children: [{
                path: "/fixed-asset-list",
                name: "Fixed Asset List",
                component: FixedAssetIndex,
                props: true
            }]
        },
        {
            path: '/CategoryInventoryMainComponent',
            name: 'Category Inventory Main Component',
            props: true,
            component: CategoryInventoryMainComponent,
            children: [{
                path: '/category-inventory-list',
                name: 'Category Inventory Index',
                props: true,
                component: CategoryInventoryIndex
            }]
        },
        {
            path: '/TypeInventoryMainComponent',
            name: 'Type Inventory Main Component',
            props: true,
            component: TypeInventoryMainComponent,
            children: [{
                path: '/type-inventory-list',
                name: 'Type Inventory Index',
                props: true,
                component: TypeInventoryIndex
            }]
        },
        {
            path: '/ConsumableMainComponent',
            name: 'Consumable Main Component',
            props: true,
            component: ConsumableMainComponent,
            children: [{
                path: '/consumable-inventory',
                name: 'Consumable Inventory List',
                props: true,
                component: ConsumableIndex
            }]
        },

        // End Assets Inventory Routes
        // Purchase
        {
            path: '/SupplierManagementMainComponent',
            name: 'Supplier Management Main Component',
            props: true,
            component: SupplierManagementMainComponent,
            children: [{
                    path: '/supplier-management',
                    name: 'Supplier Management',
                    component: SupplierManagementIndex,
                    props: true
                },
                {
                    path: '/supplier-details/:id',
                    name: 'Supplier Management Details',
                    component: SupplierDetails,
                    props: true
                }
            ]
        },

        {
            path: '/PurchaseOrderMainComponent',
            nam: 'Purchase Order Main Component',
            props: true,
            component: () => import ('../components/purchase_order/PurchaseOrderMainComponent.vue'),
            children: [
                {
                    path: '/purchase-order',
                    name: 'Purchase Order Index',
                    props: true,
                    component: () => import ('../components/purchase_order/PurchaseOrderIndex.vue')
                },
                {
                    path: '/purchase-order/:id',
                    name: 'Purchase Order View',
                    props: true,
                    component: () => import ('../components/purchase_order/PurchaseOrderView.vue')
                },
                {
                    path: '/purchase-order-details/:id',
                    name: 'Purchase Order Details',
                    props: true,
                    component: () => import ('../components/purchase_order/PurchaseOrderDetails.vue')
                }
            ]
        },

        // Request Material
        {
            path: '/RequestMaterialMainComponent',
            name: 'Request Materail Main Component',
            component: RequestMaterialMainComponent,
            props: true,
            children: [{
                    path: '/request-material',
                    name: 'Request Material Index',
                    props: true,
                    component: RequestMaterialIndex
                },
                {
                    path: '/request-material/:id',
                    name: 'Request Material Details',
                    props: true,
                    component: RequestMaterialDetails
                }
            ]
        },

        // consumable supply

        {
            path: '/ConsumableSupplyMainComponent',
            name: 'Consumable Supply Main Component',
            props: true,
            component: () => import ('../components/consumable_supply/ConsumableSupplyMainComponent.vue'),
            children: [
                {
                    path: '/consumable-supply',
                    name: 'Consumable Supply List',
                    props: true,
                    component: () => import ('../components/consumable_supply/ConsumableSupplyIndex.vue')
                }
            ]
        },

        // purchase

        {
            path: '/PurchaseRecieveMainComponent',
            name: 'Purchase Recieve Main Component',
            props: true,
            component: () => import ('../components/purchase_recieve/PurchaseRecieveMainComponent.vue'),
            children: [
                {
                    path: '/purchase-recieved',
                    name: 'Purchase Recieved Index',
                    props: true,
                    component: () => import ('../components/purchase_recieve/PurchaseRecieveIndex.vue')
                },
                {
                    path: '/purchase-received-view/:id',
                    name: 'Purchase Received View',
                    props: true,
                    component: () => import ('../components/purchase_recieve/PurchaseReceiveView.vue')
                }
            ]
        },

        // stock out

        {
            path: '/FixedAssetStockOutMainComponent',
            name: 'Fixed Asset Stock Out Main Component',
            props: true,
            component: () => import ('../components/asset_stock_out/FixedAssetStockOutMainComponent.vue'),
            children: [
                {
                    path: '/fixed-asset-stock-out',
                    name: 'Fixed Asset Stock Out Index',
                    props: true,
                    component: () => import ('../components/asset_stock_out/FixedAssetStockOutIndex.vue'),
                }
            ]
        },
        {
            path: '/ConsumableItemStockOutMainComponent',
            name: 'Consumable Item Stock Out Main Component',
            props: true,
            component: () => import ('../components/consumable_item_stock_out/ConsumableItemStockOutMainComponent.vue'),
            children: [
                {
                    path: '/consumable-item-stock-out',
                    name: 'Consumable Item Stock Out Index',
                    props: true,
                    component: () => import ('../components/consumable_item_stock_out/ConsumableItemStockOutIndex.vue')
                }
            ]
        },
        {
            path: '/setting',
            name: 'Setting',
            props: true,
            component: () => import('../components/setting/GeneralSettingMainComponent.vue'),
            children: [
                {
                    path: '/job-order-type',
                    name: 'Job Order Type',
                    props: true,
                    component: () => import('../components/setting/job_order_type/JobOrderType.vue'),
                },
                {
                    path: '/maintenance-type',
                    name: 'Maintenance Type',
                    props: true,
                    component: () => import('../components/setting/maintenance_type/MaintenanceType.vue'),
                },
                {
                    path: '/project-status',
                    name: 'Project Status',
                    props: true,
                    component: () => import('../components/setting/project_status/ProjectStatus.vue'),
                }
            ]
        },

        // Not Found
        {
            path: "*",
            name: 'Not Found',
            component: NotFound
        }
    ]
});
