const checkUser = async (token: string) => {
  const response = await fetch("http://localhost:3000/checkuser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    return null; 
  }

  const data = await response.json();

  return data ?? null;
    
};

export default checkUser;
