import {
  demoCustomers,
  demoDashboardData,
  demoMasterData,
  demoProducts,
  demoReportData,
  demoSubDBs,
  demoUser,
  makeDemoCustomerId,
  makeDemoLoginResponse,
} from "@/data/demoData";

const STORE_KEY = "salesflow_demo_workspace_v1";
type StoredRecord = Record<string, unknown>;
type StoredOrder = StoredRecord & { quantity?: number };
type DemoStore = {
  customers: StoredRecord[];
  visits: StoredRecord[];
  orders: StoredOrder[];
  attendance: Array<{ type: string; timestamp: string; date: string }>;
};

function emptyStore(): DemoStore {
  return { customers: [], visits: [], orders: [], attendance: [] };
}

function readStore(): DemoStore {
  if (typeof window === "undefined") return emptyStore();
  try {
    const parsed = JSON.parse(localStorage.getItem(STORE_KEY) || "{}") as Partial<DemoStore>;
    return {
      customers: Array.isArray(parsed.customers) ? parsed.customers : [],
      visits: Array.isArray(parsed.visits) ? parsed.visits : [],
      orders: Array.isArray(parsed.orders) ? parsed.orders as StoredOrder[] : [],
      attendance: Array.isArray(parsed.attendance) ? parsed.attendance : [],
    };
  } catch {
    return emptyStore();
  }
}

function writeStore(store: DemoStore) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch {
    // Demo remains usable if browser storage is disabled or full.
  }
}

function todayIso() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function timestampToday(value: unknown) {
  const time = String(value || "09:00");
  const timePart = time.includes("T") ? time.slice(11, 19) : time;
  return `${todayIso()}T${timePart.length === 5 ? `${timePart}:00` : timePart}Z`;
}

function dashboardData(store: DemoStore) {
  const seededVisits = demoDashboardData.visits.map((visit) => ({ ...visit, timestamp: timestampToday(visit.timestamp) }));
  const seededOrders = demoDashboardData.orders.map((order) => ({ ...order, createdAt: timestampToday(order.createdAt) }));
  const visits = [...seededVisits, ...store.visits] as typeof demoDashboardData.visits;
  const orders = [...seededOrders, ...store.orders] as typeof demoDashboardData.orders;
  const route = visits
    .map((visit) => ({
      lat: Number(visit.latitude), lng: Number(visit.longitude), name: String(visit.customerName || "Customer"),
      time: String(visit.timestamp || ""), area: String(visit.area || visit.city || ""),
    }))
    .filter((point) => Number.isFinite(point.lat) && Number.isFinite(point.lng));
  return {
    ...demoDashboardData,
    today: todayIso(),
    visits,
    visitCount: visits.length,
    orders,
    orderCount: orders.length,
    totalOrderQty: orders.reduce((sum, order) => sum + (Number(order.quantity) || 0), 0),
    route: route.length ? route : demoDashboardData.route,
    areasVisited: [...new Set(visits.map((visit) => String(visit.area || visit.city || "")).filter(Boolean))],
  };
}

function reportData(store: DemoStore) {
  const report = JSON.parse(JSON.stringify(demoReportData)) as typeof demoReportData;
  const visits = store.visits.map((visit) => ({
    ...visit, date: todayIso(), timestamp: String(visit.timestamp || new Date().toISOString()),
  }));
  const orders: StoredOrder[] = store.orders.map((order) => ({
    ...order, date: todayIso(), createdAt: String(order.createdAt || new Date().toISOString()),
  }));
  report.visits = [...visits, ...report.visits] as typeof report.visits;
  report.orders = [...orders, ...report.orders] as typeof report.orders;
  report.attendance = [...store.attendance, ...report.attendance] as typeof report.attendance;
  report.summary.totalVisits += visits.length;
  report.summary.totalOrders += orders.length;
  report.summary.totalOrderQty += orders.reduce((sum, order) => sum + (Number(order.quantity) || 0), 0);
  return report;
}

