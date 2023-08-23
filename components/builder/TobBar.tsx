import React from 'react'

type Data = {
    search: string,
    setSearch: (search:string) => void
}

const TobBar = ({search, setSearch}:Data) => {
  return (
    <div className="flex justify-between px-[4%]">
        <h1 className="text-3xl tracking-[0.4rem] font-semibold">Prediefined Foods</h1>
        <input 
            type="text"
            value={search}
            placeholder="Search..."
            className="pl-[1%] py-2 px-[10%] text-[1.1rem] border border-gray-300"
            onChange={(e) => setSearch(e.target.value)}
        />
    </div>
  )
}

export default TobBar