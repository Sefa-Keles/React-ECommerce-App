import { useMemo } from 'react'
import  { useQuery, useMutation, useQueryClient } from  'react-query'
import { Link } from 'react-router-dom'
import { fetchProductList, deleteProduct } from '../../../api'
import { Text, Button, Flex } from '@chakra-ui/react'
import { Table, Popconfirm } from 'antd'
const Products = () => {
  const { isLoading, isError, data, error} = useQuery('admin:products', fetchProductList);
  
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => queryClient.invalidateQueries('admin:products')
  })

  const columns = useMemo(()=> {
    return [
      {
        title: 'Title', 
        dataIndex: 'title',
        key: 'key'
      },
      {
        title: 'Price', 
        dataIndex: 'price',
        key: 'price'
      },
      {
        title: 'Created At', 
        dataIndex: 'createdAt',
        key: 'createdAt'
      },
      {
        title: 'Action', 
        dataIndex: 'action',
        render: (text, record) => (
          <>
            <Link to={`/admin/products/${record._id}`}>Edit</Link>
            <Popconfirm title='Are you sure?'
            onConfirm={()=>{
              deleteMutation.mutate(record._id, {
                onSuccess: () => {
                  console.log('Success');
                }
              })
            }}
            onCancel={()=>console.log('Cancelled.')}
            okText='Yes'
            cancelText='No'
            placement='left'
            >
              <a href='/#' style={{marginLeft:10}}>
                Delete
              </a>
            </Popconfirm>
          </>
        )
      }
    ]
  },[])
  
  if (isLoading) {
    return <div>Loading...</div>
  }
  
  if(isError){
    return <div>Error: {error.message}</div>
  }

  //console.log(data)

  return (
    <div>
      <Flex justifyContent='space-between' alignItems='center'>
        <Text fontSize='2xl' p='5'>
        Products
        </Text>
        <Link to='/admin/products/newProduct'>
          <Button colorScheme='blue'>Add New</Button>
        </Link>
      </Flex>
      <Table dataSource={data} columns={columns} rowKey='_id'/>
    </div>
  )
}

export default Products