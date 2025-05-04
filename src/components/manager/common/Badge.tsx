import React from "react";

type BadgeVariant = "primary" | "success" | "warning" | "error" | "info";

interface BadgeProps {
	variant?: BadgeVariant;
	children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ variant = "primary", children }) => {
	const variantClasses = {
		primary: "bg-primary bg-opacity-20 text-text",
		success: "bg-green-100 text-green-800",
		warning: "bg-amber-100 text-amber-800",
		error: "bg-red-100 text-red-800",
		info: "bg-blue-100 text-blue-800",
	};

	return (
		<span
			className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]}`}
		>
			{children}
		</span>
	);
};

export default Badge;
