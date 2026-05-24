const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img src="/logo/small-on-light.png" alt="Logo" className="h-15" />
      <div className="flex flex-col text-primary text-2xl font-normal tracking-tight leading-none">
        <span>Samer</span>
        <span>Ventures</span>
      </div>
    </div>
  )
}

export default Logo