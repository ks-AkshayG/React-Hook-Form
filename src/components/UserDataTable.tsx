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
  return (
    <div>
      <div className="text-center font-extrabold my-3 text-[30px]">
        Table of Data
      </div>

      <div className="w-full flex justify-center">
        <table className="border border-black">
          <tbody>
            <tr className="border border-black text-center">
              {
                userTableArray.map((value, index) => (
                  <td className={userTableHeadingStyle} key={index}>{value}</td>
                ))
              }
            </tr>
            {formData.map((dataRow) => (
              <tr key={dataRow.id} className="border border-black">
                <td className={userTableDataStyle}>{dataRow.name}</td>
                <td className={userTableDataStyle}>{dataRow.email}</td>
                <td className={userTableDataStyle}>{dataRow.phone}</td>
                <td className={userTableDataStyle}>{dataRow.state}</td>
                <td className={userTableDataStyle}>{dataRow.city}</td>
                <td className={userTableDataStyle}>{dataRow.address}</td>
                <td className="border border-black pr-2 pl-1 text-center">
                  <button onClick={() => handleEditProp(dataRow.id)}>
                    <i className="bx bx-edit text-[20px]"></i>
                  </button>
                </td>
                <td className="border border-black pr-2 pl-1 text-center">
                  <button onClick={() => handleDeleteProp(dataRow.id)}>
                    <i className="bx bxs-message-square-x text-[20px]"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDataTable;
