// spinner.tsx
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

type SpinnerProps = {
  size?: number; // Optional size prop
  color?: string; // Optional color prop
  loading?: boolean; // Optional loading state prop
};

export function Spinner({ size = 35, color = "#000000", loading = true }: SpinnerProps) {
  return (
    <div className="flex justify-center items-center">
      <ClipLoader size={size} color={color} loading={loading} />
    </div>)}
