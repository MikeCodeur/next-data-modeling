import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {getProductsPagination} from './actions'
import {ProductsManagement} from './products-management'

export default async function Page({
  params,
}: {
  params: Promise<{page: string}>
}) {
  const {page} = await params
  const currentPage = parseInt(page, 10) || 1
  const nbElement = 4 // Nombre d'éléments par page
  const start = (currentPage - 1) * nbElement

  // 🐶 Appelle `getProductsPagination` avec les bons params de pagination
  const {products, totalProducts} = await getProductsPagination(0, 0)

  // 🐶 Détermine le nombre total de page grace à `totalProducts` / `nbElement`
  const totalPages = 10

  // 🐶 Choisis le nombre de page à afficher dans la paginations
  const maxPagesToShow = 5 // Maximum number of pagination links to show

  // 🐶 Utilise le code ci-dessous pour déterminer la page de départ visible et le nombre de page
  // 🤖
  // let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1)
  // let endPage = startPage + maxPagesToShow - 1

  // if (endPage > totalPages) {
  //   endPage = totalPages
  //   startPage = Math.max(endPage - maxPagesToShow + 1, 1)
  // }

  // const pagesToShow = Array.from(
  //   {length: endPage - startPage + 1},
  //   (_, i) => startPage + i
  // )

  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">
        Administration de la boutique
      </h1>
      <ProductsManagement products={products ?? []} />
      <div className="mt-5">
        <Pagination>
          <PaginationContent>
            {/* 🐶 Crée le button précédent et désactive à la page 1 avec `isActive={currentPage === 1}`
            
            <PaginationItem>
              <PaginationPrevious
                href={
                  // 🐶 Détermine le lien de la page précédente en fonction de `currentPage`
                }
               
              />
            </PaginationItem> */}

            {/* 🤖 Utilise ce code pour afficher les pages visibles de la paginations
             {pagesToShow.map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href={`/exercises/pagination/${pageNum}`}
                  isActive={pageNum === currentPage}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))} */}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              {/* 🐶 Crée le button suivant et désactive à la dernière page
              <PaginationNext
                href={
                  // 🐶 Détermine le lien de la page suivante en fonction de `currentPage`
                }
                
              /> */}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
