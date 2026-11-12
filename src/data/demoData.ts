export const demoUser = {
  userId: "demo-user-001",
  email: "demo@salesflow.app",
  employeeName: "Aisha Rahman",
  employeeCode: "SF-102",
  position: "Senior Sales Executive",
  department: "Sales",
  territory: "North Zone",
  area: "Dhaka North",
  district: "Dhaka",
  phone: "+8801712345678",
  reportingManager: "Nabil Hassan",
  activeStatus: "Active",
  profilePhotoUrl: "",
};

export const demoMasterData = {
  districts: ["Dhaka", "Chattogram", "Sylhet", "Khulna"],
  areas: [
    { district: "Dhaka", area: "Dhaka North" },
    { district: "Dhaka", area: "Mirpur" },
    { district: "Chattogram", area: "Port City" },
    { district: "Sylhet", area: "Sylhet City" },
    { district: "Khulna", area: "Khulna Central" },
  ],
  territories: [
    { area: "Dhaka North", territory: "North Zone" },
    { area: "Mirpur", territory: "North Zone" },
    { area: "Port City", territory: "Coastal Zone" },
    { area: "Sylhet City", territory: "Eastern Zone" },
    { area: "Khulna Central", territory: "Western Zone" },
  ],
  employees: [
    demoUser,
    {
      userId: "demo-user-002",
      email: "mehedi@salesflow.app",
      employeeName: "Mehedi Hasan",
      employeeCode: "SF-118",
      position: "Field Sales Officer",
      department: "Sales",
      territory: "Coastal Zone",
      area: "Port City",
      district: "Chattogram",
      phone: "+8801812345678",
      reportingManager: "Aisha Rahman",
      activeStatus: "Active",
      profilePhotoUrl: "",
    },
    {
      userId: "demo-user-003",
      email: "sadia@salesflow.app",
      employeeName: "Sadia Noor",
      employeeCode: "SF-124",
      position: "Regional Sales Lead",
      department: "Sales",
      territory: "Eastern Zone",
      area: "Sylhet City",
      district: "Sylhet",
      phone: "+8801912345678",
      reportingManager: "Aisha Rahman",
      activeStatus: "Active",
      profilePhotoUrl: "",
    },
  ],
  settings: {
    Customer_Photo_Folder_ID: "demo-folder-customer",
    Attendance_Folder_ID: "demo-folder-attendance",
    Order_Folder_ID: "demo-folder-orders",
    Visit_Photo_Folder_ID: "demo-folder-visit",
  },
};

export const demoCustomers = [
  {
    customerId: "22000001",
    shopName: "Green Valley Mart",
    ownerName: "Rahim Uddin",
    ownerContact: "01711223344",
    marketName: "Mirpur 10",
    district: "Dhaka",
    area: "Dhaka North",
    territory: "North Zone",
    shopType: "Retail",
    fullAddress: "House 14, Road 7, Mirpur 10, Dhaka",
    latitude: "23.8124",
    longitude: "90.3567",
    salesOfficer: "Aisha Rahman",
    email: "demo@salesflow.app",
    status: "Active",
  },
  {
    customerId: "22000002",
    shopName: "City Mart Traders",
    ownerName: "Fazlul Karim",
    ownerContact: "01822334455",
    marketName: "Dhanmondi",
    district: "Dhaka",
    area: "Dhaka North",
    territory: "North Zone",
    shopType: "Wholesale",
    fullAddress: "Road 8, Dhanmondi, Dhaka",
    latitude: "23.7461",
    longitude: "90.3774",
    salesOfficer: "Aisha Rahman",
    email: "demo@salesflow.app",
    status: "Active",
  },
  {
    customerId: "22000003",
    shopName: "Riverside Auto Care",
    ownerName: "Sultan Ahmed",
    ownerContact: "01933445566",
    marketName: "Chattogram Port",
    district: "Chattogram",
    area: "Port City",
    territory: "Coastal Zone",
    shopType: "Retail",
    fullAddress: "Port Road, Chattogram",
    latitude: "22.3569",
    longitude: "91.7832",
    salesOfficer: "Mehedi Hasan",
    email: "mehedi@salesflow.app",
    status: "Active",
  },
  {
    customerId: "22000004",
    shopName: "Khulna Supply House",
    ownerName: "Nasir Hossain",
    ownerContact: "01644556677",
    marketName: "Khulna City",
    district: "Khulna",
    area: "Khulna Central",
    territory: "Western Zone",
    shopType: "IWS CVO",
    fullAddress: "Station Road, Khulna",
    latitude: "22.8456",
    longitude: "89.5404",
    salesOfficer: "Aisha Rahman",
    email: "demo@salesflow.app",
    status: "Active",
  },
];

