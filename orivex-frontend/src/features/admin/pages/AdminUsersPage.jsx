import { useDeleteUser } from "../hooks/useDeleteUser";
import { useState } from "react";

import UserDetailsModal from "../components/UserDetailsModal";

import { useUsers } from "../hooks/useUsers";

import UserTable from "../components/UserTable";
import { toast } from "sonner";

import ConfirmActionModal from "../../../components/ui/ConfirmActionModal";

import { useUpdateUserStatus } from "../hooks/useUpdateUserStatus";

import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import FilterSelect from "../components/common/FilterSelect";
import Pagination from "../components/common/Pagination";
import LoadingState from "../components/common/LoadingState";
import EmptyState from "../components/common/EmptyState";
import { useDebounce } from "@/hooks/useDebounce";

function AdminUsersPage() {

  const [page, setPage] = useState(0);

    const [keyword, setKeyword] = useState("");
    

    const debouncedKeyword =
        useDebounce(keyword);
    
   const [selectedUserId, setSelectedUserId] =
  useState(null);

const [openDetails, setOpenDetails] =
        useState(false);
    

  const [role, setRole] = useState("");

  const [status, setStatus] = useState("");

  const [selectedUser, setSelectedUser] =
    useState(null);
  
  const [actionType, setActionType] =
    useState(null);
  

const [openConfirmModal, setOpenConfirmModal] =
  useState(false);

const updateStatus =
    useUpdateUserStatus();
  
const deleteUser =
  useDeleteUser();  

  const size = 10;

  const {
  data,
  isLoading,
  isError,
} = useUsers({

  page,
  size,
  keyword: debouncedKeyword,
  role,
  status,

});

  if (isLoading) {
    return (
      <LoadingState message="Loading users..." />
    );
  }

  if (isError) {
    return (
      <EmptyState message="Failed to load users." />
    );
  }

  const pageData = data.data;

  const users = pageData.content;

  function handleToggleStatus(user) {

  setSelectedUser(user);

  setActionType("STATUS");

  setOpenConfirmModal(true);

  }
  
  function handleDelete(user) {

  setSelectedUser(user);

  setActionType("DELETE");

  setOpenConfirmModal(true);

  }
  

  return (

    <div className="space-y-8">

      <PageHeader
        title="User Management"
        description="Manage all registered users."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">

        <SearchBar
  value={keyword}
  onChange={(e) => {

    console.log("typing...");

    setKeyword(e.target.value);

  }}
/>

        <FilterSelect
          value={role}
          onChange={(e) => {

            setRole(e.target.value);

            setPage(0);

          }}
        >

          <option value="">
            All Roles
          </option>

          <option value="CLIENT">
            Client
          </option>

          <option value="FREELANCER">
            Freelancer
          </option>

          <option value="ADMIN">
            Admin
          </option>

        </FilterSelect>

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

          <option value="ACTIVE">
            Active
          </option>

          <option value="PENDING_VERIFICATION">
            Pending Verification
          </option>

          <option value="SUSPENDED">
            Suspended
          </option>

        </FilterSelect>

      </div>

      {users.length === 0 ? (

        <EmptyState message="No users found." />

      ) : (

      <UserTable
  users={users}

  onView={(user) => {

    setSelectedUserId(user.id);

    setOpenDetails(true);

  }}

  onToggleStatus={handleToggleStatus}

  onDelete={handleDelete}
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

  <UserDetailsModal

    userId={selectedUserId}

    onClose={() => {

      setOpenDetails(false);

      setSelectedUserId(null);

    }}

  />

)}

          {openConfirmModal && selectedUser && (

  <ConfirmActionModal

    title={
      actionType === "DELETE"
        ? "Delete User"
        : selectedUser.accountStatus === "ACTIVE"
        ? "Suspend User"
        : "Activate User"
    }

    message={
      actionType === "DELETE"

        ? `Are you sure you want to delete ${selectedUser.name}?`

        : `Are you sure you want to ${
            selectedUser.accountStatus === "ACTIVE"
              ? "suspend"
              : "activate"
          } ${selectedUser.name}?`
    }

    confirmText={
      actionType === "DELETE"

        ? "Delete"

        : selectedUser.accountStatus === "ACTIVE"

        ? "Suspend"

        : "Activate"
    }

    confirmColor={
      actionType === "DELETE"

        ? "bg-red-700 hover:bg-red-800"

        : selectedUser.accountStatus === "ACTIVE"

        ? "bg-red-600 hover:bg-red-700"

        : "bg-green-600 hover:bg-green-700"
    }

    loading={
      actionType === "DELETE"

        ? deleteUser.isPending

        : updateStatus.isPending
    }

    onClose={() => {

      setOpenConfirmModal(false);

      setSelectedUser(null);

      setActionType(null);

    }}

    onConfirm={() => {

      if (actionType === "DELETE") {

        deleteUser.mutate(

          selectedUser.id,

          {

            onSuccess: () => {

              toast.success(
                "User deleted successfully."
              );

              setOpenConfirmModal(false);

              setSelectedUser(null);

              setActionType(null);

            },

            onError: (error) => {

              toast.error(

                error?.response?.data?.message ||

                "Failed to delete user."

              );

            },

          }

        );

        return;

      }

      updateStatus.mutate(

        {

          userId: selectedUser.id,

          status:
            selectedUser.accountStatus === "ACTIVE"

              ? "SUSPENDED"

              : "ACTIVE",

        },

        {

          onSuccess: () => {

            toast.success(
              "User status updated successfully."
            );

            setOpenConfirmModal(false);

            setSelectedUser(null);

            setActionType(null);

          },

          onError: () => {

            toast.error(
              "Failed to update user status."
            );

          },

        }

      );

    }}

  />

)}

  

    </div>

  );

}

export default AdminUsersPage;