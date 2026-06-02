interface LogoProps {
  size?: "sm" | "md" | "lg"
  layout?: "horizontal" | "vertical"
  isGradient?: boolean
}

const Logo = ({ size = "lg", layout = "horizontal", isGradient = false }: LogoProps) => {
  const sizeClasses = {
    sm: { img: "h-10", text: "text-lg" },
    md: { img: "h-12", text: "text-xl" },
    lg: { img: "h-15", text: "text-2xl" },
  }

  const { img, text } = sizeClasses[size]

  const baseClasses = `flex flex-col font-normal leading-none tracking-tight ${text}`
  const colorClasses = isGradient
    ? 'bg-gradient-to-r from-black from-[-15%] to-primary to-[60%] bg-clip-text text-transparent'
    : 'text-primary'
  const textClasses = `${baseClasses} ${colorClasses}`

  if (layout === "vertical") {
    return (
      <div className="flex flex-col items-start gap-1">
        <img src="/logo/small-on-light.png" alt="Logo" className={img} />
        <div className={textClasses}>
          <span>Samer</span>
          <span>Ventures</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <img src="/logo/small-on-light.png" alt="Logo" className={img} />
      <div className={textClasses}>
        <span>Samer</span>
        <span>Ventures</span>
      </div>
    </div>
  )
}

export default Logo