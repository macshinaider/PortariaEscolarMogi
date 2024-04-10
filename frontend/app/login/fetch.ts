export async function fetchStatus() {
  const response = await fetch("http://localhost:3001");
  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
}