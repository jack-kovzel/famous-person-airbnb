'use client';

import { BiSearch } from 'react-icons/bi';
import { useCallback, useContext, useEffect, useState } from 'react';
import { SearchContext, SearchContextType } from '@/app/contexts/SearchContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SearchInput from '@/app/components/inputs/SearchInput';

export const QUERY_PARAM_SEARCH = 'searchString';

const Search = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const { setSearchQuery } = useContext(SearchContext) as SearchContextType;

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get(QUERY_PARAM_SEARCH) || '',
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchQuery(searchTerm);
      router.push(
        pathname + '?' + createQueryString(QUERY_PARAM_SEARCH, searchTerm),
      );
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, setSearchQuery, router, createQueryString, pathname]);

  return (
    <div
      className="
        border-[1px]
        w-full
        md:w-auto
        py-2
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer
      "
    >
      <div
        className="
          flex-row
          items-center
          justify-between
        "
      >
        <div
          className="
            pl-6
            pr-2
            text-gray-600
            flex
            flex-row
            items-center
            gap-3
          "
        >
          <SearchInput
            id="find"
            label=""
            placeholder='E.g. "Friedrich Wilhelm Bessel" or "German astronomers"'
            onChange={setSearchTerm}
            value={searchTerm}
          />
          <div
            className="
              p-2
              bg-rose-500
              rounded-full
              text-white
            "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