export const demoProducts = [
  { productId: "PRD-1001", productName: "Premium Engine Oil 5L", category: "Lubricants", packSize: "5L", pricePerLiter: 120, canPailDrum: 0, cartoonPrice: 0, status: "Active" },
  { productId: "PRD-1002", productName: "Industrial Grease 20L", category: "Grease", packSize: "20L", pricePerLiter: 110, canPailDrum: 0, cartoonPrice: 0, status: "Active" },
  { productId: "PRD-1003", productName: "Transmission Fluid 4L", category: "Fluids", packSize: "4L", pricePerLiter: 90, canPailDrum: 0, cartoonPrice: 0, status: "Active" },
  { productId: "PRD-1004", productName: "Heavy Duty Coolant", category: "Coolant", packSize: "5L", pricePerLiter: 95, canPailDrum: 0, cartoonPrice: 0, status: "Active" },
  { productId: "PRD-1005", productName: "Brake Fluid 1L", category: "Brake", packSize: "1L", pricePerLiter: 140, canPailDrum: 0, cartoonPrice: 0, status: "Active" },
];

export const demoSubDBs = [
  { zone: "North Zone", sapId: "SAP-101", area: "Dhaka North", subDbName: "North Star Distribution", status: "Active" },
  { zone: "Coastal Zone", sapId: "SAP-204", area: "Port City", subDbName: "Coastal Trade Hub", status: "Active" },
  { zone: "Eastern Zone", sapId: "SAP-330", area: "Sylhet City", subDbName: "Hill Distribution Ltd.", status: "Active" },
  { zone: "Western Zone", sapId: "SAP-440", area: "Khulna Central", subDbName: "South Line Supply", status: "Active" },
];

export const demoDashboardData = {
  today: "2026-11-12",
  visits: [
    {
      visitId: "VIS100001",
      timestamp: "2026-11-12T09:15:00.000Z",
      customerCode: "22000001",
      customerName: "Green Valley Mart",
      area: "Dhaka North",
      city: "Dhaka",
      latitude: "23.8124",
      longitude: "90.3567",
      brandFocus: "Premium Engine Oil",
      totalQuantity: 120,
      visitResult: "Inside Radius",
      orderNotReceived: "",
      marketName: "Mirpur 10",
    },
    {
      visitId: "VIS100002",
      timestamp: "2026-11-12T12:35:00.000Z",
      customerCode: "22000002",
      customerName: "City Mart Traders",
      area: "Dhaka North",
      city: "Dhaka",
      latitude: "23.7461",
      longitude: "90.3774",
      brandFocus: "Industrial Grease",
      totalQuantity: 80,
      visitResult: "Inside Radius",
      orderNotReceived: "",
      marketName: "Dhanmondi",
    },
  ],
  visitCount: 2,
  orders: [
    { invoiceId: "ORD100001", customerName: "Green Valley Mart", productName: "Premium Engine Oil 5L", quantity: 24, createdAt: "2026-11-12T10:08:00.000Z" },
    { invoiceId: "ORD100002", customerName: "City Mart Traders", productName: "Industrial Grease 20L", quantity: 18, createdAt: "2026-11-12T13:10:00.000Z" },
  ],
  orderCount: 2,
  totalOrderQty: 42,
  clockIn: "2026-11-12T08:42:00.000Z",
  clockOut: "2026-11-12T17:15:00.000Z",
  route: [
    { lat: 23.8124, lng: 90.3567, name: "Green Valley Mart", time: "2026-11-12T09:15:00.000Z", area: "Dhaka North" },
    { lat: 23.7461, lng: 90.3774, name: "City Mart Traders", time: "2026-11-12T12:35:00.000Z", area: "Dhaka North" },
  ],
  totalDistanceKm: 8.4,
  areasVisited: ["Dhaka North"],
};