function demoResponse(action: string, payload: Record<string, unknown> = {}) {
  const store = readStore();
  switch (action) {
    case "login":
      return makeDemoLoginResponse(String(payload.email || ""), String(payload.password || ""));
    case "getMasterData":
      return { success: true, data: demoMasterData };
    case "getCustomers":
      return { success: true, data: [...demoCustomers, ...store.customers] };
    case "getProducts":
      return { success: true, data: demoProducts };
    case "getSubDBs":
      return { success: true, data: demoSubDBs };
    case "getDashboardData":
      return { success: true, data: dashboardData(store) };
    case "getReportData":
      return { success: true, data: reportData(store) };
    case "clockIn":
    case "clockOut": {
      const type = action === "clockIn" ? "Clock In" : "Clock Out";
      store.attendance.unshift({ type, timestamp: new Date().toISOString(), date: todayIso() });
      writeStore(store);
      return { success: true, message: `${type} saved in this browser demo.` };
    }
    case "submitVisit": {
      const visitId = `VIS${Date.now()}`;
      const visit: StoredRecord = {
        visitId, timestamp: new Date().toISOString(), customerCode: String(payload.customerId || ""),
        customerName: String(payload.customerName || "Demo customer"), area: String(payload.area || ""),
        city: String(payload.district || ""), latitude: String(payload.lat ?? ""), longitude: String(payload.lng ?? ""),
        brandFocus: String(payload.brandFocus || ""), totalQuantity: Number(payload.totalQuantity) || 0,
        visitResult: String(payload.visitResult || "Completed"), orderNotReceived: String(payload.orderNotReceived || ""),
        marketName: String(payload.marketName || ""), territory: String(payload.territory || ""),
        visitStatus: String(payload.visitStatus || "Completed"),
      };
      store.visits.unshift(visit);
      writeStore(store);
      return { success: true, visitId, message: "Visit saved in this browser demo." };
    }
    case "submitOrder": {
      const invoiceId = `ORD${Date.now()}`;
      const timestamp = new Date().toISOString();
      const products = Array.isArray(payload.products) ? payload.products as StoredRecord[] : [];
      products.forEach((product) => store.orders.unshift({
        invoiceId, customerName: String(payload.customerName || "Demo customer"), customerId: String(payload.customerId || ""),
        productName: String(product.productName || "Demo product"), productId: String(product.productId || ""),
        quantity: Number(product.quantity) || 0, createdAt: timestamp, date: todayIso(), orderStatus: "Done",
        distributorName: String(payload.distributorName || "Demo distributor"),
        orderMonth: new Date().getMonth() + 1, orderYear: new Date().getFullYear(),
      }));
      writeStore(store);
      return { success: true, invoiceId, message: "Order saved in this browser demo." };
    }
    case "registerCustomer": {
      const customerId = makeDemoCustomerId();
      store.customers.unshift({
        customerId, shopName: String(payload.shopName || "New demo customer"),
        ownerName: String(payload.ownerName || "Demo owner"), ownerContact: String(payload.ownerContact || ""),
        marketName: String(payload.marketName || ""), district: String(payload.district || ""),
        area: String(payload.area || ""), territory: String(payload.territory || ""),
        shopType: String(payload.shopType || "Retail"), fullAddress: String(payload.fullAddress || ""),
        latitude: String(payload.lat ?? ""), longitude: String(payload.lng ?? ""),
        salesOfficer: String(payload.salesOfficer || demoUser.employeeName),
        email: String(payload.email || demoUser.email), status: "Active",
      });
      writeStore(store);
      return { success: true, customerId, message: "Customer saved in this browser demo." };
    }
    case "reportPresence":
      return { success: true };
    case "getActiveUsers":
      return {
        success: true,
        users: demoMasterData.employees.map((employee) => ({
          userId: employee.userId, employeeName: employee.employeeName, employeeCode: employee.employeeCode,
          position: employee.position, area: employee.area, territory: employee.territory, lastSeen: Date.now(), isOnline: true,
        })),
        totalCount: demoMasterData.employees.length,
        onlineCount: demoMasterData.employees.length,
      };
    default:
      return { success: false, message: `Unsupported demo action: ${action}` };
  }
}

async function post<T>(payload: Record<string, unknown>): Promise<T> {
  return demoResponse(String(payload.action || ""), payload) as T;
}

