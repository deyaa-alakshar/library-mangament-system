import { Button, Flex } from "@radix-ui/themes";

const PaginationControls = ({
  currentPage,
  setPage,
  totalPages,
}: {
  currentPage: number;
  setPage: (page: number) => void;
  totalPages: number;
}) => {
  const goToNextPage = (page: number) => {
    if (currentPage < totalPages) setPage(page + 1);
  };

  const goToPreviousPage = (page: number) => {
    if (currentPage > 1) setPage(page - 1);
  };

  return (
    <Flex justify={"center"} gapX={"5"} my={"4"} >
      <Button
        onClick={() => goToPreviousPage(currentPage)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <Button
        onClick={() => goToNextPage(currentPage)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </Flex>
  );
};

export default PaginationControls;
