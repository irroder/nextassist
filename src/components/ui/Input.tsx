import React from "react";
import { cn } from "../../lib/utils";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, label, error, leftIcon, rightIcon, ...props }, ref) => {
		return (
			<div className="space-y-2">
				{label && (
					<label className="text-sm font-medium text-surface-900">
						{label}
					</label>
				)}
				<div className="relative">
					{leftIcon && (
						<div className="absolute left-3 top-1/2 -translate-y-1/2">
							{leftIcon}
						</div>
					)}
					<input
						type={type}
						className={cn(
							"flex h-10 w-full rounded-md border border-surface-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-surface-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
							leftIcon && "pl-10",
							rightIcon && "pr-10",
							error &&
								"border-error-300 focus-visible:ring-error-500",
							className
						)}
						ref={ref}
						{...props}
					/>
					{rightIcon && (
						<div className="absolute right-3 top-1/2 -translate-y-1/2">
							{rightIcon}
						</div>
					)}
				</div>
				{error && <p className="text-sm text-error-600">{error}</p>}
			</div>
		);
	}
);

Input.displayName = "Input";

export { Input };
