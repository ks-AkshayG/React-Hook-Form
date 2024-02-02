import {useState, useEffect} from 'react'
import UpdateUserForm from '../components/UpdateUserForm'
import CreateUserForm from '../components/CreateUserForm'
import { getAllUserData, deleteUserData } from '../utility/UserDataOperations'
import UserDataTable from '../components/UserDataTable'


type FetchedDataValuesTypes = {
  id: number
  created_at: string
  name: string
  email: string
  phone: number
  state: string
  city: string
  address: string
}[]

const Home = () => {

  const [data, setData] = useState<FetchedDataValuesTypes>([]);
  const [fetchError, setFetchError] = useState(false);

  const [addData, setAddData] = useState(false);
  const [editData, setEditData] = useState(false);

  const [id, setId] = useState(0);

  useEffect(() => {

    const fetchDataTable = async() => {

      const fetch = await getAllUserData()

      if(fetch.error) {
        setFetchError(true)
        setData([])
        // console.log(fetch.error)
      }

      if(fetch.data) {
        setData(fetch.data)
        setFetchError(false)
        // console.log(fetch.data)
      }

    }
    fetchDataTable()

  }, [addData, editData])

  const handleAddData = () => {
    setAddData(true)
  }

  const handleEdit = (id: number) => {
    setEditData(true)
    setId(id)
  }

  const handleDelete = async(id: number) => {

    const conformation = confirm("Are you sure you want to delete data?")

    if(conformation) {

      const deleteData = await deleteUserData(id)

        console.log(deleteData.data)

        setData(prevData => {
          return prevData.filter(d => d.id != id)
        })
    }
  }

  const handleDataFormClose = () => {
    setAddData(false)
  }

  const handleUpdateFormClose = () => {
    setEditData(false)
  }

  return (
    <div className=' w-full h-full flex flex-col bg-gray-200'>
      <div className='w-full '>
        {fetchError && (<div className=' text-center text-[40px] text-red-600 text-pretty'>Could not fetch the data</div>)}
        {!fetchError && (<UserDataTable formData={data} handleEditProp={(id)=> handleEdit(id)} handleDeleteProp={(id) => handleDelete(id)} />)}
      </div>
      {
        !fetchError && (
          <div className='w-full flex justify-center'>
            <button 
              className='my-3 border w-fit hover:border-white border-green-600 hover:bg-green-600 hover:text-white rounded-md px-3'
              onClick={handleAddData}
              >add
            </button>
          </div>
        )
      }
      {
        addData && (
          <div className=' absolute top-0 right-0 bg-gray-400 w-[70%] h-full flex justify-center'>
            <div className='absolute top-0 right-0'>
              <button onClick={handleDataFormClose}><i className='bx bx-message-square-x text-[40px]'></i></button>
            </div>
              <CreateUserForm />
          </div>
        )
      }
      {
        editData && (
          <div className=' absolute top-0 right-0 bg-gray-400 w-[70%] h-full flex justify-center'>
            <div className='absolute top-0 right-0'>
              <button onClick={handleUpdateFormClose}><i className='bx bx-message-square-x text-[40px]'></i></button>
            </div>
            <UpdateUserForm id={id} />
          </div>
        )
      }
    </div>
  )
}

export default Home