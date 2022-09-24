import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MdCancel } from 'react-icons/md';
import Image from "next/image";
import { Flex, Select, Box, Text, Input, Spinner, Icon, Button } from '@chakra-ui/react';
import { filterData, getFilterValues } from '../utils/filterData';

const SearchFilters = () => {
  const [filters, setFilters] = useState(filterData);
  const router = useRouter();

  const searchProperties = (filterValues: any) => {
    console.log('filt', filterValues)
    const path = router.pathname;
    const {query} = router;

    const values = getFilterValues(filterValues);
    console.log('values', values);

    values.forEach((item) => {
      query[item.name] = item.value
    })
     
    console.log('values2 ', values);

    router.push({pathname: path, query});
    
  }

  return (
    <Flex flexWrap='wrap' bg="gray.100" p="4" justifyContent={'center'} >
        {filters.map((filter: any) =>
          <Box key={filter.queryName}>
            <Select
              placeholder={filter?.placeholder}
              w="fit-content"
              p="2"
              onChange={(e) => searchProperties({ [filter?.queryName]: e.target.value })}   >
              {filter?.items?.map((item: any) => (
                <option value={item.value} key={item.value}>{item.name}</option>
              ))}
            </Select>
          </Box>
        )}
    </Flex>
  )
}


export default SearchFilters;