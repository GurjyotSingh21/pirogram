"use client"

import { useState } from "react"
import { EVENT_CATEGORIES } from "@/constants/categories"

type Props = {
  onSearch: (query: string) => void
  onCategoryChange: (category: string) => void
}

export default function SearchBar({ onSearch, onCategoryChange }: Props) {

  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("")

  return (
    <div className="flex items-center px-50 gap-5">

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search events..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          onSearch(e.target.value)
        }}
        className="w-1/2 rounded-full border px-5 py-2"
      />

      {/* Category Filter */}
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value)
          onCategoryChange(e.target.value)
        }}
        className="w-1/2 rounded-full border px-5 py-2"
      >

        <option value="">All Categories</option>

        {EVENT_CATEGORIES.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}

      </select>

    </div>
  )
}