export const demoReportData = {
  startDate: "2026-09-01",
  endDate: "2026-11-12",
  summary: {
    totalVisits: 24,
    totalOrders: 18,
    totalOrderQty: 620,
    totalDistanceKm: 214.5,
    activeDays: 12,
    totalClockIns: 12,
    uniqueAreas: 4,
    uniqueCustomers: 10,
    avgQtyPerVisit: 25.8,
    avgVisitsPerDay: 2,
  },
  visits: [
    { visitId: "VIS100001", timestamp: "2026-11-12T09:15:00.000Z", date: "2026-11-12", customerCode: "22000001", customerName: "Green Valley Mart", area: "Dhaka North", city: "Dhaka", latitude: "23.8124", longitude: "90.3567", brandFocus: "Premium Engine Oil", totalQuantity: 120, visitResult: "Inside Radius", orderNotReceived: "", marketName: "Mirpur 10", territory: "North Zone", visitStatus: "Completed" },
    { visitId: "VIS100002", timestamp: "2026-11-12T12:35:00.000Z", date: "2026-11-12", customerCode: "22000002", customerName: "City Mart Traders", area: "Dhaka North", city: "Dhaka", latitude: "23.7461", longitude: "90.3774", brandFocus: "Industrial Grease", totalQuantity: 80, visitResult: "Inside Radius", orderNotReceived: "", marketName: "Dhanmondi", territory: "North Zone", visitStatus: "Completed" },
    { visitId: "VIS100003", timestamp: "2026-11-10T11:10:00.000Z", date: "2026-11-10", customerCode: "22000003", customerName: "Riverside Auto Care", area: "Port City", city: "Chattogram", latitude: "22.3569", longitude: "91.7832", brandFocus: "Transmission Fluid", totalQuantity: 95, visitResult: "Inside Radius", orderNotReceived: "", marketName: "Chattogram Port", territory: "Coastal Zone", visitStatus: "Completed" },
  ],
  orders: [
    { invoiceId: "ORD100001", customerName: "Green Valley Mart", customerId: "22000001", productName: "Premium Engine Oil 5L", productId: "PRD-1001", quantity: 24, createdAt: "2026-11-12T10:08:00.000Z", date: "2026-11-12", orderStatus: "Done", distributorName: "North Star Distribution", orderMonth: 11, orderYear: 2026 },
    { invoiceId: "ORD100002", customerName: "City Mart Traders", customerId: "22000002", productName: "Industrial Grease 20L", productId: "PRD-1002", quantity: 18, createdAt: "2026-11-12T13:10:00.000Z", date: "2026-11-12", orderStatus: "Done", distributorName: "North Star Distribution", orderMonth: 11, orderYear: 2026 },
    { invoiceId: "ORD100003", customerName: "Riverside Auto Care", customerId: "22000003", productName: "Transmission Fluid 4L", productId: "PRD-1003", quantity: 22, createdAt: "2026-11-10T12:05:00.000Z", date: "2026-11-10", orderStatus: "Done", distributorName: "Coastal Trade Hub", orderMonth: 11, orderYear: 2026 },
  ],
  attendance: [
    { type: "Clock In", timestamp: "2026-11-12T08:42:00.000Z", date: "2026-11-12" },
    { type: "Clock Out", timestamp: "2026-11-12T17:15:00.000Z", date: "2026-11-12" },
  ],
  route: [
    { lat: 23.8124, lng: 90.3567, name: "Green Valley Mart", time: "2026-11-12T09:15:00.000Z", area: "Dhaka North", date: "2026-11-12" },
    { lat: 23.7461, lng: 90.3774, name: "City Mart Traders", time: "2026-11-12T12:35:00.000Z", area: "Dhaka North", date: "2026-11-12" },
  ],
  dailySummary: [
    { date: "2026-11-12", visits: 2, orders: 2, qty: 42 },
    { date: "2026-11-10", visits: 1, orders: 1, qty: 22 },
  ],
  topProducts: [
    { name: "Premium Engine Oil 5L", qty: 120, count: 5 },
    { name: "Industrial Grease 20L", qty: 85, count: 2 },
  ],
  topCustomers: [
    { name: "Green Valley Mart", qty: 140, count: 3 },
    { name: "City Mart Traders", qty: 110, count: 2 },
  ],
  areaBreakdown: [
    { area: "Dhaka North", visits: 12 },
    { area: "Port City", visits: 6 },
    { area: "Sylhet City", visits: 4 },
    { area: "Khulna Central", visits: 2 },
  ],
  brandBreakdown: [
    { brand: "Premium Engine Oil", visits: 8 },
    { brand: "Industrial Grease", visits: 6 },
    { brand: "Transmission Fluid", visits: 4 },
  ],
};

export function makeDemoLoginResponse(email?: string, password?: string) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const normalizedPassword = String(password || "").trim();

  if (!normalizedEmail || !normalizedPassword) {
    return { success: false, message: "Email and password are required." };
  }

  return {
    success: true,
    user: {
      ...demoUser,
      email: normalizedEmail.includes("@") ? normalizedEmail : demoUser.email,
      employeeName: demoUser.employeeName,
    },
  };
}

export function makeDemoCustomerId() {
  return `220${String(Date.now()).slice(-5)}`;
}
