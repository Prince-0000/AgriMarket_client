const API_URL = "http://localhost:4000";

// 1. Get all products
export const getAllProducts = async (token: string | null) => {
  const res = await fetch(`${API_URL}/api/v1/product/list`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  });
  if (!res.ok) throw new Error("Failed to fetch all products");
  return res.json();
};

// 2. Get product by ID
export const getProductById = async (id: number, token: string | null) => {
  const res = await fetch(`${API_URL}/api/v1/product/list/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  });
  if (!res.ok) throw new Error("Failed to fetch product by ID");
  return res.json();
};

// 3. Create feedback
export const createFeedback = async (
  feedback: { farmerId: number; message: string; rating: number },
  token: string | null
) => {
  const res = await fetch(`${API_URL}/api/v1/product/feedback/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(feedback),
  });
  if (!res.ok) throw new Error("Failed to create feedback");
  return res.json();
};

// 4. Get feedback by farmer
export const getFeedbackByFarmer = async (farmerId: number, token: string | null) => {
  const res = await fetch(`${API_URL}/api/v1/product/feedback/${farmerId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  });
  if (!res.ok) throw new Error("Failed to fetch feedback");
  return res.json();
};