async function postSingle<T>(payload: Record<string, unknown>): Promise<T> {
  return demoResponse(String(payload.action || ""), payload) as T;
}

export interface LoginUser {
  userId: string; email: string; employeeName: string; employeeCode: string; position: string; department: string;
  territory: string; area: string; district: string; phone: string; reportingManager: string; activeStatus: string; profilePhotoUrl: string;
}
export interface LoginResponse { success: boolean; user?: LoginUser; message?: string }
export interface AttendanceResponse { success: boolean; message: string }
export interface MasterData {
  districts: string[]; areas: Array<{ district: string; area: string }>;
  territories: Array<{ area: string; territory: string }>;
  employees: Array<{ email: string; employeeName: string; employeeCode: string; position: string; territory: string }>;
  settings: Record<string, string>;
}
export interface MasterDataResponse { success: boolean; data?: MasterData }
export interface CustomerRegistrationResponse { success: boolean; customerId?: string; message?: string }
export interface CustomerListItem {
  customerId: string; shopName: string; ownerName: string; ownerContact: string; marketName: string; district: string;
  area: string; territory: string; shopType: string; fullAddress: string; latitude: string; longitude: string;
  salesOfficer: string; email: string; status: string;
}
export interface CustomerListResponse { success: boolean; data?: CustomerListItem[] }
export interface VisitResponse { success: boolean; visitId?: string; message?: string }
export interface VisitData {
  email: string; salesOfficer: string; salesPersonName: string; territory: string; customerId: string; customerName: string;
  customerPhone: string; district: string; area: string; customerType: string; marketName: string; totalQuantity: number;
  orderDeliveryDate?: string; orderNotReceived?: string; otherDetails?: string; brandFocus: string; otherBrand?: string;
  castrolInventory?: string; comments?: string; lat?: number; lng?: number; gpsAccuracy?: number; storeLat?: string;
  storeLng?: string; distance?: number; visitResult?: string; visitStatus?: string; selfieBase64?: string;
}
export interface ProductItem {
  productId: string; productName: string; category: string; packSize: string; pricePerLiter: number;
  canPailDrum: number; cartoonPrice: number; status: string;
}
export interface ProductListResponse { success: boolean; data?: ProductItem[] }
export interface SubDBItem { zone: string; sapId: string; area: string; subDbName: string; status: string }
export interface SubDBListResponse { success: boolean; data?: SubDBItem[] }
export interface OrderProduct { productId: string; productName: string; category: string; quantity: number }
export interface OrderData {
  email: string; dsr: string; employeeName: string; territory: string; customerId: string; customerName: string;
  sapId: string; zone: string; area: string; distributorName: string; category: string; products: OrderProduct[];
  attachmentBase64?: string; attachmentType?: string;
}
export interface OrderResponse { success: boolean; invoiceId?: string; message?: string; debug?: string }
export interface DashboardVisit {
  visitId: string; timestamp: string; customerCode: string; customerName: string; area: string; city: string;
  latitude: string; longitude: string; brandFocus: string; totalQuantity: number; visitResult: string;
  orderNotReceived: string; marketName: string;
}
export interface DashboardOrder { invoiceId: string; customerName: string; productName: string; quantity: number; createdAt: string }
export interface RoutePoint { lat: number; lng: number; name: string; time: string; area: string }
export interface DashboardData {
  today: string; visits: DashboardVisit[]; visitCount: number; orders: DashboardOrder[]; orderCount: number;
  totalOrderQty: number; clockIn: string; clockOut: string; route: RoutePoint[]; totalDistanceKm: number; areasVisited: string[];
}
export interface DashboardResponse { success: boolean; data?: DashboardData; message?: string }
export interface ReportVisit extends DashboardVisit { date: string; territory: string; visitStatus: string }
export interface ReportOrder extends DashboardOrder {
  customerId: string; productId: string; date: string; orderStatus: string; distributorName?: string; orderMonth?: number; orderYear?: number;
}
export interface ReportAttendance { type: string; timestamp: string; date: string }
export interface ReportRoutePoint extends RoutePoint { date: string }
export interface ReportDailySummary { date: string; visits: number; orders: number; qty: number }
export interface ReportTopProduct { name: string; qty: number; count: number }
export interface ReportTopCustomer { name: string; qty: number; count: number }
export interface ReportAreaBreakdown { area: string; visits: number }
export interface ReportBrandBreakdown { brand: string; visits: number }
export interface ReportSummary {
  totalVisits: number; totalOrders: number; totalOrderQty: number; totalDistanceKm: number; activeDays: number;
  totalClockIns: number; uniqueAreas: number; uniqueCustomers: number; avgQtyPerVisit: number; avgVisitsPerDay: number;
}
export interface ReportData {
  startDate: string; endDate: string; summary: ReportSummary; visits: ReportVisit[]; orders: ReportOrder[];
  attendance: ReportAttendance[]; route: ReportRoutePoint[]; dailySummary: ReportDailySummary[];
  topProducts: ReportTopProduct[]; topCustomers: ReportTopCustomer[]; areaBreakdown: ReportAreaBreakdown[];
  brandBreakdown: ReportBrandBreakdown[];
}
export interface ReportResponse { success: boolean; data?: ReportData; message?: string }
export interface ActiveUser {
  userId: string; employeeName: string; employeeCode: string; position: string; area: string; territory: string; lastSeen: number; isOnline: boolean;
}
export interface PresenceResponse { success: boolean; users?: ActiveUser[]; totalCount?: number; onlineCount?: number }

