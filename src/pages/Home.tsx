import {useState, useEffect} from 'react'
import UpdateUserForm from '../components/UpdateUserForm'
import CreateUserForm from '../components/CreateUserForm'
import { getAllUserData, deleteUserData, getSearchedUserData } from '../utility/UserDataOperations'
import UserDataTable from '../components/UserDataTable'
import { SearchBar } from '../utility/MantineSearchBar'
import { useDisclosure } from '@mantine/hooks';
import { Button } from '@mantine/core';
import MantineDrawer from '../utility/MantineDrawer'
import MantineConfirmMenu from '../utility/MantineConfirmMenu'

type SearchedDataValuesTypes = {
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

  const [data, setData] = useState<SearchedDataValuesTypes>([]);
  const [fetchError, setFetchError] = useState(false);

  const [updateID, setUpdateID] = useState(0);
  const [deleteID, setDeleteID] = useState(0)

  const [searchValue, setSearchValue] = useState('');
  const [searchUserData, setSearchUserData] = useState<SearchedDataValuesTypes | null>();
  const [searchStatus, setSearchStatus] = useState(0);

  const [addDataDrawer, setAddDataDrawer] = useDisclosure(false);
  const [updateDataDrawer, setUpdateDataDrawer] = useDisclosure(false);
  const [deleteConformation, setDeleteConformation] = useDisclosure(false);

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

  }, [addDataDrawer, updateDataDrawer])

  const handleEdit = (id: number) => {
    setUpdateDataDrawer.open()
    setUpdateID(id)
  }

  const handleSearchUserData = () => {
    const getSearch = async () => {
      const searchUserData = await getSearchedUserData(searchValue)

      const userData = searchUserData.data

      setSearchStatus(searchUserData.status)
      setSearchUserData(userData)
      
      // console.log(searchUserData.status)
      // console.log('console data',  userData)
    }
    getSearch()
  }

  const handleDelete = async(id: number) => {
    setDeleteConformation.open()
    setDeleteID(id)
  }

  const handleConfirm = async() => {
    setDeleteConformation.close()

    const deleteData = await deleteUserData(deleteID)

    // console.log(deleteData.data)

    setData(prevData => {
      return prevData.filter(d => d.id != deleteID)
    })
  }

  return (
    <div className='  w-full h-full flex flex-col bg-gray-100'>
      <div className='w-full container mx-auto'>
        {fetchError && (<div className=' text-center text-[40px] text-red-600 text-pretty'>Could not fetch the data</div>)}
        {!fetchError && (
          <div>
            <div className='flex justify-center'>
              <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} onClick={handleSearchUserData} />
            </div>
            {
              (searchUserData && searchStatus === 200)  && (<UserDataTable formData={searchUserData} handleEditProp={(id)=> handleEdit(id)} handleDeleteProp={(id) => handleDelete(id)} />)
            }
            {
              !searchUserData && (<UserDataTable formData={data} handleEditProp={(id)=> handleEdit(id)} handleDeleteProp={(id) => handleDelete(id)} />)
            }
            <div className='flex justify-center'>
              <Button variant="filled" onClick={setAddDataDrawer.open} className=' my-2'>Add</Button>
            </div>
          </div>
        )}
        
        <MantineDrawer opened={addDataDrawer} onClose={setAddDataDrawer.close} position='right' size='50%'>
          <CreateUserForm />
        </MantineDrawer>

        <MantineDrawer opened={updateDataDrawer} onClose={setUpdateDataDrawer.close} position='right' size='50%' >
          <UpdateUserForm id={updateID} />
        </MantineDrawer>

        <MantineConfirmMenu 
          title='Are you sure? You want to Delete.' 
          opened={deleteConformation}
          onClose={setDeleteConformation.close}
          onClick={handleConfirm}
        />

      </div>
    </div>
  )
}

export default Home