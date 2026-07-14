import { useState } from "react";

import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import FilterSelect from "../components/common/FilterSelect";
import Pagination from "../components/common/Pagination";
import LoadingState from "../components/common/LoadingState";
import EmptyState from "../components/common/EmptyState";

import ContractTable from "../components/ContractTable";
import ContractDetailsModal from "../components/ContractDetailsModal";

import { useAdminContracts } from "../hooks/useAdminContracts";

function AdminContractsPage() {

  const [page, setPage] = useState(0);

  const [keyword, setKeyword] = useState("");

  const [status, setStatus] = useState("");

  const [selectedContractId, setSelectedContractId] =
    useState(null);

  const [openDetails, setOpenDetails] =
    useState(false);

  const {

    data,

    isLoading,

    isError,

  } = useAdminContracts({

    page,

    size: 10,

    keyword,

    status,

  });

  if (isLoading) {

    return (

      <LoadingState
        message="Loading contracts..."
      />

    );

  }

  if (isError) {

    return (

      <EmptyState
        message="Failed to load contracts."
      />

    );

  }

  const pageData = data.data;

  const contracts = pageData.content;

  return (

    <div className="space-y-8">

      <PageHeader

        title="Contract Management"

        description="Monitor every contract created across the ORIVEX platform."

      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

        <SearchBar

          value={keyword}

          placeholder="Search contracts..."

          onChange={(e) => {

            setKeyword(e.target.value);

            setPage(0);

          }}

        />

        <FilterSelect

          value={status}

          onChange={(e) => {

            setStatus(e.target.value);

            setPage(0);

          }}

        >

          <option value="">
            All Status
          </option>

          <option value="PENDING_PAYMENT">
            Pending Payment
          </option>

          <option value="PAID">
            Paid
          </option>

          <option value="ACTIVE">
            Active
          </option>

          <option value="SUBMITTED">
            Submitted
          </option>

          <option value="COMPLETED">
            Completed
          </option>

          <option value="CANCELLED">
            Cancelled
          </option>

        </FilterSelect>

      </div>

      {contracts.length === 0 ? (

        <EmptyState
          message="No contracts found."
        />

      ) : (

        <ContractTable

          contracts={contracts}

          onView={(contract) => {

            setSelectedContractId(contract.id);

            setOpenDetails(true);

          }}

        />

      )}

      <Pagination

        page={page}

        totalPages={pageData.totalPages}

        onPrevious={() =>

          setPage((prev) => prev - 1)

        }

        onNext={() =>

          setPage((prev) => prev + 1)

        }

      />

      {openDetails && (

        <ContractDetailsModal

          contractId={selectedContractId}

          onClose={() => {

            setOpenDetails(false);

            setSelectedContractId(null);

          }}

        />

      )}

    </div>

  );

}

export default AdminContractsPage;