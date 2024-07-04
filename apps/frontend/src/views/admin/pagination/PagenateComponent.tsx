import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";


const PagenateComponent = ({ totalPages, currentPage, onPageChange }: { totalPages: number, currentPage: number, onPageChange: any }) => {

    const [displayPages, setDisplayPages] = useState<any[]>([]);
    const handleClick = (pageNumber: number) => {
        onPageChange(pageNumber);
        console.log("090", pageNumber)
    };

    const updateDisplayPages = () => {
        const maxDisplayPages = 3; // Maximum number of pages to display
        let startPage = 1;
        let endPage = totalPages;

        if (totalPages > maxDisplayPages) {
            const halfDisplayPages = Math.floor(maxDisplayPages / 2);
            startPage = Math.max(currentPage - halfDisplayPages, 1);
            endPage = Math.min(startPage + maxDisplayPages - 1, totalPages);

            if (endPage - startPage < maxDisplayPages - 1) {
                startPage = Math.max(endPage - maxDisplayPages + 1, 1);
            }
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        setDisplayPages(pages);
    };

    useEffect(() => {
        updateDisplayPages();
    }, [currentPage, totalPages]);


    return (
        <Fragment>
            <div className="flex justify-center">

                <button onClick={() => handleClick(1)} disabled={currentPage > 1 ? false : true} className='rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300'>
                    <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button onClick={() => handleClick(currentPage - 1)} disabled={currentPage > 1 ? false : true} className='rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300'>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>

                {displayPages.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => handleClick(pageNumber)}
                        className={`px-3 py-2 text-xs font-semibold mr-0.5 ml-0.5 rounded-md ${currentPage === pageNumber ? 'bg-indigo-400 text-black' : 'bg-gray-200 text-gray-500'}`}
                    >
                        {pageNumber}
                    </button>
                ))}

                <button onClick={() => handleClick(currentPage + 1)} disabled={currentPage < totalPages ? false : true} className='rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300'>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button onClick={() => handleClick(totalPages)} disabled={currentPage < totalPages ? false : true} className='rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300'>
                    <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
            </div>
        </Fragment>
    );
}

export default PagenateComponent;