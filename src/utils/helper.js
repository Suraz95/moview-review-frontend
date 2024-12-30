export function getAuthToken() {
  return localStorage.getItem("auth-token");
}

export function CatchError(error) {
  const { response } = error;
  if (response?.data) return response.data;
  return { error: error.message || error };
}
