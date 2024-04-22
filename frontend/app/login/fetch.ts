export async function fetchStatus() {
  const response = await fetch("http://localhost:3001");
  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
}

export async function fetchLogin(data: any) {
  const response = await fetch("http://localhost:3001/account/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

  if (response.status === 200) {
    const json = await response.json();    
    return json;
  } else {
    return false;
  }
}
