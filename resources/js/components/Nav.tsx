import Logo from "./logo"

const Nav = () => {
  return (
    <div className="flex justify-between items-start gap-2 py-15 px-20 text-primary max-w-[1700px] mx-auto">
      <Logo />
      <div className="text-2xl leading-none">
        Business. Growth
        <br />
        & Sales
      </div>

      <div className="flex flex-col gap-3 text-2xl uppercase font-normal">
        <div>Home</div>
        <div>Services</div>
        <div>Contact</div>
      </div>

      <button className="bg-primary text-white px-10 py-4 rounded-full text-xl font-semibold uppercase tracking-wider">Book Your Call</button>
    </div>
  )
}

export default Nav