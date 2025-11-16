const API_BASE = import.meta.env.VITE_APIBASE_URL;

export async function apiRequest(endpoint, method = "GET", body = null) {
  try {
    const token = localStorage.getItem("token");
    const options = {
      method,
      headers: { 
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE}${endpoint}`, options);

    let data;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      throw new Error(data?.msg || "Error en la solicitud");
    }

    return data;
  } catch (error) {
    console.error("API error:", error.message);
    throw error;
  }
}
