import { Table } from "@mantine/core";
import { ThemeIcon } from '@mantine/core';
import { BiWindowClose } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";

type TableDataValuesTypes = {
  formData: {
    id: number;
    created_at: string;
    name: string;
    email: string;
    phone: number;
    state: string;
    city: string;
    address: string;
  }[];
  handleEditProp: (id: number) => void;
  handleDeleteProp: (id: number) => void;
};

const userTableHeadingStyle = "border border-black font-bold px-2";
const userTableDataStyle = "border border-black pr-2 pl-1";

const userTableArray = ['Name', 'Email', 'Phone', 'State', 'City', 'Address', 'Edit', 'Delete']

const UserDataTable = ({
  formData,
  handleEditProp,
  handleDeleteProp,
}: TableDataValuesTypes) => {

  const data = formData.map((dataRow) => (
    <Table.Tr key={dataRow.id} className="border border-black">
      <Table.Td className={userTableDataStyle}>{dataRow.name}</Table.Td>
      <Table.Td className={userTableDataStyle}>{dataRow.email}</Table.Td>
      <Table.Td className={userTableDataStyle}>{dataRow.phone}</Table.Td>
      <Table.Td className={userTableDataStyle}>{dataRow.state}</Table.Td>
      <Table.Td className={userTableDataStyle}>{dataRow.city}</Table.Td>
      <Table.Td className={userTableDataStyle}>{dataRow.address}</Table.Td>
      <Table.Td className="border border-black pr-2 pl-1 text-center">
        <button onClick={() => handleEditProp(dataRow.id)}>
          <ThemeIcon><BiEdit /></ThemeIcon>
        </button>
      </Table.Td>
      <Table.Td className="border border-black pr-2 pl-1 text-center">
        <button onClick={() => handleDeleteProp(dataRow.id)}>
          <ThemeIcon><BiWindowClose /></ThemeIcon>
        </button>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <div className="">
      <div className="text-center font-extrabold my-3 text-[30px]">
        Table of Data
      </div>

      <div className="flex justify-center">

        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
          <Table.Tr className="border border-black text-center">
              {
                userTableArray.map((value, index) => (
                  <Table.Td className={userTableHeadingStyle} key={index}>{value}</Table.Td>
                ))
              }
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>{ data }</Table.Tbody>
        </Table>

      </div>
    </div>
  );
};

export default UserDataTable;
