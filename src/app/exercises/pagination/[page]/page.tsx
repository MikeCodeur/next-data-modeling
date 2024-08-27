import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {getProducts, getProductsPagination} from './actions'
import {ProductsManagement} from './products-management'

//export const fetchCache = 'force-no-store'

export default async function Page({params}: {params: {page: string}}) {
  const {page} = params
  const currentPage = parseInt(page, 10) || 1
  const nbElement = 4 // Nombre d'éléments par page
  const start = (currentPage - 1) * nbElement
  const {products, totalProducts} = await getProductsPagination(
    nbElement,
    start
  )
  const totalPages = Math.ceil(totalProducts / nbElement)
  // console.log('currentPage', currentPage)
  // console.log('nbElement', nbElement)
  // console.log('start', start)
  // console.log('totalProducts', totalProducts)
  // console.log('totalPages', totalPages)

  const maxPagesToShow = 5 // Maximum number of pagination links to show

  // Determine the start and end page numbers
  let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1)
  let endPage = startPage + maxPagesToShow - 1

  if (endPage > totalPages) {
    endPage = totalPages
    startPage = Math.max(endPage - maxPagesToShow + 1, 1)
  }

  const pagesToShow = Array.from(
    {length: endPage - startPage + 1},
    (_, i) => startPage + i
  )

  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">
        Administration de la boutique
      </h1>
      <ProductsManagement products={products ?? []} />
      <div className="mt-5">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={
                  currentPage > 1
                    ? `/exercises/pagination/${currentPage - 1}`
                    : '#'
                }
                isActive={currentPage === 1}
              />
            </PaginationItem>
            {/* Page Numbers */}
            {pagesToShow.map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href={`/exercises/pagination/${pageNum}`}
                  isActive={pageNum === currentPage}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href={
                  currentPage < totalPages
                    ? `/exercises/pagination/${currentPage + 1}`
                    : '#'
                }
                isActive={totalPages === currentPage}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
