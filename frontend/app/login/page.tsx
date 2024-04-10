"use client";
import { useQuery } from "react-query";
import { fetchStatus } from "./fetch";

export default function LoginPage() {
  const { data, isLoading, isError } = useQuery("status", fetchStatus, {
    refetchInterval: 5000, 
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Seu Backend esta Offline</div>;

  return (
    <div>
      <h1>Data fetched successfully</h1>
    </div>
  );
}
