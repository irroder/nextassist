import React from "react";

interface AvatarProps {
	src: string;
	alt: string;
	size?: "sm" | "md" | "lg";
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = "md" }) => {
	const sizeClasses = {
		sm: "w-8 h-8",
		md: "w-12 h-12",
		lg: "w-20 h-20",
	};

	return (
		<div
			className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-white shadow-sm`}
		>
			<img
				src={src}
				alt={alt}
				className="w-full h-full object-cover"
				onError={(e) => {
					// Fallback to initials if image fails to load
					const target = e.target as HTMLImageElement;
					target.style.display = "none";
					target.parentElement!.classList.add(
						"bg-indigo-200",
						"flex",
						"items-center",
						"justify-center"
					);
					const div = document.createElement("div");
					div.className = "text-indigo-600 font-semibold";
					div.textContent = alt
						.split(" ")
						.map((n) => n[0])
						.join("")
						.toUpperCase();
					target.parentElement!.appendChild(div);
				}}
			/>
		</div>
	);
};

export default Avatar;
