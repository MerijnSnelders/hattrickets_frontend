import { useState, useEffect, JSX } from "react";

interface SearchPageProps<T> {
  title: string;
  placeholder: string;
  fetchData: (search: string, page: number, size: number) => Promise<T[]>;
  renderItem: (item: T) => JSX.Element;
}

const SearchPage = <T,>({ title, placeholder, fetchData, renderItem }: SearchPageProps<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const size = 10; // Items per page

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await fetchData(search, page, size);
        setItems(data);
      } catch (error) {
        console.error(`Error loading ${title.toLowerCase()}s:`, error);
      }
    };

    fetchItems();
  }, [search, page]);

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      <div className="flex w-full items-center justify-center rounded-xl h-14 bg-[#244724]">
        <div className="text-[#93c893] flex items-center justify-center pl-4 rounded-l-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input w-full rounded-r-xl text-white focus:outline-none border-none bg-[#244724] placeholder:text-[#93c893] px-4"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.length > 0 ? items.map(renderItem) : <p className="text-gray-400">No results found.</p>}
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="px-4 py-2 bg-gray-700 rounded-lg text-white disabled:opacity-50"
        >
          Previous
        </button>
        <button onClick={() => setPage((prev) => prev + 1)} className="px-4 py-2 bg-gray-700 rounded-lg text-white">
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchPage;
