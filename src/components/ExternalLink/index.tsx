import { Link } from "@/components/index";
import { ReactNode } from "react";

export default function ExternalLink({ label, value }: { label: ReactNode; value: string }) {
  return <Link to={value}>{label}</Link>;
}
