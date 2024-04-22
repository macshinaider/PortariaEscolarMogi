export async function fetchCode() {
  const response = await fetch("http://localhost:3001");
  if (response.status === 200) {
    const json = await response.json();
    return json;
  } else {
    return false;
  }
}
