"use client";

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Show, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className='w-full h-full flex items-center justify-between px-30 py-2 sticky top-0 shadow z-50 bg-white'>
      <div className="flex items-center">
      <img className='h-10 w-10 rounded-full bg-transparent object-cover' src="https://imgs.search.brave.com/5kvj0ICBRiOaydo6oXa6jNMkW63zFeP4rFXuEkpBEdQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzgyLzQyLzI1/LzM2MF9GXzE4MjQy/MjU3N18zVll3ak9B/cmNFZFZneW41amNZ/R2hFUXc2cG5DQnNq/NS5qcGc" alt="Logo" />
      <h1 className="text-2xl font-bold font-mono">Pirogram</h1>
      </div>
      <Show when={"signed-in"}>
        <div className='w-1/3 flex items-center justify-between'>
      <Button className="bg-transparent text-lg font-mono hover:text-gray-600 hover:bg-transparent text-black">
        <Link href={"/"}>
        Home
        </Link>
        </Button>
      <Button className="bg-transparent text-lg font-mono hover:text-gray-600 hover:bg-transparent text-black">
        <Link href={"/events/create"}>
        Create Events
        </Link>
      </Button>
      <Button className="bg-transparent text-lg font-mono hover:text-gray-600 hover:bg-transparent text-black">
        <Link href={"/profile"}>
        Profile
        </Link>
        </Button>
      </div>
        <UserButton afterSwitchSessionUrl="/" />
      </Show>
      <Show when={"signed-out"}>
        <Button asChild className="rounded-full text-lg font-mono bg-purple-400 hover:bg-purple-800">
        <Link href="/auth/sign-in">Login</Link>
        </Button>
        </Show>
    </nav>
  )
}

export default Navbar
