import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "success";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	isLoading?: boolean;
	children: React.ReactNode;
	fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	variant = "primary",
	size = "md",
	isLoading = false,
	children,
	fullWidth = false,
	className = "",
	...props
}) => {
	const variantClasses = {
		primary: "bg-primary hover:bg-primary-light text-text",
		secondary: "bg-background hover:bg-primary-light text-text",
		outline:
			"bg-transparent hover:bg-primary-light text-text border border-primary",
		danger: "bg-red-600 hover:bg-red-700 text-white",
		success: "bg-green-600 hover:bg-green-700 text-white",
	};

	const sizeClasses = {
		sm: "text-xs px-3 py-1.5",
		md: "text-sm px-4 py-2",
		lg: "text-base px-6 py-3",
	};

	return (
		<button
			className={`
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? "w-full" : ""}
        rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
        transition-colors duration-200 ease-in-out
        ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
        ${className}
      `}
			disabled={isLoading || props.disabled}
			{...props}
		>
			{isLoading ? (
				<div className="flex items-center justify-center">
					<svg
						className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
						></path>
					</svg>
					Loading...
				</div>
			) : (
				children
			)}
		</button>
	);
};

export default Button;