export const api = {
  login(email: string, password: string) { return post<LoginResponse>({ action: "login", email, password }); },
  clockIn(userId: string, lat: number, lng: number, imageBase64?: string) { return postSingle<AttendanceResponse>({ action: "clockIn", userId, lat, lng, imageBase64 }); },
  clockOut(userId: string, lat: number, lng: number, imageBase64?: string) { return postSingle<AttendanceResponse>({ action: "clockOut", userId, lat, lng, imageBase64 }); },
  getMasterData(forceRefresh = false) { void forceRefresh; return post<MasterDataResponse>({ action: "getMasterData" }); },
  getCustomers(forceRefresh = false) { void forceRefresh; return post<CustomerListResponse>({ action: "getCustomers" }); },
  getProducts(forceRefresh = false) { void forceRefresh; return post<ProductListResponse>({ action: "getProducts" }); },
  getSubDBs(forceRefresh = false) { void forceRefresh; return post<SubDBListResponse>({ action: "getSubDBs" }); },
  async submitVisit(data: VisitData) { return postSingle<VisitResponse>({ action: "submitVisit", ...data }); },
  async submitOrder(data: OrderData) { return postSingle<OrderResponse>({ action: "submitOrder", ...data }); },
  getDashboardData(email: string) { return post<DashboardResponse>({ action: "getDashboardData", email }); },
  getReportData(email: string, startDate?: string, endDate?: string) { return post<ReportResponse>({ action: "getReportData", email, startDate, endDate }); },
  async registerCustomer(data: {
    email: string; district: string; area: string; marketName: string; shopName: string; shopType: string; fullAddress: string;
    ownerName: string; ownerContact: string; oilBrandSelling: string; totalAvgVolume: number; salesOfficer?: string;
    territory?: string; nid?: string; etin?: string; bin?: string; otherBrand?: string; avgCastrolVolume?: number;
    comment?: string; lat?: number; lng?: number; gpsAccuracy?: number; shopPhotoBase64?: string;
  }) { return postSingle<CustomerRegistrationResponse>({ action: "registerCustomer", ...data }); },
  reportPresence(user: { userId: string; employeeName: string; employeeCode: string; position: string; area: string; territory: string }) {
    return postSingle<{ success: boolean }>({ action: "reportPresence", ...user, timestamp: Date.now() });
  },
  getActiveUsers() { return post<PresenceResponse>({ action: "getActiveUsers" }); },
  prefetchData() {
    this.getMasterData().catch(() => {}); this.getCustomers().catch(() => {});
    this.getProducts().catch(() => {}); this.getSubDBs().catch(() => {});
  },
  clearCache() {},
};
